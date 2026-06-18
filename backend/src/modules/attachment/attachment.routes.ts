import { Router } from "express";
import { upload } from "../../shared/utils/multer.js";
import {
  downloadAttachmentController,
  uploadAttachmentController,
  viewAttachmentController,
} from "./attachment.controller.js";

const router = Router();

router.post("/upload", upload.array("lampiran[]", 3), uploadAttachmentController);
router.get("/view/:filename", viewAttachmentController);
router.get("/download/:filename", downloadAttachmentController);

export default router;