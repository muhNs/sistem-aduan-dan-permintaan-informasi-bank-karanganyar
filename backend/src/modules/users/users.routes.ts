import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { authorize } from "../../middlewares/authorization.middleware.js";
import {
  createUserController,
  deleteUserController,
  getAllUsersController,
  getMeController,
  updateUserController
} from "./users.controllers.js";

const usersRouter = Router();

usersRouter.get("/me", authenticate, authorize(["ADMIN", "CS"]), getMeController);
usersRouter.get("/getAllUsers", authenticate, authorize(["ADMIN"]), getAllUsersController);
usersRouter.post("/createUser", authenticate, authorize(["ADMIN"]), createUserController);
usersRouter.put("/updateUser/:id", authenticate, authorize(["ADMIN"]), updateUserController);
usersRouter.post("/deleteUser/:id", authenticate, authorize(["ADMIN"]), deleteUserController);

export default usersRouter;