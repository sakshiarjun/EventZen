import { Link } from "react-router-dom";

function Dashboard() {

  return (

    <div>

      <h2>Dashboard</h2>

      <Link to="/events">Events</Link><br/>
      <Link to="/venues">Venues</Link><br/>
      <Link to="/bookings">Bookings</Link><br/>
      <Link to="/vendors">Vendors</Link><br/>
      <Link to="/budget">Budget</Link><br/>
      <Link to="/admin">Admin</Link><br/>

    </div>
  );
}

export default Dashboard;