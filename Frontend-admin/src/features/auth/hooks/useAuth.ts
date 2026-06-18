import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginApi, logoutApi } from "../api/auth.api";
import { useAuthStore } from "../stores/authStore";
import type { LoginPayload } from "../types/auth.types";

export const useAuth = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isInitialized = useAuthStore((state) => state.isInitialized);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(
    async (payload: LoginPayload) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await loginApi(payload);
        setAuth(response.data.user);
      } catch (err: any) {
        const responseMessage = err?.response?.data?.message;
        let formattedMessage = "Terjadi kesalahan saat login";

        if (Array.isArray(responseMessage)) {
          const messages = responseMessage
            .filter((item: any) => item?.message)
            .map((item: any) => {
              const fieldName = item?.path?.[0] || "field";
              return `${fieldName}: ${item.message}`;
            });
          formattedMessage =
            messages.length > 0
              ? messages.join(", ")
              : "Terjadi kesalahan saat login";
        } else if (typeof responseMessage === "string") {
          formattedMessage = responseMessage;
        }

        setError(formattedMessage);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [navigate, setAuth],
  );

  const logout = useCallback(async () => {
    try {
      await logoutApi();
    } catch (err) {
      console.error("Logout API failed, forcing local clear");
    } finally {
      clearAuth();
      navigate("/auth/login", { replace: true });
    }
  }, [clearAuth, navigate]);

  return { login, logout, isLoading, error, isAuthenticated, isInitialized };
};
