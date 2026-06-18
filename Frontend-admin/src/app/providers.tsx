import { useEffect } from "react";
import type { ReactNode } from "react";
import { useAuthStore } from "../features/auth/stores/authStore";
import { getProfileApi } from "../features/auth/api/auth.api";

interface ProvidersProps {
  children: ReactNode;
}

function AuthInitializer() {
  const setAuth = useAuthStore((state) => state.setAuth);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const setInitialized = useAuthStore((state) => state.setInitialized);

  useEffect(() => {
    let active = true;

    const restoreSession = async () => {
      try {
        const user = await getProfileApi();
        if (!active) return;
        setAuth(user);
      } catch {
        try {
          // coba lagi setelah interceptor refresh
          const user = await getProfileApi();
          setAuth(user);
        } catch {
          clearAuth();
        }
      } finally {
        if (active) {
          setInitialized(true);
        }
      }
    };

    restoreSession();

    return () => {
      active = false;
    };
  }, [clearAuth, setAuth, setInitialized]);

  return null;
}

const Providers = ({ children }: ProvidersProps) => {
  return (
    <>
      <AuthInitializer />
      {children}
    </>
  );
};

export default Providers;
