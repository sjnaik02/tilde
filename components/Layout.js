import { useRouter } from "next/router";
import { useSession, signIn, signOut } from "next-auth/react";

function Layout({ children }) {
  const router = useRouter();
  const { pathname } = router;
  const session = useSession();
  let userString = session.data ? session.data.user.name : "not signed in";
  return (
    <>
      <div className="bg-gray-800 font-mono py-4">
        <div className="flex items-center justify-between max-w-4xl mx-auto px-4 lg:px-0">
          <div className="flex gap-4">
            <p className="text-gray-100 text-xl py-2 ">{userString}</p>
            {
              !session.data && (
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => signIn()}
                >
                  Sign In
                </button>
              )
            }
            {
              session.data && (
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => signOut()}
                >
                  Sign Out
                </button>
              )
            }
          </div>
          {
            pathname !== "/create-note" && (
              <button
                className="w-fit bg-teal-600 text-gray-100 rounded p-2 "
                onClick={() => router.push("/create-note")}
              >
                New Note
              </button>
            )
          }
        </div>
      </div>
      {children}
    </>
  );
}

export default Layout;
