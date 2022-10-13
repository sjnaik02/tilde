import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import Card from "../components/Card";
import Link from "next/link";

function Profile() {
  const session = useSession();
  const id = session.data ? session.data.user.id : null;
  const [notes, setNotes] = useState([]);
  //fetch notes by user id
  useEffect(() => {
    console.log(id);
    if (id) {
      fetch("/api/notez/notes-by-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ createdById: id }),
      })
        .then((res) => res.json())
        .then((data) => {
          setNotes(data);
        });
    }
  }, [id]);

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
    const id = session.data.user.id;

    return (
      <div className="h-full min-h-[calc(100vh-4.5rem)] bg-primary p-4 font-mono text-gray-100">
        <div className="mx-auto flex h-full max-w-4xl flex-col">
          <h1 className="mt-8 mb-4 text-6xl font-bold">
            {session.data.user.name}
          </h1>
          <hr></hr>
          <section>
            <h2 className=" mt-8 pb-2 text-2xl font-bold ">My Notes</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {notes.map((note) => (
                <Card
                  title={note.title}
                  content={note.content}
                  id={note.noteId}
                  isPrivate={note.private}
                />
              ))}
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default Profile;
