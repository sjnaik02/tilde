import { useState } from "react";
import autosize from "autosize";
import MarkdownPreview from "../components/MarkdownPreview";

export default function Create() {
  const [note, setNote] = useState("");
  const [preview, setPreview] = useState(false);

  const handleChange = (e) => {
    setNote(e.target.value);
  };

  return (
    <div className="h-fit min-h-[calc(100vh-4.5rem)] bg-gray-800 px-4 font-mono">
      <div className="mx-auto h-full max-w-4xl">
        <h1 className="py-4 text-xl font-bold text-gray-100">
          Create a new note
        </h1>

        <button
          className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
          onClick={() => setPreview(!preview)}
        >
          {preview ? "Edit" : "Preview"}
        </button>

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
