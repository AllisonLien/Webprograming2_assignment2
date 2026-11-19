"use client";
/* ITE5425 — Mastery Assignment 2: My Art Explorer
 * I declare that this work is my own and conforms to Humber Academic Policy.
 * I have not copied or distributed another student's implementation.
 * I have disclosed all generative-AI assistance in ai-use.md.
 * Name: Yi-Chun Lien  Student ID: N01745009  Date: 2026-11-19
 */
import { useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import { useFavorites } from "@/components/FavoritesProvider";
export default function FavoriteButton({ artworkId }) {
  const { user } = useAuth(); const { favorites, toggle } = useFavorites();
  const [error, setError] = useState("");
  const saved = favorites.some(f => f.artworkId === artworkId);
  async function click() {
    setError(""); try { await toggle(artworkId); } catch(e) { setError(e.message); }
  }
  return <span><button type="button" onClick={click} disabled={!user}>
    {saved ? "♥ Saved" : "♡ Favorite"}
  </button>{!user && <small> Login to save</small>}{error && <small className="error">{error}</small>}</span>;
}