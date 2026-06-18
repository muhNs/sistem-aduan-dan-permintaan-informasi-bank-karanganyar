import { prisma, Prisma } from "../../../lib/prisma.js";
import type {
  CreateInformationRequestInput,
  UpdateRequestStatusInput,
  ResponseRequestInput,
} from "./request.schema.js";
import { findOrCreateNasabahService } from "../nasabah/nasabah.services.js";
import { sendWhatsAppMessage } from "../../shared/utils/whatsapp.service.js";
import { generateRequestTicket } from "../../shared/utils/generateTicketId.js";
import type { InformationRequest } from "../../../generated/prisma/client.js";

// A. FUNGSI UNTUK KLIEN (PUBLIC)
export const createInformationRequestService = async (
  data: CreateInformationRequestInput,
): Promise<InformationRequest> => {
  return await prisma.$transaction(async (tx) => {
    const nasabah = await findOrCreateNasabahService(data.nasabah, tx);
    const ticketCode = await generateRequestTicket(tx);
    const request = await tx.informationRequest.create({
      data: {
        ticketCode,
        nasabahId: nasabah.id,
        infoDetail: data.request.infoDetail,
        purpose: data.request.purpose ?? null,
        infoMethod: data.request.infoMethod ?? null,
        deliveryMethod: data.request.deliveryMethod ?? null,
        status: "pending",
      },
    });
    return request;
  });
};

// B. FUNGSI UNTUK ADMIN / CS
export const getAllInformationRequestsService = async (
  filters: Prisma.InformationRequestWhereInput = {},
  page: number = 1,
  limit: number = 10,
) => {
  // 🛡️ Validasi sederhana
  const safePage = Math.max(1, page);
  const safeLimit = Math.min(100, Math.max(1, limit));
  const skip = (safePage - 1) * safeLimit;

  const [data, total] = await Promise.all([
    prisma.informationRequest.findMany({
      where: {
        AND: [{ deletedAt: null }, filters],
      },
      include: {
        nasabah: { select: { name: true, email: true, phone: true } },
      },
      orderBy: { createdAt: "desc" },
      skip: skip,
      take: safeLimit,
    }),

    prisma.informationRequest.count({
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

export const getInformationRequestDetailService = async (id: number) => {
  const request = await prisma.informationRequest.findUnique({
    where: { id },
    include: {
      nasabah: true,
      response: {
        include: { user: { select: { name: true, role: true } } },
      },
      attachments: true,
    },
  });
  if (!request || request.deletedAt)
    throw new Error("Data Permohonan tidak ditemukan");
  return request;
};

export const updateStatusInformationRequestService = async (
  id: number,
  data: UpdateRequestStatusInput,
) => {
  return await prisma.informationRequest.update({
    where: { id },
    data: { status: data.status },
  });
};

export const responseInformationRequestService = async (
  requestId: number,
  adminId: number,
  data: ResponseRequestInput,
) => {
  // Transaksi agar status Request dan Response tersimpan serentak (Menghindari error 'never')
  const result = await prisma.$transaction(async (tx) => {
    const request = await tx.informationRequest.findUnique({
      where: { id: requestId },
      include: { nasabah: true },
    });

    if (!request) throw new Error("Permohonan tidak ditemukan");
    if (request.status === "completed" || request.status === "rejected") {
      throw new Error("Permohonan ini sudah diselesaikan atau ditolak");
    }

    const response = await tx.informationRequestResponse.create({
      data: {
        requestId,
        respondedBy: adminId,
        responseMessage: data.responseMessage,
        respondedAt: new Date(),
      },
    });

    await tx.informationRequest.update({
      where: { id: requestId },
      data: { status: "completed" },
    });

    return {
      response,
      nasabahPhone: request.nasabah.phone,
      nasabahName: request.nasabah.name,
      ticketCode: request.ticketCode,
    };
  });

  // FIRE AND FORGET: Kirim pesan WA
  if (result.nasabahPhone) {
    const waMessage = `Yth. Bpk/Ibu ${result.nasabahName},\n\nPermohonan Informasi Anda (Tiket: *${result.ticketCode}*) telah selesai diproses.\n\nJawaban:\n"${data.responseMessage}"\n\nTerima kasih atas kepercayaannya.\n- Bank`;
    sendWhatsAppMessage(result.nasabahPhone, waMessage);
  }

  return result.response;
};

export const getResponseRequestById = () => {
  
}
