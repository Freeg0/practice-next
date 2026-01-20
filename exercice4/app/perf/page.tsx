// Server Component - pas besoin de 'use client'
import type { Item, Post } from "../types";
import ListClient from "./ListClient";

async function fetchInitialItems(): Promise<Item[]> {
  try {
    // Fetch depuis JSONPlaceholder (limite à 100 posts)
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      cache: "no-store", // Force le fetch à chaque requête pour la démo
    });
    const posts = await response.json();

    // Transformer en Items
    const initialItems: Item[] = posts.map((post: Post) => ({
      id: post.id,
      name: post.title,
      description: post.body,
      category: `Category ${Math.floor(Math.random() * 10) + 1}`,
    }));

    return initialItems;
  } catch (error) {
    console.error("Error fetching items:", error);
    return [];
  }
}

function generateItems(baseItems: Item[], targetCount: number): Item[] {
  const items: Item[] = [];
  const categories = [
    "Electronics",
    "Clothing",
    "Food",
    "Books",
    "Sports",
    "Home",
    "Toys",
    "Automotive",
    "Health",
    "Beauty",
  ];

  for (let i = 0; i < targetCount; i++) {
    const baseItem = baseItems[i % baseItems.length];
    const categoryIndex = Math.floor(Math.random() * categories.length);

    items.push({
      id: i + 1,
      name: `${baseItem.name} #${i + 1}`,
      description: `${baseItem.description.substring(0, 100)}...`,
      category: categories[categoryIndex],
    });
  }

  return items;
}

export default async function PerfPage() {
  // Fetch les données initiales
  const baseItems = await fetchInitialItems();

  // Générer 1000 items
  const items: Item[] = generateItems(baseItems, 1000);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Exercice 4 — Liste Performante & Mémoïsation React
          </h1>
          <p className="text-lg text-gray-600">
            Démonstration de useMemo, useCallback et React.memo avec 1000 items
          </p>
        </div>
        <ListClient items={items} />
      </div>
    </div>
  );
}
