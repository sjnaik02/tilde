import React from "react";
import { useRouter } from "next/router";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import Button from "./Button";
import { VscSignIn, VscSignOut, VscAdd } from "react-icons/vsc";

function Header() {
  const router = useRouter();
  const { pathname } = router;
  const { data: session, status } = useSession();
  let userString = session ? session.user.name : "Not signed in";
  return (
    <div className="bg-primary py-4 font-mono">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-4 lg:px-0">
        <Link href="/">
          <a className="`text-lg font-bold text-gray-50 hover:text-gray-300">
            ~Tilde~
          </a>
        </Link>
        <div className="flex">
          {status === "unauthenticated" ? (
            <p className="my-auto text-sm text-gray-100 ">{userString}</p>
          ) : (
            <Link href="/profile">
              <a className="text-md my-auto  text-gray-100  hover:text-gray-300 md:text-lg">
                {userString}
              </a>
            </Link>
          )}
          {!session && (
            <Button className="mx-4" onClick={() => signIn()}>
              <VscSignIn className="inline-block text-xl" />
            </Button>
          )}
          {session && (
            <Button className="mx-4" onClick={() => signOut()}>
              <VscSignOut className="inline-block text-xl" />
            </Button>
          )}
          {pathname !== "/create-note" && (
            <Button
              className="w-fit border-green-500 text-green-500 hover:border-green-500 hover:bg-green-500   "
              onClick={() => router.push("/create-note")}
            >
              <VscAdd className="inline-block text-xl text-green-500 hover:text-white" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
