/* ITE5425 — Mastery Assignment 2: My Art Explorer
 * I declare that this work is my own and conforms to Humber Academic Policy.
 * I have not copied or distributed another student's implementation.
 * I have disclosed all generative-AI assistance in ai-use.md.
 * Name: Yi-Chun Lien  Student ID: N01745009  Date: 2026-11-19
 */
import './globals.css';
import { AuthProvider } from '@/components/AuthProvider';
import AccountNav from '@/components/AccountNav';
import { FavoritesProvider } from '@/components/FavoritesProvider';

export const metadata={title:'Art Explorer | Assignment 2',description:'ITE5425 guided enhancement'};

export default function RootLayout({children}) {
  return <html lang="en"><body>
    <AuthProvider>
      <FavoritesProvider>
        <AccountNav />
        <main className="container">{children}</main>
      </FavoritesProvider>
    </AuthProvider>
  </body></html>;
}