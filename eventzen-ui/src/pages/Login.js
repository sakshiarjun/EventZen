import { useState } from "react";
import { spring } from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const nav = useNavigate();

  const login = async () => {

    const res = await spring.post("/auth/login", {
      email,
      password
    });

    localStorage.setItem("token", res.data);

    nav("/dashboard");
  };

  return (
    <div>

      <h2>Login</h2>

      <input
        placeholder="email"
        onChange={e => setEmail(e.target.value)}
      />

      <input
        placeholder="password"
        onChange={e => setPassword(e.target.value)}
      />

      <button onClick={login}>Login</button>

    </div>
  );
}

export default Login;