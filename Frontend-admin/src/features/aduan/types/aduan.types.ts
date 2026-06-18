export type AduanStatusAPI = "open" | "in_progress" | "resolved" | "closed";

export interface Nasabah {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
}

export interface Attachment {
  id: number;
  filename: string;
  filePath: string; // URL untuk mengakses file, jika backend menyediakan
  uploadedAt: string; // Format ISO: "2026-04-30T00:00:00.000Z"
}

export interface Resolution {
  id: number;
  resolutionMessage: string;
  resolvedBy: {
    id: number;
    name: string;
  };
  resolvedAt: string; // Format ISO: "2026-04-30T00:00:00.000Z"
}

export interface Aduan {
  id: number;
  ticketCode: string;
  nasabah: Nasabah;
  category: string;
  description: string;
  status: AduanStatusAPI;
  priority: string;
  createdAt: string; // Format ISO: "2026-04-30T00:00:00.000Z"
  resolution?: Resolution;
  attachments?: Attachment[]; // Array nama file lampiran, bisa juga berupa URL jika backend menyediakan
}

export interface AduanMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface GetAduanResponse {
  status: string;
  data: Aduan[];
  meta: AduanMeta;
}

export interface GetAduanParams {
  page: number;
  limit: number;
  status?: string;
  search?: string;
}

// Interface data dari Backend
export interface AttachmentData {
  name: string;
  url: string;
}

export interface AdminResponseData {
  id: number;
  email: string;
  message: string;
  attachments: AttachmentData[];
  createdAt: string;
}

// Konstanta untuk styling dan mapping bahasa status
export const STATUS_MAPPING: Record<
  AduanStatusAPI,
  { label: string; color: string }
> = {
  open: { label: "Menunggu", color: "bg-blue-100 text-blue-700" },
  in_progress: {
    label: "Dalam Proses",
    color: "bg-yellow-100 text-yellow-700",
  },
  resolved: { label: "Selesai", color: "bg-green-100 text-green-700" },
  closed: { label: "Ditolak / Ditutup", color: "bg-red-100 text-red-700" },
};

// Interface Detail menggabungkan base Aduan dengan relasi lengkapnya
export interface AduanDetailData extends Aduan {
  response?: AdminResponseData | null; // Bisa null jika belum ada respon
  attachments?: Attachment[]; // Array objek lampiran lengkap dengan URL
}
