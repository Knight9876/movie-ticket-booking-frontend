import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Movies from "./pages/Movies/Movies";
import Booking from "./pages/Booking/Booking";
import MyBookings from "./pages/MyBookings/MyBookings";
import Navbar from "./components/Navbar/Navbar";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  // Sync token changes (login/logout)
  const handleAuthChange = (newToken) => {
    if (newToken) {
      localStorage.setItem("token", newToken);
      setToken(newToken);
    } else {
      localStorage.removeItem("token");
      setToken(null);
    }
  };

  // Keep in sync across tabs
  useEffect(() => {
    const syncToken = () => setToken(localStorage.getItem("token"));
    window.addEventListener("storage", syncToken);
    return () => window.removeEventListener("storage", syncToken);
  }, []);

  return (
    <Router>
      {token && <Navbar onLogout={() => handleAuthChange(null)} />}

      <Routes>
        <Route
          path="/login"
          element={
            token ? (
              <Navigate to="/movies" replace />
            ) : (
              <Login onLogin={handleAuthChange} />
            )
          }
        />
        <Route
          path="/signup"
          element={
            token ? (
              <Navigate to="/movies" replace />
            ) : (
              <Signup onSignup={handleAuthChange} />
            )
          }
        />
        <Route
          path="/movies"
          element={token ? <Movies /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/booking/:id/:showtimeId"
          element={token ? <Booking /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/my-bookings"
          element={token ? <MyBookings /> : <Navigate to="/login" replace />}
        />
        <Route
          path="*"
          element={<Navigate to={token ? "/movies" : "/login"} replace />}
        />
      </Routes>
    </Router>
  );
}

export default App;
