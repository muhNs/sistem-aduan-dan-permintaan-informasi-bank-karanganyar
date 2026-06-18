import { FileText, Clock, CheckCircle, XCircle } from "lucide-react";
import type { StatData } from "../features/dashboard/types/dashboard.types";

const styleConfig = {
  total: { icon: FileText, bg: "bg-[#1e293b]", text: "text-white" },
  proses: { icon: Clock, bg: "bg-yellow-500", text: "text-white" },
  selesai: { icon: CheckCircle, bg: "bg-green-700", text: "text-white" },
  ditolak: { icon: XCircle, bg: "bg-red-700", text: "text-white" },
};

export default function StatCard({ title, value, type }: StatData) {
  const config = styleConfig[type];
  const Icon = config.icon;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
      <div>
        <p className="text-gray-500 text-sm mb-1">{title}</p>
        <h3 className="text-3xl font-semibold text-gray-800">{value}</h3>
      </div>
      <div className={`p-3 rounded-xl ${config.bg} ${config.text}`}>
        <Icon size={24} />
      </div>
    </div>
  );
}
