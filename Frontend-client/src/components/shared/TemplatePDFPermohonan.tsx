import { forwardRef } from "react";
import type { FormDataPermohonan } from "../../features/permintaan-informasi/components/FormPermohonan";
import logoBank from "../../assets/logo2.png";

interface TemplateProps {
  data: FormDataPermohonan | null;
}

const TemplatePDFPermohonan = forwardRef<HTMLDivElement, TemplateProps>(
  ({ data }, ref) => {
    if (!data) return null;

    const getTodayDate = () => {
      return new Date().toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    };

    const namaPemohon = data.nama || "";

    // Komponen Checkbox presisi sesuai gambar (Kotak dengan garis tegas)
    const CheckIcon = ({ checked }: { checked: boolean }) => (
      <div className="w-[16px] h-[16px] border-[1.5px] border-black flex items-center justify-center mr-3 bg-white flex-shrink-0">
        {checked && (
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="black"
            strokeWidth="4"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </div>
    );

    return (
      <div
        ref={ref}
        className="w-[210mm] min-h-[297mm] bg-white pt-[0mm] px-[20mm] pb-[20mm] text-black font-serif mx-auto box-border leading-relaxed"
      >
        {/* ========================================================= */}
        {/* HEADER / KOP SURAT (Dengan Double Line sesuai gambar) */}
        {/* ========================================================= */}
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
        {/* Garis Tipis di Bawah Header */}
        <div className="border-b-[1px] border-black mt-[2px] mb-6"></div>

        {/* ========================================================= */}
        {/* JUDUL FORMULIR */}
        {/* ========================================================= */}
        <div className="text-center mt-4 mb-8">
          <h2 className="font-bold text-[16px] uppercase tracking-wide">
            FORMULIR PERMOHONAN INFORMASI
          </h2>
          <p className="text-[13px] mt-3 font-bold">
            No. Pendaftaran{" "}
            <em className="text-[11px] font-normal italic">(diisi petugas)*</em>{" "}
            : ........................................
          </p>
        </div>

        {/* ========================================================= */}
        {/* ISI FORMULIR (Layout renggang menggunakan padding py-3.5) */}
        {/* ========================================================= */}
        <div className="text-[13px]">
          <table className="w-full">
            <tbody>
              <tr>
                <td className="w-[230px] py-3.5 align-top">Nama</td>
                <td className="w-[15px] py-3.5 align-top">:</td>
                <td className="py-3.5 align-top">
                  {namaPemohon
                    ? namaPemohon
                    : ".................................................................................................................."}
                </td>
              </tr>
              <tr>
                <td className="w-[230px] py-3.5 align-top">Alamat</td>
                <td className="w-[15px] py-3.5 align-top">:</td>
                <td className="py-3.5 align-top text-justify whitespace-pre-wrap">
                  {data.alamat
                    ? data.alamat
                    : "..................................................................................................................\n.................................................................................................................."}
                </td>
              </tr>
              <tr>
                <td className="w-[230px] py-3.5 align-top">Pekerjaan</td>
                <td className="w-[15px] py-3.5 align-top">:</td>
                <td className="py-3.5 align-top">
                  {data.pekerjaan
                    ? data.pekerjaan
                    : ".................................................................................................................."}
                </td>
              </tr>
              <tr>
                <td className="w-[230px] py-3.5 align-top">
                  Nomor Telepon/Email
                </td>
                <td className="w-[15px] py-3.5 align-top">:</td>
                <td className="py-3.5 align-top">
                  {data.kontak
                    ? data.kontak
                    : "..................................................................................................................\n.................................................................................................................."}
                </td>
              </tr>
              <tr>
                <td className="w-[230px] py-3.5 align-top">
                  Rincian Informasi yang dibutuhkan
                  <br />
                  <em className="text-[10px] italic">
                    (tambahkan kertas bila perlu)
                  </em>
                </td>
                <td className="w-[15px] py-3.5 align-top">:</td>
                <td className="py-3.5 align-top text-justify whitespace-pre-wrap leading-relaxed">
                  {data.rincian
                    ? data.rincian
                    : "..................................................................................................................\n..................................................................................................................\n..................................................................................................................\n.................................................................................................................."}
                </td>
              </tr>
              <tr>
                <td className="w-[230px] py-3.5 align-top">
                  Tujuan Penggunaan Informasi
                </td>
                <td className="w-[15px] py-3.5 align-top">:</td>
                <td className="py-3.5 align-top text-justify whitespace-pre-wrap leading-relaxed">
                  {data.tujuan
                    ? data.tujuan
                    : "..................................................................................................................\n..................................................................................................................\n..................................................................................................................\n.................................................................................................................."}
                </td>
              </tr>

              {/* CHECKBOX: Cara Memperoleh Informasi */}
              <tr>
                <td className="w-[230px] py-3.5 align-top">
                  Cara Memperoleh Informasi**
                </td>
                <td className="w-[15px] py-3.5 align-top">:</td>
                <td className="py-3.5 align-top space-y-3">
                  <div className="flex items-center">
                    <div className="w-[20px]">1.</div>
                    <CheckIcon
                      checked={data.caraMemperoleh.includes("Melihat")}
                    />
                    <div>Melihat/membaca/mendengarkan/mencatat***</div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-[20px]">2.</div>
                    <CheckIcon
                      checked={data.caraMemperoleh.includes("salinan")}
                    />
                    <div>
                      Mendapatkan salinan informasi (hardcopy/softcopy)***
                    </div>
                  </div>
                </td>
              </tr>

              {/* CHECKBOX: Cara Mendapatkan Salinan */}
              <tr>
                <td className="w-[230px] py-3.5 align-top">
                  Cara Mendapatkan Salinan Informasi**
                </td>
                <td className="w-[15px] py-3.5 align-top">:</td>
                <td className="py-3.5 align-top space-y-3">
                  {[
                    "Mengambil Langsung",
                    "Kurir",
                    "Pos",
                    "Faksimili",
                    "Email",
                  ].map((opt, i) => (
                    <div key={opt} className="flex items-center">
                      <div className="w-[20px]">{i + 1}.</div>
                      <CheckIcon checked={data.caraSalinan === opt} />
                      <div>{opt}</div>
                    </div>
                  ))}
                </td>
              </tr>
            </tbody>
          </table>

          {/* ========================================================= */}
          {/* AREA TANDA TANGAN */}
          {/* ========================================================= */}
          <div className="break-inside-avoid pt-12">
            {/* Baris Tanggal */}
            <div className="text-right pr-[80px] mb-8">
              <p>Karanganyar , {getTodayDate()}</p>
            </div>

            {/* Baris Tanda Tangan */}
            <div className="flex justify-between px-10">
              <div className="w-[40%] flex flex-col items-center text-center">
                <p>Petugas Pelayan Informasi</p>
                <div className="mt-20 w-full flex flex-col items-center">
                  <p className="whitespace-nowrap">
                    ( ................................................ )
                  </p>
                </div>
              </div>

              <div className="w-[40%] flex flex-col items-center text-center">
                <p>Pemohon Informasi</p>
                <div className="mt-20 w-full flex flex-col items-center">
                  <p className="whitespace-nowrap">
                    ({" "}
                    {namaPemohon ? (
                      <span className="font-bold underline uppercase px-2">
                        {namaPemohon}
                      </span>
                    ) : (
                      "................................................"
                    )}{" "}
                    )
                  </p>
                </div>
              </div>
            </div>

            {/* KETERANGAN FOOTER */}
            <div className="mt-16 text-[10px] leading-snug text-gray-800">
              Keterangan : <br />
              *'Diisi oleh petugas berdasarkan nomor registrasi permohonan
              informasi publik <br />
              **'Pilih salah satu dengan memberi tanda (v) <br />
              ***'Coret yang tidak perlu
            </div>
          </div>
        </div>
      </div>
    );
  },
);

TemplatePDFPermohonan.displayName = "TemplatePDFPermohonan";
export default TemplatePDFPermohonan;
