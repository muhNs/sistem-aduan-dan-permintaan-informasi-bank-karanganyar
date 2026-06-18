// import { useState } from 'react';
// import { Pencil, Check, X } from 'lucide-react';
// import type { InfoRequestStatus, InfoRequest } from '../types/information.types.js';

// const STATUS_MAPPING: Record<InfoRequestStatus, { label: string; color: string }> = {
//   pending: { label: 'Menunggu', color: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
//   processed: { label: 'Diproses', color: 'bg-blue-100 text-blue-700 border-blue-200' },
//   completed: { label: 'Selesai', color: 'bg-green-100 text-green-700 border-green-200' },
//   rejected: { label: 'Ditolak', color: 'bg-red-100 text-red-700 border-red-200' },
// };

// interface InfoStatusCardProps {
//   item: InfoRequest;
//   onStatusChange: (newStatus: InfoRequestStatus) => Promise<boolean>;
// }

// export default function InfoStatusCard({ item, onStatusChange }: InfoStatusCardProps) {
//   const [isEditing, setIsEditing] = useState(false);
//   const [tempStatus, setTempStatus] = useState<InfoRequestStatus>(item.status);
//   const [isSaving, setIsSaving] = useState(false);

//   const handleSave = async () => {
//     setIsSaving(true);
//     const success = await onStatusChange(tempStatus);
//     if (success) setIsEditing(false);
//     setIsSaving(false);
//   };

//   const statusVisual = STATUS_MAPPING[item.status] || STATUS_MAPPING.pending;

//   return (
//     <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-5">
//       <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide border-b border-gray-50 pb-3">
//         Status & Tiket
//       </h2>
      
//       <div className="space-y-4">
//         <div>
//           <div className="flex items-center justify-between mb-2">
//             <p className="text-xs text-gray-400">Status Saat Ini</p>
//             {!isEditing && item.status !== 'completed' && item.status !== 'rejected' && (
//               <button
//                 onClick={() => setIsEditing(true)}
//                 className="inline-flex items-center gap-1 text-xs text-blue-500 hover:text-blue-700 transition-colors font-medium"
//               >
//                 <Pencil size={11} /> Ubah
//               </button>
//             )}
//           </div>

//           {isEditing ? (
//             <div className="space-y-2">
//               <select
//                 value={tempStatus}
//                 onChange={(e) => setTempStatus(e.target.value as InfoRequestStatus)}
//                 className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
//               >
//                 <option value="pending">Menunggu (Pending)</option>
//                 <option value="processed">Diproses (Processed)</option>
//                 <option value="completed">Selesai (Completed)</option>
//                 <option value="rejected">Ditolak (Rejected)</option>
//               </select>
//               <div className="flex gap-2">
//                 <button
//                   onClick={handleSave}
//                   disabled={isSaving}
//                   className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-blue-500 text-white text-xs font-semibold hover:bg-blue-600 transition-colors disabled:opacity-50"
//                 >
//                   <Check size={13} /> {isSaving ? 'Menyimpan...' : 'Simpan'}
//                 </button>
//                 <button
//                   onClick={() => setIsEditing(false)}
//                   disabled={isSaving}
//                   className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-gray-100 text-gray-600 text-xs font-semibold hover:bg-gray-200 transition-colors"
//                 >
//                   <X size={13} /> Batal
//                 </button>
//               </div>
//             </div>
//           ) : (
//             <span className={`px-3 py-1.5 text-sm font-semibold rounded-full border ${statusVisual.color}`}>
//               {statusVisual.label}
//             </span>
//           )}
//         </div>

//         <div>
//           <p className="text-xs text-gray-400 mb-1">Metode Pengiriman</p>
//           <p className="text-sm text-gray-700 font-medium capitalize">{item.deliveryMethod}</p>
//         </div>
//         <div>
//           <p className="text-xs text-gray-400 mb-1">Tujuan Penggunaan</p>
//           <p className="text-sm text-gray-700 font-medium">{item.purpose}</p>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from 'react';
import { Pencil, Check, X } from 'lucide-react';
import type { InfoRequestStatus, InfoRequest } from '../types/information.types.js';

const STATUS_MAPPING: Record<InfoRequestStatus, { label: string; color: string }> = {
  pending: { label: 'Menunggu', color: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
  processed: { label: 'Diproses', color: 'bg-blue-100 text-blue-700 border-blue-200' },
  completed: { label: 'Selesai', color: 'bg-green-100 text-green-700 border-green-200' },
  rejected: { label: 'Ditolak', color: 'bg-red-100 text-red-700 border-red-200' },
};

interface InfoStatusCardProps {
  item: InfoRequest;
  onStatusChange?: (newStatus: InfoRequestStatus) => void ;
}

export default function InfoStatusCard({
  item,
  onStatusChange,
}: InfoStatusCardProps ) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempStatus, setTempStatus] = useState<InfoRequestStatus>(item.status);

  useEffect(() => {
    setTempStatus(item.status);
  }, [item.status]);

  // Fungsi format tanggal (Contoh: "01 Apr 2026")
  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const handleEdit = () => {
    setTempStatus(item.status);
    setIsEditing(true);
  };

  const handleSave = () => {
    onStatusChange?.(tempStatus);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempStatus(item.status);
    setIsEditing(false);
  };

  return (
    <div className="space-y-5">
      {/* Status Aduan */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">
          Status
        </h2>
        <div className="space-y-3">
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-gray-400">Status</p>
              {onStatusChange && !isEditing && (
                <button
                  onClick={handleEdit}
                  className="inline-flex items-center gap-1 text-xs text-blue-500 hover:text-blue-700 transition-colors font-medium"
                >
                  <Pencil size={11} />
                  Edit Status
                </button>
              )}
            </div>

            {isEditing ? (
              <div className="space-y-2">
                <select
                  value={tempStatus}
                  onChange={(e) =>
                    setTempStatus(e.target.value as InfoRequestStatus)
                  }
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white"
                >
                <option value="pending">Menunggu (Pending)</option>
                <option value="processed">Diproses (Processed)</option>
                <option value="completed">Selesai (Completed)</option>
                <option value="rejected">Ditolak (Rejected)</option>
                </select>
                <div className="flex gap-2">
                  <button
                    onClick={handleSave}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-green-500 text-white text-xs font-semibold hover:bg-green-600 transition-colors"
                  >
                    <Check size={13} />
                    Simpan
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-gray-100 text-gray-600 text-xs font-semibold hover:bg-gray-200 transition-colors"
                  >
                    <X size={13} />
                    Batal
                  </button>
                </div>
              </div>
            ) : (
              <span
                className={`px-3 py-1.5 text-sm font-semibold rounded-full ${STATUS_MAPPING[item.status].color}`}
              >
                {STATUS_MAPPING[item.status].label}
              </span>
            )}
          </div>

          <div>
            <p className="text-xs text-gray-400 mb-1">Metode Memperoleh Informasi</p>
            <p className="text-sm text-gray-700 font-medium">{item.infoMethod}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-1">Tanggal Masuk</p>
            <p className="text-sm text-gray-700">
              {formatDate(item.createdAt)}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-1">No. Request Informasi</p>
            <p className="text-sm font-semibold text-gray-800">
              {item.ticketCode}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
