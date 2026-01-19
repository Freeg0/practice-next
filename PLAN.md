# Plan d'entraînement - Exercices Next.js pour entretien

## Contexte
Préparation pour un entretien de freelance développeur front-end sur React et Next.js.

## Approche pédagogique
- Guide et mentorat pendant le développement
- Correction des erreurs avec explications
- Pas de code écrit à la place de l'étudiant
- Focus sur la compréhension des concepts

---

## Exercice 1 — "Dashboard produits" (RSC + streaming + client islands)

### Objectif
Comprendre la frontière server/client dans Next.js App Router.

### Structure à créer
- `app/products/page.tsx` (Server Component)
  - Fetch liste produits (server)
  - Render une table
  
- `app/products/loading.tsx`
  - Skeleton UI pour le chargement

- `app/products/ProductFilters.tsx` (Client Component avec `'use client'`)
  - Recherche + tri côté client (sur les données déjà chargées)

- Bonus : Séparer une section lente dans `<Suspense />` + composant server qui fetch autre chose

### Points évalués
- ✅ RSC (React Server Components)
- ✅ `'use client'` directive
- ✅ `Suspense` / `loading.tsx`
- ✅ Architecture Server/Client

### Concepts clés
- Server Components : fetch direct, pas de hooks React
- Client Components : interactivité, hooks, état local
- Communication : Server → Client via props (unidirectionnel)
- Loading states automatiques avec `loading.tsx`

### API suggérée
- `https://fakestoreapi.com/products`
- `https://dummyjson.com/products`

### Statut
✅ **Terminé** - Voir `exercice1/README.md` pour les détails

---

## Exercice 2 — "Blog + ISR" (App Router + revalidate)

### Objectif
Montrer la maîtrise du statique/dynamique avec ISR (Incremental Static Regeneration).

### Structure à créer
- `app/blog/page.tsx`
  - Liste des posts (server fetch)
  
- `app/blog/[slug]/page.tsx`
  - Page détail d'un post
  - Active ISR : `revalidate` toutes les 60s (ou similaire)

- Bonus : `generateMetadata` pour SEO (title/description)

### Points évalués
- ✅ Routing avec segments dynamiques `[slug]`
- ✅ ISR avec `revalidate`
- ✅ `generateStaticParams` (optionnel)
- ✅ SEO avec `generateMetadata`

### Concepts clés
- ISR : pages statiques régénérées périodiquement
- `revalidate: 60` dans `fetch()` ou `export const revalidate = 60`
- Routes dynamiques avec `[slug]`
- `generateMetadata` pour le SEO dynamique
- Différence entre SSG, SSR et ISR

### API suggérée
- `https://jsonplaceholder.typicode.com/posts`
- Posts mockés en local

### Statut
⏳ **À faire**

---

## Exercice 3 — "Auth mock + Route Handler + SSR"

### Objectif
Être à l'aise avec l'écosystème App Router (Route Handlers, cookies, SSR).

### Structure à créer
- `app/api/login/route.ts`
  - Route Handler POST
  - Valide un user "mock"
  - Set un cookie avec `cookies().set()`

- `app/profile/page.tsx` (Server Component)
  - Lit le cookie côté serveur avec `cookies().get()`
  - Si pas loggé → `redirect()` vers `/login`

- `app/login/page.tsx` + `LoginForm.tsx` (Client Component)
  - Formulaire avec `'use client'`
  - Submit vers route handler `/api/login`

- Bonus : Démo "dynamique" (SSR) en affichant l'heure serveur à chaque requête
  - Force dynamique via `cache: 'no-store'` dans fetch

### Points évalués
- ✅ Route Handlers (`route.ts`)
- ✅ Cookies côté serveur (`next/headers`)
- ✅ `redirect()` dans Server Components
- ✅ SSR/dynamique avec `cache: 'no-store'`
- ✅ Séparation client/server pour formulaires

### Concepts clés
- Route Handlers : API routes dans App Router (`app/api/*/route.ts`)
- Cookies : `cookies()` de `next/headers` (serveur uniquement)
- `redirect()` : navigation côté serveur
- SSR dynamique : `cache: 'no-store'` pour forcer le re-render à chaque requête
- Formulaires : Client Component pour interactivité, submit vers Route Handler

### Statut
⏳ **À faire**

---

## Ordre de réalisation recommandé

1. ✅ **Exercice 1** - Base RSC/Client (terminé)
2. ⏳ **Exercice 2** - ISR et routing
3. ⏳ **Exercice 3** - Route Handlers et auth

## Ressources utiles

- [Next.js App Router Docs](https://nextjs.org/docs/app)
- [Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)
- [Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [Data Fetching](https://nextjs.org/docs/app/building-your-application/data-fetching)
- [ISR](https://nextjs.org/docs/app/building-your-application/data-fetching/incremental-static-regeneration)
