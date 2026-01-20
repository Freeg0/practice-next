This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Exercice 3 - Auth mock + Route Handler + SSR

### Objectif
Être à l'aise avec l'écosystème App Router (Route Handlers, cookies, SSR dynamique) dans Next.js.

### Ce qui a été implémenté

#### Architecture
- **Route Handler** (`app/api/login/route.ts`) : API routes pour l'authentification (POST pour login, DELETE pour logout)
- **Page de login** (`app/login/page.tsx`) : Server Component avec container stylisé
- **Formulaire de login** (`app/login/LoginForm.tsx`) : Client Component avec gestion d'état et soumission
- **Page de profil** (`app/profile/page.tsx`) : Server Component protégé avec vérification de cookie
- **Bouton de déconnexion** (`app/profile/DisconnectButton.tsx`) : Client Component pour gérer la déconnexion

#### Fonctionnalités
- ✅ Authentification mock avec validation de credentials (email: `test@test.com`, password: `test`)
- ✅ Gestion des cookies côté serveur avec `cookies().set()` et `cookies().get()`
- ✅ Protection de route avec redirection automatique si non authentifié
- ✅ Route Handler POST pour la connexion
- ✅ Route Handler DELETE pour la déconnexion
- ✅ Formulaire interactif côté client avec gestion d'erreur
- ✅ Affichage de l'heure serveur pour démontrer le SSR dynamique
- ✅ UI moderne avec Tailwind CSS et support du mode sombre
- ✅ Navigation fluide entre les pages

#### Concepts maîtrisés

**Route Handlers**
- API routes dans App Router avec `app/api/*/route.ts`
- Fonctions nommées : `POST`, `DELETE`, `GET`, etc.
- Utilisation de `NextResponse` pour les réponses JSON
- Gestion des erreurs avec codes de statut HTTP appropriés

**Cookies côté serveur**
- `cookies()` de `next/headers` (fonctionne uniquement dans Server Components et Route Handlers)
- `cookies().set()` pour créer/modifier un cookie
- `cookies().get()` pour lire un cookie
- `cookies().delete()` pour supprimer un cookie
- Les cookies sont accessibles uniquement côté serveur pour la sécurité

**Redirection côté serveur**
- `redirect()` de `next/navigation` dans les Server Components
- Redirection automatique si l'utilisateur n'est pas authentifié
- Arrête l'exécution du composant après la redirection

**SSR dynamique**
- `export const dynamic = "force-dynamic"` pour forcer le rendu à chaque requête
- Affichage de l'heure serveur qui change à chaque refresh
- Différence entre SSG (statique) et SSR (dynamique)
- Compréhension du comportement en développement vs production

**Séparation client/server**
- Server Components : cookies, redirect, pas de hooks React
- Client Components : interactivité, hooks (`useState`, `useRouter`), état local
- Communication : Server → Client via props, Client → Server via Route Handlers
- Formulaires : Client Component pour interactivité, submit vers Route Handler

**Navigation**
- `useRouter` de `next/navigation` pour la navigation côté client
- Redirection après actions (login, logout)
- Gestion du flux d'authentification

#### Structure des fichiers
```
app/
├── api/
│   └── login/
│       └── route.ts          # Route Handler (POST + DELETE)
├── login/
│   ├── page.tsx              # Page de login (Server Component)
│   └── LoginForm.tsx         # Formulaire (Client Component)
├── profile/
│   ├── page.tsx              # Page profil protégée (Server Component)
│   └── DisconnectButton.tsx  # Bouton déconnexion (Client Component)
└── page.tsx                  # Page d'accueil
```

#### Credentials de test
- **Email** : `test@test.com`
- **Password** : `test`

#### Points clés pour l'entretien
- Compréhension des Route Handlers et leur utilisation dans App Router
- Gestion des cookies côté serveur avec `next/headers`
- Protection de routes avec vérification d'authentification
- Différence entre Server Components et Client Components
- SSR dynamique avec `export const dynamic = "force-dynamic"`
- Architecture modulaire et séparation des responsabilités
- Gestion du flux d'authentification complet (login → profile → logout)
- Navigation côté client et redirection côté serveur

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Test de l'authentification

1. Accédez à [http://localhost:3000/login](http://localhost:3000/login)
2. Connectez-vous avec :
   - Email : `test@test.com`
   - Password : `test`
3. Vous serez redirigé vers `/profile`
4. L'heure serveur s'affiche et change à chaque refresh (SSR dynamique)
5. Cliquez sur "Se déconnecter" pour revenir à la page de login

### Test de la protection de route

1. Essayez d'accéder directement à [http://localhost:3000/profile](http://localhost:3000/profile) sans être connecté
2. Vous serez automatiquement redirigé vers `/login`

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)
- [Client Components](https://nextjs.org/docs/app/building-your-application/rendering/client-components)
- [Data Fetching](https://nextjs.org/docs/app/building-your-application/data-fetching)

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
