import { BrowserRouter as Router } from "react-router-dom";
import { Suspense } from "react";
import AppRoutes from "./router/routes";
import LoadingSpinner from "./components/common/LoadingSpinner";

function App() {
  return (
    <Router>
      <Suspense fallback={<LoadingSpinner />}>
        <AppRoutes />
      </Suspense>
    </Router>
  );
}

export default App;
