import { useEffect, useState } from "react";
import { dotnet } from "../services/api";

import Navbar from "../components/Navbar";
import VendorCard from "../components/VendorCard";
import VendorForm from "../components/VendorForm";

export default function AdminVendors() {

  const [vendors, setVendors] = useState([]);

  const [selected, setSelected] = useState(null);

  const load = () => {

    dotnet.get("/vendors")
      .then(res => setVendors(res.data));

  };

  useEffect(() => {
    load();
  }, []);

  const save = async (data) => {

    if (data.id) {

      await dotnet.put("/vendors", data);

    } else {

      await dotnet.post("/vendors", data);

    }

    setSelected(null);

    load();
  };

  const remove = async (id) => {

    await dotnet.delete("/vendors/" + id);

    load();
  };

  return (

    <div className="bg-gray-100 min-h-screen">

      <Navbar />

      <div className="max-w-6xl mx-auto p-4">

        <h2 className="text-2xl font-bold mb-4">
          Manage Vendors
        </h2>

        <VendorForm
          onSave={save}
          selected={selected}
        />

        <div className="grid md:grid-cols-3 gap-4">

          {vendors.map(v => (

            <VendorCard
              key={v.id}
              vendor={v}
              onDelete={remove}
              onEdit={setSelected}
            />

          ))}

        </div>

      </div>

    </div>

  );
}