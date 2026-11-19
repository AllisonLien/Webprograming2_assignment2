"use client";
/* ITE5425 — Mastery Assignment 2: My Art Explorer
 * I declare that this work is my own and conforms to Humber Academic Policy.
 * I have not copied or distributed another student's implementation.
 * I have disclosed all generative-AI assistance in ai-use.md.
 * Name: Yi-Chun Lien  Student ID: N01745009  Date: 2026-11-19
 */
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "@/components/AuthProvider";
const FavoritesContext = createContext(null);
export function FavoritesProvider({ children }) {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);
  async function refresh() {
    if (!user) { setFavorites([]); return; }
    const r = await fetch("/api/favorites", { cache: "no-store" });
    if (r.ok) setFavorites((await r.json()).favorites);
    else setFavorites([]);
  }
  useEffect(() => { refresh().catch(() => setFavorites([])); }, [user?.id]);
  async function toggle(artworkId) {
    if (!user) throw new Error("Login to save favorites");
    const exists = favorites.some(f => f.artworkId === artworkId);
    const r = await fetch(exists ? `/api/favorites/${artworkId}` : "/api/favorites", {
      method: exists ? "DELETE" : "POST",
      headers: { "Content-Type": "application/json" },
      ...(exists ? {} : { body: JSON.stringify({ artworkId }) })
    });
    if (!r.ok) throw new Error("Could not update favorite");
    await refresh();
  }
  return <FavoritesContext.Provider value={{ favorites, count: favorites.length, toggle, refresh }}>
    {children}</FavoritesContext.Provider>;
}
export function useFavorites() { const c = useContext(FavoritesContext);
  if (!c) throw new Error("useFavorites requires FavoritesProvider"); return c; }
