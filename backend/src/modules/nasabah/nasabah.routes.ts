import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { authorize } from "../../middlewares/authorization.middleware.js";
import {
  deleteNasabah,
  getAllNasabah,
  getNasabahById,
  updateNasabah,
} from "./nasabah.controlles.js";

const nasabahRouter = Router();

nasabahRouter.get("/getAllNasabah", authenticate, authorize(["ADMIN"]), getAllNasabah);
nasabahRouter.get("/getNasabahById:id", authenticate, authorize(["ADMIN"]), getNasabahById);
nasabahRouter.put("/updateNasabah/:id", authenticate, authorize(["ADMIN"]), updateNasabah);
nasabahRouter.post("/deleteNasabah/:id", authenticate, authorize(["ADMIN"]), deleteNasabah);

export default nasabahRouter;
