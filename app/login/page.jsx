"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
export default function Login() {
  const { login } = useAuth(); const router = useRouter();
  const [email, setEmail] = useState(""); const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  async function submit(e) {
    e.preventDefault(); setError("");
    try { await login(email, password); router.replace("/favorites"); router.refresh(); }
    catch(err) { setError(err.message); }
  }
  return <main className="panel narrow"><h1>Login</h1>
    <form onSubmit={submit}>
      <label>Email<input className="field" value={email} onChange={e => setEmail(e.target.value)} /></label>
      <label>Password<input className="field" type="password" value={password} onChange={e => setPassword(e.target.value)} /></label>
      <button className="button">Login</button>
      {error && <p className="error" role="alert">{error}</p>}
    </form></main>;
}