import { useRouter } from "next/router";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import Footer from "./Footer";

function Layout({ children }) {
  const router = useRouter();
  const { pathname } = router;
  const session = useSession();
  let userString = session.data ? session.data.user.name : "Not signed in";
  return (
    <>
      <div className="bg-gray-800 py-4 font-mono">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 lg:px-0">
          <Link href="/">
            <a className="text-xl font-bold text-gray-50 hover:text-gray-300">
              ~Tilde~
            </a>
          </Link>
          <div className="flex">
            {session.status === "unauthenticated" ? (
              <p className="py-2 text-xl text-gray-100 ">{userString}</p>
            ) : (
              <Link href="/profile">
                <a className="py-2 text-xl text-gray-100 hover:text-gray-300">
                  {userString}
                </a>
              </Link>
            )}
            {!session.data && (
              <button
                className="hover:bg-blue-700text-sm mx-4 rounded bg-blue-500 p-2 font-bold text-white"
                onClick={() => signIn()}
              >
                Sign In
              </button>
            )}
            {session.data && (
              <button
                className="mx-4 rounded bg-blue-500 p-2 text-sm font-bold text-white hover:bg-blue-700"
                onClick={() => signOut()}
              >
                Sign Out
              </button>
            )}
            {pathname !== "/create-note" && (
              <button
                className="w-fit rounded bg-teal-600 p-2 text-sm font-bold text-gray-100 hover:bg-teal-700"
                onClick={() => router.push("/create-note")}
              >
                New Note
              </button>
            )}
          </div>
        </div>
      </div>
      {children}
      <Footer />
    </>
  );
}

export default Layout;
