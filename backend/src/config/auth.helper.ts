import { prisma } from "../../lib/prisma.js";
import jwt from "jsonwebtoken";

export const generateAccessToken = (user: { id: number; role: string }) => {
  return jwt.sign(
    {
      userId: user.id,
      role: user.role,
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: "1d",
    },
  );
};

export const generateRefreshToken = async (user: { id: number; role: string }) => {
  const token = jwt.sign(
    {
      userId: user.id,
      role: user.role,
    },
    process.env.REFRESH_SECRET!,
    {
      expiresIn: "7d",
    },
  );

  await prisma.refreshToken.create({
    data: {
      token,
      userId: user.id,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 hari
    },
  });

  return token;
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET!);
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, process.env.REFRESH_SECRET!);
};