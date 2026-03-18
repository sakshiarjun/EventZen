import { useEffect, useState } from "react";
import { node } from "../services/api";

function Events() {

  const [data,setData]=useState([]);

  useEffect(()=>{

    node.get("/events").then(res=>{
      setData(res.data);
    });

  },[]);

  return (

    <div>

      <h2>Events</h2>

      {data.map(e=>(
        <div key={e.id}>
          {e.name}
        </div>
      ))}

    </div>
  );
}

export default Events;