import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import MarkdownPreview from "../../components/MarkdownPreview";
import Button from "../../components/Button";

export default function Note() {
  //get note from url
  const { data: session } = useSession();
  const router = useRouter();
  const { noteID } = router.query;
  const [note, setNote] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [editing, setEditing] = useState(false);
  const [preview, setPreview] = useState(true);
  const [editedNote, setEditedNote] = useState(null);
  const [action, setAction] = useState("");

  useEffect(() => {
    if (noteID) {
      fetch(`/api/notez/${noteID}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setNote({
            title: data.title,
            content: data.content,
            private: data.private,
            createdBy: data.createdBy,
            createdById: data.createdById,
            noteId: data.noteId,
            createdById: data.createdById,
          });
          setEditedNote({
            ...data,
          });
        });
    }
  }, [noteID]);

  //check if user is owner
  useEffect(() => {
    if (note && session) {
      if (note.createdById === session.user.id) {
        setIsOwner(true);
      }
    }
  }, [note, session]);

  const handleDelete = () => {
    setAction("deleting");
    if (note) {
      fetch(`/api/notez/${note.noteId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        if (res.status === 200) {
          router.push("/");
        }
      });
    }
    setAction("");
  };
  const handleSave = () => {
    setAction("saving");
    console.log("saving");
    fetch(`/api/notez/${noteID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedNote),
    })
      .then((res) => res.json())
      .then((data) => {
        setNote({
          ...editedNote,
        });
        setEditing(false);
      });
    setAction("");
  };
  const handleEdit = () => {
    if (editing === true) {
      setEditedNote({
        ...note,
      });
      setPreview(true);
    } else {
      setPreview(false);
    }
    setEditing(!editing);
  };
  const handlePrivate = () => {
    setEditedNote({
      ...editedNote,
      private: !editedNote.private,
    });
    console.log(note.private);
    console.log(editedNote.private);
    console.log(isOwner);
  };

  if (!note) {
    return (
      <div className="h-fit min-h-screen bg-primary px-4 font-mono">
        <div className="mx-auto flex h-full max-w-4xl items-center justify-center">
          <h1 className="animate-pulse text-4xl text-gray-100">Loading...</h1>
        </div>
      </div>
    );
  }

  //if the note is private, display a message
  if (note.private === true && !isOwner) {
    return (
      <div className="h-fit min-h-screen bg-primary px-4 font-mono">
        <div className="mx-auto flex h-full max-w-4xl items-center justify-center">
          <h1 className="text-4xl text-gray-100">This note is private</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="h-fit min-h-screen bg-primary px-4 font-mono">
      <div className="mx-auto h-full max-w-4xl">
        <div className="w-full">
          <Button className={"ml-0"} onClick={() => setPreview(!preview)}>
            {preview ? "Preview" : "Raw Markdown"}
          </Button>
          {isOwner && (
            <>
              <Button onClick={handleEdit}>
                {editing ? "Cancel Edit" : "Edit Note"}
              </Button>
              {editing && (
                <>
                  {" "}
                  <Button onClick={handleSave}>Save</Button>
                  <Button onClick={handlePrivate}>
                    {editedNote.private ? "set Public" : "set Private"}
                  </Button>
                </>
              )}
              <Button onClick={handleDelete}>Delete</Button>
            </>
          )}
        </div>
        <p className="animate-pulse text-white">{action}</p>

        <div className="mt-4 flex flex-col items-center justify-center">
          <div className="w-full">
            <input
              type="text"
              className={`text-m w-full border-gray-700 bg-primary font-bold focus:border-blue-500 focus:outline-none ${
                editing ? "text-white" : "text-green-500"
              } `}
              placeholder="Title"
              value={editedNote.title}
              onChange={(e) =>
                setEditedNote({ ...editedNote, title: e.target.value })
              }
              readOnly={!editing}
            />

            {preview ? (
              <MarkdownPreview note={editedNote.content} />
            ) : (
              <textarea
                className="h-96 w-full border-gray-700 bg-primary font-bold text-white focus:border-blue-500 focus:outline-none"
                placeholder="Content"
                value={editedNote.content}
                onChange={(e) =>
                  setEditedNote({ ...editedNote, content: e.target.value })
                }
                readOnly={!editing}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
