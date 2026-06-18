import type { Response, Request } from "express";
import {
  getAllNasabahService,
  getNasabahByIdService,
  deleteNasabahService,
  updateNasabahService,
} from "./nasabah.services.js";
import { updateNasabahSchema } from "./nasabah.schema.js";

export const getAllNasabah = async (req: Request, res: Response) => {
  try {
    const nasabah = await getAllNasabahService();
    return res.status(200).json({ status: "success", data: nasabah });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "error", message: (error as Error).message });
  }
};

export const getNasabahById = async (req: Request, res: Response) => {
  try {
    const nasabah = await getNasabahByIdService(Number(req.params.id));
    return res.status(200).json({ status: "success", data: nasabah });
  } catch (error) {
    return res
      .status(404)
      .json({ status: "error", message: (error as Error).message });
  }
};

export const updateNasabah = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id))
      return res
        .status(400)
        .json({ status: "error", message: "ID Nasabah tidak valid" });

    // 1. Validasi Input Klien menggunakan Zod
    const validation = updateNasabahSchema.safeParse(req.body);

    // Jika validasi gagal, kembalikan response 400 beserta detail error dari Zod
    if (!validation.success) {
      return res.status(400).json({
        status: "fail",
        message: "Validasi data gagal",
        errors: validation.error.flatten().fieldErrors, // Format error agar mudah dibaca Frontend
      });
    }

    // 2. Jika sukses, teruskan data yang sudah divalidasi ke Service
    const nasabah = await updateNasabahService(id, validation.data);

    return res.status(200).json({
      status: "success",
      data: nasabah,
      message: "Data nasabah berhasil diperbarui",
    });
  } catch (error) {
    return res
      .status(400)
      .json({ status: "error", message: (error as Error).message });
  }
};

export const deleteNasabah = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id))
      return res
        .status(400)
        .json({ status: "error", message: "ID Nasabah tidak valid" });

    await deleteNasabahService(id);
    return res
      .status(200)
      .json({ status: "success", message: "Data nasabah berhasil dihapus" });
  } catch (error) {
    return res
      .status(400)
      .json({ status: "error", message: (error as Error).message });
  }
};
