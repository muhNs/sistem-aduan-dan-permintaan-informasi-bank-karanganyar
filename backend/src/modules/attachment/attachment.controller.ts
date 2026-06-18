import type { Request, Response } from "express";
import {
  getAttachmentFilePath,
  uploadAttachmentService,
} from "./attachment.service.js";
import { uploadAttachmentSchema } from "./attachment.schema.js";

export const uploadAttachmentController = async (
  req: Request,
  res: Response,
) => {
  try {
    const parsed = uploadAttachmentSchema.parse(req.body);

    const complaintId = parsed.complaintId
      ? Number(parsed.complaintId)
      : undefined;

    const requestId = parsed.requestId ? Number(parsed.requestId) : undefined;

    const files = req.files as unknown as Express.Multer.File[];

    if (!files || files.length === 0) {
      return res.status(400).json({
        status: "error",
        message: "No files uploaded",
      });
    }

    const result = await uploadAttachmentService({
      files,
      complaintId,
      requestId,
    });

    return res.status(201).json({
      status: "success",
      data: result,
    });
  } catch (error: any) {
    console.error(error);

    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

export const viewAttachmentController = async (req: Request, res: Response) => {
  try {
    const filename = String(req.params.filename);
    const { fullPath } = await getAttachmentFilePath(filename);

    return res.sendFile(fullPath);
  } catch (error: any) {
    console.error(error);
    return res.status(404).json({
      status: "error",
      message: error.message,
    });
  }
};

export const downloadAttachmentController = async (
  req: Request,
  res: Response,
) => {
  try {
    const filename = String(req.params.filename);
    const { fullPath } = await getAttachmentFilePath(filename);

    return res.download(fullPath);
  } catch (error: any) {
    console.error(error);
    return res.status(404).json({
      status: "error",
      message: error.message,
    });
  }
};
