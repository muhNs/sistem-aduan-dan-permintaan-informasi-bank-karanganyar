import { useState } from "react";
import { AduanSearchBar } from "../components/AduanSearchBar";
import { AduanTable } from "../components/AduanTable";
import { AduanPagination } from "../components/AduanPagination";
import { useAduan } from "../hooks/useAduan";
import type { Aduan } from "../types/aduan.types";
import { AduanDetail } from "./AduanDetail";

export const AduanList = () => {
  const {
    data,
    meta,
    isLoading,
    filters,
    handlePageChange,
    handleStatusFilter,
    handleSearch,
    handleStatusChange,
    refetch
  } = useAduan();

  // State untuk modal/detail
  const [selectedAduan, setSelectedAduan] = useState<Aduan | null>(null);
  // const [data, setData ] = useState<Aduan> | null>(null);
  // const id = selectedAduan?.id;

  const handleExport = () => {
    // Fungsi export bisa menggunakan data API getAll yang disesuaikan
    alert("Fungsi export dijalankan!");
  };

  // Jika user memilih baris, render komponen Detail (Asumsi Anda sudah memiliki komponen ini)
  if (selectedAduan) {
    return (
      <AduanDetail
        item={selectedAduan}
        onClose={() => setSelectedAduan(null)}
        onStatusChange={async (newStatus) => {
          await handleStatusChange(selectedAduan.id, newStatus);
          // Update selectedAduan dengan status baru
          setSelectedAduan((prev) =>
            prev ? { ...prev, status: newStatus } : null,
          );
        }}
        onSuccessResolve={() => {
          refetch(); // Ambil ulang data dari backend agar status di tabel berubah jadi Selesai
          setSelectedAduan(null); // Tutup halaman detail
        }}
      />
    );
  }

  return (
    <div className="p-6 bg-[#f4f7fb] min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Daftar Aduan</h1>
        <p className="text-gray-500 text-sm mt-1">
          Kelola dan cari data pengaduan nasabah
        </p>
      </div>

      <AduanSearchBar
        search={filters.search || ""}
        filterStatus={filters.status || "Semua"}
        onSearch={handleSearch}
        onFilter={handleStatusFilter}
        onExport={handleExport}
      />

      <AduanTable
        data={data}
        isLoading={isLoading}
        onSelectAduan={setSelectedAduan}
      />

      <AduanPagination meta={meta} onPageChange={handlePageChange} />
    </div>
  );
};
