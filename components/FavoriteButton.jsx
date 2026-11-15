"use client";
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