import type { Request, Response } from "express";
import {
  createUserSchema,
  updateUserSchema,
  userIdParamSchema,
} from "./users.schema.js";
import {
  createUserService,
  getAllUsersService,
  updateUserService,
  deleteUserService,
  getMeService,
} from "./users.services.js";

export const getAllUsersController = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsersService();
    res.json(users);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Failed to get users", error: error.message });
  }
};

export const createUserController = async (req: Request, res: Response) => {
  try {
    const data = createUserSchema.safeParse(req.body);
    if (!data.success) {
      return res.status(400).json({ 
        status: "fail",
        message: "Validasi data gagal", 
        errors: data.error.flatten().fieldErrors 
      });
    }

    const user = await createUserService(data.data);
    res.status(201).json(user);
  } catch (error: any) {
    if (error.message === "EMAIL_ALREADY_EXISTS") {
      return res.status(409).json({ error: "Email already exists" });
    }
    return res.status(500).json({ error: error.message });
  }
};

export const updateUserController = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)

    const data = updateUserSchema.safeParse(req.body);
    const updatedUser = await updateUserService(id, data.data);

    res.json(updatedUser);

  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteUserController = async (req: Request, res: Response) => {
  try {
    const validatedInput = userIdParamSchema.parse(req.params);
    const id = await deleteUserService(validatedInput.id);
    res.json({ message: "User deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getMeController = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const userProfile = await getMeService(userId);
    res.json(userProfile);
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
};
