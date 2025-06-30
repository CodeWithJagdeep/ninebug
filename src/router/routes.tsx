import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import LoadingSpinner from "../components/common/LoadingSpinner";
import {ReactNode} from "react";



// Layout
const DashboardLayout=lazy(()=>import("@/layout/DashboardLayout"));
// Public Pages
const Home = lazy(() => import("@/Pages/Home"));
const Login = lazy(() => import("@/Pages/Auth/Login"));
const DSAInterviewPlatform=lazy (()=>import("@/components/interview/DSAInterview"));
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
        <Route path="/interview" element={<DSAInterviewPlatform />} />
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
