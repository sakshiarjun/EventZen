import { useState, useEffect } from "react";

export default function VendorForm({ onSave, selected }) {

  const [form, setForm] = useState({
    name: "",
    service_Type: "",
    email: "",
    phone: "",
    city: "",
    price: ""
  });

  useEffect(() => {

    if (selected) {
      setForm(selected);
    }

  }, [selected]);

  const change = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };

  const submit = () => {
    onSave(form);
  };

  return (

    <div className="bg-white p-4 shadow rounded mb-4">

      <h3 className="font-bold mb-2">
        Vendor Form
      </h3>

      <input name="name"
        placeholder="Name"
        onChange={change}
        value={form.name}
        className="border p-2 m-1"
      />

      <input name="serviceType"
        placeholder="Service"
        onChange={change}
        value={form.serviceType}
        className="border p-2 m-1"
      />

      <input name="email"
        placeholder="Email"
        onChange={change}
        value={form.email}
        className="border p-2 m-1"
      />

      <input name="phone"
        placeholder="Phone"
        onChange={change}
        value={form.phone}
        className="border p-2 m-1"
      />

      <input name="city"
        placeholder="City"
        onChange={change}
        value={form.city}
        className="border p-2 m-1"
      />

      <input name="price"
        placeholder="Price"
        onChange={change}
        value={form.price}
        className="border p-2 m-1"
      />

      <button
        onClick={submit}
        className="bg-green-500 text-white px-4 py-2 mt-2"
      >
        Save
      </button>

    </div>

  );
}