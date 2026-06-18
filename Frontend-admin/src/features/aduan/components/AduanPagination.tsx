import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { AduanMeta } from '../types/aduan.types';

interface AduanPaginationProps {
  meta: AduanMeta;
  onPageChange: (page: number) => void;
}

export const AduanPagination = ({ meta, onPageChange }: AduanPaginationProps) => {
  const { page, limit, total, totalPages } = meta;
  
  // Kalkulasi index untuk tulisan "Menampilkan 1-10"
  const startItem = total === 0 ? 0 : (page - 1) * limit + 1;
  const endItem = Math.min(page * limit, total);

  return (
    <div className="flex justify-between items-center mt-5">
      <p className="text-sm text-gray-500">
        Menampilkan {startItem}–{endItem} dari {total} data
      </p>

      <div className="flex items-center gap-1.5">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed transition"
        >
          <ChevronLeft size={16} />
        </button>

        {/* Generate nomor halaman dinamis */}
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
          <button
            key={n}
            onClick={() => onPageChange(n)}
            className={`w-8 h-8 rounded-lg text-sm font-medium transition ${
              n === page
                ? 'bg-yellow-400 text-black shadow-sm'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {n}
          </button>
        ))}

        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages || totalPages === 0}
          className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed transition"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};