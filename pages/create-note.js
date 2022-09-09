import { useState } from 'react'
import autosize from 'autosize';
import MarkdownPreview from '../components/MarkdownPreview'

export default function Create() {
  const [note, setNote] = useState('');
  const [preview, setPreview] = useState(false);

  const handleChange = (e) => {
    setNote(e.target.value);
  }
  
  return (
    <div className='h-fit min-h-screen bg-gray-800 font-mono overscroll-contain px-4'>
      <div className='max-w-4xl mx-auto h-full'>
        <h1 className='text-xl font-bold text-gray-100 py-4'> Create a new note </h1>

        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' 
          onClick={() => setPreview(!preview)}> Preview </button>

        {preview ? <MarkdownPreview note={note} /> : (<textarea ref={autosize} className='text-m w-full bg-gray-800 text-gray-50 border-none focus:outline-none my-4'
          value={note} onChange={handleChange} placeholder='Type out your next masterpiece' />)}
        
      </div>
    </div>
  );
}

