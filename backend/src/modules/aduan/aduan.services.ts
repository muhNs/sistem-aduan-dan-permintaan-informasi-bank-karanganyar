import { prisma, Prisma } from "../../../lib/prisma.js";
import type {
  CreateComplaintInput,
  ResolveComplaintInput,
  UpdateStatusInput,
  NotificationDataInput,
} from "./aduan.schema.js";
import { findOrCreateNasabahService } from "../nasabah/nasabah.services.js";
import { generateComplaintTicket } from "../../shared/utils/generateTicketId.js";
import { sendWhatsAppMessage } from "../../shared/utils/whatsapp.service.js";
import type { Complaint } from "../../../generated/prisma/client.js";

export const createComplaintService = async (
  data: CreateComplaintInput,
): Promise<Complaint> => {
  return await prisma.$transaction(async (tx) => {
    // 1. REUSE NASABAH SERVICE: Lempar 'tx' ke dalamnya
    const nasabah = await findOrCreateNasabahService(data.nasabah, tx);
    // 2. REUSE TICKET SERVICE: Lempar 'tx' ke dalamnya
    const ticketCode = await generateComplaintTicket(tx);
    // 3. CREATE COMPLAINT
    const complaint = await tx.complaint.create({
      data: {
        ticketCode,
        nasabahId: nasabah.id,
        category: data.complaint.category || "LAINNYA", // Default ke 'LAINNYA' jika tidak ada kategori
        description: data.complaint.description,
        status: "open",
      },
    });
    return complaint;
  });
};

// 2. FUNGSI UNTUK ADMIN / CS
export const getAllComplaintsService = async (
  filters: Prisma.ComplaintWhereInput = {},
  page: number = 1,
  limit: number = 10,
) => {
  // 🛡️ Validasi sederhana
  const safePage = Math.max(1, page);
  const safeLimit = Math.min(100, Math.max(1, limit));
  const skip = (safePage - 1) * safeLimit;

  const [data, total] = await Promise.all([
    prisma.complaint.findMany({
      where: {
        AND: [{ deletedAt: null }, filters],
      },
      include: {
        nasabah: {
          select: {
            name: true,
            email: true,
            phone: true,
            address: true,
            job: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
      skip: skip,
      take: safeLimit,
    }),

    prisma.complaint.count({
      where: {
        AND: [{ deletedAt: null }, filters],
      },
    }),
  ]);

  return {
    data,
    meta: {
      total,
      page: safePage,
      limit: safeLimit,
      totalPages: Math.ceil(total / safeLimit),
    },
  };
};

export const getComplaintDetailService = async (id: number) => {
  const complaint = await prisma.complaint.findUnique({
    where: { id },
    include: {
      nasabah: {
        select: {
          name: true,
          email: true,
          phone: true,
          address: true,
          job: true,
        },
      },
      resolution: {
        select: {
          resolutionMessage: true,
          resolvedAt: true,
          user: {
            select: { name: true, role: true } },
        },
      },
      attachments: true,
    },
  });
  return complaint;
};

export const updateComplaintStatusService = async (
  id: number,
  data: UpdateStatusInput,
) => {
  return await prisma.complaint.update({
    where: { id },
    data: { status: data.status },
  });
};

export const resolveComplaintService = async (
  complaintId: number,
  adminId: number,
  data: ResolveComplaintInput,
) => {
  let notificationData: any = null;

  const resolution = await prisma.$transaction(async (tx) => {
    const complaint = await tx.complaint.findUnique({
      where: { id: complaintId },
      include: { nasabah: true },
    });

    if (!complaint) throw new Error("Aduan tidak ditemukan");
    if (complaint.status === "closed" || complaint.status === "resolved") {
      throw new Error("Aduan ini sudah diselesaikan atau ditutup");
    }

    notificationData = {
      phone: complaint.nasabah.phone,
      name: complaint.nasabah.name,
      ticketCode: complaint.ticketCode,
    };

    // 1. BUAT RESOLUSINYA DULU
    const newResolution = await tx.complaintResolution.create({
      data: {
        complaintId,
        resolvedBy: adminId,
        resolutionMessage: data.resolutionMessage,
        resolvedAt: new Date(),
      },
    });

    // 2. BUAT ATTACHMENT DENGAN KUNCI KE RESOLUSI
    if (data.filePath) {
      await tx.attachment.create({
        data: {
          // Menggunakan ID dari resolusi yang baru saja dibuat di atas!
          complaintResolutionId: newResolution.id,
          filePath: data.filePath,
        },
      });
    }

    // 3. Update Status Aduan menjadi 'resolved'
    await tx.complaint.update({
      where: { id: complaintId },
      data: { status: "resolved" },
    });

    return {
      resolution: newResolution,
      nasabahPhone: notificationData.phone,
      nasabahName: notificationData.name,
      ticketCode: notificationData.ticketCode,
      attachmentPath: data.filePath,
    };
  });

  // if (resolution.nasabahPhone) {
  //   // Kirim pesan WA
  //   const attachmentText = data.originalName
  //     ? `\n\n(Terdapat dokumen lampiran: ${data.originalName}. Silakan cek portal/email Anda untuk mengunduh)`
  //     : "";
  //   const waMessage = `Yth. Bpk/Ibu ${resolution.nasabahName},\n\nAduan Anda dengan nomor tiket *${resolution.ticketCode}* telah diselesaikan oleh tim kami dengan pesan:\n\n"${data.resolutionMessage}"${attachmentText}\n\nTerima kasih atas kepercayaan Anda.\n- Layanan Pelanggan Bank`;

  //   // sendWhatsAppMessage(resolution.nasabahPhone, waMessage);
  //   console.log("Mengirim WA:", waMessage);
  // }

  return resolution;
};

export const getComplaintResolutionService = async (complaintId: number) => {
  const resolution = await prisma.complaintResolution.findUnique({
    where: { complaintId },
    include: {
      user: { select: { email: true, name: true } },
      attachments: true, // Ambil SEMUA data di tabel Attachment
    },
  });

  if (!resolution) return null;

  // Format semua lampiran menjadi array objek berisi nama dan URL
  const formattedAttachments = resolution.attachments.map((att) => {
    const fileName = att.filePath.split("/").pop() || "Lampiran";
    return {
      name: fileName,
      url: att.filePath, // Path relatif, misal: /uploads/complaints/file.pdf
    };
  });

  return {
    id: resolution.id,
    email: resolution.user.email,
    message: resolution.resolutionMessage,
    attachments: formattedAttachments, // Sekarang berbentuk Array!
    createdAt: resolution.createdAt.toLocaleString("id-ID", {
      dateStyle: "medium",
      timeStyle: "short",
    }),
  };
};
