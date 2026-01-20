import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="bg-white rounded-lg shadow-md p-8 border border-gray-200 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Post introuvable
        </h2>
        <p className="text-gray-600 mb-6">
          Le post que vous recherchez n&apos;existe pas ou a été supprimé.
        </p>
        <Link
          href="/blog"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          Retour à la liste des posts
        </Link>
      </div>
    </div>
  );
}
