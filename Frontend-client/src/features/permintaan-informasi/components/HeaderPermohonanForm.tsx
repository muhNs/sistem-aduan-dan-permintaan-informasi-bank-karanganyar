import logoBank from "../../../assets/logo2.png"; // Sesuaikan path

export default function HeaderPermohonan() {
  return (
    <div className="bg-white p-8 border-b border-gray-200">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="p-2 border border-gray-100 rounded-lg shadow-sm">
          <img src={logoBank} alt="Logo BPR" className="w-32 md:w-40 object-contain" />
        </div>
        <div className="flex-1 text-center md:text-left">
          <h1 className="font-bold text-xl md:text-2xl uppercase tracking-tight text-gray-900">
            PT BPR BANK KARANGANYAR (PESERODA)
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Sistem Elektronik Permohonan Informasi Publik
          </p>
        </div>
      </div>
    </div>
  );
}