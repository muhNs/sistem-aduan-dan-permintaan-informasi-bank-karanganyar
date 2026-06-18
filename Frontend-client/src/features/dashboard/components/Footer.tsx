import React from "react";

// =========================================================
// IMPORT LOGO REGULATOR
// Pastikan Anda sudah menyiapkan gambar ojk.png, bi.png, dan lps.png
// di dalam folder src/assets/ Anda.
// =========================================================
import logoOjk from "../../../assets/ojk.png";
import logoBi from "../../../assets/bi.png";
import logoLps from "../../../assets/lps.png";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#123296] text-white mt-auto border-t-4 border-yellow-500">
      <div className="max-w-7xl mx-auto px-5 py-10 sm:px-6 lg:px-8 sm:py-12">
        {/* GRID UTAMA: Info Kontak & Regulasi */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12 mb-10">
          {/* KOLOM 1: Info Kontak */}
          {/* REVISI: Dibuat rata kiri (text-left) sepenuhnya agar formal */}
          <div className="text-left">
            <h3 className="font-extrabold text-base sm:text-lg mb-3 sm:mb-4 text-yellow-400 uppercase tracking-wide">
              PT BPR Bank Karanganyar (Perseroda)
            </h3>
            <div className="space-y-1.5 sm:space-y-2 text-[13px] sm:text-sm text-blue-100">
              <p>Jl. Lawu Timur No 135 Karanganyar</p>
              <p>Telp. (0271) 495489, (0271) 494666</p>
              <p>Email: info@bankkaranganyar.co.id</p>
            </div>
          </div>

          {/* KOLOM 2 & 3: Terdaftar dan Diawasi */}
          {/* REVISI: Rata kiri dan penyesuaian ukuran teks untuk mobile */}
          <div className="lg:col-span-2 text-left">
            <h3 className="font-bold text-sm sm:text-base mb-2 sm:mb-3 text-white uppercase tracking-wider">
              Terdaftar dan Diawasi Oleh
            </h3>
            <p className="text-[12px] sm:text-sm text-blue-100/90 leading-relaxed max-w-3xl mb-5">
              PT BPR Bank Karanganyar (Perseroda) berizin dan diawasi oleh
              Otoritas Jasa Keuangan (OJK) & Bank Indonesia (BI), serta
              merupakan bank peserta penjaminan Lembaga Penjaminan Simpanan
              (LPS).
            </p>

            {/* CONTAINER LOGO */}
            {/* REVISI: Gap diperkecil, padding logo dirapatkan agar muat berjejer rapi di HP */}
            <div className="flex flex-wrap items-center justify-start gap-3 sm:gap-5">
              {/* Logo OJK */}
              <div className="bg-white p-2 sm:p-2.5 rounded-lg shadow-sm flex items-center justify-center">
                <img
                  src={logoOjk}
                  alt="Logo Otoritas Jasa Keuangan"
                  className="h-7 sm:h-9 w-auto object-contain"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://placehold.co/100x35/ffffff/123296?text=OJK";
                  }}
                />
              </div>

              {/* Logo BI */}
              <div className="bg-white p-2 sm:p-2.5 rounded-lg shadow-sm flex items-center justify-center">
                <img
                  src={logoBi}
                  alt="Logo Bank Indonesia"
                  className="h-7 sm:h-9 w-auto object-contain"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://placehold.co/100x35/ffffff/123296?text=BI";
                  }}
                />
              </div>

              {/* Logo LPS */}
              <div className="bg-white p-2 sm:p-2.5 rounded-lg shadow-sm flex items-center justify-center">
                <img
                  src={logoLps}
                  alt="Logo Lembaga Penjaminan Simpanan"
                  className="h-7 sm:h-9 w-auto object-contain"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://placehold.co/100x35/ffffff/123296?text=LPS";
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* GARIS PEMISAH & HAK CIPTA */}
        {/* REVISI: Rata kiri di mobile, berjauhan di desktop */}
        <div className="border-t border-blue-800/80 pt-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
          <div className="text-[11px] sm:text-xs text-blue-300 text-left">
            <p>
              &copy; {new Date().getFullYear()} PT BPR Bank Karanganyar
              (Perseroda). All rights reserved.
            </p>
          </div>
          <div className="text-[11px] sm:text-xs text-blue-300 text-left">
            <p>Sistem Layanan E-Formulir Digital.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
