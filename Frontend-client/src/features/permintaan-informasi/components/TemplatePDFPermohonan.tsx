import { forwardRef } from "react";
import type { FormDataPermohonan } from "../types/permohonan.type"; 
import logoBank from "../../../assets/logo2.png";

interface TemplateProps {
  data: FormDataPermohonan | null;
  ticketCode: string | null; // Tambahkan prop ini
}

const TemplatePDFPermohonan = forwardRef<HTMLDivElement, TemplateProps>(
  ({ data, ticketCode }, ref) => {
    if (!data) return null;

    const getTodayDate = () => {
      return new Date().toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    };

    const namaPemohon = data.name || "";
    const kontakPemohon = [data.phone, data.email].filter(Boolean).join(" / ");

    return (
      <div
        ref={ref}
        className="w-[210mm] min-h-[297mm] bg-white pt-[0mm] px-[20mm] pb-[20mm] text-black font-serif mx-auto box-border leading-relaxed"
      >
        {/* HEADER / KOP SURAT */}
        <div className="flex items-center border-b-[3px] border-black pb-3">
          <div className="w-[240px] flex-shrink-0 mr-4">
            <img
              src={logoBank}
              alt="Logo Bank Karanganyar"
              className="w-full h-auto object-contain"
            />
          </div>
          <div className="flex-1 text-center space-y-0 mt-2">
            <h1 className="font-bold text-[18px] uppercase">
              PT BPR BANK KARANGANYAR (PERSERODA)
            </h1>
            <p className="text-[13px] font-bold">
              Jl. Lawu Timur no 135 Karanganyar
            </p>
            <p className="text-[13px] font-bold">
              Telp. (0271) 495489, (0271) 494666
            </p>
            <p className="text-[13px]">Email: info@bankkaranganyar.co.id</p>
          </div>
        </div>
        <div className="border-b-[1px] border-black mt-[2px] mb-6"></div>

        {/* JUDUL FORMULIR */}
        <div className="text-center mt-4 mb-8">
          <h2 className="font-bold text-[16px] uppercase tracking-wide">
            FORMULIR PERMOHONAN INFORMASI
          </h2>
          <p className="text-[13px] mt-3 font-bold">
            No. Pendaftaran :{" "}
            {/* Tampilkan tiket jika ada, jika tidak tampilkan titik-titik */}
            {ticketCode ? (
              <span className="text-blue-900 ml-1">{ticketCode}</span>
            ) : (
              "........................................"
            )}
          </p>
        </div>

        {/* ISI FORMULIR */}
        <div className="text-[13px]">
          <div className="">
            <table className="w-full">
              <tbody>
                <tr>
                  <td className="w-[230px] py-3.5 align-top">Nama</td>
                  <td className="w-[15px] py-3.5 align-top">:</td>
                  <td className="py-3.5 align-top">
                    {namaPemohon || ".................................................................................................................."}
                  </td>
                </tr>
                <tr>
                  <td className="w-[230px] py-3.5 align-top">Alamat</td>
                  <td className="w-[15px] py-3.5 align-top">:</td>
                  <td className="py-3.5 align-top text-justify whitespace-pre-wrap">
                    {data.address || "..................................................................................................................\n.................................................................................................................."}
                  </td>
                </tr>
                <tr>
                  <td className="w-[230px] py-3.5 align-top">Pekerjaan</td>
                  <td className="w-[15px] py-3.5 align-top">:</td>
                  <td className="py-3.5 align-top">
                    {data.job || ".................................................................................................................."}
                  </td>
                </tr>
                <tr>
                  <td className="w-[230px] py-3.5 align-top">
                    Nomor Telepon/Email
                  </td>
                  <td className="w-[15px] py-3.5 align-top">:</td>
                  <td className="py-3.5 align-top">
                    {kontakPemohon || "..................................................................................................................\n.................................................................................................................."}
                  </td>
                </tr>
                <tr>
                  <td className="w-[230px] py-3.5 align-top">
                    Rincian Informasi yang dibutuhkan
                  </td>
                  <td className="w-[15px] py-3.5 align-top">:</td>
                  <td className="py-3.5 align-top text-justify whitespace-pre-wrap leading-relaxed">
                    {data.infoDetail || "..................................................................................................................\n..................................................................................................................\n..................................................................................................................\n.................................................................................................................."}
                  </td>
                </tr>
                <tr>
                  <td className="w-[230px] py-3.5 align-top">
                    Tujuan Penggunaan Informasi
                  </td>
                  <td className="w-[15px] py-3.5 align-top">:</td>
                  <td className="py-3.5 align-top text-justify whitespace-pre-wrap leading-relaxed">
                    {data.purpose || "..................................................................................................................\n..................................................................................................................\n..................................................................................................................\n.................................................................................................................."}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* AREA TANDA TANGAN */}
          <div className="break-inside-avoid pt-12 mt-16">
            <div className="text-right pr-[80px] mb-4">
              <p>Karanganyar , {getTodayDate()}</p>
            </div>
            <div className="flex justify-between px-10">
              <div className="w-[40%] flex flex-col items-center text-center">
                <p>Sistem Bank Karanganyar</p>
                <div className="mt-20 w-full flex flex-col items-center">
                  <p className="whitespace-nowrap">
                    {/* Tanda tangan elektronik/sistem */}
                    ( <span className="italic text-gray-500 font-sans text-[11px]">Tercatat secara elektronik</span> )
                  </p>
                </div>
              </div>
              <div className="w-[40%] flex flex-col items-center text-center">
                <p>Pemohon Informasi</p>
                <div className="mt-20 w-full flex flex-col items-center">
                  <p className="whitespace-nowrap">
                    ( 
                    {namaPemohon ? (
                      <span className="font-bold underline uppercase px-2">
                        {namaPemohon}
                      </span>
                    ) : (
                      "................................................"
                    )} 
                    )
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
);

TemplatePDFPermohonan.displayName = "TemplatePDFPermohonan";
export default TemplatePDFPermohonan;