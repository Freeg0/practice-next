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
  
- `app/blog/[id]/page.tsx`
  - Page détail d'un post
  - Active ISR : `revalidate` toutes les 60s
  - `generateStaticParams` pour pré-génération
  - `generateMetadata` pour SEO (title/description)
  - `loading.tsx` pour le skeleton UI
  - `not-found.tsx` pour la gestion d'erreur

### Points évalués
- ✅ Routing avec segments dynamiques `[id]`
- ✅ ISR avec `revalidate`
- ✅ `generateStaticParams` pour pré-génération
- ✅ SEO avec `generateMetadata`
- ✅ Gestion d'erreur avec `not-found.tsx`
- ✅ Loading states avec `loading.tsx`

### Concepts clés
- ISR : pages statiques régénérées périodiquement
- `revalidate: 60` dans `fetch()` ou `export const revalidate = 60`
- Routes dynamiques avec `[id]` ou `[slug]`
- `generateStaticParams` pour pré-générer les pages au build
- `generateMetadata` pour le SEO dynamique
- `notFound()` pour gérer les ressources introuvables
- Différence entre SSG, SSR et ISR

### API suggérée
- `https://jsonplaceholder.typicode.com/posts`
- Posts mockés en local

### Statut
✅ **Terminé** - Voir `exercice2/README.md` pour les détails

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
- ✅ SSR/dynamique avec `export const dynamic = 'force-dynamic'`
- ✅ Séparation client/server pour formulaires
- ✅ Route Handler DELETE pour la déconnexion

### Concepts clés
- Route Handlers : API routes dans App Router (`app/api/*/route.ts`)
- Cookies : `cookies()` de `next/headers` (serveur uniquement)
- `redirect()` : navigation côté serveur
- SSR dynamique : `export const dynamic = 'force-dynamic'` pour forcer le re-render à chaque requête
- Formulaires : Client Component pour interactivité, submit vers Route Handler
- Protection de routes : vérification d'authentification côté serveur avant le rendu
- Déconnexion : Route Handler DELETE pour supprimer le cookie d'authentification

### Statut
✅ **Terminé** - Voir `exercice3/README.md` pour les détails

---

## Exercice 4 — "Liste performante & mémoïsation React"

### Objectif
Démontrer une bonne maîtrise de `useMemo` et `useCallback`, et comprendre les re-renders React.

### Structure à créer
- `app/perf/page.tsx` (Server Component)
  - Génère ou fetch une grosse liste d'items
  - Passe la liste en props à un composant client
  
- `app/perf/ListClient.tsx` (Client Component avec `'use client'`)
  - État local pour search, sort, et un counter indépendant
  - Filtrage + tri de la liste
  - Affichage via des composants enfants
  
- `app/perf/ItemCard.tsx` (Client Component)
  - Composant enfant mémoïsé (`memo`)
  - Reçoit un handler de sélection

### Optimisations à implémenter
- `useMemo` pour éviter le recalcul du filtrage / tri
- `useCallback` pour stabiliser le handler passé aux enfants

### Bonus
- Ajouter un état sans lien avec la liste pour provoquer des re-renders
- Montrer un cas où `useCallback` est inutile (anti-pattern volontaire)

### Points évalués
- ✅ Compréhension des re-renders React
- ✅ Distinction render vs recalcul
- ✅ Usage pertinent de `useMemo`
- ✅ Usage pertinent de `useCallback`
- ✅ Capacité à éviter la sur-optimisation

### Concepts clés
- `useMemo` : mémoïser des valeurs calculées coûteuses
- `useCallback` : stabiliser les références de fonctions
- `React.memo` : prévenir les re-renders inutiles des composants enfants
- Re-renders : comprendre quand et pourquoi les composants se re-rendent
- Optimisation : savoir quand optimiser et quand ne pas optimiser
- Anti-patterns : reconnaître les cas où l'optimisation est inutile

### Statut
✅ **Terminé** - Voir `exercice4/README.md` pour les détails

---

## Ordre de réalisation recommandé

1. ✅ **Exercice 1** - Base RSC/Client (terminé)
2. ✅ **Exercice 2** - ISR et routing (terminé)
3. ✅ **Exercice 3** - Route Handlers et auth (terminé)
4. ✅ **Exercice 4** - Liste performante & mémoïsation React (terminé)

## Ressources utiles

- [Next.js App Router Docs](https://nextjs.org/docs/app)
- [Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)
- [Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [Data Fetching](https://nextjs.org/docs/app/building-your-application/data-fetching)
- [ISR](https://nextjs.org/docs/app/building-your-application/data-fetching/incremental-static-regeneration)
