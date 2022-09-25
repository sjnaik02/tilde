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
  const [preview, setPreview] = useState(true);

  //get note from db on load
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
            noteID: data.noteID,
            createdById: data.createdById,
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

  const handleDelete = () => console.log(isOwner);
  const handleSave = () => console.log("saving");

  if (!note) {
    return (
      <div className="h-fit min-h-screen bg-gray-800 px-4 font-mono">
        <div className="mx-auto flex h-full max-w-4xl items-center justify-center">
          <h1 className="animate-pulse text-4xl text-gray-100">Loading...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="h-fit min-h-screen bg-gray-800 px-4 font-mono">
      <div className="mx-auto h-full max-w-4xl">
        <div className="w-full">
          <button
            className="mr-2 rounded border-2  border-blue-500 py-2 px-4 font-bold text-blue-500 hover:border-blue-500 hover:bg-blue-500 hover:text-gray-100"
            onClick={() => setPreview(!preview)}
          >
            {!preview ? "Preview" : "Raw Markdown"}
          </button>
          <button
            className={`mx-2 rounded border-2 border-blue-500 py-2 px-4 font-bold text-blue-500 hover:border-blue-500 hover:bg-blue-500 hover:text-gray-100 disabled:border-gray-400 disabled:text-gray-100 disabled:hover:border-gray-400 disabled:hover:bg-gray-800 `}
            onClick={handleSave}
            disabled={deleting || saving || !isOwner}
          >
            {saving ? "Saving..." : "Save"}
          </button>
          <button
            className={`mx-2 rounded border-2 border-blue-500 py-2 px-4 font-bold text-blue-500 hover:border-blue-500 hover:bg-blue-500 hover:text-gray-100 disabled:border-gray-400 disabled:text-gray-100 disabled:hover:bg-gray-800`}
            onClick={handleDelete}
            disabled={deleting || saving || !isOwner}
          >
            {saving ? "Deleting..." : "Delete"}
          </button>
        </div>

        <div className="mt-4 flex flex-col items-center justify-center">
          <div className="w-full">
            <input
              type="text"
              className="text-m w-full border-gray-700 bg-gray-800 font-bold text-white focus:border-blue-500 focus:outline-none"
              placeholder="Title"
              value={note ? note.title : ""}
              onChange={(e) => setNote({ ...note, title: e.target.value })}
              disabled={!preview}
            />

            {preview ? (
              <MarkdownPreview note={note.content} />
            ) : (
              <textarea
                className="h-96 w-full border-gray-700 bg-gray-800 font-bold text-white focus:border-blue-500 focus:outline-none"
                placeholder="Content"
                value={note ? note.content : ""}
                onChange={(e) => setNote({ ...note, content: e.target.value })}
                readOnly={saving || deleting || !isOwner}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
