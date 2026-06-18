import { useState } from 'react';
import { Loader2, UploadCloud, CheckCircle } from 'lucide-react';
import type { InfoRequestDetail } from '../types/information.types.js';

interface InfoResponseManagerProps {
  item: InfoRequestDetail;
  isSubmitting: boolean;
  onSubmitResponse: (payload: { responseMessage: string } | FormData) => Promise<boolean>;
}

export default function InfoResponseCard({ item, isSubmitting, onSubmitResponse }: InfoResponseManagerProps) {
  const [replyMessage, setReplyMessage] = useState('');
  const [replyAttachment, setReplyAttachment] = useState<File | null>(null);

  const handleSubmit = async () => {
    if (replyMessage.trim().length < 10) return;

    // Jika Anda ingin mengaktifkan upload file, gunakan FormData. 
    // Jika backend hanya butuh JSON, gunakan objek biasa.
    let payload: any;
    if (replyAttachment) {
      payload = new FormData();
      payload.append('responseMessage', replyMessage.trim());
      payload.append('attachment', replyAttachment);
    } else {
      payload = { responseMessage: replyMessage.trim() };
    }

    const success = await onSubmitResponse(payload);
    if (success) {
      setReplyMessage('');
      setReplyAttachment(null);
    }
  };

  // KONDISI 1: Jika sudah ada response dari admin
  if (item.response) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mt-5">
        <div className="flex items-center justify-between mb-4 border-b border-gray-50 pb-3">
          <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide flex items-center gap-2">
            <CheckCircle size={16} className="text-green-500" />
            Respon Admin
          </h2>
          <span className="text-xs text-gray-500">
            {new Date(item.response.respondedAt).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })}
          </span>
        </div>
        <div className="space-y-4">
          <div>
            <p className="text-xs text-gray-400 mb-1">Dibalas Oleh</p>
            <p className="text-sm text-gray-700 font-medium">{item.response.respondedBy.name}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-1">Isi Respon</p>
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700 whitespace-pre-line">
              {item.response.responseMessage}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // KONDISI 2: Jika belum ada response dan tiket ditolak/selesai manual
  if (item.status === 'completed' || item.status === 'rejected') {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mt-5">
        <p className="text-sm text-gray-500 text-center">Permohonan ini telah {item.status === 'completed' ? 'diselesaikan' : 'ditolak'} tanpa respon pesan.</p>
      </div>
    );
  }

  // KONDISI 3: Form Input Respon (Status masih pending/processed)
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mt-5">
      <h2 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">
        Kirim Respon & Selesaikan Permintaan
      </h2>
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-2" htmlFor="replyMessage">
            Pesan Balasan (Minimal 10 Karakter)
          </label>
          <textarea
            id="replyMessage"
            value={replyMessage}
            onChange={(e) => setReplyMessage(e.target.value)}
            placeholder="Tuliskan respon atau informasi yang diminta nasabah..."
            disabled={isSubmitting}
            className="w-full min-h-[120px] rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-50"
          />
        </div>

        {/* Upload File Opsional */}
        <div>
          <p className="block text-xs font-semibold text-gray-500 mb-2">Dokumen / Berkas (Opsional)</p>
          <label
            htmlFor="replyAttachment"
            className={`flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed px-5 py-6 text-center text-sm transition cursor-pointer 
              ${replyAttachment ? 'border-green-300 bg-green-50' : 'border-blue-200 bg-blue-50 hover:bg-blue-100'}`}
          >
            <UploadCloud size={20} className={replyAttachment ? 'text-green-500' : 'text-blue-500'} />
            <span className="font-semibold text-gray-600">
              {replyAttachment ? replyAttachment.name : 'Pilih file dokumen'}
            </span>
            <input
              id="replyAttachment"
              type="file"
              onChange={(e) => setReplyAttachment(e.target.files?.[0] ?? null)}
              disabled={isSubmitting}
              className="hidden"
            />
          </label>
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={replyMessage.trim().length < 10 || isSubmitting}
          className="w-full py-3.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 disabled:opacity-60 flex items-center justify-center gap-2"
        >
          {isSubmitting ? <><Loader2 size={18} className="animate-spin" /> Memproses...</> : "Kirim Respon"}
        </button>
      </div>
    </div>
  );
}