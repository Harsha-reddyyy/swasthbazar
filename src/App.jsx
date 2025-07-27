import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Vendors from "./pages/Vendors";
import VendorForm from "./pages/VendorForm";
import Suppliers from "./pages/Suppliers";
import Signup from "./pages/signup"; // 👈 lowercase matches your filename
import Login from "./pages/login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <div className="pt-24 px-4 sm:px-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/vendors" element={<Vendors />} />
          <Route path="/vendor-form" element={<VendorForm />} />
          <Route path="/suppliers" element={<Suppliers />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
