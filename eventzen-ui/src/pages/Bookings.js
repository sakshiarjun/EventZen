import { useEffect, useState } from "react";
import { spring } from "../services/api";
import Navbar from "../components/Navbar";

export default function Bookings() {

  const [bookings, setBookings] = useState([]);

  const user =
    JSON.parse(localStorage.getItem("user"));

  useEffect(() => {

    load();

  }, []);

  const load = () => {

    spring.get("/bookings")
      .then(res => {

        // filter by user
        const list =
          res.data.filter(
            b => b.userId === user.id
          );

        setBookings(list);

      });

  };

  return (

    <div className="bg-gray-100 min-h-screen">

      <Navbar />

      <div className="max-w-6xl mx-auto p-4">

        <h2 className="text-2xl font-bold mb-4">

          My Bookings

        </h2>

        <div className="grid md:grid-cols-2 gap-4">

          {bookings.map(b => (

            <div
              key={b.id}
              className="bg-white shadow p-4 rounded"
            >

              <h3 className="font-bold">

                Booking ID: {b.id}

              </h3>

              <p>

                Event ID: {b.eventId}

              </p>

              <p>

                Tickets: {b.attendeeCount}

              </p>

              <p>

                Status: {b.status}

              </p>

            </div>

          ))}

        </div>

      </div>

    </div>

  );
}