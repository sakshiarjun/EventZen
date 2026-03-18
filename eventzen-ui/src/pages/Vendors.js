import { useEffect, useState } from "react";
import { dotnet } from "../services/api";

function Vendors() {

  const [data,setData]=useState([]);

  useEffect(()=>{

    dotnet.get("/vendors").then(res=>{
      setData(res.data);
    });

  },[]);

  return (

    <div>

      <h2>Vendors</h2>

      {data.map(v=>(
        <div key={v.id}>
          {v.name}
        </div>
      ))}

    </div>
  );
}

export default Vendors;