// src/features/dashboard/pages/DashboardView.tsx
import { useEffect, useState } from 'react';
import StatCard from '../../../components/StatCard';
import type { StatData } from '../types/dashboard.types';
import DashboardHeader from '../components/DashboardHeader';
import DashboardRecentTable from '../components/DashboardRecentTable';
import { useAduan } from '../../aduan/hooks/useAduan';

export default function DashboardView() {
  // Panggil hook aduan. Secara default ini akan mengambil page 1, limit 10 (atau 5 sesuai default hook Anda)
  const { data, meta, isLoading } = useAduan();

  // State untuk menyimpan statistik
  const [statsData, setStatsData] = useState<StatData[]>([
    { id: '1', title: 'Total Pengaduan', value: 0, type: 'total' },
    { id: '2', title: 'Dalam Proses', value: 0, type: 'proses' },
    { id: '3', title: 'Selesai', value: 0, type: 'selesai' },
    { id: '4', title: 'Ditolak', value: 0, type: 'ditolak' },
  ]);

  // Simulasi perhitungan statistik (Idealnya ini didapat dari endpoint terpisah misal: GET /dashboard/stats)
  // Untuk saat ini, kita gunakan 'total' dari meta, dan hitung proporsi dari data yang diload.
  useEffect(() => {
    if (!isLoading && meta) {
       const prosesCount = data.filter(d => d.status === 'in_progress').length;
       const selesaiCount = data.filter(d => d.status === 'resolved').length;
       const ditolakCount = data.filter(d => d.status === 'closed').length;

       setStatsData([
        { id: '1', title: 'Total Pengaduan', value: meta.total, type: 'total' },
        { id: '2', title: 'Dalam Proses', value: prosesCount, type: 'proses' }, 
        { id: '3', title: 'Selesai', value: selesaiCount, type: 'selesai' },
        { id: '4', title: 'Ditolak', value: ditolakCount, type: 'ditolak' },
      ]);
    }
  }, [data, meta, isLoading]);

  // Ambil maksimal 5 data terbaru untuk tabel
  const recentPengaduan = data.slice(0, 5);

  return (
    <div className="p-6 md:p-8 max-w-full mx-auto space-y-8">
      <DashboardHeader
        title="Dashboard"
        subtitle="Selamat datang di sistem pengaduan Bank Karanganyar"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat) => (
          <StatCard key={stat.id} {...stat} />
        ))}
      </div>

      {/* Kirim data dan status loading ke tabel */}
      <DashboardRecentTable data={recentPengaduan} isLoading={isLoading} />
    </div>
  );
}