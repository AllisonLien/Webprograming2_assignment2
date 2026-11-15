# Assignment 2 – Art Explorer Guided Build (STARTER ONLY)

This project deliberately contains **only the working PUBLIC art-browsing site**. There are NO accounts, favourites, database connections, protected APIs, or authentication components yet. Build those in the order in the Word guide using labelled blocks from `A2_CODE_BLOCKS.txt` (provided separately).

## First run
```bash
npm install
npm run dev
```
Open http://localhost:3000 and test Home, Artworks, Advanced Search, About and artwork details.

## Assignment 2
1. Create an Atlas database + demo user records using the instructor's safe seeding script.
2. Add Next.js backend Route Handlers and test them from the VS Code Postman extension / Postman desktop.
3. Add login, AuthContext and the shared Navbar.
4. Add protected favourites (MongoDB persistence), a favourites Context, preferences, and role-based admin read access.
5. Deploy the **same** Next.js application to Vercel; configure environment variables.

**Do not put JWTs in localStorage.** Inspect the HttpOnly cookie in browser DevTools. `localStorage` may be used for non-sensitive UI preferences only.

Do not commit `.env.local` or use real personal passwords. Admin accounts must be seeded (not self-assigned). This is a teaching exercise rather than a production-ready identity system.
