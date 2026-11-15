"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/components/AuthProvider";

export default function Profile() {
  const { user, loading, refreshUser } = useAuth();         
  const [theme, setTheme] = useState("light");              
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {                                          
    if (user) setTheme(user.preferences?.theme || "light");
  }, [user]);

  async function save(e) {
    e.preventDefault(); setMessage(""); setError(""); setSaving(true);
    try {
      const r = await fetch("/api/preferences", {         
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ theme }),
      });
      if (!r.ok) {
        const d = await r.json().catch(() => ({}));
        throw new Error(d.message || "Could not save preference");
      }
      await refreshUser();                                  
      setMessage("Preference saved!");
    } catch (err) {
      setError(err.message);                                 
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <p>Checking user...</p>;
  if (!user) return <p>Login to view your profile.</p>;

  return <section className="panel"><h1>Profile</h1>
    <p>{user.displayName} ({user.email})</p>
    <p>Current saved preference: {user.preferences?.theme || "light"}</p>  
    <form onSubmit={save} className="row">
      <label htmlFor="theme">Theme</label>
      <select id="theme" className="field" value={theme} onChange={e => setTheme(e.target.value)}>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
      <button className="button" disabled={saving}>{saving ? "Saving..." : "Save"}</button>
    </form>
    {message && <p>{message}</p>}
    {error && <p className="error">{error}</p>}
  </section>;
}