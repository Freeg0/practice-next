// Server Component - pas besoin de 'use client'
// Ici vous allez fetch les produits depuis l'API

import { Suspense } from "react";
import ProductFilters from "./ProductFilters";
import Loading from "./loading";

export default async function ProductsPage() {
  // TODO: Fetch les produits depuis l'API
  // Suggestion: https://fakestoreapi.com/products ou https://dummyjson.com/products
  const data = await fetch("https://fakestoreapi.com/products");
  const products = await data.json();

  return (
    <Suspense fallback={<Loading />}>
      <ProductFilters products={products} />
    </Suspense>
  );
}
