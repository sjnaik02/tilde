import React from "react";
import Link from "next/link";

function Card({ title, content, id, isPrivate }) {
  return (
    <div className="rounded-lg border-2 border-blue-800 p-4 font-bold hover:border-blue-500">
      <h3 className="w-full overflow-hidden overflow-ellipsis whitespace-nowrap py-1 text-xl font-bold">
        {title}
      </h3>
      <p className="w-full overflow-hidden overflow-ellipsis whitespace-nowrap py-1 text-sm">
        {content}
      </p>
      <p className=" text-xs text-green-500">
        {isPrivate ? "Private" : "Public"}
      </p>
      <Link href={`/notes/${id}`}>
        <a className=" text-xs text-blue-500 hover:text-blue-400 hover:underline">
          View
        </a>
      </Link>
    </div>
  );
}

export default Card;
