import type { UseFormRegister } from "react-hook-form";
import { FileText } from "lucide-react";
import type { FormCreateAduan } from "../types/aduan.types";

interface Props {
  register: UseFormRegister<FormCreateAduan>;
}

export default function FormDeskripsiAduan({ register }: Props) {
  return (
    <div className="bg-white p-8 md:p-10">
      <h3 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-3 mb-6 flex items-center gap-2">
        <FileText className="w-5 h-5 text-red-700" /> Deskripsi Aduan
      </h3>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Kategori Aduan / Keberatan <span className="text-red-500">*</span>
          </label>
          <select
            {...register("category", { required: true })}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-700 focus:ring-0 outline-none transition-all bg-gray-50 text-gray-900"
          >
            <option value="">-- Pilih Kategori --</option>
            <option value="TRANSAKSI">Transaksi (Transfer, Tarik Tunai, dll)</option>
            <option value="TABUNGAN">Tabungan / Deposito</option>
            <option value="AKUN_DAN_KARTU">Akun dan Kartu ATM</option>
            <option value="APLIKASI_ERROR">Kendala Aplikasi / Sistem Error</option>
            <option value="PELAYANAN_CABANG">Pelayanan Kantor Cabang</option>
            <option value="INFO_DAN_PROMO">Informasi dan Promo</option>
            <option value="LAINNYA">Lainnya</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Detail Kronologi / Alasan Keberatan <span className="text-red-500">*</span>
          </label>
          <textarea
            {...register("description", { required: true, minLength: 10 })}
            rows={5}
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-red-700 outline-none resize-none bg-gray-50 text-gray-900"
            placeholder="Tuliskan kronologi kejadian atau alasan detail keberatan Anda di sini (Minimal 10 Karakter)..."
          ></textarea>
        </div>
      </div>
    </div>
  );
}