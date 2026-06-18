import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";
import LoginForm from "../components/LoginForm";
import LoginWelcomeScreen from "../components/LoginWelcomeScreen";

export default function LoginView() {
  const navigate = useNavigate();
  const { login, isLoading, error, isAuthenticated, isInitialized } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const MIN_WELCOME_DURATION = 2200;
  const FADE_OUT_DURATION = 700;

  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Memuat sesi...
      </div>
    );
  }

  if (showWelcome) {
    return <LoginWelcomeScreen fadeOut={fadeOut} />;
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowWelcome(true);
    setFadeOut(false);

    const startTime = performance.now();

    try {
      await login({ email, password });
      const elapsed = performance.now() - startTime;
      const remaining = Math.max(0, MIN_WELCOME_DURATION - elapsed);

      setTimeout(() => setFadeOut(true), remaining);
      setTimeout(
        () => navigate("/", { replace: true }),
        remaining + FADE_OUT_DURATION,
      );
    } catch {
      setShowWelcome(false);
      setFadeOut(false);
    }
  };

  return (
    <LoginForm
      showPassword={showPassword}
      onTogglePassword={() => setShowPassword(!showPassword)}
      onSubmit={handleSubmit}
      email={email}
      password={password}
      onEmailChange={(value) => setEmail(value)}
      onPasswordChange={(value) => setPassword(value)}
      isLoading={isLoading}
      error={error}
    />
  );
}
