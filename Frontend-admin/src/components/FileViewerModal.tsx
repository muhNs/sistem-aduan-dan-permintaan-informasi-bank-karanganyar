import { X, Download, FileText, Image as ImageIcon } from "lucide-react";
import { attachmentApi } from "../features/attachments/api/attachment.api";

interface FileViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  file: {
    filename: string;
    filePath: string;
  } | null;
}

export default function FileViewerModal({
  isOpen,
  onClose,
  file,
}: FileViewerModalProps) {
  if (!isOpen || !file) return null;

  // 1. Dapatkan URL Lengkap dari API Service (Sangat bersih!)
  const fullUrl = attachmentApi.getViewUrl(file.filePath);

  // 2. Deteksi Ekstensi File (Menggunakan filename lebih aman)
  const extension = String(file.filename).split(".").pop()?.toLowerCase() || "";
  const isImage = [
    "jpg",
    "jpeg",
    "png",
    "gif",
    "webp",
    "svg",
    "bmp",
    "ico",
  ].includes(extension);
  const isPdf = extension === "pdf";

  // 3. Fungsi Download Manual menggunakan API Service
  const handleDownload = async () => {
    // Memanggil endpoint download resmi dari backend
    await attachmentApi.downloadFile(file.filePath, file.filename);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 md:p-10"
      onClick={onClose} // Tutup jika background hitam diklik
    >
      <div
        className="relative flex flex-col w-full max-w-5xl h-[85vh] bg-white rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()} // Cegah tutup jika area putih diklik
      >
        {/* HEADER MODAL */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50 shrink-0">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="p-2 bg-white rounded-lg shadow-sm border border-gray-200">
              {isImage ? (
                <ImageIcon className="text-blue-500" size={20} />
              ) : (
                <FileText className="text-red-500" size={20} />
              )}
            </div>
            {/* Tampilkan NAMA FILE, bukan Path-nya agar lebih rapi */}
            <p className="text-sm font-semibold text-gray-800 truncate">
              {file.filename}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-2 text-xs px-4 py-2 rounded-lg bg-[#b91c1c] text-white hover:bg-red-800 transition-colors font-medium shadow-sm"
            >
              <Download size={14} />
              Unduh File
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-200 text-gray-500 hover:text-gray-800 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* KONTEN VIEWER */}
        <div className="flex-1 bg-gray-100/50 p-4 flex items-center justify-center overflow-auto relative">
          {isImage ? (
            /* TAMPILAN GAMBAR */
            <img
              src={fullUrl}
              alt={file.filename}
              className="max-w-full max-h-full object-contain rounded-lg drop-shadow-md"
            />
          ) : isPdf ? (
            /* TAMPILAN PDF (Menggunakan browser native PDF viewer) */
            <iframe
              src={`${fullUrl}#toolbar=0`} // Menghilangkan toolbar bawaan browser jika memungkinkan
              className="w-full h-full rounded-lg bg-white shadow-sm"
              title={file.filename}
            />
          ) : (
            /* TAMPILAN FILE LAINNYA (Misal Word/Excel) */
            <div className="text-center flex flex-col items-center justify-center">
              <FileText size={64} className="text-gray-300 mb-4" />
              <p className="text-gray-600 font-medium mb-2">
                Pratinjau tidak tersedia untuk jenis file ini.
              </p>
              <p className="text-sm text-gray-400 mb-6">
                Silakan unduh file untuk melihat isinya.
              </p>
              <button
                onClick={handleDownload}
                className="inline-flex items-center gap-2 text-sm px-6 py-2.5 rounded-xl border-2 border-gray-200 hover:border-gray-300 hover:bg-white transition-all font-medium text-gray-700"
              >
                <Download size={18} />
                Unduh Sekarang
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}