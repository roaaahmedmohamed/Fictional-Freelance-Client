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
    <div className="space-y-6">
      {/* Top KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <SummaryCard
          title="Total Projects"
          value="128"
          change="+8.5%"
          icon={<FaProjectDiagram className="text-blue-400 w-5 h-5" />}
          progress={75}
        />
        <SummaryCard
          title="Earnings"
          value="$24,500"
          change="+12.3%"
          icon={<FaDollarSign className="text-green-400 w-5 h-5" />}
          progress={60}
        />
        <SummaryCard
          title="Tasks Due"
          value="24"
          change="-4.2%"
          negative
          icon={<FaTasks className="text-red-400 w-5 h-5" />}
          progress={40}
        />
        <SummaryCard
          title="Performance"
          value="58"
          change="+5%"
          icon={<FaChartLine className="text-purple-400 w-5 h-5" />}
          progress={50}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartBar />
        <ChartLine />
      </div>

      {/* Map + TableOrders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Map */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300 flex flex-col min-h-[300px]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6042.132771333958!2d-73.968158324665!3d40.78255467138301!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2589a018531e3%3A0xb9df1f7387a94119!2sCentral%20Park!5e0!3m2!1sen!2sus!4v1759579178901!5m2!1sen!2sus"
            className="w-full h-full rounded-2xl"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>

          <p className="text-gray-400 text-sm text-center">Map Here</p>
        </div>

        {/* TableOrders */}
        <TableOrders />
      </div>
    </div>
  );
}
