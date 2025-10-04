import ChartProgress from "./ChartProgress";

export default function SummaryCard({ title, value, change, negative, icon, progress }) {
  return (
    <div className="bg-gray-800 p-4 rounded-3xl shadow-2xl hover:shadow-3xl transition transform duration-200 flex flex-col items-center gap-2 min-h-[250px]">
      <div className="flex items-center gap-2">
        {icon && <div className="text-xl">{icon}</div>}
        <h3 className="text-gray-400 text-sm font-medium">{title}</h3>
      </div>
      <p className="text-2xl font-bold">{value}</p>
      {progress !== undefined && <div className="w-24 h-24"><ChartProgress value={progress} /></div>}
      {change && (
        <span className={`text-sm font-medium ${negative ? "text-red-400" : "text-green-400"}`}>
          {change}
        </span>
      )}
    </div>
  );
}
