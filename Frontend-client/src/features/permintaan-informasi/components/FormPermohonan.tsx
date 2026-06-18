"use client";
import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import logoBank from "../../../assets/logo2.png";

export interface FormDataPermohonan {
  nama: string;
  alamat: string;
  pekerjaan: string;
  kontak: string;
  email: string;
  rincian: string;
  tujuan: string;
}

const FormPermohonan: React.FC = () => {
  const { register, handleSubmit } = useForm<FormDataPermohonan>({});
  const [isGenerating, setIsGenerating] = useState(false);
  const pdfRef = useRef<HTMLDivElement>(null);

  const onSubmit = async (data: FormDataPermohonan) => {
    setIsGenerating(true);

    setTimeout(async () => {
      try {
        if (pdfRef.current) {
          const canvas = await html2canvas(pdfRef.current, {
            scale: 2,
            useCORS: true,
            backgroundColor: "#ffffff",
          });

          const imgData = canvas.toDataURL("image/jpeg", 0.8);
          const pdf = new jsPDF("p", "mm", "a4");

          const pdfW = 210;
          const pdfH = 297;
          const imgProps = pdf.getImageProperties(imgData);
          const totalImgHeight = (imgProps.height * pdfW) / imgProps.width;

          let heightLeft = totalImgHeight;
          let position = 0;

          pdf.addImage(imgData, "JPEG", 0, position, pdfW, totalImgHeight);
          heightLeft -= pdfH;

          while (heightLeft > 0.1) {
            position -= pdfH;
            pdf.addPage();
            pdf.addImage(imgData, "JPEG", 0, position, pdfW, totalImgHeight);
            heightLeft -= pdfH;
          }

          const safeName = data.nama
            ? data.nama.replace(/\s+/g, "_")
            : "Pemohon";
          pdf.save(`Permohonan_Informasi_${safeName}.pdf`);
        }
      } catch (e) {
        console.error("Error Generate PDF:", e);
      } finally {
        setIsGenerating(false);
      }
    }, 800);
  };

  return (
    <>
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden mb-20 transition-all">
        <div className="bg-white p-8 border-b border-gray-200">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="p-2 border border-gray-100 rounded-lg shadow-sm">
              <img
                src={logoBank}
                alt="Logo"
                className="w-32 md:w-40 object-contain"
              />
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

        <div className="p-8 md:p-12">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-gray-900 border-l-4 border-blue-900 pl-4">
                Identitas Pemohon
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nama Lengkap
                  </label>
                  <input
                    {...register("nama", { required: "Nama harus diisi" })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-900 focus:ring-0 outline-none transition-all bg-gray-50 text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Pekerjaan
                  </label>
                  <input
                    {...register("pekerjaan", { required: "Wajib diisi" })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-900 focus:ring-0 outline-none transition-all bg-gray-50 text-gray-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nomor Telepon
                  </label>
                  <input
                    type="tel"
                    {...register("kontak", { required: "Wajib diisi" })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-900 focus:ring-0 outline-none transition-all bg-gray-50 text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    {...register("email", { required: "Wajib diisi" })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-900 focus:ring-0 outline-none transition-all bg-gray-50 text-gray-900"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Alamat Domisili
                  </label>
                  <textarea
                    {...register("alamat", { required: "Wajib diisi" })}
                    rows={2}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-900 focus:ring-0 outline-none transition-all resize-none bg-gray-50 text-gray-900"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-6 bg-white p-8 rounded-3xl border-2 border-gray-100 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900">
                Detail Permohonan
              </h2>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Rincian Informasi yang Dibutuhkan
                </label>
                <textarea
                  {...register("rincian", { required: "Mohon isi rincian" })}
                  rows={4}
                  className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:border-gray-900 outline-none bg-gray-50 text-gray-900 resize-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tujuan Penggunaan Informasi
                </label>
                <select
                  {...register("tujuan", { required: "Pilih tujuan penggunaan informasi" })}
                  className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:border-gray-900 outline-none bg-gray-50 text-gray-900 cursor-pointer appearance-none"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                    backgroundPosition: `right 1rem center`,
                    backgroundRepeat: `no-repeat`,
                    backgroundSize: `1.5em 1.5em`,
                  }}
                >
                  <option value="">-- Pilih Tujuan --</option>
                  <option value="Penelitian / Akademis">Penelitian / Akademis</option>
                  <option value="Kepentingan Pribadi">Kepentingan Pribadi</option>
                  <option value="Kepentingan Bisnis / Komersial">Kepentingan Bisnis / Komersial</option>
                  <option value="Jurnalistik / Publikasi Media">Jurnalistik / Publikasi Media</option>
                  <option value="Pengawasan Publik / LSM">Pengawasan Publik / LSM</option>
                  <option value="Pembuatan Kebijakan">Pembuatan Kebijakan</option>
                  <option value="Lainnya">Lainnya</option>
                </select>
              </div>
            </div>

            <div className="pt-8 border-t border-gray-200">
              <button
                type="submit"
                disabled={isGenerating}
                className="w-full bg-blue-900 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:bg-blue-800 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isGenerating
                  ? "Memproses Dokumen..."
                  : "Generate & Download PDF Resmi"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default FormPermohonan;