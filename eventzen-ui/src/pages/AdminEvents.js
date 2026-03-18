import { useEffect, useState } from "react";
import { node } from "../services/api";

import Navbar from "../components/Navbar";
import EventForm from "../components/EventForm";
import EventCard from "../components/EventCard";

export default function AdminEvents() {

  const [events, setEvents] = useState([]);
  const [selected, setSelected] = useState(null);

  const load = () => {

    node.get("/events")
      .then(res => setEvents(res.data));

  };

  useEffect(() => {
    load();
  }, []);

  const save = async (data) => {

    if (data.id)
      await node.put("/events", data);
    else
      await node.post("/events", data);

    setSelected(null);
    load();
  };

  const remove = async (id) => {

    await node.delete("/events/" + id);

    load();
  };

  return (

    <div className="bg-gray-100 min-h-screen">

      <Navbar />

      <div className="max-w-6xl mx-auto p-4">

        <h2 className="text-2xl font-bold">
          Manage Events
        </h2>

        <EventForm
          onSave={save}
          selected={selected}
        />

        <div className="grid md:grid-cols-3 gap-4">

          {events.map(e => (

            <EventCard
              key={e.id}
              event={e}
              onEdit={setSelected}
              onDelete={remove}
            />

          ))}

        </div>

      </div>

    </div>
  );
}