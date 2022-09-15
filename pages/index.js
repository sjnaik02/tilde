import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  function handleClick() {
    router.push("/create-note");
  }

  return (
    <div className="h-[calc(100vh-4.5rem)] bg-gray-800 font-mono">
      <div className="mx-auto flex h-full max-w-4xl flex-col justify-center pb-32">
        <h1 className="m-4 text-4xl font-bold text-gray-50 lg:text-7xl">
          Welcome to Tilde
        </h1>
        <button
          className="m-4 w-fit rounded-lg border-none bg-teal-600
         p-4 text-lg text-gray-100"
          onClick={handleClick}
        >
          Create a new note
        </button>
      </div>
    </div>
  );
}
