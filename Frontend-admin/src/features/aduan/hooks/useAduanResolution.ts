import { useState, useEffect } from 'react';
import { aduanApi } from "../api/aduan.api";
import type { AdminResponseData } from "../types/aduan.types.js"

export const useAduanResolution = (complaintId: number) => {
  const [adminResponse, setAdminResponse] = useState<AdminResponseData | null>(null);
  const [isLoadingRespon, setIsLoadingRespon] = useState(true);

  // Jangan lupa update aduan.api.ts Anda dengan: 
  
  const fetchResolution = async () => {
    setIsLoadingRespon(true);
    try {
      const response = await aduanApi.getResolutionById(complaintId);
      setAdminResponse(response);
    } catch (error) {
      console.error("Gagal mengambil respon admin", error);
    } finally {
      setIsLoadingRespon(false);
    }
  };

  useEffect(() => {
    if (complaintId) {
      fetchResolution();
    }
  }, [complaintId]);

  return { 
    adminResponse, 
    isLoadingRespon, 
    refetchRespon: fetchResolution 
  };
};