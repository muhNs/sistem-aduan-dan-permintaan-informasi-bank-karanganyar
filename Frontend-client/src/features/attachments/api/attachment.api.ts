import { api } from '../../../lib/http'; // Asumsi base URL axios ini adalah http://localhost:<PORT>/api/v1

export const attachmentApi = {
  /**
   * 1. UPLOAD FILE
   * Endpoint: POST /api/v1/attachments/upload
   */
  uploadFiles: async (files: File[], complaintId?: number, requestId?: number) => {
    const formData = new FormData();
    
    // Append files sesuai dengan field 'lampiran[]' di dokumentasi
    files.forEach((file) => {
      formData.append('lampiran[]', file);
    });

    // Append ID jika ada
    if (complaintId) formData.append('complaintId', String(complaintId));
    if (requestId) formData.append('requestId', String(requestId));

    // publicApi akan otomatis menambahkan header multipart/form-data
    const response = await api.post('/attachments/upload', formData);
    return response.data;
  },

  /**
   * 2. DOWNLOAD FILE
   * Endpoint: GET /api/v1/attachments/download/:filename
   */
  downloadFile: async (filePath: string, originalName?: string) => {
    try {
      // Mengambil nama file dari path (misal: /uploads/123-file.pdf -> 123-file.pdf)
      const filename = filePath.split('/').pop();
      if (!filename) throw new Error("Filename tidak valid");

      // Gunakan publicApi untuk mengambil blob data
      const response = await api.get(`/attachments/download/${filename}`, {
        responseType: 'blob', // PENTING: Untuk menangani file biner
      });

      // Proses pengunduhan di browser
      const blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      
      // Jika ada nama asli, gunakan itu, jika tidak gunakan nama file dari server
      link.download = originalName || filename; 
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Gagal mengunduh file:", error);
      alert("Gagal mengunduh file. Silakan coba lagi.");
    }
  },

  /**
   * 3. GET VIEW URL (Untuk tag <img> atau <iframe>)
   * Endpoint: GET /uploads/:filename
   */
  getViewUrl: (filePath: string) => {
    // Asumsi VITE_API_BASE_URL Anda adalah "http://localhost:3000/api/v1"
    // Kita perlu menghilangkan "/api/v1" karena static file ada di root "http://localhost:3000/uploads/..."
    const baseUrl = import.meta.env.VITE_API_BASE_URL || '';
    const hostUrl = baseUrl.replace(/\/api\/v1\/?$/, ''); // Menghapus /api/v1 di akhir URL
    
    // Pastikan path dari DB diawali dengan '/'
    const cleanFilePath = filePath.startsWith('/') ? filePath : `/${filePath}`;
    
    return `${hostUrl}${cleanFilePath}`;
  }
};