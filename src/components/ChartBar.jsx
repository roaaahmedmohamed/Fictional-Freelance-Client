import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { useEffect, useState } from "react";

const data = [
  { month: "Jan", sales: 300 },
  { month: "Feb", sales: 200 },
  { month: "Mar", sales: 400 },
  { month: "Apr", sales: 250 },
  { month: "May", sales: 450 },
  { month: "Jun", sales: 300 },
];

const COLORS = ["#3b82f6", "#60a5fa", "#2563eb", "#1d4ed8", "#3b82f6", "#2563eb"];

export default function ChartBar() {
  const [animateData, setAnimateData] = useState(data.map(d => ({ ...d, sales: 0 })));

 
  useEffect(() => {
    const timeout = setTimeout(() => setAnimateData(data), 200);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="bg-gradient-to-b from-gray-800 to-gray-900 p-6 rounded-3xl shadow-2xl">
      <h3 className="text-gray-100 mb-6 text-xl font-bold">Monthly Sales</h3>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          data={animateData}
          margin={{ top: 10, right: 20, left: -10, bottom: 10 }}
          barCategoryGap="25%"
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="month" stroke="#9ca3af" tickLine={false} />
          <YAxis stroke="#9ca3af" tickLine={false} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#111827",
              border: "none",
              borderRadius: "10px",
              padding: "10px",
              color: "#f9fafb",
              fontWeight: "500",
            }}
            cursor={{ fill: "rgba(59, 130, 246, 0.15)" }}
          />
          <Bar
            dataKey="sales"
            radius={[8, 8, 0, 0]}
            isAnimationActive={true}
            animationDuration={1200}
          >
            {animateData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={`url(#gradient-${index})`}
              />
            ))}
          </Bar>

         
          {animateData.map((entry, index) => (
            <defs key={index}>
              <linearGradient id={`gradient-${index}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={COLORS[index % COLORS.length]} stopOpacity={0.9}/>
                <stop offset="100%" stopColor={COLORS[index % COLORS.length]} stopOpacity={0.4}/>
              </linearGradient>
            </defs>
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
