This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Exercice 1 - Dashboard Produits

### Objectif
Comprendre la frontière server/client dans Next.js App Router avec React Server Components (RSC) et Client Components.

### Ce qui a été implémenté

#### Architecture
- **Server Component** (`app/products/page.tsx`) : Fetch les produits depuis l'API Fakestore API côté serveur
- **Client Component** (`app/products/ProductFilters.tsx`) : Gère l'interactivité (recherche) côté client
- **Layout** (`app/products/layout.tsx`) : Structure commune pour la page produits
- **Loading State** (`app/products/loading.tsx`) : Skeleton UI automatique pendant le chargement

#### Fonctionnalités
- ✅ Fetch de produits depuis une API externe (Fakestore API)
- ✅ Recherche en temps réel sur les produits (filtrage côté client)
- ✅ Affichage de la liste des produits filtrés
- ✅ Utilisation de `Suspense` pour le streaming

#### Concepts maîtrisés

**React Server Components (RSC)**
- Fetch de données directement dans les Server Components avec `async/await`
- Pas besoin d'API routes pour fetch des données externes
- Les Server Components ne peuvent pas utiliser les hooks React (`useState`, `useEffect`, etc.)

**Client Components**
- Utilisation de `'use client'` pour les composants interactifs
- Gestion d'état avec `useState` et `useEffect`
- Filtrage côté client sur les données déjà chargées (pas de re-fetch)

**Séparation Server/Client**
- Le Server Component fetch les données initiales
- Le Client Component reçoit les données en props et gère l'interactivité
- Communication unidirectionnelle : Server → Client (via props)

**Loading States**
- `loading.tsx` s'affiche automatiquement pendant le chargement initial
- Utilisation de `Suspense` pour les sections asynchrones

#### Structure des fichiers
```
app/products/
├── page.tsx          # Server Component - fetch produits
├── layout.tsx        # Layout pour la route /products
├── loading.tsx       # Skeleton UI automatique
└── ProductFilters.tsx # Client Component - recherche + affichage
```

#### API utilisée
- **Fakestore API** : `https://fakestoreapi.com/products`

#### Points clés pour l'entretien
- Compréhension de la différence entre Server et Client Components
- Savoir quand utiliser `'use client'`
- Fetch de données côté serveur sans API routes
- Gestion d'état interactif côté client
- Architecture modulaire et séparation des responsabilités

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

Open [http://localhost:3000/products](http://localhost:3000/products) with your browser to see the result.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)
- [Client Components](https://nextjs.org/docs/app/building-your-application/rendering/client-components)

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
