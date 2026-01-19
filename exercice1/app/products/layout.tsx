// Server Component - pas besoin de 'use client'
// Ici vous allez fetch les produits depuis l'API
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard Produits</h1>
      
      {children}
    </div>
  );
}
