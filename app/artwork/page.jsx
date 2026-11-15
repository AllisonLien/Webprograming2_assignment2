import {Suspense} from 'react';
import ArtworkBrowser from '@/components/ArtworkBrowser';
export default function Artworks(){return <><h1>Browse artworks</h1><p className="muted">The Met Museum collection search is public. In Assignment 2, you will add personal favorites and accounts.</p><Suspense fallback={<p>Loading search...</p>}><ArtworkBrowser/></Suspense></>}
