// import { Eye, Search } from "lucide-react";
// import {
//   STATUS_STYLE,
//   type PermintaanInformasi,
// } from "../types/information.types";

// interface PermintaanTableProps {
//   data: PermintaanInformasi[];
//   onSelectPermintaan: (item: PermintaanInformasi) => void;
// }

// export default function PermintaanTable({
//   data,
//   onSelectPermintaan,
// }: PermintaanTableProps) {
//   return (
//     <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
//       {/* TABLE HEAD */}
//       <div className="grid grid-cols-6 bg-gray-50 px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide border-b border-gray-100">
//         <div>Tanggal</div>
//         <div>Ticket ID</div>
//         <div>Nama</div>
//         <div>Email</div>
//         <div>Status</div>
//         <div>Aksi</div>
//       </div>

//       {/* ROWS */}
//       {data.length === 0 ? (
//         <div className="py-16 text-center text-gray-400">
//           <Search size={40} className="mx-auto mb-3 opacity-40" />
//           <p className="text-sm">Tidak ada data yang ditemukan</p>
//         </div>
//       ) : (
//         data.map((item) => (
//           <div
//             key={item.id}
//             className="grid grid-cols-6 px-6 py-4 border-t border-gray-50 text-sm items-center hover:bg-gray-50 transition-colors"
//           >
//             <div className="text-gray-500">{item.tanggal}</div>
//             <div className="font-semibold text-gray-800">{item.noTiket}</div>
//             <div className="text-gray-600">{item.nama}</div>
//             <div className="text-gray-600 truncate mr-2" title={item.email}>
//               {item.email}
//             </div>
//             <div>
//               <span
//                 className={`px-3 py-1 text-xs font-medium rounded-full ${STATUS_STYLE[item.status]}`}
//               >
//                 {item.status}
//               </span>
//             </div>
//             <div>
//               <button
//                 onClick={() => onSelectPermintaan(item)}
//                 className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-[#1a1c2d] text-white hover:bg-[#2a2d42] transition-colors"
//               >
//                 <Eye size={13} />
//                 Detail
//               </button>
//             </div>
//           </div>
//         ))
//       )}
//     </div>
//   );
// }

import { Loader2, Search, Eye } from 'lucide-react';
import type { InfoRequest, InfoRequestStatus } from '../types/information.types';

// Mapping warna status agar konsisten
const STATUS_MAPPING: Record<InfoRequestStatus, { label: string; color: string }> = {
  pending: { label: 'Menunggu', color: 'bg-yellow-100 text-yellow-700' },
  processed: { label: 'Diproses', color: 'bg-blue-100 text-blue-700' },
  completed: { label: 'Selesai', color: 'bg-green-100 text-green-700' },
  rejected: { label: 'Ditolak', color: 'bg-red-100 text-red-700' },
};

interface InfoTableProps {
  data: InfoRequest[];
  isLoading: boolean;
  onSelectRequest: (item: InfoRequest) => void;
}

export default function InfoTable({ data, isLoading, onSelectRequest }: InfoTableProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden min-w-[800px] overflow-x-auto">
      {/* TABLE HEAD */}
      <div className="grid grid-cols-6 bg-gray-50 px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide border-b border-gray-100">
        <div>Tanggal</div>
        <div>Ticket ID</div>
        <div>Nama Pemohon</div>
        <div>Tujuan</div>
        <div>Status</div>
        <div className="text-center">Aksi</div>
      </div>

      {/* LOADING STATE */}
      {isLoading ? (
        <div className="py-16 flex flex-col items-center text-gray-400">
          <Loader2 size={40} className="animate-spin mx-auto mb-3 text-blue-500" />
          <p className="text-sm">Memuat data permintaan informasi...</p>
        </div>
      ) : 
      
      /* EMPTY STATE */
      data.length === 0 ? (
        <div className="py-16 text-center text-gray-400">
          <Search size={40} className="mx-auto mb-3 opacity-40" />
          <p className="text-sm">Tidak ada data yang ditemukan</p>
        </div>
      ) : 
      
      /* DATA ROWS */
      (
        <div className="divide-y divide-gray-50">
          {data.map((item) => {
            const statusVisual = STATUS_MAPPING[item.status] || STATUS_MAPPING.pending;
            
            return (
              <div
                key={item.id}
                className="grid grid-cols-6 px-6 py-4 text-sm items-center hover:bg-gray-50 transition-colors"
              >
                <div className="text-gray-500">{formatDate(item.createdAt)}</div>
                <div className="font-semibold text-gray-800">{item.ticketCode}</div>
                <div className="text-gray-600 truncate pr-2" title={item.nasabah.name}>
                  {item.nasabah.name}
                </div>
                <div className="text-gray-600 truncate pr-2" title={item.purpose}>
                  {item.purpose}
                </div>
                <div>
                  <span className={`px-3 py-1 text-[11px] font-medium rounded-full border border-white/20 ${statusVisual.color}`}>
                    {statusVisual.label}
                  </span>
                </div>
                <div className="flex justify-center">
                  <button
                    onClick={() => onSelectRequest(item)}
                    className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-[#1a1c2d] text-white hover:bg-[#2a2d42] transition-colors shadow-sm"
                  >
                    <Eye size={13} /> Detail
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}