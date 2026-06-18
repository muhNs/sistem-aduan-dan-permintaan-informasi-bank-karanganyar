import { UploadCloud, Paperclip, X } from "lucide-react";
import React from "react";

interface Props {
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
}

export default function FormLampiranAduan({ files, setFiles }: Props) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      // Menggabungkan file lama dengan file baru yang dipilih (Maks 3 file)
      const newFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...newFiles].slice(0, 3)); 
    }
  };

  const removeFile = (indexToRemove: number) => {
    setFiles((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden transition-all mt-6">
      <div className="p-8 md:p-10 space-y-6">
        <h2 className="text-lg font-bold text-gray-900 border-l-4 border-red-700 pl-4 flex items-center gap-2">
          Dokumen Pendukung <span className="text-sm font-normal text-gray-500">(Opsional)</span>
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          Silakan unggah bukti transaksi, tangkapan layar (screenshot), salinan identitas, atau dokumen pendukung lainnya. (Maksimal 3 file).
        </p>

        {/* Dropzone */}
        <div className="relative border-2 border-dashed border-red-300 bg-red-50/30 rounded-2xl p-8 hover:bg-red-50 transition-colors text-center cursor-pointer group">
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            disabled={files.length >= 3}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
            accept=".pdf,.png,.jpg,.jpeg"
          />
          <UploadCloud className="w-10 h-10 text-red-400 mx-auto mb-3 group-hover:text-red-600 transition-colors" />
          <p className="text-sm font-semibold text-gray-700">
            {files.length >= 3 ? "Batas maksimal 3 file tercapai" : "Klik atau seret file ke area ini"}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Mendukung format PDF, JPG, atau PNG (Maks 5MB per file)
          </p>
        </div>

        {/* List File */}
        {files.length > 0 && (
          <div className="space-y-3 mt-4 pt-4 border-t border-gray-100">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              File Terpilih ({files.length}/3):
            </p>
            {files.map((file, index) => (
              <div key={index} className="flex items-center justify-between bg-white border border-red-200 p-4 rounded-xl shadow-sm hover:border-red-300 transition-all">
                <div className="flex items-center gap-4 overflow-hidden">
                  <div className="w-10 h-10 bg-red-100 text-red-700 flex items-center justify-center rounded-lg flex-shrink-0">
                    <Paperclip className="w-5 h-5" />
                  </div>
                  <div className="truncate">
                    <p className="text-sm font-semibold text-gray-800 truncate">{file.name}</p>
                    <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}