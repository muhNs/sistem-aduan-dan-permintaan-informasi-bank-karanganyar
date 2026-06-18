import { prisma } from "../../../lib/prisma.js";
import bcrypt from "bcrypt";
import type { UserIdParam } from "./users.schema.js";

export const getAllUsersService = async () => {
  const users = prisma.user.findMany({
    where: {
      deletedAt: null,
    },
  });
  return users;
};

export const createUserService = async (data: any) => {
  const { name, email, password, role } = data;

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });
  if (existingUser) {
    throw new Error("Email sudah digunakan");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role,
    },
  });

  return user;
};

export const updateUserService = async (id: number, data: any) => {
  if (data.password) {
    data.password = await bcrypt.hash(data.password, 10);
  }

  return prisma.user.update({
    where: { id },
    data,
  });
};

export const deleteUserService = async (id: number) => {
  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) {
    throw new Error("User tidak ditemukan");
  }

  return prisma.user.update({
    where: { id },
    data: {
      deletedAt: new Date(),
    },
  });
};

export const getMeService = async (userId: number) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  if (!user) {
    throw new Error("User tidak ditemukan");
  }
  return user;
};
