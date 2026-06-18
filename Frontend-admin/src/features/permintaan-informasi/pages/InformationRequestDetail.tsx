import { ChevronLeft, Loader2, Hash } from "lucide-react";
import InfoNasabahCard from "../components/InfoNasabahCard";
import InfoStatusCard from "../components/InfoStatusCard";
import InfoResponseCard from "../components/InfoResponseCard";
import PermintaanLampiranCard from "../components/PermintaanLampiranCard";
import { useInformationDetail } from "../hooks/useInformationDetail";

interface InformationRequestDetailProps {
  requestId: number;
  onClose: () => void;
  onSuccessProcess: () => void;
}

export default function InformationRequestDetail({
  requestId,
  onClose,
  onSuccessProcess,
}: InformationRequestDetailProps) {
  // Panggil Custom Hook!
  const { detail, isLoading, isSubmitting, updateStatus, submitResponse } =
    useInformationDetail(requestId);

  if (isLoading || !detail) {
    return (
      <div className="p-6 bg-[#f4f7fb] min-h-screen flex flex-col items-center justify-center text-gray-500">
        <Loader2 size={40} className="animate-spin mb-4 text-blue-500" />
        <p>Memuat detail permohonan informasi...</p>
      </div>
    );
  }

  const handleStatusChange = async (status: any) => {
    const success = await updateStatus(status);
    if (success) onSuccessProcess();
    return success;
  };

  const handleResponseSubmit = async (payload: any) => {
    const success = await submitResponse(payload);
    if (success) onSuccessProcess();
    return success;
  };

  const formattedDate = new Date(detail.createdAt).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="p-6 bg-[#f4f7fb] min-h-screen">
      {/* Tombol Kembali */}
      <div className="mb-6 flex items-center gap-4">
        <button
          onClick={onClose}
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition-colors font-medium"
        >
          <ChevronLeft size={18} />
          Kembali ke Daftar Permintaan
        </button>
      </div>

      {/* Header Info & Tombol Action */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Bagian Kiri: Judul dan Deskripsi Singkat */}
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Detail Permintaan Informasi
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            {detail.ticketCode} · {detail.infoMethod} · {formattedDate}
          </p>
        </div>

        {/* Bagian Kanan: Tombol WhatsApp */}
        <div>
          <a
            href={`https://wa.me/${detail.nasabah?.phone}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-green-500 text-white text-sm font-semibold rounded-xl hover:bg-green-600 transition-colors shadow-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
            Hubungi via WhatsApp
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
        <div className="lg:col-span-2 space-y-5">
          <div className="space-y-5">
            <InfoNasabahCard item={detail} />
          </div>
        </div>

        {/* Kolom Kanan: Status & Action (Lebih Sempit) */}
        <div className="space-y-5">
          <InfoStatusCard item={detail} onStatusChange={handleStatusChange} />
        </div>
      </div>

      {/* Section Bawah (Full Width) */}
      <div className="space-y-5">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">
            DESKRIPSI PERMINTAAN INFORMASI
          </h2>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center shrink-0">
              <Hash size={18} className="text-gray-500" />
            </div>
            <p className="text-base text-gray-700 leading-relaxed pt-1 break-words whitespace-pre-line">
              {detail.infoDetail}
            </p>
          </div>
        </div>

        {/* Section Lampiran Bukti (Full Width) */}
        <PermintaanLampiranCard lampiran={detail.attachments ?? []} />

        <InfoResponseCard
          item={detail}
          isSubmitting={isSubmitting}
          onSubmitResponse={handleResponseSubmit}
        />
      </div>
    </div>
  );
}
