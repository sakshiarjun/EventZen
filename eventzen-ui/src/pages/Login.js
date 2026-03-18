import { useState } from "react";
import { spring } from "../services/api";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {

  const nav = useNavigate();

  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

  const login = async () => {

    const res = await spring.post("/auth/login",{
      email,
      password
    });

    localStorage.setItem("user", JSON.stringify(res.data));

    if(res.data.role === "ADMIN")
    {
      nav("/admin");
    }
    else
    {
      nav("/dashboard");
    }
  };

  return (

    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">

      <h2 className="text-3xl font-bold mb-2 text-red-500">
        EventZen Login
      </h2>

      <div className="bg-white p-8 rounded-xl shadow w-96 border-2 border-red-500">

        <input
          placeholder="Email"
          className="w-full border p-2 mb-3"
          onChange={e=>setEmail(e.target.value)}
        />

        <input
          placeholder="Password"
          type="password"
          className="w-full border p-2 mb-3"
          onChange={e=>setPassword(e.target.value)}
        />

        <button
          onClick={login}
          className="w-full bg-red-500 text-white p-2 rounded"
        >
          Login
        </button>

        <Link to="/register">
          <p className="text-sm mt-3 text-center">
            Don't have an account? Register
          </p>
        </Link>

      </div>

    </div>
  );
}