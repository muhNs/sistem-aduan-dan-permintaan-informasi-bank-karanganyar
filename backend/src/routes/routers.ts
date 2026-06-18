import express, { Router } from "express";
import authRouter from "../modules/auth/auth.routes.js";
import usersRouter from "../modules/users/users.routes.js";
import nasabahRouter from "../modules/nasabah/nasabah.routes.js";
import aduanRouter from "../modules/aduan/aduan.routes.js";
import requestRouter from "../modules/request-information/request.routes.js";
import attachmentRouter from "../modules/attachment/attachment.routes.js";

const router: Router = express.Router();

router.use("/auth", authRouter);
router.use("/users", usersRouter);
router.use("/attachments", attachmentRouter);
router.use("/nasabah", nasabahRouter);
router.use("/aduan", aduanRouter);
router.use("/information-requests", requestRouter);

export default router;
