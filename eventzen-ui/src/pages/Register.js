import { useState } from "react";
import { spring } from "../services/api";
import { Link } from "react-router-dom";

export default function Register() {

  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

  const register = async () => {

    await spring.post("/auth/register",{
      name,email,password
    });

    alert("Registered");
  };

  return (

    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">

      <h1 className="text-2xl font-bold mb-4 text-red-500">
        EventZen Register
      </h1>

      <div className="bg-white p-8 rounded-xl shadow w-96 border-2 border-red-500">

        <input className="w-full border p-2 mb-2"
          placeholder="Name"
          onChange={e=>setName(e.target.value)}
        />

        <input className="w-full border p-2 mb-2"
          placeholder="Email"
          onChange={e=>setEmail(e.target.value)}
        />

        <input className="w-full border p-2 mb-2"
          placeholder="Password"
          type="password"
          onChange={e=>setPassword(e.target.value)}
        />

        <button
          onClick={register}
          className="bg-red-500 text-white w-full p-2 rounded"
        >
          Register
        </button>

        <Link to="/">
          <p className="text-sm mt-3 text-center">
            Already have an account? Login
          </p>
        </Link>

      </div>

    </div>
  );
}