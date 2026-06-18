import SettingsForm from '../components/SettingsForm';

export default function SettingsView() {
  return (
    <div className="p-6 md:p-8 max-w-full xl:max-w-6xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-gray-800">Pengaturan Sistem</h2>
        <p className="text-gray-500 mt-1">Kelola informasi dan konten yang akan ditampilkan pada halaman nasabah.</p>
      </div>

      <SettingsForm />
    </div>
  );
}
