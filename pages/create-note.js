import { useState } from "react";
import autosize from "autosize";
import MarkdownPreview from "../components/MarkdownPreview";
import { useSession } from "next-auth/react";
import { nanoid } from "nanoid";

export default function Create() {
  const [note, setNote] = useState("");
  const [title, setTitle] = useState("");
  const [isPrivate, setisPrivate] = useState(false);
  const [saving, setSaving] = useState(false);
  const [preview, setPreview] = useState(false);

  const session = useSession();

  const handleChange = (e) => {
    setNote(e.target.value);
  };

  const handleSave = async () => {
    if (session.status === "authenticated") {
      setSaving(true);
      let post = {
        postId: nanoid(10),
        title: title,
        content: note.toString(),
        createdAt: new Date().toISOString(),
        createdBy: session.data.user.name,
        createdById: session.data.user.id,
        private: isPrivate,
      };
      const res = await fetch("/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      });
      const data = await res.json();
      if (data.success) {
        setNote("");
        setTitle("");
        setPreview(false);
      } else {
        alert(data.message);
      }
    }
    setSaving(false);
  };

  return (
    <div className="h-fit min-h-screen bg-gray-800 px-4 font-mono">
      <div className="mx-auto h-full max-w-4xl">
        <button
          className="rounded border-2  border-blue-500 py-2 px-4 font-bold text-blue-500 hover:border-blue-500 hover:bg-blue-500 hover:text-gray-100"
          onClick={() => setPreview(!preview)}
        >
          {preview ? "Edit" : "Preview"}
        </button>

        <button
          className="mx-2 rounded border-2 border-blue-500 py-2 px-4 font-bold text-blue-500 hover:border-blue-500 hover:bg-blue-500 hover:text-gray-100 disabled:border-gray-400 disabled:text-gray-100 disabled:hover:bg-gray-800"
          disabled={
            session.status === "unauthenticated" || session.status === "loading"
          }
          onClick={handleSave}
        >
          Save
        </button>

        <button
          className="mx-2 rounded border-2 border-blue-500 py-2 px-4 font-bold text-blue-500 hover:border-blue-500 hover:bg-blue-500 hover:text-gray-100"
          onClick={() => setisPrivate(!isPrivate)}
        >
          {isPrivate ? "set Public" : "set Private"}
        </button>

        {saving && <span className="animate-pulse text-white ">Saving..</span>}

        <input
          type="text"
          className={`mt-4 w-full bg-gray-800 p-1 pl-0 text-gray-100 caret-white outline-none ${
            preview ? "text-bold font-sans" : ""
          } `}
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {preview ? (
          <MarkdownPreview note={note} />
        ) : (
          <textarea
            ref={autosize}
            className="text-m my-4 w-full border-none bg-gray-800 text-gray-50 focus:outline-none"
            value={note}
            onChange={handleChange}
            placeholder="Type out your next masterpiece"
          />
        )}
      </div>
    </div>
  );
}
