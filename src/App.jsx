import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Onboarding from "./Pages/Onboarding/Onboarding";
import Home from "./Pages/Home/Home";
import Login from "./components/Login/Login";

const App = () => {
  const diam_details = localStorage.getItem("diam_wallet");

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            diam_details ? (
              <Login diam_details={diam_details} />
            ) : (
              <Onboarding />
            )
          }
        />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
