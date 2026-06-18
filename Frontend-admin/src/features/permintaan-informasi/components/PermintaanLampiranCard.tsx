import { useState } from "react";
import {
  Paperclip,
  Image,
  FileText,
  File,
  Download,
  X,
  ZoomIn,
} from "lucide-react";
import type { InfoAttachment } from "../types/information.types";

interface PermintaanLampiranCardProps {
  lampiran: InfoAttachment[];
}

function FileIcon({ fileName }: { fileName: string }) {
  const extension = fileName.split(".").pop()?.toLowerCase();
  if (
    ["jpg", "jpeg", "png", "gif", "webp", "svg", "bmp", "ico"].includes(
      extension || "",
    )
  )
    return <Image size={20} className="text-blue-500" />;
  if (extension === "pdf")
    return <FileText size={20} className="text-red-500" />;
  if (["doc", "docx"].includes(extension || ""))
    return <FileText size={20} className="text-blue-700" />;
  return <File size={20} className="text-gray-500" />;
}

async function handleDownload(url: string, fileName: string) {
  try {
    const response = await fetch(url, { mode: "cors" });
    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(blobUrl);
  } catch {
    // Fallback: buka di tab baru jika CORS tidak mengizinkan
    window.open(url, "_blank");
  }
}

export default function PermintaanLampiranCard({
  lampiran,
}: PermintaanLampiranCardProps) {
  const [preview, setPreview] = useState<InfoAttachment | null>(null);

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

  const images = lampiran.filter((l) =>
    ["jpg", "jpeg", "png", "gif", "webp", "svg", "bmp", "ico"].includes(
      l.filename.split(".").pop()?.toLowerCase() || "",
    ),
  );
  const files = lampiran.filter(
    (l) =>
      !["jpg", "jpeg", "png", "gif", "webp", "svg", "bmp", "ico"].includes(
        l.filename.split(".").pop()?.toLowerCase() || "",
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

        {/* IMAGE GRID */}
        {images.length > 0 && (
          <div className="grid grid-cols-2 gap-3 mb-4">
            {images.map((item) => (
              <div
                key={item.id}
                className="group relative rounded-xl overflow-hidden border border-gray-100 bg-gray-50 cursor-pointer aspect-video"
              >
                <img
                  src={import.meta.env.VITE_UPLOAD_URL + item.path}
                  alt={item.filename}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  onClick={() => setPreview(item)}
                />

                {/* Hover overlay — kiri: zoom, kanan: download */}
                <div
                  className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3"
                  onClick={() => setPreview(item)}
                >
                  <ZoomIn size={20} className="text-white drop-shadow" />
                </div>

                {/* Tombol download di pojok kanan atas */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDownload(
                      import.meta.env.VITE_UPLOAD_URL + item.path,
                      item.filename,
                    );
                  }}
                  className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/50 hover:bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-all z-10"
                  title="Unduh"
                >
                  <Download size={13} />
                </button>

                {/* Nama file di bawah */}
                <div
                  className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-2 py-1.5"
                  onClick={() => setPreview(item)}
                >
                  <p className="text-white text-[10px] truncate font-medium">
                    {item.filename}
                  </p>
                  <p className="text-white/70 text-[9px]">
                    {new Date(item.uploadedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* NON-IMAGE FILES */}
        {files.length > 0 && (
          <div className="space-y-2">
            {files.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className="w-9 h-9 rounded-lg bg-white border border-gray-200 flex items-center justify-center shrink-0">
                  <FileIcon fileName={item.filename} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">
                    {item.filename}
                  </p>
                  <p className="text-xs text-gray-400">
                    {new Date(item.uploadedAt).toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={() =>
                    handleDownload(
                      import.meta.env.VITE_UPLOAD_URL + item.path,
                      item.filename,
                    )
                  }
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

      {/* LIGHTBOX PREVIEW */}
      {preview && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setPreview(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
              <div>
                <p className="text-sm font-semibold text-gray-800">
                  {preview.filename}
                </p>
                <p className="text-xs text-gray-400">
                  {new Date(preview.uploadedAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    handleDownload(
                      import.meta.env.VITE_UPLOAD_URL + preview.path,
                      preview.filename,
                    )
                  }
                  className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-[#1a1c2d] text-white hover:bg-[#2a2d42] transition-colors"
                >
                  <Download size={13} />
                  Unduh
                </button>
                <button
                  onClick={() => setPreview(null)}
                  className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-800 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            </div>
            {/* Image */}
            <div className="bg-gray-50 flex items-center justify-center p-4 max-h-[75vh] overflow-auto">
              <img
                src={import.meta.env.VITE_UPLOAD_URL + preview.path}
                alt={preview.filename}
                className="max-w-full max-h-[65vh] object-contain rounded-lg"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
