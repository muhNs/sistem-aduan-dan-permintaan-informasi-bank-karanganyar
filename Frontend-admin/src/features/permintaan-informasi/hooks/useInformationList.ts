import { useState, useEffect, useCallback } from 'react';
import { informationApi } from '../api/request.api';
import type { InfoRequest, InfoPaginationMeta } from '../types/information.types.js';

export const useInformationList = () => {
  const [data, setData] = useState<InfoRequest[]>([]);
  const [meta, setMeta] = useState<InfoPaginationMeta>({ page: 1, limit: 10, total: 0, totalPages: 1 });
  const [isLoading, setIsLoading] = useState(false);
  
  // State untuk menggabungkan semua parameter filter & search
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    status: 'Semua', // 'Semua' adalah nilai default UI, bukan nilai API
    search: ''
  });

  const fetchRequests = useCallback(async () => {
    setIsLoading(true);
    try {
      // Siapkan parameter. Jika status "Semua", jangan kirim parameter status ke backend
      const queryParams: any = {
        page: filters.page,
        limit: filters.limit,
      };

      if (filters.status && filters.status !== 'Semua') {
        queryParams.status = filters.status;
      }
      
      // Jika backend mendukung pencarian berdasarkan string (opsional)
      if (filters.search) {
        queryParams.search = filters.search;
      }

      const response = await informationApi.getAllRequests(queryParams);
      
      setData(response.data);
      setMeta(response.meta);
    } catch (error) {
      console.error("Gagal mengambil daftar permintaan informasi", error);
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  // Pantau perubahan filters, jika berubah otomatis panggil API
  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  // Fungsi-fungsi Handler untuk UI Components
  const handlePageChange = (newPage: number) => {
    setFilters(prev => ({ ...prev, page: newPage }));
  };

  const handleStatusFilter = (newStatus: string) => {
    setFilters(prev => ({ ...prev, status: newStatus, page: 1 })); // Reset ke halaman 1
  };

  const handleSearch = (newSearch: string) => {
    setFilters(prev => ({ ...prev, search: newSearch, page: 1 })); // Reset ke halaman 1
  };

  const handleExport = () => {
    // Logika export (misal menggunakan library xlsx atau trigger download endpoint backend)
    alert("Fitur Export ke CSV/Excel sedang disiapkan!");
  };

  return {
    data,
    meta,
    isLoading,
    filters,
    handlePageChange,
    handleStatusFilter,
    handleSearch,
    handleExport,
    refetch: fetchRequests // Berguna jika ingin me-refresh tabel secara manual dari luar
  };
};