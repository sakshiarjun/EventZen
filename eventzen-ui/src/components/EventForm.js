import { useState, useEffect, use } from "react";
import { node } from "../services/api";

export default function EventForm({ onSave, selected }) {

  const [form, setForm] = useState({});
  const [venues, setVenues] = useState([]);

  useEffect(() => {

    node.get("/venues")
      .then(res => setVenues(res.data));

  }, []);

  useEffect(() => {

    if (selected) {
      setForm(selected);
    }

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
  const categories = ["Music", "Art", "Technology", "Food", "Sports", "Education", "Health", "Business", "Networking", "Other"];

  return (

    <div className="bg-white p-4 shadow mb-4">

      <input name="name"
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

      <select name="category"
        onChange={change}
        className="border m-1 p-2"
        value={form.category || ""}
      >
        <option value="" disabled>Select Category</option>
        {categories.map(category => (
          <option key={category} value={category}>{category}</option>
        ))}
      </select>

      <select
        name="venue_id"
        onChange={change}
        className="border m-1 p-2">

        <option>Select Venue</option>

        {venues.map(v => (

          <option
            key={v.id}
            value={v.id}
          >
            {v.name} - {v.city}
          </option>

        ))}

      </select>

      <input name="event_date"
        type="date"
        onChange={change}
        className="border m-1 p-2"
      />

      <input name="price"
        placeholder="Price"
        onChange={change}
        className="border m-1 p-2"
      />

      <input name="image_url"
        placeholder="Image URL"
        onChange={change}
        className="border m-1 p-2"
      />

      <button
        onClick={submit}
        className="bg-green-500 text-white px-4 py-2"
      >
        Save Event
      </button>

    </div>
  );
}