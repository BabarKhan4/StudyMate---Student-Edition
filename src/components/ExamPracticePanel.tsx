import React, { useState } from 'react'
import { extractPdfText } from '../lib/pdf'
import { chat } from '../lib/webllm'
import { EXAM_BABY, EXAM_FULL, EXAM_NORMAL, SYSTEM_STUDY } from '../lib/prompts'

type Mode = 'Baby'|'Normal'|'Full'

export default function ExamPracticePanel(){
  const [mode, setMode] = useState<Mode>('Baby')
  const [notes, setNotes] = useState('Paste your notes here or upload PDFs.')
  const [files, setFiles] = useState<FileList|null>(null)
  const [out, setOut] = useState('')
  const [loading, setLoading] = useState(false)

  async function importPdfs(){
    if(!files) return
    setLoading(true)
    let merged=''
    for (const f of Array.from(files)) {
      const text = await extractPdfText(f)
      merged += `\n\n# ${f.name}\n` + text
    }
    setNotes(merged)
    setLoading(false)
  }

  async function generate(){
    setLoading(true)
    const chunks = splitIntoSections(notes)
    let resAll=''
    let i=0
    for (const c of chunks){
      i++
      const title = c.title || `Section ${i}`
      const ref = c.ref || 'notes'
      const prompt = mode==='Baby'? EXAM_BABY(title, ref, c.body): mode==='Normal'? EXAM_NORMAL(title, ref, c.body): EXAM_FULL(title, ref, c.body)
      const res = await chat([
        {role:'system', content: SYSTEM_STUDY},
        {role:'user', content: prompt}
      ] as any)
      resAll += `\n\n## ${title}\n${res}\n`
    }
    setOut(resAll)
    setLoading(false)
  }

  function splitIntoSections(text:string){
    const lines = text.split(/\r?\n/)
    const sections:any[] = []
    let cur = { title:'', ref:'', body:'' }
    for (const ln of lines){
      const m = ln.match(/^\s*#{1,6}\s*(.+)$/) || ln.match(/^\s*##?\s*Page\s+(\d+)/i)
      if (m){
        if (cur.body.trim()) sections.push(cur)
        cur = { title: m[1] ? m[1] : 'Page ' + (m[0].match(/\d+/)?.[0] || ''), ref: 'pdf', body:'' }
      } else {
        cur.body += ln + '\n'
      }
    }
    if (cur.body.trim()) sections.push(cur)
    // fallback: if nothing detected, create one section
    if (sections.length===0) sections.push({title:'All Notes', ref:'notes', body:text})
    // size-limit chunks ~1500 chars
    const final:any[] = []
    sections.forEach(s=>{
      if (s.body.length <= 1500){ final.push(s); return }
      let start=0
      let idx=1
      while (start < s.body.length){
        final.push({title: s.title + ' (part ' + idx + ')', ref: s.ref, body: s.body.slice(start, start+1500)})
        start += 1500; idx++
      }
    })
    return final
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div>
        <div className="flex gap-3 items-center">
          <label className="text-sm">Mode</label>
          <select className="border rounded px-2 py-1" value={mode} onChange={e=>setMode(e.target.value as Mode)}>
            <option>Baby</option>
            <option>Normal</option>
            <option>Full</option>
          </select>
          <input type="file" accept="application/pdf" multiple onChange={e=>setFiles(e.target.files)} />
          <button onClick={importPdfs} className="px-3 py-2 rounded-lg border">Import PDFs</button>
          <button onClick={generate} disabled={loading} className="ml-auto px-4 py-2 rounded-lg bg-blue-600 text-white disabled:opacity-50">Generate</button>
        </div>
        <label className="block text-sm font-medium mt-3">Notes / Extracted text</label>
        <textarea value={notes} onChange={e=>setNotes(e.target.value)} className="w-full h-64 p-3 border rounded-lg" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Exam Pack</label>
        <div className="min-h-64 p-3 border rounded-lg bg-white whitespace-pre-wrap">{out || '—'}</div>
      </div>
    </div>
  )
}
