import fs from "fs";
import path from "path";
import { prisma } from "../../../lib/prisma.js";
import type { UploadAttachmentInput } from "./attachment.schema.js";

const publicUploadsDir = path.join(process.cwd(), "public", "uploads");

export const uploadAttachmentService = async ({
  files,
  complaintId,
  requestId,
}: UploadAttachmentInput) => {
  if (!files || files.length === 0) {
    throw new Error("No files uploaded");
  }

  if (complaintId) {
    const complaint = await prisma.complaint.findUnique({
      where: { id: complaintId },
    });

    if (!complaint) {
      throw new Error("Complaint not found");
    }
  }

  const attachments = await Promise.all(
    files.map((file) =>
      prisma.attachment.create({
        data: {
          filePath: `/uploads/${file.filename}`,
          complaintId,
          requestId,
        },
      }),
    ),
  );

  return attachments;
};

export const getAttachmentFilePath = async (filename: string) => {
  const normalizedFilename = path.basename(filename);

  if (normalizedFilename !== filename) {
    throw new Error("Invalid filename");
  }

  const attachment = await prisma.attachment.findFirst({
    where: {
      filePath: {
        endsWith: `/${normalizedFilename}`,
      },
    },
  });

  if (!attachment) {
    throw new Error("Attachment not found");
  }

  const relativePath = attachment.filePath.replace(/^\//, "");
  const fullPath = path.join(process.cwd(), "public", relativePath);

  if (!fs.existsSync(fullPath)) {
    throw new Error("File not found on server");
  }

  return {
    attachment,
    fullPath,
  };
};
