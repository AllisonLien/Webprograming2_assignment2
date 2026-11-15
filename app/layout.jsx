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