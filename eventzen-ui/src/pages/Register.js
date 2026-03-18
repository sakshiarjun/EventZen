import { useState } from "react";
import { spring } from "../services/api";

function Register() {

  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

  const register = async () => {

    await spring.post("/auth/register",{
      name,
      email,
      password
    });

    alert("Registered");
  };

  return (

    <div>

      <h2>Register</h2>

      <input onChange={e=>setName(e.target.value)} placeholder="name"/>
      <input onChange={e=>setEmail(e.target.value)} placeholder="email"/>
      <input onChange={e=>setPassword(e.target.value)} placeholder="password"/>

      <button onClick={register}>Register</button>

    </div>
  );
}

export default Register;