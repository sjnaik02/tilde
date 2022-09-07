import { useState } from 'react'

export default function Create() {
  const [note, setNote] = useState('');

  const handleChange = (e) => {
    setNote(e.target.value);
  }
  

  return (
    <div className='h-full min-h-screen bg-gray-800 font-mono'>
      <div className='max-w-4xl mx-auto h-full'>
        <h1 className='text-lg text-gray-100 py-4'> Create a new note </h1>
        <textarea className='w-full h-[calc(100%+10rem)] bg-gray-800
         text-gray-50 my-4 border-none focus:outline-none'
         value={note} onChange={handleChange} 
         placeholder='Type out your next masterpiece' />
      </div>
    </div>
  );
}

