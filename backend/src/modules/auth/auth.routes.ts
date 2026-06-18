import { Router } from "express";
import { loginController, logoutController, refreshTokenController } from "./auth.controllers.js";

const authRouter = Router();

authRouter.post("/login", loginController);
authRouter.post("/logout", logoutController);
authRouter.post("/refresh-token", refreshTokenController);

export default authRouter;