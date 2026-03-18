import { useNavigate } from "react-router-dom";

export default function UserEventCard({ event }) {

  const nav = useNavigate();

  return (

    <div
      onClick={() => nav("/event/" + event.id)}
      className="bg-white shadow rounded overflow-hidden cursor-pointer hover:scale-105 transition"
      >

      <img
        src={event.image_url || "https://picsum.photos/300/200"}
        alt=""
      />

      <div className="p-3">

        <h3 className="font-bold">
          {event.name}
        </h3>

        <p>{event.city}</p>

        <p>{event.category}</p>

        <p>₹ {event.price}</p>

      </div>

    </div>

  );
}