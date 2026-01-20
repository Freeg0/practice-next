"use client";

import type { Item } from "../types";
import { useState, useMemo, useCallback } from "react";
import ItemCard from "./ItemCard";

interface ListClientProps {
  items: Item[];
}

export default function ListClient({ items }: ListClientProps) {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<"asc" | "desc" | "none">("none");
  const [counter, setCounter] = useState(0);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  // ✅ OPTIMISATION: useMemo pour éviter le recalcul du filtrage/tri
  // Ne se recalcule que si items, search, ou sort changent
  const filteredAndSortedItems = useMemo(() => {
    console.log("🔄 Recalcul du filtrage/tri...");

    let result = items.filter(
      (item: Item) =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase()) ||
        item.category.toLowerCase().includes(search.toLowerCase())
    );

    if (sort !== "none") {
      result = [...result].sort((a: Item, b: Item) => {
        const comparison = a.name.localeCompare(b.name);
        return sort === "asc" ? comparison : -comparison;
      });
    }

    return result;
  }, [items, search, sort]);

  // ✅ OPTIMISATION: useCallback pour stabiliser le handler
  // Important: si on ne met pas useCallback, chaque re-render créera une nouvelle fonction
  // et React.memo dans ItemCard détectera un changement de prop → re-render inutile
  const handleSelect = useCallback(
    (id: number) => {
      setSelectedId(id === selectedId ? null : id);
      console.log("✅ Item sélectionné:", id);
    },
    [selectedId]
  );

  // ❌ BONUS - ANTI-PATTERN: Handler sans useCallback (pour démonstration)
  // Cette fonction sera recréée à chaque render, causant des re-renders inutiles
  // dans les ItemCard même avec React.memo
  const handleClickWithoutCallback = (id: number) => {
    console.log("⚠️ Anti-pattern: fonction recréée à chaque render", id);
  };

  // Handler pour le counter (provoque des re-renders mais n'affecte pas les items)
  const handleIncrementCounter = () => {
    setCounter((prev) => prev + 1);
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header avec contrôles */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Performance Test - Liste avec Mémoïsation
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {/* Search Input */}
          <div>
            <label
              htmlFor="search"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Rechercher
            </label>
            <input
              id="search"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher dans les items..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
          </div>

          {/* Sort Button */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Trier
            </label>
            <button
              onClick={() => {
                if (sort === "none") setSort("asc");
                else if (sort === "asc") setSort("desc");
                else setSort("none");
              }}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition font-medium"
            >
              {sort === "none" && "🔀 Pas de tri"}
              {sort === "asc" && "⬆️ Tri croissant"}
              {sort === "desc" && "⬇️ Tri décroissant"}
            </button>
          </div>

          {/* Counter indépendant (pour provoquer des re-renders) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Counter (provoque des re-renders)
            </label>
            <div className="flex items-center gap-2">
              <button
                onClick={handleIncrementCounter}
                className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition font-medium"
              >
                Counter: {counter}
              </button>
            </div>
          </div>
        </div>

        {/* Info display */}
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full font-medium">
            Total items: {items.length}
          </div>
          <div className="px-3 py-1 bg-green-100 text-green-800 rounded-full font-medium">
            Items filtrés: {filteredAndSortedItems.length}
          </div>
          {selectedId && (
            <div className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full font-medium">
              Item sélectionné: #{selectedId}
            </div>
          )}
        </div>
      </div>

      {/* Liste des items */}
      <div className="space-y-4">
        {filteredAndSortedItems.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <p className="text-gray-500 text-lg">Aucun item trouvé</p>
            <p className="text-gray-400 text-sm mt-2">
              Essayez de modifier votre recherche
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredAndSortedItems.map((item: Item) => (
              <ItemCard
                key={item.id}
                item={item}
                onSelect={handleSelect}
                isSelected={item.id === selectedId}
              />
            ))}
          </div>
        )}
      </div>

      {/* Info pour démonstration */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h3 className="font-semibold text-gray-900 mb-2">
          📊 Points de démonstration :
        </h3>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>
            ✅ <strong>useMemo</strong> : Le filtrage/tri ne se recalcule que si
            search, sort ou items changent
          </li>
          <li>
            ✅ <strong>useCallback</strong> : Le handler handleSelect est
            stable, évite les re-renders de ItemCard
          </li>
          <li>
            ✅ <strong>React.memo</strong> : ItemCard ne se re-render que si ses
            props changent
          </li>
          <li>
            🧪 <strong>Counter</strong> : Incrémentez-le pour voir que les
            ItemCard ne se re-rendent PAS (grâce aux optimisations)
          </li>
          <li>
            ⚠️ <strong>Ouvrez la console</strong> pour voir les logs de recalcul
            et sélection
          </li>
        </ul>
      </div>
    </div>
  );
}
