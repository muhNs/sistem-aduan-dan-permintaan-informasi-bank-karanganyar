"use client";
import { AlertCircle } from "lucide-react";
import { FileText } from "lucide-react";
import FormIdentitasAduan from "../components/FormIdentitasNasabah";
import FormDeskripsiAduan from "../components/FormDeskripsiAduan";
import FormLampiranAduan from "../components/FormAttachment";
import { useCreateAduan } from "../hooks/useCreateAduan";

export default function FormAduan() {
  const { 
    register, 
    files, 
    setFiles, 
    isSubmitting, 
    submitHandler, 
    pdfRef 
  } = useCreateAduan();

  return (
    <div className="min-h-screen bg-[#f8f9fa] py-10 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Kontainer Utama Form */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden mb-6">
          
          {/* HEADER MERAH */}
          <div className="bg-[#b91c1c] p-6 md:p-8 flex items-center gap-4 text-white">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center shrink-0">
              <AlertCircle size={24} className="text-white" />
            </div>
            <div>
              <h1 className="font-bold text-xl md:text-2xl uppercase tracking-wider">
                FORMULIR LAYANAN ADUAN
              </h1>
              <p className="text-red-100 text-sm mt-1">
                Sistem Penyampaian Keberatan & Pengaduan Nasabah
              </p>
            </div>
          </div>

          <form onSubmit={submitHandler}>
            {/* Area yang akan dicetak ke PDF (Jika diperlukan) */}
            <div ref={pdfRef}>
              <FormIdentitasAduan register={register} />
              <FormDeskripsiAduan register={register} />
            </div>
          </form>
        </div>

        {/* Lampiran dipisah agar tidak masuk ke cetakan PDF teks utama (opsional) */}
        <FormLampiranAduan files={files} setFiles={setFiles} />

        {/* Tombol Submit Besar */}
        <div className="mt-6 bg-white p-6 rounded-2xl shadow-xl border border-gray-200 text-center">
          <button
            onClick={submitHandler} // Memicu form submit dari luar tag <form>
            disabled={isSubmitting}
            className="w-full bg-[#b91c1c] text-white font-bold py-4 px-6 rounded-xl shadow-md hover:bg-red-800 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              "Memproses Aduan & Mengunggah Lampiran..."
            ) : (
              <>
                <FileText size={20} />
                Simpan Data & Cetak Formulir PDF
              </>
            )}
          </button>
          <p className="text-xs text-gray-500 mt-4">
            Pastikan data yang Anda isi sudah benar sebelum menyimpan dan mencetak formulir keberatan.
          </p>
        </div>

      </div>
    </div>
  );
}