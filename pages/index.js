import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter();

  function handleClick(){
    router.push('/create-note');
  }

  return (
    <div className='h-screen bg-gray-800 font-mono'>
      <div className='flex flex-col max-w-4xl mx-auto justify-center h-full'>
        <h1 className='text-3xl lg:text-6xl font-bold text-gray-50 m-4'> Hello World, Welcome to Tilde</h1>
        <button className='w-fit text-gray-100 bg-teal-600 p-4 rounded-lg
         m-4 border-none' onClick={handleClick}> Create a new note </button>
      </div>
    </div>
  )
}