/**
 * Service khusus untuk menangani pengiriman pesan WhatsApp.
 * Di dunia nyata, ini bisa diintegrasikan dengan Message Broker (RabbitMQ/BullMQ).
 */
export const sendWhatsAppMessage = async (phone: string, message: string): Promise<void> => {
  try {
    // Validasi nomor telepon (ubah 08 menjadi 628 jika diperlukan API)
    let formattedPhone = phone;
    if (phone.startsWith('0')) {
      formattedPhone = '62' + phone.substring(1);
    }

    // TODO: Masukkan logika pemanggilan API Vendor WA di sini
    // const response = await axios.post('https://api.vendorwa.com/send', { target: formattedPhone, message });
    
    console.log(`[WA SERVICE SUCCESS] Pesan terkirim ke ${formattedPhone}: "${message}"`);
  } catch (error) {
    // Ingat: Jangan di-throw! Kita tidak ingin aplikasi crash jika WA gagal terkirim.
    // Cukup log error-nya untuk keperluan monitoring/debugging.
    console.error(`[WA SERVICE ERROR] Gagal mengirim pesan ke ${phone}:`, error);
  }
};