import { z } from "zod";

export const uploadAttachmentSchema = z.object({
  complaintId: z.string().optional(), // nanti di-parse ke number
  requestId: z.string().optional(),
});

export type UploadAttachmentInput = {
  files: Express.Multer.File[];
  complaintId?: number;
  requestId?: number;
};