import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./auth/useAuth";  
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import ForgotPassword from "./pages/ForgotPassword";
import "./App.css";

function App() {

  const auth = useAuth();

  return (
    <Router basename="/Dictionary-App">
      <Routes>
        <Route path="/"       element={<Login auth={auth} />} />
        <Route path="/signup" element={<Signup auth={auth} />} />
        <Route path="/forgot" element={<ForgotPassword auth={auth} />} />
        <Route
          path="/home"
          element={auth.currentUser ? <Home auth={auth} /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}

export default App;