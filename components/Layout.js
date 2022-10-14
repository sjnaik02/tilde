import { useRouter } from "next/router";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import Footer from "./Footer";
import Header from "./Header";
import { VscSignIn, VscSignOut, VscAdd } from "react-icons/vsc";

function Layout({ children }) {
  const router = useRouter();
  const { pathname } = router;
  const session = useSession();
  let userString = session.data ? session.data.user.name : "Not signed in";
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

export default Layout;
