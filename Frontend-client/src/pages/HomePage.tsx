import {
  FileText,
  AlertCircle,
  Download,
  Edit3,
  CheckCircle,
  ChevronDown,
  MapPin,
  Phone,
  Mail,
  Monitor,
  Database,
  Printer,
  MessageSquare
} from "lucide-react";
import imgHeroPerson from "../assets/person.png";

type PageKey = "home" | "formulir" | "keberatan";

interface HomePageProps {
  onChangePage: (page: PageKey) => void;
}

export default function HomePage({ onChangePage }: HomePageProps) {
  return (
    <>
      <section className="relative w-full h-auto md:h-[75vh] md:min-h-[550px] flex flex-col md:flex-row items-center overflow-hidden bg-[#F4F8FB]">
        <img
          src={imgHeroPerson}
          alt="Latar Belakang Hero"
          className="hidden md:block absolute inset-0 w-full h-full object-cover object-center z-0"
        />

        <div className="w-full md:hidden relative h-[260px] overflow-hidden shadow-sm">
          <img
            src={imgHeroPerson}
            alt="Ilustrasi Layanan Mobile"
            className="absolute inset-0 w-full h-full object-cover object-right scale-105"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-8 pb-16 md:py-0">
          <div className="max-w-xl text-center md:text-left mx-auto md:mx-0">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-blue-950 mb-3 md:mb-4 leading-tight">
              LAYANAN FORMULIR
              <br />
              <span className="text-yellow-500 drop-shadow-sm">
                DIGITAL TERPADU.
              </span>
            </h1>
            <p className="text-sm md:text-lg text-slate-700 font-medium leading-relaxed mb-8 md:mb-10 px-1 md:px-0">
              Sistem elektronik resmi PT BPR Bank Karanganyar (Perseroda) untuk
              kemudahan akses informasi dan pengajuan dokumen nasabah.
            </p>
            <button
              onClick={() => onChangePage("formulir")}
              className="w-full md:w-auto px-6 py-3.5 md:py-4 bg-blue-900 text-white font-bold rounded-xl hover:bg-blue-800 hover:-translate-y-1 transition-all duration-300 shadow-xl shadow-blue-900/20"
            >
              Ajukan Permohonan Sekarang →
            </button>
          </div>
        </div>
      </section>

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative z-20">
        <div className="grid grid-cols-2 gap-4 sm:gap-10 max-w-5xl mx-auto">
          <div
            onClick={() => onChangePage("formulir")}
            className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-gray-100 hover:shadow-2xl hover:border-blue-900 hover:-translate-y-2 transition-all duration-300 group flex flex-col items-center text-center cursor-pointer"
          >
            <div className="w-16 h-16 sm:w-24 sm:h-24 bg-blue-50 rounded-2xl flex items-center justify-center mb-4 sm:mb-8 group-hover:bg-blue-900 transition-colors">
              <FileText className="w-8 h-8 sm:w-12 sm:h-12 text-blue-900 group-hover:text-white" />
            </div>
            <h3 className="text-[14px] sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-4">
              Permohonan Informasi
            </h3>
            <p className="text-gray-500 text-[11px] sm:text-base leading-relaxed">
              Ajukan permintaan data atau informasi resmi dari Bank Karanganyar
              secara cepat dan transparan.
            </p>
          </div>
          <div
            onClick={() => onChangePage("keberatan")}
            className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-gray-100 hover:shadow-2xl hover:border-red-600 hover:-translate-y-2 transition-all duration-300 group flex flex-col items-center text-center cursor-pointer"
          >
            <div className="w-16 h-16 sm:w-24 sm:h-24 bg-red-50 rounded-2xl flex items-center justify-center mb-4 sm:mb-8 group-hover:bg-red-600 transition-colors">
              <AlertCircle className="w-8 h-8 sm:w-12 sm:h-12 text-red-600 group-hover:text-white" />
            </div>
            <h3 className="text-[14px] sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-4">
              Pengajuan Aduan
            </h3>
            <p className="text-gray-500 text-[11px] sm:text-base leading-relaxed">
              Sampaikan keberatan atau keluhan atas permohonan informasi yang
              tidak terpenuhi atau tidak sesuai.
            </p>
          </div>
        </div>

        <div id="about" className="mt-32 max-w-5xl mx-auto scroll-mt-28">
          <div className="text-center mb-10 sm:mb-16">
            <h3 className="text-xl sm:text-4xl font-bold text-gray-900 mb-2 sm:mb-4 px-2 sm:px-0">
              Panduan Penggunaan Sistem
            </h3>
            <p className="text-gray-500 text-sm sm:text-lg px-4 sm:px-0">
              Empat langkah mudah dalam menggunakan layanan digital kami
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:gap-8">
            {/* Tahap 1 */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-gray-200 shadow-sm hover:shadow-xl hover:border-blue-300 hover:-translate-y-1 transition-all duration-300 group">
              <div className="flex items-start gap-2 sm:gap-4 mb-2 sm:mb-4">
                <div className="w-8 h-8 sm:w-12 sm:h-12 bg-white border border-gray-100 rounded-lg sm:rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-110 transition-transform">
                  <Monitor className="w-4 h-4 sm:w-6 sm:h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-xs sm:text-xl leading-tight">Tahap 1</h4>
                  <p className="text-[8px] sm:text-xs font-bold text-gray-400 tracking-widest uppercase mt-0.5 sm:mt-1">Pengisian Data</p>
                </div>
              </div>
              <p className="text-gray-500 text-[9px] sm:text-base leading-relaxed sm:leading-relaxed">
                Nasabah mengakses web, memilih layanan (Permohonan/Aduan), dan mengisi data serta kontak (nomor WA & Email) berikut lampiran jika ada.
              </p>
            </div>

            {/* Tahap 2 */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-gray-200 shadow-sm hover:shadow-xl hover:border-blue-300 hover:-translate-y-1 transition-all duration-300 group">
              <div className="flex items-start gap-2 sm:gap-4 mb-2 sm:mb-4">
                <div className="w-8 h-8 sm:w-12 sm:h-12 bg-white border border-gray-100 rounded-lg sm:rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-110 transition-transform">
                  <Database className="w-4 h-4 sm:w-6 sm:h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-xs sm:text-xl leading-tight">Tahap 2</h4>
                  <p className="text-[8px] sm:text-xs font-bold text-gray-400 tracking-widest uppercase mt-0.5 sm:mt-1">Simpan & Ekspor</p>
                </div>
              </div>
              <p className="text-gray-500 text-[9px] sm:text-base leading-relaxed sm:leading-relaxed">
                Data disimpan ke sistem bank (database) dan secara bersamaan di-ekspor otomatis menjadi dokumen PDF siap cetak dengan kop surat bank.
              </p>
            </div>

            {/* Tahap 3 */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-gray-200 shadow-sm hover:shadow-xl hover:border-blue-300 hover:-translate-y-1 transition-all duration-300 group">
              <div className="flex items-start gap-2 sm:gap-4 mb-2 sm:mb-4">
                <div className="w-8 h-8 sm:w-12 sm:h-12 bg-white border border-gray-100 rounded-lg sm:rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-110 transition-transform">
                  <Printer className="w-4 h-4 sm:w-6 sm:h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-xs sm:text-xl leading-tight">Tahap 3</h4>
                  <p className="text-[8px] sm:text-xs font-bold text-gray-400 tracking-widest uppercase mt-0.5 sm:mt-1">Penyerahan Fisik</p>
                </div>
              </div>
              <p className="text-gray-500 text-[9px] sm:text-base leading-relaxed sm:leading-relaxed">
                Nasabah mencetak dokumen PDF dan menyerahkan versi fisiknya ke petugas bank.
              </p>
            </div>

            {/* Tahap 4 */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-gray-200 shadow-sm hover:shadow-xl hover:border-blue-300 hover:-translate-y-1 transition-all duration-300 group">
              <div className="flex items-start gap-2 sm:gap-4 mb-2 sm:mb-4">
                <div className="w-8 h-8 sm:w-12 sm:h-12 bg-white border border-gray-100 rounded-lg sm:rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-110 transition-transform">
                  <MessageSquare className="w-4 h-4 sm:w-6 sm:h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-xs sm:text-xl leading-tight">Tahap 4 (Backend)</h4>
                  <p className="text-[8px] sm:text-xs font-bold text-gray-400 tracking-widest uppercase mt-0.5 sm:mt-1">Proses & Notifikasi</p>
                </div>
              </div>
              <p className="text-gray-500 text-[9px] sm:text-base leading-relaxed sm:leading-relaxed">
                Pihak bank melakukan pengecekan data sistem dan fisik. Setelah diproses (maksimal 10 hari), balasan hasil akhir akan dikirim kembali ke nasabah melalui <strong>pesan WhatsApp</strong> dan <strong>Email</strong> tanpa harus datang lagi.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-20 sm:mt-40 max-w-4xl mx-auto mb-16 sm:mb-20">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-4xl font-bold text-gray-900">
              FAQ
            </h2>
            <p className="text-gray-500 mt-2 sm:mt-4 text-sm sm:text-lg px-4 sm:px-0">
              Pertanyaan yang sering diajukan terkait layanan kami.
            </p>
          </div>
          <div className="space-y-6">
            <details className="group bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all">
              <summary className="flex justify-between items-center font-bold cursor-pointer list-none p-4 sm:p-8 text-gray-900 [&::-webkit-details-marker]:hidden">
                <span className="text-sm sm:text-lg pr-4 sm:pr-0">
                  Hal-hal dasar apa yang perlu diketahui?
                </span>
                <span className="transition-transform duration-300 group-open:-rotate-180">
                  <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-blue-900 flex-shrink-0" />
                </span>
              </summary>
              <div className="text-gray-600 px-4 sm:px-8 pb-4 sm:pb-8 text-xs sm:text-base leading-relaxed border-t border-gray-50 pt-4 sm:pt-6 mt-1 sm:mt-2">
                Layanan E-Formulir ini memungkinkan Anda untuk mengajukan
                permohonan informasi dan pengajuan keberatan secara digital.
                Anda cukup mengisi formulir pada sistem, mengunduh hasilnya
                dalam bentuk PDF, mencetaknya, dan menyerahkannya ke kantor
                kami.
              </div>
            </details>
            <details className="group bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all">
              <summary className="flex justify-between items-center font-bold cursor-pointer list-none p-4 sm:p-8 text-gray-900 [&::-webkit-details-marker]:hidden">
                <span className="text-sm sm:text-lg pr-4 sm:pr-0">
                  Berapa lama proses penyelesaian aduan?
                </span>
                <span className="transition-transform duration-300 group-open:-rotate-180">
                  <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-blue-900 flex-shrink-0" />
                </span>
              </summary>
              <div className="text-gray-600 px-4 sm:px-8 pb-4 sm:pb-8 text-xs sm:text-base leading-relaxed border-t border-gray-50 pt-4 sm:pt-6 mt-1 sm:mt-2">
                Proses penyelesaian atau tindak lanjut permohonan informasi
                maupun aduan standar biasanya memakan waktu maksimal 10 hari
                kerja sejak dokumen fisik dan persyaratan Anda diterima dengan
                lengkap oleh petugas kami di kantor.
              </div>
            </details>
            <details className="group bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all">
              <summary className="flex justify-between items-center font-bold cursor-pointer list-none p-4 sm:p-8 text-gray-900 [&::-webkit-details-marker]:hidden">
                <span className="text-sm sm:text-lg pr-4 sm:pr-0">
                  Apakah saya perlu login untuk membuat tiket?
                </span>
                <span className="transition-transform duration-300 group-open:-rotate-180">
                  <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-blue-900 flex-shrink-0" />
                </span>
              </summary>
              <div className="text-gray-600 px-4 sm:px-8 pb-4 sm:pb-8 text-xs sm:text-base leading-relaxed border-t border-gray-50 pt-4 sm:pt-6 mt-1 sm:mt-2">
                Tidak. Anda tidak perlu membuat akun atau melakukan login.
                Sistem ini dirancang untuk kemudahan publik. Anda dapat langsung
                memilih layanan, mengisi formulir yang tersedia, dan mengunduh
                hasilnya secara langsung tanpa hambatan.
              </div>
            </details>
          </div>
        </div>
      </main>

      <section
        id="contact"
        className="w-full bg-blue-950 pt-12 pb-20 sm:py-28 px-4 sm:px-6 lg:px-8 mt-10 scroll-mt-16 sm:scroll-mt-20 border-t-4 border-yellow-500"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-20">
            <h2 className="text-3xl sm:text-5xl font-bold text-white mb-3 sm:mb-6">
              Hubungi Kami
            </h2>
            <p className="text-blue-200 text-base sm:text-lg max-w-2xl mx-auto px-2 sm:px-0">
              Kunjungi kantor operasional kami atau hubungi layanan pelanggan
              untuk mendapatkan bantuan lebih lanjut terkait pengajuan Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="space-y-8 sm:space-y-10 flex flex-col justify-center order-2 lg:order-1">
              <div className="flex items-start gap-5 sm:gap-6 group">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white/10 group-hover:bg-yellow-500 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all border border-white/20">
                  <MapPin className="w-7 h-7 sm:w-8 sm:h-8 text-white group-hover:text-blue-950 transition-colors" />
                </div>
                <div>
                  <h4 className="text-blue-300 font-bold mb-1 sm:mb-2 text-[13px] sm:text-sm uppercase tracking-widest">
                    Address
                  </h4>
                  <p className="text-white font-semibold text-lg sm:text-xl leading-relaxed">
                    Jl. Lawu Timur No 135
                    <br />
                    Karanganyar, Jawa Tengah
                    <br />
                    57712
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-5 sm:gap-6 group">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white/10 group-hover:bg-yellow-500 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all border border-white/20">
                  <Phone className="w-7 h-7 sm:w-8 sm:h-8 text-white group-hover:text-blue-950 transition-colors" />
                </div>
                <div>
                  <h4 className="text-blue-300 font-bold mb-1 sm:mb-2 text-[13px] sm:text-sm uppercase tracking-widest">
                    Phone
                  </h4>
                  <p className="text-white font-semibold text-lg sm:text-xl">
                    (0271) 495489
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-5 sm:gap-6 group">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white/10 group-hover:bg-yellow-500 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all border border-white/20">
                  <Mail className="w-7 h-7 sm:w-8 sm:h-8 text-white group-hover:text-blue-950 transition-colors" />
                </div>
                <div>
                  <h4 className="text-blue-300 font-bold mb-1 sm:mb-2 text-[13px] sm:text-sm uppercase tracking-widest">
                    Email
                  </h4>
                  <p className="text-white font-semibold text-lg sm:text-xl break-all">
                    info@bankkaranganyar.co.id
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full h-[300px] sm:h-[450px] bg-white p-2 sm:p-3 rounded-3xl shadow-2xl order-1 lg:order-2 transform hover:scale-[1.01] transition-all">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d31638.73535936511!2d110.9543149!3d-7.5921784!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a189d83abdfc7%3A0xb82ba8b6cb56b0d!2sPT%20BPR%20BANK%20Karanganyar%20(Perseroda)!5e0!3m2!1sid!2sid!4v1776045658886!5m2!1sid!2sid"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-2xl shadow-inner w-full h-full"
                title="Lokasi PT BPR Bank Karanganyar"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
