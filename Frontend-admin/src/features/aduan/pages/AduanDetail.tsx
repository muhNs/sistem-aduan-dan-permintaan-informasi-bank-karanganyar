// import { useState } from "react";
import { ChevronLeft, Hash, Loader2, AlertCircle } from "lucide-react";
import type { Aduan, AduanStatusAPI } from "../types/aduan.types";
import { useAduanDetail } from "../hooks/useAduanDetail";
import AduanInfoCard from "../components/AduanInfoCard";
import AduanStatusCard from "../components/AduanStatusCard";
import AduanLampiranCard from "../components/AduanLampiranCard";
import AduanResolveForm from "../components/AduanResolveForm";
import AduanResponAdmin from "../components/AduanResponAdmin";

interface AduanDetailProps {
  item: Aduan;
  onClose: () => void;
  onStatusChange?: (newStatus: AduanStatusAPI) => void;
  onSuccessResolve: () => void;
}

export const AduanDetail = ({
  item,
  onClose,
  onStatusChange,
  onSuccessResolve,
}: AduanDetailProps) => {
  // Panggil API Detail menggunakan ID dari props
  const { detail, isLoadingDetail, error, refetchDetail } = useAduanDetail(
    item.id,
  );

  // Fungsi callback gabungan ketika resolve berhasil
  const handleResolveSuccess = () => {
    onSuccessResolve(); // Refresh data tabel di background
    onClose(); // Tutup mode detail
  };

  // Fungsi format tanggal (Contoh: "01 Apr 2026")
  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  if (isLoadingDetail) {
    return (
      <div className="p-6 bg-[#f4f7fb] min-h-screen flex flex-col items-center justify-center text-gray-500">
        <Loader2 size={40} className="animate-spin mb-4 text-red-600" />
        <p className="animate-pulse">Sedang mengambil data lengkap...</p>
      </div>
    );
  }

  if (error || !detail) {
    return (
      <div className="p-6 bg-[#f4f7fb] min-h-screen flex flex-col items-center justify-center text-center">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 max-w-md">
          <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle size={32} />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Gagal Memuat Detail
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            {error || "Data aduan tidak ditemukan di sistem."}
          </p>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
            >
              Tutup
            </button>
            <button
              onClick={() => refetchDetail()}
              className="flex-1 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-xl hover:bg-red-700 transition-colors"
            >
              Coba Lagi
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-[#f4f7fb] min-h-screen">
      <div className="mb-6 flex items-center gap-4">
        <button
          onClick={onClose}
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition-colors"
        >
          <ChevronLeft size={18} /> Kembali ke Daftar Aduan
        </button>
      </div>

      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Detail Aduan</h1>
          <p className="text-gray-500 text-sm mt-1">
            {detail?.ticketCode} · {detail?.category} ·{" "}
            {formatDate(detail?.createdAt)}
          </p>
        </div>
        <div>
          {/* Tombol WhatsApp Menggunakan data detail.nasabah.phone */}
          <a
            href={`https://wa.me/${detail.nasabah?.phone?.replace(/\D/g, "").replace(/^0/, "62")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-green-500 text-white text-sm font-semibold rounded-xl hover:bg-green-600 transition-colors shadow-sm"
          >
            Hubungi via WhatsApp
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 space-y-5">
          <AduanInfoCard item={detail} />
        </div>

        <div className="space-y-5">
          <AduanStatusCard item={detail} onStatusChange={onStatusChange} />
        </div>

        <div className="lg:col-span-3 space-y-5">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">
              Deskripsi Aduan
            </h2>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center shrink-0">
                <Hash size={18} className="text-gray-500" />
              </div>
              <p className="text-base text-gray-700 leading-relaxed pt-1 break-words whitespace-pre-line">
                {detail.description}
              </p>
            </div>
          </div>

          {/* Lampiran */}
          <AduanLampiranCard lampiran={detail.attachments ?? []} />

          {detail.status !== "resolved" && detail.status !== "closed" && (
            <AduanResolveForm
              complaintId={detail.id}
              onSuccess={handleResolveSuccess}
            />
          )}
        </div>
      </div>

      <div className="lg:col-span-3 space-y-5">
        {/* Opsional: Anda juga bisa mem-passing `detail.resolution` ke komponen ini jika tidak ingin nembak API lagi */}
        <AduanResponAdmin complaintId={detail?.id} />
      </div>
    </div>
  );
};
