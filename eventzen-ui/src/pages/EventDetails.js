import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { node, spring } from "../services/api";

export default function EventDetails() {

  const { id } = useParams();

  const [event, setEvent] = useState({});
  const [tickets, setTickets] = useState(1);
  const [attendees, setAttendees] = useState([]);

  useEffect(() => {

    node.get("/events")
      .then(res => {

        const e =
          res.data.find(x => x.id == id);

        setEvent(e);
      });

  }, [id]);

  // generate attendee fields
  useEffect(() => {

    const arr = [];

    for (let i = 0; i < tickets; i++) {

      arr.push({
        name: "",
        email: ""
      });

    }

    setAttendees(arr);

  }, [tickets]);

  const changeAttendee = (i, field, value) => {

    const copy = [...attendees];

    copy[i][field] = value;

    setAttendees(copy);

  };

  const book = async () => {

    await spring.post("/bookings", {

      eventId: event.id,
      attendeeCount: tickets

    });

    alert("Booked");

  };

  return (

    <div className="p-6">

      <h2 className="text-2xl font-bold">

        {event.name}

      </h2>

      <img
        src={event.image_url}
        className="w-96"
      />

      <p>{event.description}</p>

      <p>{event.city}</p>

      <p>₹ {event.price}</p>

      <hr />

      <h3>Select Tickets</h3>

      <input
        type="number"
        value={tickets}
        onChange={e => setTickets(e.target.value)}
      />

      <h3>Attendees</h3>

      {attendees.map((a, i) => (

        <div key={i}>

          <input
            placeholder="Name"
            onChange={e =>
              changeAttendee(i, "name", e.target.value)
            }
          />

          <input
            placeholder="Email"
            onChange={e =>
              changeAttendee(i, "email", e.target.value)
            }
          />

        </div>

      ))}

      <button
        onClick={book}
        className="bg-red-500 text-white p-2"
      >
        Book
      </button>

    </div>

  );
}