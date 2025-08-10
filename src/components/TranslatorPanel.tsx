import React, { useState } from 'react'
import { chat } from '../lib/webllm'
import { SYSTEM_STUDY } from '../lib/prompts'

const langs = [
  { id: 'en', label: 'English' },
  { id: 'ur', label: 'Urdu' },
  { id: 'fr', label: 'French' },
]

export default function TranslatorPanel(){
  const [src, setSrc] = useState('en')
  const [dst, setDst] = useState('ur')
  const [text, setText] = useState('Hello! This is a test paragraph for translation.')
  const [out, setOut] = useState('')
  const [simplify, setSimplify] = useState(true)
  const [loading, setLoading] = useState(false)

  async function onTranslate(){
    setLoading(true)
    const prompt = `Translate the text from ${src} to ${dst}.${simplify?' Use simple words and short sentences for students.':''}\nText:\n${text}`
    const res = await chat([
      { role:'system', content: SYSTEM_STUDY },
      { role:'user', content: prompt }
    ] as any)
    setOut(res)
    setLoading(false)
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div>
        <div className="flex gap-2 items-center">
          <div>
            <label className="block text-xs">From</label>
            <select className="border rounded px-2 py-1" value={src} onChange={e=>setSrc(e.target.value)}>
              {langs.map(l => <option key={l.id} value={l.id}>{l.label}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs">To</label>
            <select className="border rounded px-2 py-1" value={dst} onChange={e=>setDst(e.target.value)}>
              {langs.map(l => <option key={l.id} value={l.id}>{l.label}</option>)}
            </select>
          </div>
          <label className="ml-4 flex items-center gap-2 text-sm"><input type="checkbox" checked={simplify} onChange={e=>setSimplify(e.target.checked)} />Improve readability</label>
          <button onClick={onTranslate} disabled={loading} className="ml-auto px-4 py-2 rounded-lg bg-blue-600 text-white disabled:opacity-50">Translate</button>
        </div>
        <textarea value={text} onChange={e=>setText(e.target.value)} className="w-full h-48 p-3 border rounded-lg mt-3" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Result</label>
        <div className="min-h-48 p-3 border rounded-lg bg-white whitespace-pre-wrap">{out || '—'}</div>
      </div>
    </div>
  )
}
