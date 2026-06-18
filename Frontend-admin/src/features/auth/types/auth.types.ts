export interface User {
  id: number;
  email: string;
  name: string;
  role: "ADMIN" | "CS";
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  message: string;
  data: {
    user: User;
  };
}


export interface LoginFormProps {
  showPassword: boolean;
  onTogglePassword: () => void;
  onSubmit: (e: React.FormEvent) => void;
  email: string;
  password: string;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  isLoading: boolean;
  error: string | null;
}