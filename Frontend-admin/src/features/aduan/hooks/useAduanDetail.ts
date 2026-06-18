import { useState, useEffect, useCallback } from 'react';
import { aduanApi } from '../api/aduan.api';
import type { AduanDetailData } from '../types/aduan.types';

export const useAduanDetail = (complaintId: number | undefined) => {
  const [detail, setDetail] = useState<AduanDetailData | null>(null);
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDetail = useCallback(async () => {
    if (!complaintId) {
      setError("id aduan tidak valid"); // Set error state jika ID tidak valid
      return
    };
    
    setIsLoadingDetail(true);
    setError(null);
    try {
      const data = await aduanApi.getComplaintDetail(complaintId);
      setDetail(data);
    } catch (er: any) {
      console.error("Gagal mengambil detail aduan", er);
      setError("Gagal mengambil detail aduan");
    } finally {
      setIsLoadingDetail(false);
    }
  }, [complaintId]);

  // Otomatis tarik data detail saat component mount atau ID berubah
  useEffect(() => {
    fetchDetail();
  }, [fetchDetail]);

  return {
    detail,
    isLoadingDetail,
    error,
    refetchDetail: fetchDetail
  };
};