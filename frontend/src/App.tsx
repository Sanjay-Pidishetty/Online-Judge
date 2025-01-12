
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import AddProblem from "./pages/AddProblem";
import Home from "./pages/Home";
import ProblemList from "./pages/ProblemList";
import Navbar from "./components/Navbar";
import Compiler from "./pages/Compiler";

function App() {

  return (
    <Router>
      <Navbar />
      <div className="bg-gray-100 min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/problemList" element={<ProblemList />} />
          <Route path="/addProblem" element={<AddProblem />} />
          <Route path="/compiler" element={<Compiler />} />
        </Routes>
      </div>
    </Router>
  );
}



export default App
