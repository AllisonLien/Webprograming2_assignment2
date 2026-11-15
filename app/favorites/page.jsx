"use client";
import Link from "next/link";
import NoteEditor from "@/components/NoteEditor";
import { useAuth } from "@/components/AuthProvider";
import { useFavorites } from "@/components/FavoritesProvider";
export default function FavoritesPage() {
  const { user, loading } = useAuth();
  const { favorites, toggle } = useFavorites();
  if (loading) return <p>Checking session...</p>;
  if (!user) return <p>Please <Link href="/login">login</Link> first.</p>;
  return <section className="panel"><h1>My Favorites</h1>
    {favorites.length === 0 && <p>No saved artwork yet.</p>}
    <ul>{favorites.map(f => <li key={f.artworkId}>
      <Link href={`/artwork/${f.artworkId}`}>Artwork #{f.artworkId}</Link>{" "}
      <button onClick={() => toggle(f.artworkId)}>Remove</button>
      <NoteEditor artworkId={f.artworkId} initialNote={f.note} />    
        </li>)}</ul>
  </section>;
}

