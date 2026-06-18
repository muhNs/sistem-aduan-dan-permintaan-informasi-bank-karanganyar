import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { publicServiceApi } from "../api/request.api";
import type { FormDataPermohonan } from "../types/permohonan.type.js";

export const usePermohonanForm = () => {
  const form = useForm<FormDataPermohonan>();
  const [isGenerating, setIsGenerating] = useState(false);
  const [ticketCode, setTicketCode] = useState<string | null>(null); // State baru untuk tiket
  const pdfRef = useRef<HTMLDivElement>(null);

  // Logika Generate PDF
  const generatePDF = async (namaPemohon: string, currentTicketCode: string) => {
    if (!pdfRef.current) return;
    
    const canvas = await html2canvas(pdfRef.current, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
    });

    const imgData = canvas.toDataURL("image/jpeg", 0.8);
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfW = 210;
    const pdfH = 297;
    const imgProps = pdf.getImageProperties(imgData);
    const totalImgHeight = (imgProps.height * pdfW) / imgProps.width;

    let heightLeft = totalImgHeight;
    let position = 0;

    pdf.addImage(imgData, "JPEG", 0, position, pdfW, totalImgHeight);
    heightLeft -= pdfH;

    while (heightLeft > 0.1) {
      position -= pdfH;
      pdf.addPage();
      pdf.addImage(imgData, "JPEG", 0, position, pdfW, totalImgHeight);
      heightLeft -= pdfH;
    }

    const safeName = namaPemohon ? namaPemohon.replace(/\s+/g, "_") : "Pemohon";
    
    // Opsional: Tambahkan nomor tiket di nama file PDF-nya
    pdf.save(`Permohonan_${currentTicketCode}_${safeName}.pdf`);
  };

  const onSubmit = async (data: FormDataPermohonan) => {
    setIsGenerating(true);
    try {
      // 1. Rakit Payload
      const apiPayload = {
        nasabah: {
          name: data.name,
          email: data.email || undefined,
          phone: data.phone || undefined,
          address: data.address,
          job: data.job || undefined,
        },
        request: {
          infoDetail: data.infoDetail,
          purpose: data.purpose || undefined,
          infoMethod: data.infoMethod || "Mendapatkan Salinan", 
          deliveryMethod: data.deliveryMethod || "Email / Online",
        }
      };

      // 2. Kirim API
      const response = await publicServiceApi.submitInformationRequest(apiPayload);
      const newTicketCode = response.data.ticketCode;

      // 3. Simpan tiket ke state agar masuk ke dalam template DOM
      setTicketCode(newTicketCode);

      // 4. Beri jeda 500ms agar DOM selesai me-render nomor tiket sebelum diambil gambarnya
      setTimeout(async () => {
        await generatePDF(data.name, newTicketCode);
        alert(`Permohonan berhasil dikirim! Nomor Tiket Anda: ${newTicketCode}\nDokumen PDF telah diunduh.`);
        
        // Reset state setelah selesai
        form.reset(); 
        setTicketCode(null);
        setIsGenerating(false);
      }, 500);

    } catch (error: any) {
      alert(`Gagal memproses permohonan: ${error.response?.data?.message || "Terjadi kesalahan server"}`);
      setIsGenerating(false);
    }
  };

  return {
    ...form,
    isGenerating,
    pdfRef,
    ticketCode, // Export state tiket ini untuk dikirim ke template
    submitHandler: form.handleSubmit(onSubmit),
  };
};