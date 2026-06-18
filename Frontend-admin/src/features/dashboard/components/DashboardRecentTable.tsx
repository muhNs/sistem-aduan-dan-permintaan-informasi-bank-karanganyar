// src/features/dashboard/components/DashboardRecentTable.tsx
import { Loader2 } from 'lucide-react';
import { type Aduan, STATUS_MAPPING } from '../../aduan/types/aduan.types'; // Sesuaikan path

interface DashboardRecentTableProps {
  data: Aduan[];
  isLoading: boolean;
}

export default function DashboardRecentTable({ data, isLoading }: DashboardRecentTableProps) {
  // Fungsi format tanggal (Contoh: "01 Apr 2026")
  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800">Pengaduan Terbaru</h3>
      </div>
      <div className="overflow-x-auto px-1">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="bg-[#eef2f6] text-gray-600 text-sm">
              <th className="px-6 py-4 font-medium whitespace-nowrap">No. Pengaduan</th>
              <th className="px-6 py-4 font-medium whitespace-nowrap">Kategori</th>
              <th className="px-6 py-4 font-medium whitespace-nowrap">Status</th>
              <th className="px-6 py-4 font-medium whitespace-nowrap">Tanggal</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {isLoading ? (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-gray-400">
                  <Loader2 size={32} className="animate-spin mx-auto mb-2 text-yellow-500" />
                  <p className="text-sm">Memuat data aduan terbaru...</p>
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                  Belum ada data pengaduan terbaru.
                </td>
              </tr>
            ) : (
              data.map((row) => {
                const statusVisual = STATUS_MAPPING[row.status] || STATUS_MAPPING['open'];

                return (
                  <tr key={row.id} className="text-gray-700 hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">{row.ticketCode}</td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap">{row.category}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${statusVisual.color} whitespace-nowrap`}
                      >
                        {statusVisual.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">{formatDate(row.createdAt)}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}