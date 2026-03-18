import { useEffect,useState } from "react";
import { node } from "../services/api";
import MainLayout from "../layouts/MainLayout";

export default function Venues(){

  const [data,setData]=useState([]);

  useEffect(()=>{
    node.get("/venues").then(res=>{
      setData(res.data);
    });
  },[]);

  return(

    <MainLayout>

      <h2 className="text-xl font-bold mb-4">
        Venues
      </h2>

      {data.map(v=>(
        <div key={v.id}
         className="bg-white p-3 mb-2 shadow">
          {v.name}
        </div>
      ))}

    </MainLayout>

  );
}