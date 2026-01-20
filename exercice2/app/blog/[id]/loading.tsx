// Ce fichier est automatiquement utilisé par Next.js pendant le chargement
// Il s'affiche pendant que le Server Component fetch les données

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 animate-pulse">
        {/* Skeleton pour le titre */}
        <div className="h-8 bg-gray-200 rounded mb-4 w-3/4"></div>
        
        {/* Skeleton pour le contenu */}
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-4/5"></div>
        </div>
      </div>
    </div>
  );
}
