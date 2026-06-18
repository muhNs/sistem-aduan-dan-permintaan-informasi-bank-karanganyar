import type { UseFormRegister } from "react-hook-form";
import type { Nasabah } from "../types/permohonan.type";

interface Props {
  register: UseFormRegister<Nasabah>;
}

export default function FormIdentitasPemohon({ register }: Props) {
  return (
    <div className="space-y-6 bg-white">
      <h2 className="text-lg font-bold text-gray-900 border-l-4 border-blue-900 pl-4">
        Identitas Pemohon
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Nama Lengkap</label>
          <input
            {...register("name", { required: true })}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-900 focus:ring-0 outline-none transition-all bg-gray-50 text-gray-900"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Pekerjaan</label>
          <input
            {...register("job", { required: true })}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-900 focus:ring-0 outline-none transition-all bg-gray-50 text-gray-900"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Nomor Telepon</label>
          <input
            type="tel"
            {...register("phone", { required: true })}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-900 focus:ring-0 outline-none transition-all bg-gray-50 text-gray-900"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
          <input
            type="email"
            {...register("email")}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-900 focus:ring-0 outline-none transition-all bg-gray-50 text-gray-900"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Alamat Domisili</label>
          <textarea
            {...register("address", { required: true })}
            rows={2}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-900 focus:ring-0 outline-none transition-all resize-none bg-gray-50 text-gray-900"
          />
        </div>
      </div>
    </div>
  );
}