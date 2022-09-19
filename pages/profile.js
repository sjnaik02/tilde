import { useSession, signIn, signOut } from "next-auth/react";

function profile() {
  const session = useSession();

  if (session.status === "unauthenticated") {
    return (
      <div>
        <h1>You are not logged in</h1>
        <button onClick={() => signIn()}>Sign In</button>
      </div>
    );
  }
  if (session.status === "loading") {
    return <h1>Loading...</h1>;
  } else {
    return (
      <div className="h-[calc(100vh-4.5rem)] bg-gray-800 font-mono text-gray-100">
        <div className="mx-auto flex h-full max-w-4xl flex-col">
          <h1 className="mt-8 mb-4 text-6xl font-bold">
            {session.data.user.name}
          </h1>
          <hr></hr>
          <section>
            <h2 className=" mt-8 text-2xl font-bold">My Notes</h2>
            {/*TODO  add a fetch for all notes by user of this id*/}
            <p>{session.data.user.id} </p>
          </section>
        </div>
      </div>
    );
  }
}

export default profile;
