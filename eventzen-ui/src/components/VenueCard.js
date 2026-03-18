export default function VenueCard({ venue, onEdit, onDelete }) {
    
  return (

    <div className="bg-white shadow rounded p-4">

      <h3 className="font-bold text-lg">
        {venue.name}
      </h3>

      <p>{venue.city}</p>

      <p>Capacity: {venue.capacity}</p>

      <p>₹ {venue.price}</p>

      <div className="flex gap-2 mt-3">

        <button
          onClick={() => onEdit(venue)}
          className="bg-blue-500 text-white px-3 py-1"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(venue.id)}
          className="bg-red-500 text-white px-3 py-1"
        >
          Delete
        </button>

      </div>

    </div>

  );
}