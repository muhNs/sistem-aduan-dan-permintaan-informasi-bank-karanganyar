import { useState, useEffect, useCallback } from 'react';
import { informationApi } from '../api/request.api';
import type { InfoRequestDetail, InfoRequestStatus } from '../types/information.types.js';

export const useInformationDetail = (requestId: number | null) => {
  const [detail, setDetail] = useState<InfoRequestDetail | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // Untuk tombol simpan & loading upload

  // 1. Ambil Data Detail Permintaan
  const fetchDetail = useCallback(async () => {
    if (!requestId) return;
    
    setIsLoading(true);
    try {
      const data = await informationApi.getRequestDetail(requestId);
      setDetail(data); // Akan mengisi InfoCard, Lampiran, StatusCard, dan ResponAdminCard sekaligus!
    } catch (error) {
      console.error("Gagal mengambil detail informasi", error);
    } finally {
      setIsLoading(false);
    }
  }, [requestId]);

  // Otomatis fetch saat requestId berubah (misal saat admin mengklik dari tabel)
  useEffect(() => {
    fetchDetail();
  }, [fetchDetail]);

  // 2. Fungsi Ubah Status Manual (StatusCard)
  const updateStatus = async (newStatus: InfoRequestStatus) => {
    if (!requestId) return false;
    
    try {
      await informationApi.updateStatus(requestId, newStatus);
      // Update UI seketika tanpa perlu fetch ulang seluruh data
      setDetail(prev => prev ? { ...prev, status: newStatus } : null);
      return true;
    } catch (error: any) {
      alert(`Gagal merubah status: ${error.response?.data?.message || error.message}`);
      return false;
    }
  };

  // 3. Fungsi Kirim Balasan / Respon (ResponseInformationCard)
  const submitResponse = async (payload: { responseMessage: string } | FormData) => {
    if (!requestId) return false;
    
    setIsSubmitting(true);
    try {
      await informationApi.sendResponse(requestId, payload);
      alert("Respon berhasil dikirim kepada nasabah!");
      
      // Fetch ulang agar form kirim respon hilang dan 'ResponAdminCard' muncul
      await fetchDetail(); 
      return true;
    } catch (error: any) {
      alert(`Gagal mengirim respon: ${error.response?.data?.message || error.message}`);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    detail,
    isLoading,
    isSubmitting,
    updateStatus,
    submitResponse,
    refetchDetail: fetchDetail
  };
};