import { Download, FileText, Loader2 } from "lucide-react";
import { useAduanResolution } from "../hooks/useAduanResolution";

interface AduanResponAdminProps {
  complaintId: number;
}

function buildAttachmentUrl(fileUrl: string) {
  if (/^https?:\/\//.test(fileUrl)) return fileUrl;
  const base = import.meta.env.VITE_UPLOAD_URL || "http://localhost:3000";
  const cleanBase = base.replace(/\/$/, "");
  const cleanPath = fileUrl.replace(/^\//, "");
  return `${cleanBase}/${cleanPath}`;
}

async function handleDownload(fileUrl: string, fileName: string) {
  try {
    const url = buildAttachmentUrl(fileUrl);
    const response = await fetch(url, { mode: "cors" });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const blob = await response.blob();
    const filename = fileName || url.split("/").pop() || "download";
    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error("Gagal mengunduh file", error);
    window.open(buildAttachmentUrl(fileUrl), "_blank");
  }
}

export default function AduanResponAdmin({
  complaintId,
}: AduanResponAdminProps) {
  // Panggil Custom Hook yang baru kita buat
  const { adminResponse, isLoadingRespon } = useAduanResolution(complaintId);

  return (
    <div className="mt-5">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        {/* Header Respon Admin */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
            Respon Admin
          </h2>
          {!isLoadingRespon && adminResponse && (
            <span className="text-xs text-gray-500">
              Disimpan: {adminResponse.createdAt}
            </span>
          )}
        </div>

        {/* State: Loading */}
        {isLoadingRespon ? (
          <div className="flex items-center gap-2 py-4 text-sm text-gray-500">
            <Loader2 size={16} className="animate-spin text-blue-500" />
            Memuat respon dari server...
          </div>
        ) : /* State: Ada Respon */
        adminResponse ? (
          <div className="space-y-4">
            <div>
              <p className="text-xs text-gray-400 mb-1">Email Admin</p>
              <p className="text-sm text-gray-700 font-medium">
                {adminResponse.email}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-400 mb-1">Pesan Respon</p>
              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700 whitespace-pre-line">
                {adminResponse.message}
              </div>
            </div>

            {/* List Semua Lampiran (Bisa di-Download) */}
            {adminResponse.attachments &&
              adminResponse.attachments.length > 0 && (
                <div>
                  <p className="text-xs text-gray-400 mb-2">Dokumen Lampiran</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {adminResponse.attachments.map((file, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => handleDownload(file.url, file.name)}
                        className="group flex items-center justify-between w-full p-3 rounded-xl border border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50 transition-colors"
                      >
                        <div className="flex items-center gap-3 overflow-hidden text-left">
                          <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 group-hover:bg-blue-200">
                            <FileText size={16} />
                          </div>
                          <span className="text-sm font-medium text-gray-700 truncate group-hover:text-blue-700">
                            {file.name}
                          </span>
                        </div>
                        <Download
                          size={16}
                          className="text-gray-400 group-hover:text-blue-600 shrink-0 ml-2"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
          </div>
        ) : (
          /* State: Belum Ada Respon */
          <p className="text-sm text-gray-500 py-2">
            Belum ada respon admin untuk aduan ini.
          </p>
        )}
      </div>
    </div>
  );
}
