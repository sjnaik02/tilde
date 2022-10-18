import { useRouter } from "next/router";
import { useSession, signIn, signOut } from "next-auth/react";
import Footer from "./Footer";
import Header from "./Header";

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
