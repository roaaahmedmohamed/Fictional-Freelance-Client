
import Sidebar from "../components/Sidebar";

import { Outlet } from "react-router-dom";
import TopHeader from "../components/TopHeader";

export default function DashboardLayout() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 flex flex-col md:ml-64">
        <TopHeader />
        <main className="p-6 bg-gray-900 min-h-screen">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

