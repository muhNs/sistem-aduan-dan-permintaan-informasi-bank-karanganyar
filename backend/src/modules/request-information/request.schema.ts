import { z } from 'zod';
import { findOrCreateNasabahSchema } from '../nasabah/nasabah.schema.js';
import { RequestStatus } from '../../../generated/prisma/client.js';

// A. Skema untuk Form Publik (Client Side)
export const createInformationRequestSchema = z.object({
  nasabah: findOrCreateNasabahSchema,
  request: z.object({
    infoDetail: z.string().min(10, 'Detail informasi yang diminta minimal 10 karakter'),
    purpose: z.string().optional().nullable(),
    infoMethod: z.string().optional().nullable(),  
    deliveryMethod: z.string().optional().nullable(), 
  })
});

// B. Skema untuk Update Status Biasa (Admin/CS)
export const updateRequestStatusSchema = z.object({
  status: z.nativeEnum(RequestStatus, {
    message: 'Status tidak valid',
  }),
});

// C. Skema untuk Memberikan Jawaban Resmi (Admin/CS)
export const responseRequestSchema = z.object({
  responseMessage: z.string().min(10, 'Pesan tanggapan harus jelas dan komprehensif'),
});

// Ekstrak Tipe TypeScript
export type CreateInformationRequestInput = z.infer<typeof createInformationRequestSchema>;
export type UpdateRequestStatusInput = z.infer<typeof updateRequestStatusSchema>;
export type ResponseRequestInput = z.infer<typeof responseRequestSchema>;