import { useEffect, useState } from "react";
import { node } from "../services/api";

function Venues() {

  const [data,setData]=useState([]);

  useEffect(()=>{

    node.get("/venues").then(res=>{
      setData(res.data);
    });

  },[]);

  return (

    <div>

      <h2>Venues</h2>

      {data.map(v=>(
        <div key={v.id}>
          {v.name}
        </div>
      ))}

    </div>
  );
}

export default Venues;