import { prisma } from "../../../lib/prisma.js";
import { generateAccessToken, generateRefreshToken, verifyToken, verifyRefreshToken } from "../../config/auth.helper.js";
import bcrypt from "bcrypt";

export const loginService = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
      deletedAt: null,
    },
  });

  if (!user) {
    throw new Error("Email tidak ditemukan");
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    throw new Error("Password salah");
  }

  const accestoken = generateAccessToken({ id: user.id, role: user.role });
  const refreshToken = await generateRefreshToken({ id: user.id, role: user.role });

  return {
    accessToken: accestoken,
    refreshToken,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};

export const logoutService = async (token: string) => {
  return await prisma.refreshToken.updateMany({
    where: { token },
    data: { revokedAt: new Date() }
  });
};

export const refreshTokenService = async (token: string) => {
  const storedToken = await prisma.refreshToken.findFirst({
    where: { token, revokedAt: null },
  });
  if (!storedToken) {
    throw new Error("Refresh token tidak valid");
  }
  const payload : any = verifyRefreshToken(token);
  const user = await prisma.user.findUnique({
    where: { id: payload.userId, deletedAt: null },
  });

  const newAccessToken = generateAccessToken({ id: user!.id, role: user!.role });
  return {
    accessToken: newAccessToken,
  };
};
