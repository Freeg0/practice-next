"use client";

import { useRouter } from "next/navigation";

const DisconnectButton = () => {
  const router = useRouter();

  const handleDisconnect = async () => {
    try {
      const response = await fetch("/api/login", {
        method: "DELETE",
      });

      if (response.ok) {
        // Rediriger vers la page de login après déconnexion
        router.push("/login");
      } else {
        console.error("Failed to disconnect");
      }
    } catch (error) {
      console.error("Error disconnecting:", error);
    }
  };

  return (
    <button
      onClick={handleDisconnect}
      type="button"
      className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
    >
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
        />
      </svg>
      Se déconnecter
    </button>
  );
};

export default DisconnectButton;
