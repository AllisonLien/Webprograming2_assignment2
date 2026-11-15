"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/components/AuthProvider";
export default function AdminPage() {
  const { user, loading } = useAuth();
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  useEffect(() => {
    if (user?.role !== "admin") return;
    fetch("/api/admin/users", { cache: "no-store" })
      .then(async r => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json(); })
      .then(d => setUsers(d.users))
      .catch(e => setMessage(e.message));
  }, [user?.id, user?.role]);
  if (loading) return <p>Checking session...</p>;
  if (!user) return <p>Login required.</p>;
  if (user.role !== "admin") return <p>403 – Admin only.</p>;
  return <section className="panel"><h1>User Directory (Admin)</h1>
    {message && <p className="error">{message}</p>}
    <ul>{users.map(u => <li key={u.id}>{u.displayName} · {u.role} · {u.status}</li>)}</ul>
  </section>;
}

