import { z } from "zod";
import { findOrCreateNasabahSchema } from "../nasabah/nasabah.schema.js";
import {
  ComplaintStatus,
  ComplaintCategory,
} from "../../../generated/prisma/client.js";

// 1. Skema Klien (Public) untuk Membuat Aduan Baru
export const createComplaintSchema = z.object({
  // Kita import skema Nasabah agar divalidasi sekalian
  nasabah: findOrCreateNasabahSchema,
  complaint: z.object({
    category: z.nativeEnum(ComplaintCategory, {
      message: "Kategori aduan tidak valid",
    }),
    description: z.string().min(10, "Deskripsi aduan minimal 10 karakter"),
    // Klien tidak bisa set status, tapi bisa set prioritas jika diizinkan form UI (default: medium)
  }),
});

// 2. Skema Admin/CS untuk Menulis Resolusi (Tanggapan)
export const resolveComplaintSchema = z.object({
  resolutionMessage: z
    .string()
    .min(10, "Pesan resolusi harus detail dan jelas"),
  filePath: z.string().optional(),
  originalName: z.string().optional(),
});

// 3. Skema Update Status Biasa (misal dari Open -> In_Progress)
export const updateStatusSchema = z.object({
  status: z.nativeEnum(ComplaintStatus, {
    message: "Status tidak valid",
  }),
});

export const notificationDataSchema = z.object({
  phone: z.string().nullable(),
  name: z.string(),
  ticketCode: z.string(),
});

export type NotificationDataInput = z.infer<typeof notificationDataSchema>;
export type CreateComplaintInput = z.infer<typeof createComplaintSchema>;
export type ResolveComplaintInput = z.infer<typeof resolveComplaintSchema>;
export type UpdateStatusInput = z.infer<typeof updateStatusSchema>;
