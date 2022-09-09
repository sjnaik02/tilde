import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

function MarkdownPreview({ note }) {
  return (
    <ReactMarkdown className='max-w-none prose font-sans prose-invert py-4' children={note} remarkPlugins={[remarkGfm]} />
  )
}

export default MarkdownPreview