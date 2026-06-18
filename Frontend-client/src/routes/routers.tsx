import HomePage from "../pages/HomePage";
import FormKeberatan from "../features/aduan/pages/formAduan";
import FormPermohonan from "../features/permintaan-informasi/pages/FormRequestInformation";

type PageKey = "home" | "formulir" | "keberatan";

interface AppRoutesProps {
  currentPage: PageKey;
  onChangePage: (page: PageKey) => void;
}

export default function AppRoutes({
  currentPage,
  onChangePage,
}: AppRoutesProps) {
  return (
    <>
      {currentPage === "home" && <HomePage onChangePage={onChangePage} />}

      {currentPage === "formulir" && (
        <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-in fade-in duration-300">
          <button
            onClick={() => onChangePage("home")}
            className="mb-8 flex items-center text-[#100AAF] font-bold hover:text-blue-800 transition-all bg-white px-6 py-3 rounded-xl border border-gray-200 shadow-sm w-fit"
          >
            ← Kembali ke Menu Utama
          </button>
          <FormPermohonan />
        </div>
      )}

      {currentPage === "keberatan" && (
        <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-in fade-in duration-300">
          <button
            onClick={() => onChangePage("home")}
            className="mb-8 flex items-center text-red-700 font-bold hover:text-red-800 transition-all bg-white px-6 py-3 rounded-xl border border-gray-200 shadow-sm w-fit"
          >
            ← Kembali ke Menu Utama
          </button>
          <FormKeberatan />
        </div>
      )}
    </>
  );
}
