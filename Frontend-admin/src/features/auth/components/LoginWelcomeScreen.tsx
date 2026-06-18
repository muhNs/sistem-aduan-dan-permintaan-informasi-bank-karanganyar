import BankLogo from '../../../assets/bank-karanganyar-logo.png';

interface LoginWelcomeScreenProps {
  fadeOut: boolean;
}

export default function LoginWelcomeScreen({ fadeOut }: LoginWelcomeScreenProps) {
  return (
    <div
      className={`min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#020617] transition-all duration-700 ${
        fadeOut ? 'opacity-0 scale-105 blur-sm' : 'opacity-100 scale-100'
      }`}
    >
      <div className="text-center">
        {/* LOGO */}
        <div className="mb-8">
          <div className="w-36 h-36 mx-auto bg-white/90 rounded-full flex items-center justify-center shadow-[0_0_60px_rgba(240,165,0,0.4)]">
            <img src={BankLogo} alt="Bank Logo" className="w-24 object-contain" />
          </div>
        </div>

        {/* TEXT */}
        <h1 className="text-4xl font-semibold text-white mb-2 tracking-wide">
          Selamat Datang Admin
        </h1>
        <p className="text-[#f0a500] text-lg font-medium mb-1">Bank Karanganyar</p>
        <p className="text-gray-400 text-sm tracking-[0.25em] uppercase">Dashboard Admin</p>

        {/* LOADING */}
        <div className="mt-8 w-24 h-1 bg-gray-700 mx-auto rounded overflow-hidden">
          <div className="h-full bg-[#f0a500] animate-loadingBar"></div>
        </div>
      </div>

      <style>{`
        @keyframes loadingBar {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        .animate-loadingBar {
          animation: loadingBar 2.2s ease forwards;
        }
      `}</style>
    </div>
  );
}
