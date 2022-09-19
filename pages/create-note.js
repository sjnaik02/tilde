import { useState } from "react";
import autosize from "autosize";
import MarkdownPreview from "../components/MarkdownPreview";

export default function Create() {
  const [note, setNote] = useState("");
  const [title, setTitle] = useState("");
  const [preview, setPreview] = useState(false);

  const handleChange = (e) => {
    setNote(e.target.value);
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
