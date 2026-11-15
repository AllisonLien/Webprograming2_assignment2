"use client";
import { createContext, useContext, useEffect, useState } from "react";
const AuthContext = createContext(null);
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  async function refreshUser() {
    try {
      const r = await fetch("/api/auth/me", { cache: "no-store" });
      const data = r.ok ? await r.json() : null;
      setUser(data?.user ?? null);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => { refreshUser(); }, []);
  useEffect(() => {
    document.body.dataset.theme = user?.preferences?.theme || "light";
  }, [user]);
  async function login(email, password) {
    const r = await fetch("/api/auth/login", { method: "POST",
      headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, password }) });
    const data = await r.json();
    if (!r.ok) throw new Error(data.message || "Login failed");
    setUser(data.user);

    return data.user;
  }
  async function logout() {
    const r = await fetch("/api/auth/logout", { method: "POST" });
    if (!r.ok) throw new Error("Logout failed");
    setUser(null);
  }
  return <AuthContext.Provider value={{ user, loading, login, logout, refreshUser }}>
        {children}</AuthContext.Provider>;
}
export function useAuth() { const v = useContext(AuthContext);
  if (!v) throw new Error("useAuth requires AuthProvider"); return v; }

