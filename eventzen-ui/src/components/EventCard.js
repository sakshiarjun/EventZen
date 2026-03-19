export default function EventCard({ event, onEdit, onDelete }) {

  return (

    <div className="bg-white shadow rounded overflow-hidden">

      <img
        src={event.image_url || "https://picsum.photos/300/200"}
      />

      <div className="p-3">

        <h3 className="font-bold">
          {event.name}
        </h3>

        <p>{event.city}</p>
        <p>{event.category}</p>
        <p>₹{event.price}</p>
        <p>{event.venue_name}</p>

        <div className="flex gap-2 mt-2">

          <button
            onClick={() => onEdit(event)}
            className="bg-blue-500 text-white px-3 py-1"
          >
            Edit
          </button>

          <button
            onClick={() => onDelete(event.id)}
            className="bg-red-500 text-white px-3 py-1"
          >
            Delete
          </button>

        </div>

      </div>

    </div>

  );
}