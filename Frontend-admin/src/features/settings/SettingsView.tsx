import { Save, Monitor, Building, Phone } from 'lucide-react';

export default function SettingsView() {
  return (
    <div className="p-6 md:p-8 max-w-full xl:max-w-6xl mx-auto space-y-8">
      
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800">Pengaturan Sistem</h2>
        <p className="text-gray-500 mt-1">Kelola informasi dan konten yang akan ditampilkan pada halaman nasabah.</p>
      </div>

      {/* Card Form Pengaturan */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        
        <div className="border-b border-gray-100 p-6 bg-gray-50/50">
          <h3 className="text-lg font-medium text-gray-800 flex items-center gap-2">
            <Monitor size={20} className="text-blue-600"/>
            Tampilan Halaman Nasabah
          </h3>
        </div>

        <div className="p-6 space-y-6">
          
          {/* Input Nama Instansi */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <Building size={16} className="text-gray-400" />
              Nama Instansi
            </label>
            <input 
              type="text" 
              defaultValue="PUD BPR Bank Karanganyar" 
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#f0a500] focus:border-transparent outline-none transition-all" 
            />
          </div>

          {/* Input Kontak (Grid 2 Kolom) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Phone size={16} className="text-gray-400" />
                Call Center
              </label>
              <input 
                type="text" 
                defaultValue="1500 - 123" 
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#f0a500] focus:border-transparent outline-none transition-all" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Support</label>
              <input 
                type="email" 
                defaultValue="cs@bankkaranganyar.co.id" 
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#f0a500] focus:border-transparent outline-none transition-all" 
              />
            </div>
          </div>

          {/* Input Alamat */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Alamat Kantor Pusat</label>
            <textarea 
              rows={3} 
              defaultValue="Jl. Lawu No. 123, Kabupaten Karanganyar, Jawa Tengah, Indonesia 57712" 
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#f0a500] focus:border-transparent outline-none transition-all"
            ></textarea>
          </div>

          {/* Input Pengumuman */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Teks Pengumuman (Banner)</label>
            <input 
              type="text" 
              placeholder="Misal: Info libur lebaran pelayanan bank..." 
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#f0a500] focus:border-transparent outline-none transition-all" 
            />
            <p className="text-xs text-gray-500 mt-2">*Teks ini akan muncul sebagai banner info di halaman depan nasabah.</p>
          </div>

          {/* Tombol Simpan */}
          <div className="flex justify-end pt-6 border-t border-gray-100">
            <button className="flex items-center gap-2 bg-[#f0a500] hover:bg-[#d49200] text-white px-6 py-2.5 rounded-lg font-medium transition-colors shadow-sm">
              <Save size={18} />
              Simpan Perubahan
            </button>
          </div>

        </div>
      </div>

    </div>
  );
}
