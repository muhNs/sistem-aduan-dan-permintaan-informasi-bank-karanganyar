import type { Request, Response } from "express";
import {
  createInformationRequestService,
  getAllInformationRequestsService,
  getInformationRequestDetailService,
  updateStatusInformationRequestService,
  responseInformationRequestService,
} from "./request.services.js";
import {
  createInformationRequestSchema,
  updateRequestStatusSchema,
  responseRequestSchema,
} from "./request.schema.js";
import type { Prisma } from "../../../lib/prisma.js";

// A. CONTROLLER UNTUK KLIEN (PUBLIC)
export const createInformationRequestController = async (
  req: Request,
  res: Response,
) => {
  try {
    const validated = createInformationRequestSchema.safeParse(req.body);
    if (!validated.success) {
      return res.status(400).json({
        status: "fail",
        errors: validated.error.flatten().fieldErrors,
      });
    }

    const result = await createInformationRequestService(validated.data);
    return res.status(201).json({
      status: "success",
      message: "Permohonan informasi berhasil dibuat",
      data: { ticketCode: result.ticketCode },
    });
  } catch (error: any) {
    // 1. Cetak ke terminal backend agar Anda bisa melihat tumpukan errornya (stack trace)
    console.error("[InformationRequest Error]:", error);

    // 2. Kirim pesan error asli ke frontend
    return res.status(500).json({
      status: "error",
      message: error.message || "Terjadi kesalahan saat membuat permohonan informasi",
    });
  }
};

// B. CONTROLLER UNTUK ADMIN / CS
export const getAllInformationRequestsController = async (
  req: Request,
  res: Response,
) => {
  try {
    // Ambil param paginasi dari URL, berikan default value jika tidak dikirim
    const { page = "1", limit = "10", status } = req.query;

    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    const filters: Prisma.InformationRequestWhereInput = {};
    // Optional: Anda bisa ekstrak filter status dari query juga
    if (status) {
      filters.status = status as any; // Pastikan ini sesuai dengan enum yang Anda gunakan
    }
    const result = await getAllInformationRequestsService(
      filters,
      pageNumber,
      limitNumber,
    );

    return res.status(200).json({
      status: "success",
      data: result.data,
      meta: result.meta,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "error", message: (error as Error).message });
  }
};

export const getInformationRequestDetailController = async (
  req: Request,
  res: Response,
) => {
  try {
    const detail = await getInformationRequestDetailService(
      Number(req.params.id),
    );
    if (!detail) {
      return res.status(404).json({
        status: "error",
        message: "Detail Permohonan informasi tidak ditemukan",
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

export const updateStatusInformationRequestController = async (req: Request, res: Response) => {
  try {
    const validated = updateRequestStatusSchema.safeParse(req.body);
    if (!validated.success) {
      return res.status(400).json({
        status: "fail",
        errors: validated.error.flatten().fieldErrors,
      });
    }
    const updated = await updateStatusInformationRequestService(
      Number(req.params.id),
      validated.data,
    );
    return res.status(200).json({
      status: "success",
      message: "Status permohonan informasi berhasil diperbarui",
      data: updated,
    });
  } catch (error) {
      return res.status(400).json({
        status: "error",
        message: (error as Error).message,
      });
  }
};
export const responseInformationRequestController = async (req: Request, res: Response) => {
  try {
    const validated = responseRequestSchema.safeParse(req.body);
    if (!validated.success) {
      return res.status(400).json({
        status: "fail",
        errors: validated.error.flatten().fieldErrors,
      });
    }

    const adminId = Number(req.user?.userId); 
    if (!adminId) {
      return res.status(401).json({
        status: "error",
        message: "Unauthorized: Admin ID tidak ditemukan",
      });
    }

    const result = await responseInformationRequestService(
      Number(req.params.id),
      adminId,
      validated.data,
    );

    return res.status(200).json({
      status: "success",
      message: "Respon permohonan informasi berhasil dikirim",
      data: result,
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: "Terjadi kesalahan saat mengirim respon permohonan informasi",
    });
  }
};
