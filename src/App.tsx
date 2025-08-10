import React, { useState } from 'react'
import ChatPanel from './components/ChatPanel'
import OcrPanel from './components/OcrPanel'
import TranslatorPanel from './components/TranslatorPanel'
import CodeExplainerPanel from './components/CodeExplainerPanel'
import ExamPracticePanel from './components/ExamPracticePanel'

const TABS = ['Chat', 'OCR→Notes', 'Translator', 'Code Explainer', 'Exam Practice', 'About'] as const

export default function App(){
  const [tab, setTab] = useState<typeof TABS[number]>('Chat')
  return (
    <div className="min-h-screen text-slate-800">
      <header className="sticky top-0 bg-white/80 backdrop-blur border-b border-slate-200 z-10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="font-bold text-xl"><span className="text-blue-600">StudyMate</span> — Student Edition</div>
          <nav className="flex gap-2 flex-wrap">
            {TABS.map(t => (
              <button key={t} onClick={()=>setTab(t)} className={`px-3 py-1.5 rounded-full border ${tab===t?'bg-blue-600 text-white border-blue-600':'border-slate-300 hover:bg-slate-100'}`}>{t}</button>
            ))}
          </nav>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-4 py-6">
        {tab==='Chat' && <ChatPanel/>}
        {tab==='OCR→Notes' && <OcrPanel/>}
        {tab==='Translator' && <TranslatorPanel/>}
        {tab==='Code Explainer' && <CodeExplainerPanel/>}
        {tab==='Exam Practice' && <ExamPracticePanel/>}
        {tab==='About' && (
          <div className="prose max-w-3xl">
            <h2>About</h2>
            <p>Private, in-browser study tools powered by WebGPU. No server, no API keys.</p>
            <ul>
              <li><strong>Models:</strong> Phi-3 Mini (WebLLM). Downloaded once, cached by your browser.</li>
              <li><strong>Privacy:</strong> Your data stays on your device.</li>
              <li><strong>Tip:</strong> Use a modern browser with WebGPU (Chrome/Edge).</li>
            </ul>
          </div>
        )}
      </main>
      <footer className="py-8 text-center text-sm text-slate-500">© {new Date().getFullYear()} StudyMate.</footer>
    </div>
  )
}
