import { api } from '../../../lib/http';
import type { CreateAduanRequest, CreateAduanResponse } from '../types/aduan.types.ts';

export const publicAduanApi = {
  // 1. Membuat Aduan (Kirim Data Teks)
  createComplaint: async (payload: CreateAduanRequest): Promise<CreateAduanResponse> => {
    const response = await api.post('/aduan/createComplaint', payload);
    return response.data;
  },

  // 2. Upload Lampiran (Kirim File + ID Aduan)
  uploadAttachment: async (files: File[], complaintId: number | string) => {
    const formData = new FormData();
    
    // API menerima array file 'lampiran[]'
    files.forEach((file) => {
      formData.append('lampiran[]', file);
    });
    
    // Sisipkan ID aduan sebagai foreign key
    formData.append('complaintId', String(complaintId));

    // Tidak perlu set 'Content-Type' secara manual, 
    // interceptor publicApi kita akan mengaturnya otomatis menjadi multipart/form-data
    const response = await api.post('/attachment/uploadAttachment', formData);
    return response.data;
  }
};