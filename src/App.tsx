import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import LeetCodeProblems from "./Pages/Problems";
import CodingPanelPage from "./Pages/Panel/Pannel";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/problem/:slug" element={<CodingPanelPage />} />
        <Route path="/problems" element={<LeetCodeProblems />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
