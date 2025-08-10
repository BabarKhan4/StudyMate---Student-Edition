import React, { useState } from 'react'
import { chat } from '../lib/webllm'
import { CODE_BABY, CODE_FULL, CODE_NORMAL, SYSTEM_STUDY } from '../lib/prompts'

type Tone = 'Baby' | 'Normal' | 'Full'

export default function CodeExplainerPanel(){
  const [tone, setTone] = useState<Tone>('Baby')
  const [ctx, setCtx] = useState('Language: JavaScript')
  const [code, setCode] = useState(`function sum(arr){return arr.reduce((a,b)=>a+b,0)}`)
  const [out, setOut] = useState('')
  const [loading, setLoading] = useState(false)

  async function onExplain(){
    setLoading(true)
    const p = tone==='Baby'? CODE_BABY(code, ctx) : tone==='Normal'? CODE_NORMAL(code, ctx) : CODE_FULL(code, ctx)
    const res = await chat([
      {role:'system', content: SYSTEM_STUDY},
      {role:'user', content: p}
    ] as any)
    setOut(res)
    setLoading(false)
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div>
        <div className="flex gap-3 items-center">
          <label className="text-sm">Tone</label>
          <select className="border rounded px-2 py-1" value={tone} onChange={e=>setTone(e.target.value as Tone)}>
            <option>Baby</option>
            <option>Normal</option>
            <option>Full</option>
          </select>
          <button onClick={onExplain} disabled={loading} className="ml-auto px-4 py-2 rounded-lg bg-blue-600 text-white disabled:opacity-50">Explain</button>
        </div>
        <label className="block text-sm font-medium mt-3">Context (optional)</label>
        <input value={ctx} onChange={e=>setCtx(e.target.value)} className="w-full p-2 border rounded-lg" />
        <label className="block text-sm font-medium mt-3">Paste code</label>
        <textarea value={code} onChange={e=>setCode(e.target.value)} className="w-full h-48 p-3 border rounded-lg" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Explanation</label>
        <div className="min-h-48 p-3 border rounded-lg bg-white whitespace-pre-wrap">{out || '—'}</div>
      </div>
    </div>
  )
}
