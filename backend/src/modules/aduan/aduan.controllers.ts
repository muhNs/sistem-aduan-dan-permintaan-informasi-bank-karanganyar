import type { Request, Response } from "express";
import { Prisma } from "../../../generated/prisma/client.js";
import {
  createComplaintSchema,
  resolveComplaintSchema,
  updateStatusSchema,
} from "./aduan.schema.js";
import {
  createComplaintService,
  getAllComplaintsService,
  resolveComplaintService,
  updateComplaintStatusService,
  getComplaintDetailService,
  getComplaintResolutionService,
} from "./aduan.services.js";
import { id } from "zod/locales";

// PUBLIC CONTROLLER (Untuk Klien)
export const createComplaintController = async (
  req: Request,
  res: Response,
) => {
  try {
    const validated = createComplaintSchema.safeParse(req.body);
    if (!validated.success) {
      return res.status(400).json({
        status: "fail",
        errors: validated.error.flatten().fieldErrors,
      });
    }

    const result = await createComplaintService(validated.data);
    return res.status(201).json({
      status: "success",
      message: "Aduan berhasil dibuat",
      data: {
        complaintId: result.id,
        ticketCode: result.ticketCode,
      },
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: "error", message: "Terjadi kesalahan pada server" });
  }
};

// PRIVATE CONTROLLER (Untuk Admin/CS)
export const getAllComplaintsController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { page = "1", limit = "15", status } = req.query;

    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    const filters: Prisma.ComplaintWhereInput = {};

    // optional filter
    if (status) {
      filters.status = status as any;
    }

    const result = await getAllComplaintsService(
      filters,
      pageNumber,
      limitNumber,
    );

    return res.status(200).json({
      status: "success",
      ...result,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: "error", message: "Terjadi kesalahan pada server" });
  }
};

export const updateComplaintStatusController = async (
  req: Request,
  res: Response,
) => {
  try {
    const validated = updateStatusSchema.safeParse(req.body);
    if (!validated.success) {
      return res.status(400).json({
        status: "fail",
        errors: validated.error.flatten().fieldErrors,
      });
    }
    const updated = await updateComplaintStatusService(
      Number(req.params.id),
      validated.data,
    );

    return res.status(200).json({
      status: "success",
      message: "Status aduan berhasil diperbarui",
      data: updated,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "error", message: "Terjadi kesalahan pada server" });
  }
};

export const resolveComplaintController = async (
  req: Request,
  res: Response,
) => {
  try {
    const complaintId = Number(req.params.id);
    const adminId = req.user?.userId;

    if (!adminId) {
      return res.status(401).json({
        status: "error",
        message: "Akses ditolak: User ID tidak ditemukan.",
      });
    }

    // 1. Validasi teks menggunakan Zod
    const validated = resolveComplaintSchema.safeParse(req.body);
    if (!validated.success) {
      return res.status(400).json({
        status: "fail",
        errors: validated.error.flatten().fieldErrors,
      });
    }

    // 2. Tangkap file dari Multer
    const file = req.file;
    let filePath: string | undefined = undefined;
    let originalName: string | undefined = undefined;

    if (file) {
      originalName = file.originalname;
      // Format path untuk disimpan ke tabel Attachment dan diakses via URL
      filePath = `/uploads/complaints/${file.filename}`;
    }

    // 3. Gabungkan payload untuk Service
    const servicePayload = {
      resolutionMessage: validated.data.resolutionMessage,
      filePath, // <-- Sesuai dengan kolom di DB
      originalName, // <-- Hanya untuk kebutuhan teks WA
    };

    // 4. Panggil Service
    const resolution = await resolveComplaintService(
      complaintId,
      adminId,
      servicePayload,
    );

    return res.status(200).json({
      status: "success",
      message:
        "Aduan berhasil diselesaikan. Notifikasi WhatsApp sedang dikirim ke nasabah.",
      data: resolution,
    });
  } catch (error) {
    const errMessage =
      error instanceof Error ? error.message : "Terjadi kesalahan pada server";
    return res.status(400).json({
      status: "error",
      message: errMessage,
    });
  }
};

export const getComplaintDetailController = async (
  req: Request,
  res: Response,
) => {
  try {
    const detail = await getComplaintDetailService(Number(req.params.id));
    if (!detail) {
      return res.status(404).json({
        status: "error",
        message: "Detail Aduan tidak ditemukan",
      });
    }

    return res.status(200).json({
      status: "success",
      data: detail,
    });
  } catch (error) {
    return res.status(404).json({
      status: "error",
      message: (error as Error).message,
    });
  }
};

export const getComplaintResolutionController = async (
  req: Request,
  res: Response,
) => {
  try {
    const complaintId = Number(req.params.id);

    if (isNaN(complaintId)) {
      return res.status(400).json({
        status: "fail",
        message: "ID Aduan tidak valid.",
      });
    }

    const resolutionData = await getComplaintResolutionService(complaintId);

    // Mengembalikan status 200 OK meskipun datanya null (artinya memang belum dijawab)
    return res.status(200).json({
      status: "success",
      data: resolutionData,
    });
  } catch (error) {
    const errMessage =
      error instanceof Error ? error.message : "Terjadi kesalahan pada server";
    return res.status(500).json({
      status: "error",
      message: errMessage,
    });
  }
};
