import type { Request, Response } from "express";
import { ZodError } from "zod";
import { loginSchema } from "./auth.schema.js";
import {
  setCookieOptions,
  clearAuthCookie,
} from "../../shared/utils/cookie.js";
import {
  loginService,
  logoutService,
  refreshTokenService,
} from "./auth.services.js";

export const loginController = async (req: Request, res: Response) => {
  try {
    const parsed = loginSchema.parse(req.body);
    const result = await loginService(parsed.email, parsed.password);

    // 3. Set HTTP-Only Cookies
    res.cookie("accessToken", result.accessToken, {
      ...setCookieOptions,
      maxAge: 15 * 60 * 1000, // 15 Menit (sesuaikan dengan umur token)
    });

    res.cookie("refreshToken", result.refreshToken, {
      ...setCookieOptions,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 Hari
    });

    return res.json({
      message: "Login berhasil",
      data: result,
    });
  } catch (error: any) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        message: "Validasi input gagal",
        errors: error,
      });
    }

    return res.status(400).json({
      message: error.message,
    });
  }
};

export const logoutController = async (req: Request, res: Response) => {
  try {
    let token: string | undefined;
    if (req.cookies.refreshToken) {
      token = req.cookies.refreshToken as string;
    } else if (req.headers.authorization?.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(400).json({ message: "Token tidak ditemukan" });
    }

    clearAuthCookie(res);

    await logoutService(token);
    return res.json({ message: "Logout berhasil" });
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const refreshTokenController = async (req: Request, res: Response) => {
  try {
    let token: string | undefined;
    if (req.cookies.refreshToken) {
      token = req.cookies.refreshToken as string;
    }

    if (!token) {
      return res.status(401).json({ message: "Refresh token tidak ditemukan" });
    }

    const result = await refreshTokenService(token);

    res.cookie("accessToken", result.accessToken, {
      ...setCookieOptions,
      maxAge: 1 * 60 * 1000, // 15 Menit (sesuaikan dengan umur token)
    });
    return res.status(200).json({ success: true });
  } catch (error: any) {
    return res.status(401).json({
      message: error.message,
    });
  }
};
