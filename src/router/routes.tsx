import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import LoadingSpinner from "../components/common/LoadingSpinner";
import PanelHeader from "../components/dashboard/Pannelheader";
import Sidebar from "../components/dashboard/Sidebar";
import {ReactNode} from "react";

type DashboardLayoutProps = {
  children: ReactNode;
};

// Layout
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


// Public Pages
const Home = lazy(() => import("@/Pages/Home"));
const Login = lazy(() => import("@/Pages/Auth/Login"));

// Dashboard Pages
const CodingPanelPage = lazy(() => import("@/Pages/Panel/Pannel"));
const DSAQuestionsDashboard = lazy(
  () => import("../components/dashboard/DSAQuestions")
);
const CodingDashboard = lazy(() => import("@/Pages/Dashboard/Dashboard"));
const CompanyRoadmap = lazy(
  () => import("../components/dashboard/CompanyRoadMap")
);

const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        {/* Public Routes */}

        <Route path="/" element={<Home />} />
        <Route path="/in/auth" element={<Login />} />

        {/* Problem Routes */}
        <Route path="/problem/:slug" element={<CodingPanelPage />} />

        {/* Dashboard Routes */}
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
    </Suspense>
  );
};

export default AppRoutes;
