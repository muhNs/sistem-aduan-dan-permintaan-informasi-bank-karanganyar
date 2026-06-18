import { z } from 'zod';

// 1. Skema untuk Form Publik (Find or Create)
export const findOrCreateNasabahSchema = z.object({
  name: z.string().min(3, 'Nama minimal 3 karakter').max(100, 'Nama maksimal 100 karakter'),
  email: z.string().email('Format email tidak valid').optional().nullable(),
  phone: z.string().min(9, 'Nomor telepon minimal 9 digit').max(15, 'Nomor telepon maksimal 15 digit').optional().nullable(),
  address: z.string().min(10, 'Alamat terlalu singkat, berikan detail yang jelas'),
  job: z.string().optional().nullable(),
}).refine((data) => data.email || data.phone, {
  // Custom logic: Wajib isi salah satu (Email atau Phone)
  message: 'Anda harus menyertakan Email atau Nomor Telepon agar dapat dihubungi',
  path: ['email', 'phone'], 
});

// 2. Skema untuk Update oleh Admin (Semua field opsional)
export const updateNasabahSchema = z.object({
  name: z.string().min(3).max(100).optional(),
  email: z.string().email().optional().nullable(),
  phone: z.string().min(9).max(15).optional().nullable(),
  address: z.string().min(10).optional(),
  job: z.string().optional().nullable(),
});

// 3. Ekstrak TypeScript Types dari Zod Schema (Tidak perlu buat interface manual lagi!)
export type FindOrCreateNasabahInput = z.infer<typeof findOrCreateNasabahSchema>;
export type UpdateNasabahInput = z.infer<typeof updateNasabahSchema>;