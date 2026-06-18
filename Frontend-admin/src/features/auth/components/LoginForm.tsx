import { Mail, Lock, Eye, EyeOff, LogIn } from "lucide-react";
import BankLogo from "../../../assets/bank-karanganyar-logo.png";
import type { LoginFormProps } from "../types/auth.types";

export default function LoginForm({
  showPassword,
  email,
  password,
  isLoading,
  error,
  onTogglePassword,
  onSubmit,
  onEmailChange,
  onPasswordChange,
}: LoginFormProps) {
  return (
    <div className="min-h-screen bg-gray-200 flex flex-col justify-center items-center p-4 font-sans">
      <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl overflow-hidden transform transition-all border border-white/20">
        {/* Header Form */}
        <div className="bg-gradient-to-b from-gray-50 to-white p-10 text-center border-b border-gray-100">
          <img
            src={BankLogo}
            alt="Bank Karanganyar Logo"
            className="h-36 mx-auto mb-6 object-contain"
          />

          <div className="relative flex py-2 items-center justify-center">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="flex-shrink mx-4 text-xs uppercase tracking-[0.4em] font-light text-[#1a1c2d]">
              Admin <span className="font-bold">Portal</span>
            </span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          <p className="text-gray-400 text-[10px] mt-2 tracking-widest uppercase">
            Sistem Informasi &amp; Pengaduan Nasabah
          </p>
        </div>

        {/* Form Body */}
        <div className="p-10">
          <form onSubmit={onSubmit} className="space-y-6">
            <div className="group">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1">
                Email / Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-[#f0a500] transition-colors" />
                </div>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => onEmailChange(e.target.value)}
                  required
                  className="block w-full pl-12 pr-4 py-4 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#f0a500] focus:border-transparent outline-none transition-all text-sm bg-gray-50 focus:bg-white shadow-sm"
                  placeholder="admin@bankkaranganyar.co.id"
                />
              </div>
            </div>

            <div className="group">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-[#f0a500] transition-colors" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => onPasswordChange(e.target.value)}
                  required
                  className="block w-full pl-12 pr-12 py-4 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#f0a500] focus:border-transparent outline-none transition-all text-sm bg-gray-50 focus:bg-white shadow-sm"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={onTogglePassword}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-[#1a1c2d] transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center ml-1">
              <label className="flex items-center text-sm text-gray-500 cursor-pointer hover:text-gray-700 transition-colors">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-300 text-[#f0a500] focus:ring-[#f0a500] cursor-pointer"
                />
                <span className="ml-2">Ingat perangkat ini</span>
              </label>
            </div>

            {error && (
              <div className="rounded-2xl bg-red-50 text-red-700 px-4 py-3 text-sm font-medium">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center items-center gap-3 ${isLoading ? "bg-gray-300 text-gray-600 cursor-not-allowed" : "bg-[#f0a500] hover:bg-[#d49200] text-[#1a1c2d]"} font-bold py-4 px-4 rounded-2xl transition-all shadow-lg shadow-yellow-500/20 hover:shadow-yellow-500/40 active:scale-[0.98] uppercase tracking-widest text-xs`}
            >
              <LogIn className="h-5 w-5" />
              Masuk Sekarang
            </button>
          </form>
        </div>
      </div>

      <div className="text-center mt-10">
        <p className="text-gray-500 text-[10px] tracking-[0.2em] uppercase opacity-60">
          &copy; 2026 PUD BPR Bank Karanganyar
        </p>
        <div className="h-1 w-8 bg-[#f0a500] mx-auto mt-2 rounded-full"></div>
      </div>
    </div>
  );
}
