import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { publicAduanApi } from "../api/aduan.api";
import { attachmentApi } from "../../attachments/api/attachment.api.js"; 
import type { FormCreateAduan } from "../types/aduan.types";

export const useCreateAduan = () => {
  const form = useForm<FormCreateAduan>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [files, setFiles] = useState<File[]>([]); // State khusus untuk lampiran
  const pdfRef = useRef<HTMLDivElement>(null);

  const onSubmit = async (data: FormCreateAduan) => {
    setIsSubmitting(true);
    try {
      console.log("Submitting form with data:", data);
      console.log("Files to upload:", files.length);

      // 1. Rakit Payload Utama
      const apiPayload = {
        nasabah: {
          name: data.name,
          address: data.address,
          job: data.job || undefined,
          phone: data.phone || undefined,
          email: data.email || undefined,
        },
        complaint: {
          category: data.category,
          description: data.description,
        },
      };

      // 2. Kirim Data Aduan ke Server
      const response = await publicAduanApi.createComplaint(apiPayload);
      
      // Ambil ticketCode dan ID dari response.
      // Catatan: Pastikan Backend mengembalikan ID berupa angka (misal response.data.id). 
      // Kita gunakan fallback ke response.data.complaintId jika memang itu nama properti di Backend Anda.
      const ticketCode = response.data?.ticketCode;
      const complaintId = response.data?.complaintId;

      // 3. Jika ada lampiran dan aduan berhasil dibuat (punya ID), kirim file-nya
      if (files.length > 0 && complaintId) {
        console.log("Uploading attachments for complaintId:", complaintId);
        
        // 👈 MENGGUNAKAN API BARU: attachmentApi.uploadFiles
        // Pastikan complaintId dikonversi ke Number sesuai dengan tipe data di fungsi uploadFiles
        await attachmentApi.uploadFiles(files, Number(complaintId));
        
        console.log("Attachments uploaded successfully");
      } else {
        console.log(
          "Skipping upload: files.length =",
          files.length,
          "complaintId =",
          complaintId,
        );
      }

      // 4. Generate PDF Surat Aduan (Nanti diaktifkan)
      // await generatePDF(data.name, ticketCode);

      // 5. Notifikasi Sukses
      alert(`Aduan berhasil dikirim! Nomor Tiket Anda: ${ticketCode}`);

      // 6. Reset Form dan Hapus File yang sudah terpilih
      form.reset();
      setFiles([]);

    } catch (error: any) {
      console.error("Error submitting aduan:", error);
      alert(
        `Gagal mengirim aduan: ${error.response?.data?.message || "Terjadi kesalahan pada server"}`,
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    ...form,
    files,
    setFiles,
    isSubmitting,
    pdfRef,
    submitHandler: form.handleSubmit(onSubmit),
  };
};