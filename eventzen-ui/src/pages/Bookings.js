import { useEffect, useState } from "react";
import { spring } from "../services/api";
import Navbar from "../components/Navbar";

export default function Bookings() {

  const [data, setData] = useState([]);

  const user =
    JSON.parse(localStorage.getItem("user"));

  useEffect(() => {

    spring.get("/bookings")
      .then(res => {

        console.log(res.data); // debug

        const list =
          res.data.filter(
            x =>
              x.booking &&
              x.booking.userId === user.id
          );

        setData(list);

      });

  }, []);

  return (

    <div className="bg-gray-100 min-h-screen">

      <Navbar />

      <div className="max-w-6xl mx-auto p-4">

        <h2 className="text-2xl font-bold mb-4">
          My Bookings
        </h2>

        {data.map(b => (

          <div
            key={b.booking.id}
            className="bg-white shadow p-4 mb-4"
          >

            <h3>
              Booking #{b.booking.id}
            </h3>

            <p>
              Event: {b.booking.eventId}
            </p>

            <p>
              Tickets: {b.booking.attendeeCount}
            </p>

            <h4>Attendees</h4>

            {b.attendees &&
              b.attendees.map((a, i) => (

                <div key={i}>

                  {a.name}
                  <br/>
                  {a.email}
                  <br/>
                  {a.phone}

                </div>

              ))}

          </div>

        ))}

      </div>

    </div>

  );
}