import { useState, useEffect, useCallback } from "react";
import { aduanApi } from "../api/aduan.api";
import type {
  Aduan,
  GetAduanParams,
  AduanMeta,
  AduanStatusAPI,
} from "../types/aduan.types";

export const useAduan = () => {
  const [data, setData] = useState<Aduan[]>([]);
  const [meta, setMeta] = useState<AduanMeta>({
    page: 1,
    limit: 15,
    total: 0,
    totalPages: 1,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // State untuk Filter & Pagination
  const [filters, setFilters] = useState<GetAduanParams>({
    page: 1,
    limit: 15,
    status: "Semua",
    search: "",
  });

  const fetchAduan = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await aduanApi.getAllComplaints(filters);
      setData(response.data);
      setMeta(response.meta);
    } catch (err: any) {
      setError(err.response?.data?.message || "Gagal mengambil data aduan");
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  // Efek ini akan berjalan setiap kali nilai filter atau halaman berubah
  useEffect(() => {
    fetchAduan();
  }, [fetchAduan]);

  // Fungsi utilitas untuk mempermudah pembaruan state filter
  const handlePageChange = (newPage: number) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
  };

  const handleStatusFilter = (newStatus: string) => {
    setFilters((prev) => ({ ...prev, status: newStatus, page: 1 }));
  };

  const handleSearch = (keyword: string) => {
    setFilters((prev) => ({ ...prev, search: keyword, page: 1 }));
  };

  const handleStatusChange = useCallback(
    async (id: number, newStatus: AduanStatusAPI) => {
      try {
        await aduanApi.updateStatus(id, newStatus);
        // Update local state optimistically
        setData((prev) =>
          prev.map((item) =>
            item.id === id ? { ...item, status: newStatus } : item,
          ),
        );
        // Refetch to ensure data consistency
        fetchAduan();
      } catch (err: any) {
        setError(
          err.response?.data?.message || "Gagal mengupdate status aduan",
        );
      }
    },
    [fetchAduan],
  );

  return {
    data,
    meta,
    isLoading,
    error,
    filters,
    handlePageChange,
    handleStatusFilter,
    handleSearch,
    handleStatusChange,
    refetch: fetchAduan,
  };
};
