import { useState, useEffect } from "react";
import { Pencil, Check, X } from "lucide-react";
import {
  STATUS_MAPPING,
  type Aduan,
  type AduanStatusAPI,
} from "../types/aduan.types";

interface AduanStatusCardProps {
  item: Aduan;
  onStatusChange?: (newStatus: AduanStatusAPI) => void;
}

export default function AduanStatusCard({
  item,
  onStatusChange,
}: AduanStatusCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempStatus, setTempStatus] = useState<AduanStatusAPI>(item?.status);

  useEffect(() => {
    setTempStatus(item?.status);
  }, [item?.status]);

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
    setTempStatus(item?.status);
    setIsEditing(true);
  };

  const handleSave = () => {
    onStatusChange?.(tempStatus);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempStatus(item?.status);
    setIsEditing(false);
  };

  return (
    <div className="space-y-5">
      {/* Status Aduan */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">
          Status Aduan
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
                    setTempStatus(e.target.value as AduanStatusAPI)
                  }
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white"
                >
                  <option value="open">Open</option>
                  <option value="in_progress">Dalam Proses</option>
                  <option value="resolved">Selesai</option>
                  <option value="closed">Ditolak</option>
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
                className={`px-3 py-1.5 text-sm font-semibold rounded-full ${STATUS_MAPPING[item?.status]?.color}`}
              >
                {STATUS_MAPPING[item?.status]?.label}
              </span>
            )}
          </div>

          <div>
            <p className="text-xs text-gray-400 mb-1">Kategori</p>
            <p className="text-sm text-gray-700 font-medium">{item?.category}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-1">Tanggal Masuk</p>
            <p className="text-sm text-gray-700">
              {formatDate(item?.createdAt)}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-1">No. Aduan</p>
            <p className="text-sm font-semibold text-gray-800">
              {item?.ticketCode}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
