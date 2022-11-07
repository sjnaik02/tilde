import { useState } from "react";
import autosize from "autosize";
import Editor from "../components/Editor";
import MarkdownPreview from "../components/MarkdownPreview";
import { useSession } from "next-auth/react";
import { nanoid } from "nanoid";
import Button from "../components/Button";
import { VscMarkdown, VscOpenPreview, VscSave } from "react-icons/vsc";
import { RiEyeLine, RiEyeCloseLine } from "react-icons/ri";

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
        noteId: nanoid(10),
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
    <div className="h-fit min-h-screen bg-primary px-4 font-mono">
      <div className="mx-auto h-full max-w-4xl">
        {/* horizontally center the buttons */}
        <Button onClick={() => setPreview(!preview)} className={"ml-0 md:ml-0"}>
          {preview ? (
            <VscMarkdown className="text-xl" />
          ) : (
            <VscOpenPreview className="text-xl" />
          )}
        </Button>
        <Button
          onClick={handleSave}
          disabled={
            session.status === "unauthenticated" || session.status === "loading"
          }
        >
          <VscSave className="text-xl" />
        </Button>
        <Button
          onClick={() => setisPrivate(!isPrivate)}
          disabled={
            session.status === "unauthenticated" || session.status === "loading"
          }
          className={"mr-0 md:mr-0"}
        >
          {isPrivate ? (
            <RiEyeCloseLine className="text-xl" />
          ) : (
            <RiEyeLine className="text-xl" />
          )}
        </Button>
        {saving && <span className="animate-pulse text-white ">Saving..</span>}

        <input
          type="text"
          className={`mt-4 w-full bg-primary p-1 pl-0 text-gray-100 caret-white outline-none ${
            preview ? "text-sm" : ""
          } `}
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {preview ? (
          <MarkdownPreview note={note} />
        ) : (
          <>
            <Editor
              value={note}
              onChange={handleChange}
              placeholder={"Type out your next masterpiece"}
              isReadOnly={false}
            />
          </>
        )}
      </div>
    </div>
  );
}
