import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { JSX, ReactNode } from "react";
import PanelHeader from "./components/dashboard/Pannelheader";
import Sidebar from "./components/dashboard/Sidebar";
import Home from "./Pages/Home";
import Login from "./Pages/Auth/Login";
import CodingPanelPage from "./Pages/Panel/Pannel";
import DSAQuestionsDashboard from "./components/dashboard/DSAQuestions";
import CodingDashboard from "./Pages/Dashboard/Dashboard";
import CompanyRoadmap from "./components/dashboard/CompanyRoadMap";

// ✅ Properly type the props for DashboardLayout
type DashboardLayoutProps = {
  children: ReactNode;
};

// Layout component for dashboard pages to avoid repetition
const DashboardLayout = ({ children }: DashboardLayoutProps) => (
  <div className="min-h-screen bg-black">
    <PanelHeader />
    <div className="flex items-start">
      <Sidebar />
      <div className="flex-1">
        <main className="p-6 space-y-4">{children}</main>
      </div>
    </div>
  </div>
);

// ✅ Type App as a React component
function App(): JSX.Element {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/in/auth" element={<Login />} />

        {/* Problem Routes */}
        <Route path="/problem/:slug" element={<CodingPanelPage />} />
        <Route
          path="/in/problems"
          element={
            <DashboardLayout>
              <DSAQuestionsDashboard />
            </DashboardLayout>
          }
        />

        {/* Dashboard Route with shared layout */}
        <Route
          path="/in/dashboard"
          element={
            <DashboardLayout>
              <CodingDashboard />
            </DashboardLayout>
          }
        />
        <Route
          path="/in/practice/company"
          element={
            <DashboardLayout>
              <CompanyRoadmap />
            </DashboardLayout>
          }
        />

        {/* Catch-all route for 404 */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
