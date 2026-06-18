import type { UseFormRegister } from "react-hook-form";
import type { FormCreateAduan } from "../types/aduan.types";

interface Props {
  register: UseFormRegister<FormCreateAduan>;
}

export default function FormIdentitasAduan({ register }: Props) {
  return (
    <div className="space-y-6 bg-white p-8 md:p-10 border-b border-gray-100">
      <h2 className="text-lg font-bold text-gray-900 border-l-4 border-red-700 pl-4">
        Identitas Pemohon
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Nama Lengkap <span className="text-red-500">*</span>
          </label>
          <input
            {...register("name", { required: true })}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-700 focus:ring-0 outline-none transition-all bg-gray-50 text-gray-900"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Pekerjaan <span className="text-red-500">*</span>
          </label>
          <input
            {...register("job", { required: true })}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-700 focus:ring-0 outline-none transition-all bg-gray-50 text-gray-900"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Nomor Telepon <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            {...register("phone", { required: true })}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-700 focus:ring-0 outline-none transition-all bg-gray-50 text-gray-900"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-700 focus:ring-0 outline-none transition-all bg-gray-50 text-gray-900"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Alamat Domisili <span className="text-red-500">*</span>
          </label>
          <textarea
            {...register("address", { required: true })}
            rows={2}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-700 focus:ring-0 outline-none transition-all resize-none bg-gray-50 text-gray-900"
          />
        </div>
      </div>
    </div>
  );
}