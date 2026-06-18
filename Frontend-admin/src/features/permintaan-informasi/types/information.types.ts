// Status Union Type
export type InfoRequestStatus = 'pending' | 'processed' | 'completed' | 'rejected';

// Interface Nasabah
export interface InfoNasabah {
  id: number;
  name: string;
  email: string;
  phone: string;
  address?: string; // Ada di detail
}

// Interface Item Permintaan Informasi (Untuk Tabel)
export interface InfoRequest {
  id: number;
  ticketCode: string;
  nasabah: InfoNasabah;
  infoDetail: string;
  purpose?: string;
  infoMethod?: string;
  deliveryMethod?: string;
  status: InfoRequestStatus;
  createdAt: string;
}

// Interface Respon Admin
export interface InfoResponseData {
  id: number;
  responseMessage: string;
  respondedBy: {
    id: number;
    name: string;
  };
  respondedAt: string;
}

// Interface Lampiran
export interface InfoAttachment {
  id: number;
  filename: string;
  path: string;
  uploadedAt: string;
}

// Interface Detail (Menggabungkan Request + Response + Attachments)
export interface InfoRequestDetail extends InfoRequest {
  response?: InfoResponseData | null;
  attachments?: InfoAttachment[];
}

// Interface Pagination Meta
export interface InfoPaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

// Interface Response API Get All
export interface GetAllInfoResponse {
  status: string;
  data: InfoRequest[];
  meta: InfoPaginationMeta;
}

// Interface Response API Detail
export interface GetDetailInfoResponse {
  status: string;
  data: InfoRequestDetail;
}
