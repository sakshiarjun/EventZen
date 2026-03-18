import { useEffect,useState } from "react";
import { node } from "../services/api";
import MainLayout from "../layouts/MainLayout";

export default function Events(){

  const [data,setData]=useState([]);

  useEffect(()=>{

    node.get("/events").then(res=>{
      setData(res.data);
    });

  },[]);

  return(

    <MainLayout>

      <h2 className="text-xl font-bold mb-4">
        Events
      </h2>

      <div className="bg-white shadow rounded">

        {data.map(e=>(
          <div key={e.id} className="p-3 border">
            {e.name}
          </div>
        ))}

      </div>

    </MainLayout>

  );
}