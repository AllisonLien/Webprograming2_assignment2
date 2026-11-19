/* ITE5425 — Mastery Assignment 2: My Art Explorer
 * I declare that this work is my own and conforms to Humber Academic Policy.
 * I have not copied or distributed another student's implementation.
 * I have disclosed all generative-AI assistance in ai-use.md.
 * Name: Yi-Chun Lien  Student ID: N01745009  Date: 2026-11-19
 */

import Link from 'next/link';
import {studentConfig} from '@/student-config';
export default function Home(){return <section className="hero"><p className="eyebrow">ITE5425 · Assignment 2 Starter</p><h1>{studentConfig.collectionName}</h1><p>Explore artwork from The Metropolitan Museum of Art. Sign in to build your own collection.</p><Link className="button" href="/artwork">Explore artworks</Link><p className="muted">Chosen search theme: {studentConfig.initialSearch}</p></section>}
