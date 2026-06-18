import { api } from "../../../lib/http.js"; // Sesuaikan path dengan lokasi axios.ts Anda
import type { LoginPayload, AuthResponse, User } from "../types/auth.types";

export const loginApi = async (
  payload: LoginPayload,
): Promise<AuthResponse> => {
  const { data } = await api.post<AuthResponse>("/auth/login", payload);
  return data;
};

export const logoutApi = async (): Promise<void> => {
  await api.post("/auth/logout");
};

// Endpoint untuk mengecek sesi saat aplikasi baru pertama kali dimuat (refresh browser)
export const getProfileApi = async (): Promise<User> => {
  const { data } = await api.get("/users/me");
  return data;
};
