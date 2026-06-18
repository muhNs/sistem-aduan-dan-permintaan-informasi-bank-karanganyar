export interface StatData {
  id: string;
  title: string;
  value: number;
  type: 'total' | 'proses' | 'selesai' | 'ditolak';
}