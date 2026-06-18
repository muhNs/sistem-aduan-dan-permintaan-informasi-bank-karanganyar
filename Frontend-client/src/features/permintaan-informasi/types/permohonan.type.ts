export interface Nasabah {
  name: string;
  address: string;
  job?: string;
  phone?: string;
  email?: string;
}

export interface FormDataPermohonan extends Nasabah {
  infoDetail: string;
  purpose: string;
  // Tambahkan ini agar sinkron dengan API
  infoMethod?: string; 
  deliveryMethod?: string;
}