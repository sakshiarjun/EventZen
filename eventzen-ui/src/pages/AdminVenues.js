import { useEffect, useState } from "react";
import { node } from "../services/api";

import Navbar from "../components/Navbar";
import VenueForm from "../components/VenueForm";
import VenueCard from "../components/VenueCard";

export default function AdminVenues() {

  const [venues, setVenues] = useState([]);

  const [selected, setSelected] = useState(null);

  const load = () => {

    node.get("/venues")
      .then(res => setVenues(res.data));

  };

  useEffect(() => {
    load();
  }, []);

  const save = async (data) => {

    if (data.id)
      await node.put("/venues", data);
    else
      await node.post("/venues", data);

    setSelected(null);

    load();
  };

  const remove = async (id) => {

    await node.delete("/venues/" + id);

    load();
  };

  return (

    <div className="bg-gray-100 min-h-screen">

      <Navbar />

      <div className="max-w-6xl mx-auto p-4">

        <h2 className="text-2xl font-bold">
          Manage Venues
        </h2>

        <VenueForm
          onSave={save}
          selected={selected}
        />

        <div className="grid md:grid-cols-3 gap-4">

          {venues.map(v => (

            <VenueCard
              key={v.id}
              venue={v}
              onEdit={setSelected}
              onDelete={remove}
            />

          ))}

        </div>

      </div>

    </div>

  );
}