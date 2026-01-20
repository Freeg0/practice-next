This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Exercice 2 - Blog avec ISR (Incremental Static Regeneration)

### Objectif
Montrer la maîtrise du statique/dynamique avec ISR (Incremental Static Regeneration) dans Next.js App Router.

### Ce qui a été implémenté

#### Architecture
- **Page de liste** (`app/blog/page.tsx`) : Server Component qui fetch tous les posts depuis l'API JSONPlaceholder
- **Page de détail** (`app/blog/[id]/page.tsx`) : Server Component avec route dynamique et ISR activé
- **Loading State** (`app/blog/[id]/loading.tsx`) : Skeleton UI automatique pendant le chargement
- **Not Found** (`app/blog/[id]/not-found.tsx`) : Page 404 personnalisée pour les posts introuvables

#### Fonctionnalités
- ✅ Fetch de posts depuis une API externe (JSONPlaceholder)
- ✅ Liste des posts avec liens vers les pages de détail
- ✅ Routes dynamiques avec `[id]` pour les pages individuelles
- ✅ ISR activé avec `revalidate: 60` (régénération toutes les 60 secondes)
- ✅ `generateStaticParams` pour pré-générer les pages au build
- ✅ `generateMetadata` pour le SEO dynamique (title et description)
- ✅ Gestion d'erreur avec `notFound()` pour les posts inexistants
- ✅ UI moderne avec Tailwind CSS

#### Concepts maîtrisés

**Incremental Static Regeneration (ISR)**
- Pages statiques régénérées périodiquement en arrière-plan
- `export const revalidate = 60` : régénération toutes les 60 secondes
- Meilleur compromis entre performance (SSG) et fraîcheur des données (SSR)
- Les utilisateurs voient toujours une version statique rapide, mise à jour en arrière-plan

**Routes dynamiques**
- Utilisation de `[id]` pour créer des routes dynamiques (`/blog/1`, `/blog/2`, etc.)
- Accès aux paramètres via `params` (async dans Next.js 15)
- Génération statique avec `generateStaticParams` pour pré-générer les pages au build

**SEO avec generateMetadata**
- Fonction `generateMetadata` pour générer dynamiquement les métadonnées
- Title et description basés sur le contenu du post
- Amélioration du référencement et du partage social

**Gestion d'erreur**
- Utilisation de `notFound()` de `next/navigation` pour les ressources introuvables
- Page `not-found.tsx` personnalisée avec navigation de retour
- Protection dans `generateMetadata` pour éviter les erreurs

**Loading States**
- `loading.tsx` s'affiche automatiquement pendant le chargement initial
- Skeleton UI avec animation pour une meilleure UX

#### Structure des fichiers
```
app/blog/
├── page.tsx              # Server Component - liste des posts
└── [id]/
    ├── page.tsx          # Server Component - détail d'un post avec ISR
    ├── loading.tsx       # Skeleton UI automatique
    └── not-found.tsx     # Page 404 personnalisée
```

#### API utilisée
- **JSONPlaceholder** : `https://jsonplaceholder.typicode.com/posts`

#### Points clés pour l'entretien
- Compréhension de la différence entre SSG, SSR et ISR
- Savoir quand utiliser `revalidate` et comment configurer l'ISR
- Routes dynamiques avec segments `[slug]` ou `[id]`
- `generateStaticParams` pour optimiser le build
- `generateMetadata` pour le SEO dynamique
- Gestion d'erreur avec `notFound()` et pages personnalisées
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

Open [http://localhost:3000/blog](http://localhost:3000/blog) with your browser to see the result.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [ISR Documentation](https://nextjs.org/docs/app/building-your-application/data-fetching/incremental-static-regeneration)
- [Dynamic Routes](https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes)
- [Metadata API](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
