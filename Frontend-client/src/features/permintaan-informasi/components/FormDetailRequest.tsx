import type { UseFormRegister } from "react-hook-form";
import type { FormDataPermohonan } from "../types/permohonan.type";

interface Props {
  register: UseFormRegister<FormDataPermohonan>;
}

export default function FormDetailPermohonan({ register }: Props) {
  return (
    <div className="space-y-5 bg-white">
      <h2 className="text-lg font-bold text-gray-900">Detail Permohonan</h2>
      
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Rincian Informasi yang Dibutuhkan
        </label>
        <textarea
          {...register("infoDetail", { required: true })}
          rows={4}
          className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:border-gray-900 outline-none bg-gray-50 text-gray-900 resize-none"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Tujuan Penggunaan Informasi
        </label>
        <select
          {...register("purpose", { required: true })}
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
  );
}