// import { ChevronLeft, ChevronRight } from 'lucide-react';

// interface PermintaanPaginationProps {
//   currentPage: number;
//   totalPages: number;
//   totalData: number;
//   pageSize: number;
//   onPageChange: (page: number) => void;
// }

// export default function PermintaanPagination({
//   currentPage,
//   totalPages,
//   totalData,
//   pageSize,
//   onPageChange,
// }: PermintaanPaginationProps) {
//   return (
//     <div className="flex justify-between items-center mt-5">
//       <p className="text-sm text-gray-500">
//         Menampilkan {totalData === 0 ? 0 : (currentPage - 1) * pageSize + 1}–
//         {Math.min(currentPage * pageSize, totalData)} dari {totalData} data
//       </p>

//       <div className="flex items-center gap-1.5">
//         <button
//           onClick={() => onPageChange(Math.max(1, currentPage - 1))}
//           disabled={currentPage === 1}
//           className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed transition"
//         >
//           <ChevronLeft size={16} />
//         </button>

//         {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
//           <button
//             key={n}
//             onClick={() => onPageChange(n)}
//             className={`w-8 h-8 rounded-lg text-sm font-medium transition ${
//               n === currentPage
//                 ? 'bg-yellow-400 text-black shadow-sm'
//                 : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
//             }`}
//           >
//             {n}
//           </button>
//         ))}

//         <button
//           onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
//           disabled={currentPage === totalPages || totalPages === 0}
//           className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed transition"
//         >
//           <ChevronRight size={16} />
//         </button>
//       </div>
//     </div>
//   );
// }

import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { InfoPaginationMeta } from '../types/information.types';

interface InfoPaginationProps {
  meta: InfoPaginationMeta;
  onPageChange: (page: number) => void;
}

export default function InfoPagination({ meta, onPageChange }: InfoPaginationProps) {
  if (meta.total === 0) return null; // Sembunyikan jika tidak ada data

  const startItem = (meta.page - 1) * meta.limit + 1;
  const endItem = Math.min(meta.page * meta.limit, meta.total);

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mt-5 gap-4">
      <p className="text-sm text-gray-500">
        Menampilkan <span className="font-medium text-gray-700">{startItem}–{endItem}</span> dari <span className="font-medium text-gray-700">{meta.total}</span> data
      </p>

      <div className="flex items-center gap-1.5">
        <button
          onClick={() => onPageChange(meta.page - 1)}
          disabled={meta.page <= 1}
          className="p-2 rounded-lg bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition shadow-sm"
        >
          <ChevronLeft size={16} />
        </button>

        <div className="hidden sm:flex gap-1.5">
          {Array.from({ length: meta.totalPages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              onClick={() => onPageChange(n)}
              className={`w-8 h-8 rounded-lg text-sm font-medium transition shadow-sm ${
                n === meta.page
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              {n}
            </button>
          ))}
        </div>

        <button
          onClick={() => onPageChange(meta.page + 1)}
          disabled={meta.page >= meta.totalPages}
          className="p-2 rounded-lg bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition shadow-sm"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}