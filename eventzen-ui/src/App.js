import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import MuiNavbar from "./components/MuiNavbar";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Venues from "./pages/Venues";
import Bookings from "./pages/Bookings";
import Vendors from "./pages/Vendors";
import Budget from "./pages/Budget";
import AdminDashboard from "./pages/AdminDashboard";
import AdminEvents from "./pages/AdminEvents";
import AdminVendors from "./pages/AdminVendors";
import AdminVenues from "./pages/AdminVenues";
import EventDetails from "./pages/EventDetails";
import PublicEvents from "./pages/PublicEvents";
import AdminBookings from "./pages/AdminBookings";
import Profile from "./pages/Profile";
import MyEvents from "./pages/MyEvents";
import AdminBudgets from "./pages/AdminBudgets";
import TicketPage from "./pages/TicketPage";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/venues" element={<Venues />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/vendors" element={<Vendors />} />
        <Route path="/budget" element={<Budget />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/events" element={<AdminEvents />} />
        <Route path="/admin/vendors" element={<AdminVendors />} />
        <Route path="/admin/venues" element={<AdminVenues />} />
        <Route path="/admin/bookings" element={<AdminBookings />} />
        <Route path="/event/:id" element={<EventDetails />} />
        <Route path="/events" element={<PublicEvents />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/my-events" element={<MyEvents />} />
        <Route path="/admin/budgets" element={<AdminBudgets />} />
        <Route path="/ticket/:bookingId/:index" element={<TicketPage />} />

      </Routes>

      {/* ✅ ADD HERE */}
      <ToastContainer position="top-right" />

    </BrowserRouter>
  );
}

export default App;