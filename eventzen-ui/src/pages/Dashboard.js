import { useEffect, useState } from "react";
import { node } from "../services/api";

import Navbar from "../components/Navbar";
import Filters from "../components/Filters";
import UserEventCard from "../components/UserEventCard";

export default function Dashboard() {

  const [events, setEvents] = useState([]);

  useEffect(() => {

    node.get("/events")
      .then(res => setEvents(res.data));

  }, []);

  return (

    <div className="bg-gray-100 min-h-screen">

      <Navbar />

      <div className="max-w-7xl mx-auto flex gap-6 p-4">

        {/* Filters */}
        <Filters />

        {/* Events */}
        <div className="flex-1">

          <h2 className="text-2xl font-bold mb-4">
            Events in City
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            {events.map(e => (
              <UserEventCard
                key={e.id}
                event={e}
              />
            ))}

          </div>

        </div>

      </div>

    </div>
  );
}