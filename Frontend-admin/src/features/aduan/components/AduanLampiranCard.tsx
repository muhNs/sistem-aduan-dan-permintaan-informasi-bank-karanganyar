import { useState } from "react";
import {
  Paperclip,
  Image,
  FileText,
  File,
  Download,
  ZoomIn,
  Eye, // Icon untuk pratinjau file PDF/Doc
} from "lucide-react";
import type { Attachment } from "../types/aduan.types";
import FileViewerModal from "../../../components/FileViewerModal"; // Sesuaikan path import
import { attachmentApi } from "../../attachments/api/attachment.api"; // 👈 Import API Service kita

interface PermintaanLampiranCardProps {
  lampiran: Attachment[];
}

// 👈 Fungsi pembantu ringan di dalam komponen untuk menentukan Ikon
function FileIcon({ filePath }: { filePath?: string }) {
  if (!filePath) return <File size={20} className="text-gray-500" />;

  // Ambil ekstensi dengan aman
  const extension = String(filePath).split(".").pop()?.toLowerCase() || "";

  // Ikon Biru untuk Gambar
  if (
    ["jpg", "jpeg", "png", "gif", "webp", "svg", "bmp", "ico"].includes(
      extension,
    )
  )
    return <Image size={20} className="text-blue-500" />;

  // Ikon Merah untuk PDF
  if (extension === "pdf")
    return <FileText size={20} className="text-red-500" />;

  // Ikon Biru Tua untuk Word
  if (["doc", "docx"].includes(extension))
    return <FileText size={20} className="text-blue-700" />;

  return <File size={20} className="text-gray-500" />;
}

export default function AduanLampiranCard({
  lampiran,
}: PermintaanLampiranCardProps) {
  const [preview, setPreview] = useState<Attachment | null>(null);

  // 1. Tampilan jika tidak ada lampiran
  if (!lampiran || lampiran.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide flex items-center gap-2">
          <Paperclip size={15} className="text-gray-400" />
          Lampiran Bukti
        </h2>
        <div className="flex flex-col items-center justify-center py-8 text-gray-400 bg-gray-50 rounded-xl border border-dashed border-gray-200">
          <Paperclip size={28} className="mb-2 opacity-40" />
          <p className="text-sm">Tidak ada lampiran yang dilampirkan</p>
        </div>
      </div>
    );
  }

  // Fungsi pembantu ringan untuk mendapatkan ekstensi
  const getExt = (path?: string) =>
    String(path || "")
      .split(".")
      .pop()
      ?.toLowerCase() || "";

  // 2. Pisahkan data: images vs non-images
  const images = lampiran.filter((l) =>
    ["jpg", "jpeg", "png", "gif", "webp", "svg", "bmp", "ico"].includes(
      getExt(l.filePath),
    ),
  );

  const files = lampiran.filter(
    (l) =>
      !["jpg", "jpeg", "png", "gif", "webp", "svg", "bmp", "ico"].includes(
        getExt(l.filePath),
      ),
  );

  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide flex items-center gap-2">
          <Paperclip size={15} className="text-gray-400" />
          Lampiran Bukti
          <span className="ml-auto text-xs font-normal text-gray-400 normal-case">
            {lampiran.length} file
          </span>
        </h2>

        {/* IMAGE GRID - PRATINJAU ODOMATIS BISA DIKLIK */}
        {images.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
            {images.map((item) => (
              <div
                key={item.id}
                className="group relative rounded-xl overflow-hidden border border-gray-100 bg-gray-50 cursor-pointer aspect-video"
                // 👈 PERBAIKAN: onClick diletakkan pada pembungkus Div agar mudah diklik
                onClick={() => setPreview(item)}
              >
                {/* 👈 GUNAKAN API SERVICE UNTUK MENAMPILKAN GAMBAR */}
                <img
                  src={attachmentApi.getViewUrl(item.filePath)}
                  alt={item.filename || "Lampiran Gambar"}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {/* Hover overlay — zoom */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <ZoomIn size={20} className="text-white drop-shadow" />
                </div>

                {/* Tombol download di pojok kanan atas */}
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Mencegah klik menyebar ke Div utama (mencegah modal terbuka)
                    // 👈 GUNAKAN API SERVICE UNTUK DOWNLOAD
                    attachmentApi.downloadFile(item.filePath, item.filename);
                  }}
                  className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/50 hover:bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-all z-10"
                  title="Unduh"
                >
                  <Download size={13} />
                </button>

                {/* Nama file di bawah */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-2 py-1.5">
                  <p className="text-white text-[10px] truncate font-medium">
                    {item.filename || item.filePath}
                  </p>
                  <p className="text-white/70 text-[9px]">
                    {item.uploadedAt
                      ? new Date(item.uploadedAt).toLocaleDateString()
                      : "-"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* NON-IMAGE FILES (PDF, Word, dll) - PRATINJAU BISA DIKLIK */}
        {files.length > 0 && (
          <div className="space-y-2">
            {files.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer group"
                onClick={() => setPreview(item)} // Membuka pratinjau di modal
              >
                <div className="w-9 h-9 rounded-lg bg-white border border-gray-200 flex items-center justify-center shrink-0">
                  <FileIcon filePath={item.filePath} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate group-hover:text-blue-600 transition-colors">
                    {item.filename || item.filePath}
                  </p>
                  <p className="text-xs text-gray-400">
                    {item.uploadedAt
                      ? new Date(item.uploadedAt).toLocaleDateString()
                      : "-"}
                  </p>
                </div>

                {/* Ikon Mata untuk menunjukkan ini bisa dipratinjau */}
                <button
                  className="p-2 rounded-lg text-gray-400 hover:bg-white hover:text-blue-600 hover:shadow-sm transition-all"
                  title="Pratinjau"
                >
                  <Eye size={15} />
                </button>

                {/* Tombol Download */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    attachmentApi.downloadFile(item.filePath, item.filename); // 👈 GUNAKAN API SERVICE
                  }}
                  className="p-2 rounded-lg hover:bg-white hover:shadow-sm transition-all text-gray-400 hover:text-gray-700"
                  title="Unduh"
                >
                  <Download size={15} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 👈 MODAL VIEWER - SATU UNTUK SEMUA JENIS FILE */}
      <FileViewerModal
        isOpen={preview !== null}
        onClose={() => setPreview(null)}
        file={preview} //preview berisi filename & filePath
      />
    </>
  );
}
