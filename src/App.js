import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import Landing from "./components/Landing"; // new landing page

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [theme, setTheme] = useState("dark");

  // Sync token with localStorage
  useEffect(() => {
    if (!token) localStorage.removeItem("token");
  }, [token]);

  return (
  <div className={theme}>
    <Router>
      <Navbar token={token} setToken={setToken} theme={theme} setTheme={setTheme}/>

      <Routes>
        <Route path="/" element={!token ? <Landing /> : <Navigate to="/dashboard" />} />
        <Route path="/login" element={!token ? <Login setToken={setToken} /> : <Navigate to="/dashboard" />} />
        <Route path="/register" element={!token ? <Register /> : <Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  </div>
  );
}

export default App;
