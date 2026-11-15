"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import { useFavorites } from "@/components/FavoritesProvider";   

export default function AccountNav() {
  const { user, loading, logout } = useAuth();
const { count } = useFavorites(); 
  const router = useRouter();
  async function signOut() {
    await logout(); router.replace("/"); router.refresh();
  }
  return <nav className="nav">
    <Link className="brand" href="/">Art Explorer</Link>
    <Link href="/artwork">Artworks</Link><Link href="/search">Search</Link>
    <Link href="/search">Search</Link><Link href="/about">About</Link>
    <Link href="/favorites">My Favorites ({count})</Link> 
    {loading ? <span>Checking session...</span> : user ? <>
      <Link href="/profile">Hello, {user.displayName}</Link>
      <button onClick={signOut}>Logout</button>
        {user.role === "admin" && <Link href="/admin">Admin</Link>}
    </> : <Link href="/login">Login</Link>}
  </nav>;
}
