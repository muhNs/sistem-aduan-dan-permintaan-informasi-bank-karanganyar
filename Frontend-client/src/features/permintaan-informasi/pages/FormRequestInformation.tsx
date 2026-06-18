"use client";
import HeaderPermohonan from "../components/HeaderPermohonanForm";
import FormIdentitasPemohon from "../components/FormIdentitasNasabah";
import FormDetailPermohonan from "../components/FormDetailRequest";
import { usePermohonanForm } from "../hooks/usePermohonanForm";
import TemplatePDFPermohonan from "../components/TemplatePDFPermohonan";

export default function FormPermohonan() {
  // Panggil Custom Hook
  const { register, isGenerating, submitHandler, pdfRef, ticketCode, watch } =
    usePermohonanForm();

  // Memantau setiap ketikan nasabah secara real-time
  const liveFormData = watch();

  return (
    <>
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden mb-20 transition-all">
        {/* 1. Header Logo */}
        <HeaderPermohonan />

        <div className="p-8 md:p-12">
          <form onSubmit={submitHandler} className="space-y-10">
            {/* Target PDF: Bungkus bagian form yang ingin dirender ke PDF dengan ref */}
            <div ref={pdfRef} className="space-y-10 p-2">
              {/* 2. Form Identitas */}
              <FormIdentitasPemohon register={register} />

              {/* 3. Form Rincian */}
              <FormDetailPermohonan register={register} />
            </div>

            {/* 4. Tombol Submit */}
            <div className="pt-8 border-t border-gray-200">
              <button
                type="submit"
                disabled={isGenerating}
                className="w-full bg-blue-900 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:bg-blue-800 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isGenerating
                  ? "Menyimpan & Mengunduh Dokumen..."
                  : "Kirim & Download PDF Resmi"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* TEMPLATE PDF (Tersembunyi dari layar, tapi aktif di DOM) */}
      <div className="absolute top-0 left-[-9999px] z-[-1]">
        <TemplatePDFPermohonan ref={pdfRef} data={liveFormData} ticketCode={ticketCode}/>
      </div>
    </>
  );
}
