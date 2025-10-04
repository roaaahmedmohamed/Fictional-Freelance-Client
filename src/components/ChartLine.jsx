import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { month: "Jan", users: 100, revenue: 50 },
  { month: "Feb", users: 120, revenue: 80 },
  { month: "Mar", users: 150, revenue: 90 },
  { month: "Apr", users: 170, revenue: 110 },
  { month: "May", users: 180, revenue: 130 },
  { month: "Jun", users: 200, revenue: 150 },
];

export default function ChartLine() {
  return (
    <div className="bg-gradient-to-b from-gray-800 to-gray-900 p-6 rounded-3xl shadow-2xl">
      <h3 className="text-gray-100 mb-6 text-xl font-bold">Statistics</h3>
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data} margin={{ top: 10, right: 20, left: -10, bottom: 10 }}>
          <defs>
            <linearGradient id="usersGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.2} />
            </linearGradient>
            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#10b981" stopOpacity={0.2} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="4 4" stroke="#374151" />
          <XAxis dataKey="month" stroke="#9ca3af" tickLine={false} />
          <YAxis stroke="#9ca3af" tickLine={false} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#111827",
              border: "none",
              borderRadius: "10px",
              padding: "12px",
              color: "#f9fafb",
              fontWeight: "500",
            }}
            cursor={{ stroke: "rgba(255,255,255,0.1)", strokeWidth: 2 }}
          />
          <Line
            type="monotone"
            dataKey="users"
            stroke="url(#usersGradient)"
            strokeWidth={4}
            dot={{ r: 5, fill: "#3b82f6", stroke: "#fff", strokeWidth: 2 }}
            activeDot={{ r: 7, fill: "#60a5fa" }}
          />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="url(#revenueGradient)"
            strokeWidth={4}
            dot={{ r: 5, fill: "#10b981", stroke: "#fff", strokeWidth: 2 }}
            activeDot={{ r: 7, fill: "#34d399" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
