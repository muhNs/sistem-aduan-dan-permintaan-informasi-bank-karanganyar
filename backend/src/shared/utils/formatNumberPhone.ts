// Fungsi untuk membersihkan nomor HP
export const formatWhatsAppNumber = (phone: string): string => {
  // 1. Hapus semua karakter selain angka (spasi, strip, tanda plus, dll)
  let cleaned = phone.replace(/\D/g, '');

  // 2. Jika diawali dengan angka '0', ganti dengan '62'
  if (cleaned.startsWith('0')) {
    cleaned = '62' + cleaned.substring(1);
  }

  // 3. Jika kebetulan diawali dengan '8' (user lupa ketik 0), tambahkan '62'
  if (cleaned.startsWith('8')) {
    cleaned = '62' + cleaned;
  }

  return cleaned;
};