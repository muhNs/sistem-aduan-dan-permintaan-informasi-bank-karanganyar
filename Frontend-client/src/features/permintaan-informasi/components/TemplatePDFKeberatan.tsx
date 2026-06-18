import { forwardRef } from "react";
import logo2 from "../../../assets/logo2.png";

interface KeberatanData {
  nomorPendaftaran: string;
  tujuanPenggunaan: string;
  pemohon: { nama: string; alamat: string; pekerjaan: string; telepon: string };
  kuasa: { nama: string; alamat: string; pekerjaan: string; telepon: string };
  alasan: string;
  kasusPosisi: string;
}

interface TemplateProps {
  data: KeberatanData;
}

const TemplatePDFKeberatan = forwardRef<HTMLDivElement, TemplateProps>(
  ({ data }, ref) => {
    const getTodayDate = () => {
      return new Date().toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    };

    return (
      <div
        ref={ref}
        className="w-[210mm] min-h-[297mm] bg-white pt-[0mm] px-[20mm] pb-[20mm] text-black font-serif mx-auto box-border"
      >
        {/* HEADER / KOP SURAT */}
        <div className="flex items-center border-b-4 border-black pb-4 mb-2">
          <div className="w-[240px] flex-shrink-0 mr-4">
            <img
              src={logo2}
              alt="Logo Bank Karanganyar"
              className="w-full h-auto object-contain"
            />
          </div>

          <div className="flex-1 text-center space-y-0.5 mt-2">
            <h1 className="font-bold text-[18px] uppercase">
              PT BPR BANK KARANGANYAR (PERSERODA)
            </h1>
            <p className="text-[13px]">Jl. Lawu Timur no 135 Karanganyar</p>
            <p className="text-[13px]">Telp. (0271) 495489, (0271) 494666</p>
            <p className="text-[13px]">Email: info@bankkaranganyar.co.id</p>
          </div>
        </div>

        {/* JUDUL FORMULIR */}
        <div className="text-center mb-8">
          <h2 className="font-bold text-[16px] underline">
            FORMULIR KEBERATAN
          </h2>
          <p className="text-[12px] italic">(rangkap 2)</p>
          <h3 className="font-bold text-[14px] mt-4 uppercase">
            Pernyataan Keberatan atas Permohonan Informasi
          </h3>
        </div>

        {/* ISI FORMULIR */}
        <div className="text-[12px] space-y-4">
          {/* BAGIAN A */}
          <div className="space-y-3">
            <p className="font-bold">A. INFORMASI PENGAJU KEBERATAN</p>
            <table className="w-full ml-4">
              <tbody>
                {/* REVISI: Class "border-b border-dotted border-black" dihapus dari seluruh <td> inputan */}
                {/* Ini memastikan titik-titik murni dari teks fallback, yang akan lenyap sempurna saat diisi */}
                <tr>
                  <td className="w-[240px] py-1">
                    Nomor Pendaftaran Permohonan Informasi
                  </td>
                  <td className="w-[10px]">:</td>
                  <td className="px-2">
                    {data.nomorPendaftaran ||
                      "..........................................................................."}
                  </td>
                </tr>
                <tr>
                  <td className="py-1">Tujuan Penggunaan Informasi</td>
                  <td>:</td>
                  <td className="px-2">
                    {data.tujuanPenggunaan ||
                      "..........................................................................."}
                  </td>
                </tr>
                <tr>
                  <td colSpan={3} className="font-bold pt-3">
                    Identitas Pemohon
                  </td>
                </tr>
                <tr>
                  <td className="pl-6 py-1">Nama</td>
                  <td>:</td>
                  <td className="px-2">
                    {data.pemohon.nama ||
                      "..........................................................................."}
                  </td>
                </tr>
                <tr>
                  <td className="pl-6 py-1">Alamat</td>
                  <td>:</td>
                  <td className="px-2">
                    {data.pemohon.alamat ||
                      "..........................................................................."}
                  </td>
                </tr>
                <tr>
                  <td className="pl-6 py-1">Pekerjaan</td>
                  <td>:</td>
                  <td className="px-2">
                    {data.pemohon.pekerjaan ||
                      "..........................................................................."}
                  </td>
                </tr>
                <tr>
                  <td className="pl-6 py-1">Nomor Telepon</td>
                  <td>:</td>
                  <td className="px-2">
                    {data.pemohon.telepon ||
                      "..........................................................................."}
                  </td>
                </tr>
                <tr>
                  <td colSpan={3} className="font-bold pt-3">
                    Identitas Kuasa Pemohon
                  </td>
                </tr>
                <tr>
                  <td className="pl-6 py-1">Nama</td>
                  <td>:</td>
                  <td className="px-2">
                    {data.kuasa.nama ||
                      "..........................................................................."}
                  </td>
                </tr>
                <tr>
                  <td className="pl-6 py-1">Alamat</td>
                  <td>:</td>
                  <td className="px-2">
                    {data.kuasa.alamat ||
                      "..........................................................................."}
                  </td>
                </tr>
                <tr>
                  <td className="pl-6 py-1">Pekerjaan</td>
                  <td>:</td>
                  <td className="px-2">
                    {data.kuasa.pekerjaan ||
                      "..........................................................................."}
                  </td>
                </tr>
                <tr>
                  <td className="pl-6 py-1">Nomor Telepon</td>
                  <td>:</td>
                  <td className="px-2">
                    {data.kuasa.telepon ||
                      "..........................................................................."}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* BAGIAN B */}
          <div>
            <p className="font-bold mb-2">B. ALASAN PENGAJUAN KEBERATAN</p>
            <div className="ml-10 space-y-1">
              {[
                { id: "a", text: "Permohonan Informasi ditolak" },
                { id: "b", text: "Informasi berkala tidak disediakan" },
                { id: "c", text: "Permintaan informasi tidak ditanggapi" },
                {
                  id: "d",
                  text: "Permintaan informasi ditanggapi tidak sebagaimana yang diminta",
                },
                { id: "e", text: "Permintaan informasi tidak dipenuhi" },
                { id: "f", text: "Biaya yang dikenakan tidak wajar" },
                {
                  id: "g",
                  text: "Informasi yang disampaikan melebihi jangka waktu yang ditentukan",
                },
              ].map((item) => (
                <div key={item.id} className="flex gap-4">
                  <span className="w-4">{item.id}</span>
                  <span
                    className={
                      data.alasan !== item.text
                        ? "line-through opacity-30 italic"
                        : ""
                    }
                  >
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* BAGIAN C (Otomatis pindah ke halaman 2) */}
          <div className="break-before-page pt-8">
            <p className="font-bold mb-2">C. KASUS POSISI</p>
            <div className="ml-4 p-4 border border-dotted border-black min-h-[150px] italic">
              {data.kasusPosisi || "(Tuliskan detail kasus di sini)"}
            </div>
          </div>

          {/* BAGIAN D */}
          <div className="space-y-4 mt-8">
            <p className="font-bold">
              D. HARI/TANGGAL TANGGAPAN ATAS KEBERATAN AKAN DIBERIKAN
            </p>
            <p className="text-[11px] italic mt-[-10px]">
              (tanggal, bulan, tahun, diisi oleh petugas)
            </p>
            <p className="mt-4">
              Demikian keberatan ini saya sampaikan, atas perhatian dan
              tanggapannya, saya ucapkan terimakasih.
            </p>
          </div>

          {/* TANDA TANGAN */}
          <div className="flex justify-between pt-16">
            {/* KIRI - PETUGAS */}
            <div className="w-[45%] flex flex-col items-center text-center">
              <div className="h-[20px] mb-2"></div>
              <div className="h-[40px]">
                <p className="font-bold">Petugas Informasi</p>
                <p className="font-bold">(Penerima Keberatan)</p>
              </div>
              <div className="mt-16 w-full flex flex-col items-center">
                <p className="whitespace-nowrap">
                  ( ................................................ )
                </p>
                <p className="text-[12px]">Nama & Tanda Tangan</p>
              </div>
            </div>

            {/* KANAN - PENGAJU */}
            <div className="w-[45%] flex flex-col items-center text-center">
              <div className="h-[20px] mb-2">
                <p className="italic text-[12px]">
                  Karanganyar, {getTodayDate()}
                </p>
              </div>
              <div className="h-[40px]">
                <p className="font-bold">Pengaju Keberatan</p>
              </div>
              <div className="mt-16 w-full flex flex-col items-center">
                <p className="whitespace-nowrap">
                  ({" "}
                  {data.pemohon.nama ? (
                    <span className="font-bold underline uppercase px-2">
                      {data.pemohon.nama}
                    </span>
                  ) : (
                    "................................................"
                  )}{" "}
                  )
                </p>
                {!data.pemohon.nama && (
                  <p className="text-[12px]">Nama & Tanda Tangan</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
);

export default TemplatePDFKeberatan;
