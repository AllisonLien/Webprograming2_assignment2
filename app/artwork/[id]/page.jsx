import Link from 'next/link';
import {getArtwork} from '@/lib/metApi';
import {notFound} from 'next/navigation';
import FavoriteButton from '@/components/FavoriteButton';
export default async function ArtworkDetailPage({params})
{const {id}=await params;const artwork=await getArtwork(id);if(!artwork)notFound();return <section className="panel">
    <Link href="/artwork">← Back to artworks</Link><h1>{artwork.title||'Untitled'}</h1>
    <p className="muted">{artwork.artistDisplayName||'Unknown artist'} · {artwork.objectDate||'Unknown date'}</p>
    {artwork.primaryImageSmall&&<img className="detailImage" src={artwork.primaryImageSmall} alt={artwork.title||'Artwork'}/>}
    <p>{artwork.medium}</p><FavoriteButton artworkId={artwork.objectID}/></section>}

