import SummaryCard from "../components/SummaryCard";
import ChartBar from "../components/ChartBar";
import ChartLine from "../components/ChartLine";
import TableOrders from "../components/TableOrders";
import {
  FaProjectDiagram,
  FaDollarSign,
  FaTasks,
  FaChartLine,
} from "react-icons/fa";

export default function Overview() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 p-8 text-white space-y-10 relative overflow-hidden">
      {/* Subtle background glow effects */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-700/20 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-700/20 rounded-full blur-[150px]" />

      {/* === Header === */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 relative z-10">
        <h1 className="text-3xl font-semibold tracking-wide bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          Dashboard Overview
        </h1>
        <p className="text-gray-400 text-sm tracking-wide">
          Insights & Performance Summary
        </p>
      </div>

      {/* === Section: Top KPIs === */}
      <div className="relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <SummaryCard
            title="Total Projects"
            value="128"
            change="+8.5%"
            icon={<FaProjectDiagram className="text-blue-400 w-6 h-6" />}
            progress={75}
          />
          <SummaryCard
            title="Earnings"
            value="$24,500"
            change="+12.3%"
            icon={<FaDollarSign className="text-emerald-400 w-6 h-6" />}
            progress={60}
          />
          <SummaryCard
            title="Tasks Due"
            value="24"
            change="-4.2%"
            negative
            icon={<FaTasks className="text-rose-400 w-6 h-6" />}
            progress={40}
          />
          <SummaryCard
            title="Performance"
            value="58"
            change="+5%"
            icon={<FaChartLine className="text-violet-400 w-6 h-6" />}
            progress={50}
          />
        </div>
      </div>

      {/* === Section: Charts === */}
      <div className="relative z-10 space-y-4">
        <h2 className="text-xl font-semibold tracking-wide text-gray-200">
          Analytics Overview
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-3xl shadow-lg hover:shadow-2xl hover:scale-[1.01] transition-all duration-300">
            <ChartBar />
          </div>
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-3xl shadow-lg hover:shadow-2xl hover:scale-[1.01] transition-all duration-300">
            <ChartLine />
          </div>
        </div>
      </div>

      {/* === Section: Map + Orders === */}
      <div className="relative z-10 space-y-4">
        <h2 className="text-xl font-semibold tracking-wide text-gray-200">
          Global Activity & Recent Orders
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Map */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl hover:scale-[1.01] transition-all duration-300">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6042.132771333958!2d-73.968158324665!3d40.78255467138301!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2589a018531e3%3A0xb9df1f7387a94119!2sCentral%20Park!5e0!3m2!1sen!2sus!4v1759579178901!5m2!1sen!2sus"
              className="w-full h-[300px] md:h-[400px]"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            <p className="text-gray-400 text-sm text-center py-2">
              Central Park - NY
            </p>
          </div>

          {/* Orders Table */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-lg p-6 hover:shadow-2xl hover:scale-[1.01] transition-all duration-300">
            <TableOrders />
          </div>
        </div>
      </div>
    </div>
  );
}
