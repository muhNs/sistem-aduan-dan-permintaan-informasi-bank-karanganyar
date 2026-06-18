import { Eye, Search, Loader2 } from "lucide-react";
import { STATUS_MAPPING, type Aduan } from "../types/aduan.types";

interface AduanTableProps {
  data: Aduan[];
  isLoading: boolean;
  onSelectAduan: (item: Aduan) => void;
}

export const AduanTable = ({
  data,
  isLoading,
  onSelectAduan,
}: AduanTableProps) => {
  // Fungsi format tanggal (Contoh: "01 Apr 2026")
  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* TABLE HEAD */}
      <div className="grid grid-cols-6 bg-gray-50 px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide border-b border-gray-100">
        <div>Tanggal</div>
        <div>Ticket ID</div>
        <div>Nama</div>
        <div>Email</div>
        <div>Status</div>
        <div>Aksi</div>
      </div>

      {isLoading ? (
        <div className="py-16 flex flex-col items-center text-gray-400">
          <Loader2
            size={40}
            className="animate-spin mx-auto mb-3 text-yellow-500"
          />
          <p className="text-sm">Memuat data aduan...</p>
        </div>
      ) : data.length === 0 ? (
        <div className="py-16 text-center text-gray-400">
          <Search size={40} className="mx-auto mb-3 opacity-40" />
          <p className="text-sm">Tidak ada data yang ditemukan</p>
        </div>
      ) : (
        data.map((item) => {
          const statusVisual =
            STATUS_MAPPING[item.status] || STATUS_MAPPING["open"];
          return (
            <div
              key={item.id}
              className="grid grid-cols-6 px-6 py-4 border-t border-gray-50 text-sm items-center hover:bg-gray-50 transition-colors"
            >
              <div className="text-gray-500">{formatDate(item.createdAt)}</div>
              <div className="font-semibold text-gray-800">
                {item.ticketCode}
              </div>
              <div className="text-gray-600 truncate">{item.nasabah.name}</div>
              <div
                className="text-gray-600 truncate mr-2"
                title={item.nasabah.email}
              >
                {item.nasabah.email}
              </div>
              <div>
                <span
                  className={`px-3 py-1 text-[11px] font-medium rounded-full ${statusVisual.color}`}
                >
                  {statusVisual.label}
                </span>
              </div>
              <div>
                <button
                  onClick={() => onSelectAduan(item)}
                  className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-[#1a1c2d] text-white hover:bg-[#2a2d42] transition-colors shadow-sm"
                >
                  <Eye size={13} /> Detail
                </button>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
