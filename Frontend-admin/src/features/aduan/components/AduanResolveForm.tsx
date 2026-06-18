// src/features/aduan/components/AduanResolveForm.tsx
import { useState } from 'react';
import { UploadCloud, Loader2 } from 'lucide-react';
import { aduanApi } from '../api/aduan.api';

interface AduanResolveFormProps {
  complaintId: string | number;
  onSuccess: () => void; // Fungsi callback jika berhasil disubmit
}

export default function AduanResolveForm({ complaintId, onSuccess }: AduanResolveFormProps) {
  const [replyMessage, setReplyMessage] = useState('');
  const [replyAttachment, setReplyAttachment] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitReply = async () => {
    if (!replyMessage.trim() || replyMessage.trim().length < 10) {
      alert("Pesan balasan wajib diisi dan minimal 10 karakter.");
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('resolutionMessage', replyMessage.trim());
      
      if (replyAttachment) {
        formData.append('attachment', replyAttachment); 
      }

      await aduanApi.resolveComplaint(complaintId, formData);

      alert("Aduan berhasil diselesaikan! Pesan WA telah dikirim ke nasabah.");
      
      setReplyMessage('');
      setReplyAttachment(null);
      
      // Panggil fungsi sukses dari parent (untuk refresh tabel & tutup modal)
      onSuccess(); 

    } catch (error: any) {
      const errMsg = error.response?.data?.message || "Terjadi kesalahan saat mengirim balasan.";
      alert(`Gagal: ${errMsg}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">
        Kirim Balasan & Selesaikan Tiket
      </h2>
      <div className="space-y-4">
        
        {/* Input Text Area */}
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-2" htmlFor="replyMessage">
            Pesan Balasan (Minimal 10 Karakter)
          </label>
          <textarea
            id="replyMessage"
            value={replyMessage}
            onChange={(e) => setReplyMessage(e.target.value)}
            placeholder="Tulis pesan balasan untuk nasabah..."
            disabled={isSubmitting}
            className="w-full min-h-[140px] rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 disabled:bg-gray-50 disabled:cursor-not-allowed"
          />
        </div>

        {/* Input File Drag & Drop */}
        <div>
          <p className="block text-xs font-semibold text-gray-500 mb-2">Kirim Dokumen Lampiran (Opsional)</p>
          <label
            htmlFor="replyAttachment"
            className={`group flex flex-col items-center justify-center gap-3 rounded-3xl border-2 border-dashed px-5 py-10 text-center text-sm transition cursor-pointer 
              ${replyAttachment ? 'border-green-300 bg-green-50' : 'border-blue-200 bg-blue-50 hover:border-blue-300 hover:bg-blue-100'} 
              ${isSubmitting ? 'opacity-50 pointer-events-none' : ''}`}
          >
            <div className={`flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm ${replyAttachment ? 'text-green-500' : 'text-blue-500'}`}>
              <UploadCloud size={20} />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-700">
                {replyAttachment ? 'File Berhasil Dipilih' : 'Klik atau seret file ke area ini'}
              </p>
              <p className="mt-1 text-xs text-gray-400">Mendukung format PDF, JPG, PNG (maks 5MB)</p>
            </div>
            <input
              id="replyAttachment"
              type="file"
              accept=".pdf, image/jpeg, image/png"
              onChange={(e) => setReplyAttachment(e.target.files?.[0] ?? null)}
              disabled={isSubmitting}
              className="hidden"
            />
          </label>
          
          {/* Tampilkan Nama File yang Dipilih */}
          {replyAttachment && (
            <div className="mt-3 flex items-center justify-between bg-gray-50 px-4 py-2 rounded-lg border border-gray-100">
              <p className="text-xs text-gray-600 truncate mr-4">File: <span className="font-medium text-gray-800">{replyAttachment.name}</span></p>
              <button 
                onClick={() => setReplyAttachment(null)}
                disabled={isSubmitting}
                className="text-xs text-red-500 hover:text-red-700 font-medium"
              >
                Hapus
              </button>
            </div>
          )}
        </div>

        {/* Tombol Submit */}
        <button
          type="button"
          onClick={handleSubmitReply}
          disabled={replyMessage.trim().length < 10 || isSubmitting}
          className="w-full py-3.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300 transition-colors flex items-center justify-center gap-2 shadow-sm"
        >
          {isSubmitting ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Memproses & Mengirim WA...
            </>
          ) : (
            "Kirim Balasan & Selesaikan Aduan"
          )}
        </button>
      </div>
    </div>
  );
}