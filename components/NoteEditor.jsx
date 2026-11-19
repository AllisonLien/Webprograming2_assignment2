"use client";
/* ITE5425 — Mastery Assignment 2: My Art Explorer
 * I declare that this work is my own and conforms to Humber Academic Policy.
 * I have not copied or distributed another student's implementation.
 * I have disclosed all generative-AI assistance in ai-use.md.
 * Name: Yi-Chun Lien  Student ID: N01745009  Date: 2026-11-19
 */
import { useState } from "react";
import { useFavorites } from "@/components/FavoritesProvider";

export default function NoteEditor({ artworkId, initialNote }) {   
  const { refresh } = useFavorites();                              
  const [note, setNote] = useState(initialNote);                  
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function save(e) {
    e.preventDefault();
    setMessage(""); setError("");
    if (note.length > 250) {                                  
      setError("Note must be 250 characters or less.");
      return;
    }
    setSaving(true);
    try {
      const r = await fetch(`/api/favorites/${artworkId}`, {   
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ note }),
      });
      if (!r.ok) {                                                
        const data = await r.json().catch(() => ({}));
        throw new Error(data.message || "Could not save note");
      }
      await refresh();                                        
      setMessage("Saved!");
    } catch (err) {
      setError(err.message);                                    
    } finally {
      setSaving(false);
    }
  }

  return <form onSubmit={save} className="row">
    <input className="field" value={note} maxLength={250} placeholder="Add a note..."
      onChange={e => setNote(e.target.value)} />                   
    <small className="muted">{note.length}/250</small>             
    <button className="button" disabled={saving}>{saving ? "Saving..." : "Save"}</button>
    {message && <small>{message}</small>}
    {error && <small className="error">{error}</small>}
  </form>;
}