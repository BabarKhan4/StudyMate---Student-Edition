import React, { useEffect, useRef, useState } from 'react'
import { chat, getEngine, getModelId, setModel } from '../lib/webllm'
import { SYSTEM_STUDY } from '../lib/prompts'

export default function ChatPanel(){
  const [input, setInput] = useState('Explain the difference between supervised and unsupervised learning.')
  const [out, setOut] = useState('')
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState<any>(null)
  const [model, setModelState] = useState(getModelId())

  useEffect(()=>{
    // prewarm lazily when user enters the tab
  },[])

  async function ensureModel(){
    setLoading(true)
    setOut(prev => prev || 'Loading model...')
    await getEngine((p)=>setProgress(p))
    setLoading(false)
  }

  async function onSend(){
    if(!out) await ensureModel()
    setLoading(true)
    const messages = [
      { role: 'system', content: SYSTEM_STUDY },
      { role: 'user', content: input }
    ] as any
    const res = await chat(messages, false, 0.7)
    setOut(res)
    setLoading(false)
  }

  function onSwitchModel(id:string){
    setModel(id)
    setModelState(id)
    setOut('')
    setProgress(null)
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-medium mb-1">Prompt</label>
        <textarea value={input} onChange={e=>setInput(e.target.value)} className="w-full h-48 p-3 border rounded-lg" />
        <div className="flex gap-2 items-center mt-3">
          <button onClick={onSend} disabled={loading} className="px-4 py-2 rounded-lg bg-blue-600 text-white disabled:opacity-50">Ask</button>
          <button onClick={ensureModel} disabled={loading} className="px-3 py-2 rounded-lg border">Preload model</button>
          <select className="ml-auto border rounded-lg px-2 py-1" value={model} onChange={e=>onSwitchModel(e.target.value)}>
            <option value="Phi-3-mini-4k-instruct-q4f16_1-MLC-1k">Phi-3 Mini 4k (q4f16_1-1k) — Lite</option>
            <option value="Phi-3-mini-4k-instruct-q4f32_1-MLC">Phi-3 Mini 4k (q4f32_1)</option>
          </select>
        </div>
        {progress && <div className="mt-3 text-sm text-slate-600"><pre className="whitespace-pre-wrap">{JSON.stringify(progress, null, 2)}</pre></div>}
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Answer</label>
        <div className="min-h-48 p-3 border rounded-lg bg-white whitespace-pre-wrap">{out || '—'}</div>
      </div>
    </div>
  )
}
