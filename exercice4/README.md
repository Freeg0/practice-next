This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Exercice 4 — Liste Performante & Mémoïsation React

### Objectif
Démontrer une bonne maîtrise de `useMemo` et `useCallback`, et comprendre les re-renders React.

### Ce qui a été implémenté

#### Architecture
- **Server Component** (`app/perf/page.tsx`) : Génère ou fetch une grosse liste de 1000 items
- **Client Component principal** (`app/perf/ListClient.tsx`) : Gère les états, filtrage, tri et affichage
- **Composant enfant** (`app/perf/ItemCard.tsx`) : Composant mémoïsé avec `React.memo` pour éviter les re-renders inutiles

#### Fonctionnalités
- ✅ Génération de 1000 items depuis une API (JSONPlaceholder)
- ✅ Filtrage en temps réel par nom, description ou catégorie
- ✅ Tri par ordre alphabétique (croissant/décroissant/aucun)
- ✅ Sélection d'un item avec indication visuelle
- ✅ Counter indépendant pour démontrer les optimisations (provoque des re-renders sans affecter les items)
- ✅ UI moderne avec Tailwind CSS et design responsive

#### Optimisations implémentées

**1. useMemo pour le filtrage/tri**
- Le calcul de la liste filtrée et triée est mémoïsé
- Ne se recalcule que si `items`, `search`, ou `sort` changent
- Évite les recalculs inutiles lors des re-renders du counter

**2. useCallback pour stabiliser les handlers**
- `handleSelect` est mémoïsé avec `useCallback`
- Maintient la même référence entre les renders
- Permet à `React.memo` dans `ItemCard` de fonctionner correctement
- Sans `useCallback`, chaque render créerait une nouvelle fonction → re-render de tous les ItemCard

**3. React.memo sur ItemCard**
- Le composant `ItemCard` est enveloppé dans `React.memo`
- Ne se re-render que si ses props (`item`, `onSelect`, `isSelected`) changent réellement
- Même si le parent `ListClient` se re-render (à cause du counter), les ItemCard ne se re-rendent PAS

#### Démonstration des optimisations

**Counter indépendant**
- Le bouton "Counter" incrémente un état qui n'a aucun lien avec les items
- Sans optimisations, tous les ItemCard se re-rendraient à chaque clic
- Avec `React.memo` + `useCallback`, seuls les composants nécessaires se re-rendent
- Ouvrez la console pour voir les logs de recalcul (uniquement lors du filtrage/tri)

**Anti-pattern volontaire (commenté)**
- Code montrant ce qu'il ne faut PAS faire (handler sans useCallback)
- Démontre l'importance de stabiliser les fonctions passées aux composants mémoïsés

#### Concepts maîtrisés

**useMemo**
- Mémoïse des valeurs calculées coûteuses
- Prend une fonction de calcul et un tableau de dépendances
- Ne recalcule que si les dépendances changent
- Distinction entre render (mise à jour du DOM) et recalcul (calcul de valeur)

**useCallback**
- Mémoïse des fonctions (stabilise les références)
- Prend une fonction et un tableau de dépendances
- Retourne la même référence tant que les dépendances ne changent pas
- Essentiel quand on passe des fonctions à des composants mémoïsés

**React.memo**
- HOC (Higher Order Component) qui mémoïse un composant
- Compare les props avec une comparaison shallow
- Empêche le re-render si les props n'ont pas changé
- Fonctionne en combinaison avec `useCallback` pour les props de type fonction

**Re-renders React**
- Comprendre quand et pourquoi les composants se re-rendent
- Distinction entre render nécessaire et render inutile
- Utilisation des DevTools pour observer les re-renders
- Capacité à identifier les optimisations nécessaires

**Éviter la sur-optimisation**
- Savoir quand optimiser est nécessaire (liste importante, calculs coûteux)
- Comprendre quand l'optimisation est inutile (petites listes, calculs simples)
- Balance entre performance et lisibilité du code

#### Structure des fichiers
```
app/
├── perf/
│   ├── page.tsx              # Server Component - génère 1000 items
│   ├── ListClient.tsx        # Client Component - gestion état, filtrage, tri
│   └── ItemCard.tsx          # Composant enfant mémoïsé (React.memo)
└── types/
    ├── Item.types.ts         # Interface Item
    ├── Post.types.ts         # Interface Post (pour l'API)
    └── index.ts              # Exports
```

#### Points clés pour l'entretien

**Compréhension des re-renders**
- Différence entre render et recalcul
- Quand React décide de re-render un composant
- Impact des props sur les re-renders

**Usage pertinent de useMemo**
- Quand utiliser `useMemo` (calculs coûteux, dépendances claires)
- Quand ne PAS utiliser (calculs simples, sur-optimisation)
- Comprendre les dépendances et leur impact

**Usage pertinent de useCallback**
- Quand utiliser `useCallback` (fonctions passées à composants mémoïsés)
- Quand ne PAS utiliser (fonctions internes simples)
- Relation avec `React.memo`

**Capacité à éviter la sur-optimisation**
- Reconnaître les cas où l'optimisation est nécessaire
- Identifier les cas où l'optimisation est prématurée
- Balance performance/maintenabilité

**Architecture Server/Client**
- Server Component pour fetch les données initiales
- Client Component pour l'interactivité
- Passage de données via props

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

Open [http://localhost:3000/perf](http://localhost:3000/perf) with your browser to see the result.

### Test des optimisations

1. **Test du filtrage** :
   - Tapez dans le champ de recherche
   - Ouvrez la console pour voir les logs de recalcul uniquement lors du filtrage

2. **Test du counter** :
   - Cliquez plusieurs fois sur le bouton "Counter"
   - Observez que les ItemCard ne se re-rendent PAS (grâce à React.memo + useCallback)
   - Les logs de recalcul n'apparaissent pas dans la console

3. **Test du tri** :
   - Cliquez sur le bouton "Trier"
   - Observez les logs de recalcul dans la console
   - Les items sont triés sans re-render inutile

4. **Test de sélection** :
   - Cliquez sur un item pour le sélectionner
   - Observez le style qui change (bordure bleue, badge "Selected")
   - Seul l'item cliqué se re-render (grâce à React.memo)

5. **React DevTools Profiler** :
   - Ouvrez React DevTools → Profiler
   - Enregistrez une session pendant que vous incrémentez le counter
   - Observez que seuls les composants nécessaires se re-rendent

## Learn More

To learn more about Next.js and React, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [React.useMemo](https://react.dev/reference/react/useMemo) - React documentation for useMemo
- [React.useCallback](https://react.dev/reference/react/useCallback) - React documentation for useCallback
- [React.memo](https://react.dev/reference/react/memo) - React documentation for memo
- [Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)
- [Client Components](https://nextjs.org/docs/app/building-your-application/rendering/client-components)

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
