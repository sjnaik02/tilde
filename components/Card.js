import React from "react";
import Link from "next/link";

function Card({ title, content, id, isPrivate }) {
  return (
    <Link href={`/notes/${id}`}>
      <a>
        <div className="flex h-full flex-col rounded-lg border-2 border-gray-800 p-4 font-bold transition-all hover:border-gray-200">
          <h3 className="w-full overflow-hidden overflow-ellipsis whitespace-nowrap py-1 text-xl font-bold">
            {title}
          </h3>
          <p className="mb-2 text-sm line-clamp-3">{content}</p>
          <p className="mt-auto text-xs text-green-500">
            {isPrivate ? "Private" : "Public"}
          </p>
        </div>
      </a>
    </Link>
  );
}

export default Card;
