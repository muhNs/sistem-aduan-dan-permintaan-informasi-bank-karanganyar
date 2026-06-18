import { Search, Download } from "lucide-react";

interface AduanSearchBarProps {
  search: string;
  filterStatus: string;
  onSearch: (val: string) => void;
  onFilter: (val: string) => void;
  onExport: () => void;
}

export const AduanSearchBar = ({
  search,
  filterStatus,
  onSearch,
  onFilter,
  onExport,
}: AduanSearchBarProps) => {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-5 flex flex-wrap items-center gap-3 justify-between">
      <div className="relative w-80">
        <input
          type="text"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Cari no. aduan, kategori, atau nama..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
        <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
      </div>

      <div className="flex items-center gap-3">
        {/* // Cuplikan AduanSearchBar.tsx */}
        <select
          value={filterStatus}
          onChange={(e) => onFilter(e.target.value)}
          className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white"
        >
          <option value="Semua">Semua Status</option>
          <option value="open">Menunggu (Open)</option>
          <option value="in_progress">Dalam Proses</option>
          <option value="resolved">Selesai</option>
          <option value="closed">Ditolak / Ditutup</option>
        </select>
        <button
          onClick={onExport}
          className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded-xl hover:bg-gray-50 hover:text-black focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-colors shadow-sm"
        >
          <Download size={18} className="text-gray-500" />
          Export
        </button>
      </div>
    </div>
  );
};
