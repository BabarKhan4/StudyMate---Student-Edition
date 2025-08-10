import React, { useState } from 'react'
import { ocrImage } from '../lib/ocr'
import { OCR_NOTES, SYSTEM_STUDY } from '../lib/prompts'
import { chat } from '../lib/webllm'

export default function OcrPanel(){
  const [files, setFiles] = useState<FileList|null>(null)
  const [raw, setRaw] = useState('')
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(false)

  async function doOcr(){
    if(!files || !files[0]) return
    setLoading(true)
    const text = await ocrImage(files[0], 'eng')
    setRaw(text)
    const res = await chat([
      {role:'system', content: SYSTEM_STUDY},
      {role:'user', content: OCR_NOTES(text)}
    ] as any)
    setNotes(res)
    setLoading(false)
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-medium mb-1">Upload image with text</label>
        <input type="file" accept="image/*" onChange={e=>setFiles(e.target.files)} />
        <button onClick={doOcr} disabled={loading || !files} className="ml-3 px-4 py-2 rounded-lg bg-blue-600 text-white disabled:opacity-50">Extract & Summarize</button>
        <label className="block text-sm font-medium mt-4">Extracted text</label>
        <div className="min-h-40 p-3 border rounded-lg bg-white whitespace-pre-wrap">{raw || '—'}</div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Notes</label>
        <div className="min-h-40 p-3 border rounded-lg bg-white whitespace-pre-wrap">{notes || '—'}</div>
      </div>
    </div>
  )
}
