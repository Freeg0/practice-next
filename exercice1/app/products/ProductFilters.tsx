"use client";

import { useState, useMemo } from "react";
import { Product } from "../types";

// Client Component - pour l'interactivité (recherche, tri)
// Ce composant recevra les produits en props depuis le Server Component

export default function ProductFilters({ products }: { products: Product[] }) {
  const [search, setSearch] = useState("");

  // TODO: Ajouter les états pour recherche et tri
  // TODO: Implémenter la logique de filtrage/tri côté client

  const filteredProducts = useMemo(() => {
    return products.filter((product: Product) =>
      product.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, products]);

  return (
    <div className="mb-6 space-y-4">
      <div>
        <label
          htmlFor="visitors"
          className="block mb-2.5 text-sm font-medium text-heading"
        >
          Small Input
        </label>
        <input
          type="text"
          id="visitors"
          className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-2.5 py-2 shadow-xs placeholder:text-body"
          placeholder=""
          required
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <ul>
        {filteredProducts.map((product: Product) => (
          <li key={product.id}>{product.title}</li>
        ))}
      </ul>
      {/* TODO: Input de recherche */}
      {/* TODO: Select pour le tri */}
    </div>
  );
}
