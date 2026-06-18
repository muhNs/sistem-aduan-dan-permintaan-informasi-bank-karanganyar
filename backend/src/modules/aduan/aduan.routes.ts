import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { authorize } from "../../middlewares/authorization.middleware.js";
import { uploadReplyAttachment } from "../../shared/utils/multer.js";
import {
  createComplaintController,
  getAllComplaintsController,
  getComplaintDetailController,
  resolveComplaintController,
  updateComplaintStatusController,
  getComplaintResolutionController
} from "./aduan.controllers.js";

const aduanRouter = Router();

// Rute untuk Klien (Publik)
aduanRouter.post("/createComplaint", createComplaintController);
// Rute untuk Admin/CS (Privat)
aduanRouter.get("/getAllComplaints", authenticate, authorize(["ADMIN", "CS"]), getAllComplaintsController);
aduanRouter.get("/getComplaintDetail/:id", authenticate, authorize(["ADMIN", "CS"]), getComplaintDetailController);
aduanRouter.put("/updateComplaintStatus/:id", authenticate, authorize(["ADMIN", "CS"]), updateComplaintStatusController);
aduanRouter.post("/resolveComplaint/:id", authenticate, authorize(["ADMIN", "CS"]), uploadReplyAttachment.single("attachment"), resolveComplaintController);
aduanRouter.get("/resolveComplaintById/:id", authenticate, authorize(["ADMIN", "CS"]), getComplaintResolutionController);

export default aduanRouter;