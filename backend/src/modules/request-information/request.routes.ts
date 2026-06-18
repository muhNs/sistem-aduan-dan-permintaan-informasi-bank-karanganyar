import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { authorize } from "../../middlewares/authorization.middleware.js";
import {
  createInformationRequestController,
  getAllInformationRequestsController,
  getInformationRequestDetailController,
  updateStatusInformationRequestController,
  responseInformationRequestController
} from "./request.controllers.js";

const requestRouter = Router();

// Rute untuk Klien (Publik)
requestRouter.post("/createInformationRequest", createInformationRequestController);

// Rute untuk Admin/CS (Privat)
requestRouter.get("/getAllInformationRequests", authenticate, authorize(["ADMIN", "CS"]), getAllInformationRequestsController);
requestRouter.get("/getInformationRequestDetail/:id", authenticate, authorize(["ADMIN", "CS"]), getInformationRequestDetailController);
requestRouter.put("/updateInformationRequestStatus/:id", authenticate, authorize(["ADMIN", "CS"]), updateStatusInformationRequestController);
requestRouter.post("/responseInformationRequest/:id", authenticate, authorize(["ADMIN", "CS"]), responseInformationRequestController);

export default requestRouter;