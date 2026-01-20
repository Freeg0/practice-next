"use client";

import { memo } from "react";
import type { Item } from "../types";

interface ItemCardProps {
  item: Item;
  onSelect: (id: number) => void;
  isSelected?: boolean;
}

// Composant mémoïsé pour éviter les re-renders inutiles
const ItemCard = memo(function ItemCard({
  item,
  onSelect,
  isSelected = false,
}: ItemCardProps) {
  return (
    <div
      className={`
        border rounded-lg p-4 cursor-pointer transition-all duration-200
        ${
          isSelected
            ? "border-blue-500 bg-blue-50 shadow-md"
            : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
        }
      `}
      onClick={() => onSelect(item.id)}
    >
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-lg font-semibold text-gray-800 flex-1">
          {item.name}
        </h3>
        {isSelected && (
          <span className="ml-2 px-2 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded-full">
            Selected
          </span>
        )}
      </div>
      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
        {item.description}
      </p>
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          {item.category}
        </span>
        <span className="text-xs text-gray-400">ID: {item.id}</span>
      </div>
    </div>
  );
});

ItemCard.displayName = "ItemCard";

export default ItemCard;
