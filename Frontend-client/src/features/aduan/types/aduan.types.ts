// export interface Nasabah {
//   name: string;
//   address: string;
//   job?: string;
//   phone?: string;
//   email?: string;
// }

// export interface DataAduan {
//   nomorPendaftaran: string;
//   tujuanPenggunaan: string;
//   pemohon: Nasabah;
//   alasan: string;
//   kasusPosisi: string;
// }

// export interface AttachmentResponse {
//   id: number;
//   filePath: string;
// }

// export type AttachmentProps = {
//   files: File[];
//   setFiles: React.Dispatch<React.SetStateAction<File[]>>;
// };

// Enum untuk Kategori Aduan
export type AduanCategory =
  | "TRANSAKSI"
  | "TABUNGAN"
  | "AKUN_DAN_KARTU"
  | "APLIKASI_ERROR"
  | "PELAYANAN_CABANG"
  | "INFO_DAN_PROMO"
  | "LAINNYA";

// Interface Data Nasabah (Sama persis dengan Permohonan Info)
export interface AduanNasabahPayload {
  name: string;
  address: string;
  job?: string;
  phone?: string;
  email?: string;
}

// Interface Data Aduan
export interface AduanDetailPayload {
  category: AduanCategory;
  description: string;
}

// Interface Payload untuk dikirim ke Backend
export interface CreateAduanRequest {
  nasabah: AduanNasabahPayload;
  complaint: AduanDetailPayload;
}

// Interface gabungan untuk State Form di Frontend (React Hook Form)
export interface FormCreateAduan
  extends AduanNasabahPayload, AduanDetailPayload {
  attachments?: File[];
}

// Interface untuk kembalian sukses dari Backend
export interface CreateAduanResponse {
  status: string;
  message: string;
  data: {
    complaintId: number;
    ticketCode: string;
  };
}
