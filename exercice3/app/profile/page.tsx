import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import DisconnectButton from "./DisconnectButton";

// Force le rendu dynamique (SSR) - la page sera générée à chaque requête
export const dynamic = "force-dynamic";

const Page = async () => {
  const cookieStore = await cookies();
  const auth = cookieStore.get("auth");

  if (!auth) {
    redirect("/login");
  }

  const serverTime = new Date().toLocaleString("fr-FR", {
    dateStyle: "full",
    timeStyle: "long",
  });

  return (
    <div>
      <h1>Profile</h1>
      <h2>Welcome to your profile</h2>
      <div>
        <p>
          <strong>Heure serveur :</strong> {serverTime}
        </p>
        <p className="text-sm text-gray-500">
          Cette heure change à chaque refresh car la page est rendue
          dynamiquement (SSR)
        </p>
      </div>
      <DisconnectButton />
    </div>
  );
};

export default Page;
