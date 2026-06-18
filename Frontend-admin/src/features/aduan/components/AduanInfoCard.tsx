import { User, Mail, Phone, MapPin } from 'lucide-react';
import type { Aduan } from '../types/aduan.types';

interface AduanInfoCardProps {
  item: Aduan;
}

export default function AduanInfoCard({ item }: AduanInfoCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-sm font-semibold text-gray-700 mb-5 uppercase tracking-wide">
        Informasi Nasabah
      </h2>
      <div className="space-y-5">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center shrink-0">
            <User size={18} className="text-gray-500" />
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-0.5">Nama Nasabah</p>
            <p className="text-base font-semibold text-gray-800">{item?.nasabah?.name}</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center shrink-0">
            <Mail size={18} className="text-gray-500" />
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-0.5">Email</p>
            <p className="text-base text-gray-700">{item?.nasabah?.email}</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center shrink-0">
            <Phone size={18} className="text-gray-500" />
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-0.5">No. WhatsApp</p>
            <p className="text-base text-gray-700">+{item?.nasabah?.phone}</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center shrink-0">
            <MapPin size={18} className="text-gray-500" />
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-0.5">Alamat</p>
            <p className="text-base text-gray-700">{item?.nasabah?.address}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
