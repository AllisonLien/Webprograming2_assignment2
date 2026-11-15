import Link from 'next/link';
import FavoriteButton from '@/components/FavoriteButton';  
export default function ArtworkCard({ artwork }) {
  return <article className="card">
    {artwork.primaryImageSmall ? <img className="artImage" src={artwork.primaryImageSmall} alt={artwork.title || 'Artwork'} /> : <div className="noImage">No image</div>}
    <h3>{artwork.title || 'Untitled'}</h3>
    <p className="muted">{artwork.artistDisplayName || 'Unknown artist'}</p>
    <Link href={`/artwork/${artwork.objectID}`}>View details</Link>
    <FavoriteButton artworkId={artwork.objectID} />
  </article>;
}
