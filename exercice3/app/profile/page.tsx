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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Profil
            </h1>
            <h2 className="text-xl text-gray-600 dark:text-gray-400">
              Bienvenue sur votre profil
            </h2>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-700 rounded-xl p-6 mb-8 border border-blue-100 dark:border-gray-600">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                  Heure serveur
                </p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                  {serverTime}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Cette heure change à chaque refresh car la page est rendue
                  dynamiquement (SSR)
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <DisconnectButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
