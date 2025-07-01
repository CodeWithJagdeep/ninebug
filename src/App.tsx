import { BrowserRouter as Router } from "react-router-dom";
import { Suspense } from "react";
import AppRoutes from "./router/routes";
import LoadingSpinner from "./components/common/LoadingSpinner";
import { InterviewTimerProvider } from "./Context/InterviewTimerContext";
function App() {
  return (
    <InterviewTimerProvider>
      <Router>
        <Suspense fallback={<LoadingSpinner />}>
          <AppRoutes />
        </Suspense>
      </Router>
    </InterviewTimerProvider>
  );
}

export default App;
