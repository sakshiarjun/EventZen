import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

export default function AdminDashboard() {

  return (

    <div className="bg-gray-100 min-h-screen">

      <Navbar />

      <div className="max-w-6xl mx-auto p-4">

        <h2 className="text-2xl font-bold mb-4">
          Admin Panel
        </h2>

        <div className="grid md:grid-cols-3 gap-4">

          <Link to="/admin/events"
            className="bg-white p-6 shadow rounded">

            Manage Events

          </Link>

          <Link to="/admin/vendors"
            className="bg-white p-6 shadow rounded">

            Manage Vendors

          </Link>

          <Link to="/admin/budget"
            className="bg-white p-6 shadow rounded">

            Manage Budget

          </Link>

          <Link to="/admin/venues"
            className="bg-white p-6 shadow rounded">
            Manage Venues
          </Link>

        </div>

      </div>

    </div>
  );
}