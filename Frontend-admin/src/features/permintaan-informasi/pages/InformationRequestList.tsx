import { useState } from 'react';
import InfoSearchBar from '../components/InfoSearchBar';
import InfoTable from '../components/InfoTable';
import InfoPagination from '../components/InfoPagination';
import InformationRequestDetail from './InformationRequestDetail';
import { useInformationList } from '../hooks/useInformationList';
import type { InfoRequest } from '../types/information.types';

export default function InformationRequestList() {
  // Panggil Custom Hook
  const { 
    data, meta, isLoading, filters, 
    handlePageChange, handleStatusFilter, handleSearch, handleExport, refetch 
  } = useInformationList();

  // State untuk mengontrol mode "List" vs "Detail"
  const [selectedRequest, setSelectedRequest] = useState<InfoRequest | null>(null);

  // Jika ada item yang dipilih, tampilkan halaman Detail
  if (selectedRequest) {
    return (
      <InformationRequestDetail
        requestId={selectedRequest.id}
        onClose={() => setSelectedRequest(null)}
        onSuccessProcess={() => {
          refetch(); // Ambil ulang data agar status di tabel berubah
        }}
      />
    );
  }

  // Jika tidak, tampilkan halaman Daftar/List
  return (
    <div className="p-4 md:p-6 bg-[#f4f7fb] min-h-screen">
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Permintaan Informasi</h1>
        <p className="text-gray-500 text-sm mt-1">
          Kelola data permohonan informasi publik dari nasabah dan masyarakat.
        </p>
      </div>

      {/* SEARCH BAR */}
      <InfoSearchBar
        search={filters.search}
        filterStatus={filters.status}
        onSearch={handleSearch}
        onFilter={handleStatusFilter}
        onExport={handleExport}
      />

      {/* TABLE */}
      <div className="overflow-hidden">
        <InfoTable
          data={data}
          isLoading={isLoading}
          onSelectRequest={setSelectedRequest}
        />
      </div>

      {/* PAGINATION */}
      <InfoPagination 
        meta={meta} 
        onPageChange={handlePageChange} 
      />
    </div>
  );
}