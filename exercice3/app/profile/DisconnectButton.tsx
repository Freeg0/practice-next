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
    <button onClick={handleDisconnect} type="button">
      disconnect
    </button>
  );
};

export default DisconnectButton;
