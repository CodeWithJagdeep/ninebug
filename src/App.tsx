import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { JSX, ReactNode, useEffect } from "react";
import PanelHeader from "./components/dashboard/Pannelheader";
import Sidebar from "./components/dashboard/Sidebar";
import Home from "./Pages/Home";
import Login from "./Pages/Auth/Login";
import CodingPanelPage from "./Pages/Panel/Pannel";
import { DSAQuestionsDashboard } from "./components/dashboard/DSAQuestions";
import CodingDashboard from "./Pages/Dashboard/Dashboard";
import CompanyRoadmap from "./components/dashboard/CompanyRoadMap";
import InterviewPanel from "./components/Interview/InterviewPanel";
import Checkout from "./Pages/Checkout/Checkout";
import CompanyBased from "./Pages/Company/CompanyPage";
import InterviewPre from "./components/Interview/InterviewPre";
import { useDispatch } from "react-redux";
import { fetchRoadmaps } from "./Container/reducer/slicers/roadmapSlicer";
import { AppDispatch } from "./Container/reducer/store";
import { RoadmapsPage } from "./Pages/Roadmaps/Roadmaps";
import Profile from "./Pages/Profile/Profile";
import RoadmapCreation from "./Pages/Roadmaps/CreateRoadmap";

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
  const dispatch = useDispatch<AppDispatch>(); // 👈 Strongly typed dispatch

  useEffect(() => {
    dispatch(fetchRoadmaps());
  }, [dispatch]);
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/in/auth" element={<Login />} />

        {/* Problem Routes */}
        <Route path="/problem/:slug" element={<CodingPanelPage />} />
        <Route
          path="/profile"
          element={
            <DashboardLayout>
              <Profile />{" "}
            </DashboardLayout>
          }
        />
        <Route path="/interview/onboard" element={<InterviewPre />} />
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
        <Route path="/roadmap" element={<RoadmapsPage />} />
        <Route path="/roadmap/create" element={<RoadmapCreation />} />
        <Route path="/in/pricing" element={<Checkout />} />
        <Route path="/in/interview" element={<InterviewPanel />} />
        <Route
          path="/in/dashboard/company/prep"
          element={
            <DashboardLayout>
              <CompanyBased />
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
      </Routes>
    </Router>
  );
}

export default App;
