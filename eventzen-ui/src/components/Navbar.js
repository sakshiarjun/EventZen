export default function Navbar() {
  return (
    <div className="bg-white shadow">

      <div className="max-w-7xl mx-auto flex items-center gap-4 p-3">

        {/* Logo */}
        <div className="text-2xl font-bold text-red-500">
          EventZen
        </div>

        {/* Search */}
        <input
          placeholder="Search events"
          className="flex-1 border rounded px-3 py-2"
        />

        {/* City */}
        <select className="border px-2 py-2 rounded">

          <option>Pune</option>
          <option>Mumbai</option>
          <option>Delhi</option>
          <option>Bangalore</option>
          <option>Hyderabad</option>

        </select>

        {/* Logout */}
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

    </div>
  );
}