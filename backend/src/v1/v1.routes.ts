import { Router } from "express";
import router from "../routes/routers.js";

const v1Router = Router();

v1Router.use("/v1", router);

export default v1Router;