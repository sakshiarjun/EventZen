import { useState, useEffect } from "react";

export default function VenueForm({ onSave, selected }) {

  const [form, setForm] = useState({});

  useEffect(() => {

    if (selected)
      setForm(selected);

  }, [selected]);

  const change = e => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };

  const submit = () => {

    onSave(form);

  };

const cities = ["Bangalore", "Mumbai", "Delhi", "Chennai", "Kolkata", "Hyderabad", "Pune", "Ahmedabad", "Jaipur", "Lucknow"];

  return (

    <div className="bg-white p-4 shadow mb-4">

      <input
        name="name"
        placeholder="Name"
        onChange={change}
        className="border m-1 p-2"
      />

      <select name="city"
        onChange={change}
        className="border m-1 p-2"
        value={form.city || ""}
      >
        <option value="" disabled>Select City</option>
        {cities.map(city => (
          <option key={city} value={city}>{city}</option>
        ))}
      </select>

      <input
        name="capacity"
        placeholder="Capacity"
        onChange={change}
        className="border m-1 p-2"
      />

      <input
        name="price"
        placeholder="Price"
        onChange={change}
        className="border m-1 p-2"
      />

      <button
        onClick={submit}
        className="bg-green-500 text-white px-4 py-2"
      >
        Save Venue
      </button>

    </div>

  );
}