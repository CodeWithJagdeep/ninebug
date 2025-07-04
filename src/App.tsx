import { BrowserRouter } from "react-router-dom";
import { Suspense } from "react";
import AppRoutes from "./router/routes";
import LoadingSpinner from "./components/common/LoadingSpinner";
import { InterviewTimerProvider } from "./Context/InterviewTimerContext";

function App() {
  return (
    <BrowserRouter>
      <InterviewTimerProvider>
        <Suspense fallback={<LoadingSpinner />}>
          <AppRoutes />
        </Suspense>
      </InterviewTimerProvider>
    </BrowserRouter>
  );
}

export default App;
