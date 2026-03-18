import { Link } from "react-router-dom";

export default function MainLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <div className="w-64 bg-red-500 text-white hidden md:block">

        <div className="p-4 text-2xl font-bold">
          EventZen
        </div>

        <nav className="flex flex-col gap-2 p-4">

          <Link to="/dashboard">Dashboard</Link>
          <Link to="/events">Events</Link>
          <Link to="/venues">Venues</Link>
          <Link to="/bookings">Bookings</Link>
          <Link to="/vendors">Vendors</Link>
          <Link to="/budget">Budget</Link>
          <Link to="/admin">Admin</Link>

        </nav>

      </div>

      {/* Content */}
      <div className="flex-1">

        {/* Top bar */}
        <div className="bg-white shadow p-4 flex justify-between">

          <h1 className="font-bold text-lg">
            EventZen Dashboard
          </h1>

          <button
            onClick={() => {
              localStorage.clear();
              window.location = "/";
            }}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Logout
          </button>

        </div>

        <div className="p-6">
          {children}
        </div>

      </div>
    </div>
  );
}