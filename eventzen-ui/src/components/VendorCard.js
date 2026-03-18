export default function VendorCard({ vendor, onDelete, onEdit }) {

  return (

    <div className="bg-white shadow rounded p-4">

      <h3 className="text-lg font-bold">
        {vendor.name}
      </h3>

      <p className="text-sm text-gray-500">
        {vendor.service_Type}
      </p>

      <p>Email: {vendor.email}</p>
      <p>Phone: {vendor.phone}</p>
      <p>City: {vendor.city}</p>
      <p>Price: ₹{vendor.price}</p>

      <div className="flex gap-2 mt-3">

        <button
          onClick={() => onEdit(vendor)}
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(vendor.id)}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Delete
        </button>

      </div>

    </div>

  );
}