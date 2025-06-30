import { Menu } from "lucide-react";
import { useState } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import PanelHeader from "../components/dashboard/Pannelheader";
import type { ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const openSidebar = () => setSidebarOpen(true);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Header - Higher z-index to stay above sidebar */}
      <div className="relative z-50">
        <PanelHeader />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col md:flex-row overflow-hidden">
        {/* Sidebar - Lower z-index than header */}
        <Sidebar
          isOpen={sidebarOpen}
          onClose={closeSidebar}
          onOpen={openSidebar}
        />

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-4 sm:p-6 space-y-4 pt-4 md:pt-6">
          {children}
        </main>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={closeSidebar}
        />
      )}
    </div>
  );
};

export default DashboardLayout;
