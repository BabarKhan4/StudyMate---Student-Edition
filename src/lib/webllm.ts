import type { MLCEngineInterface } from '@mlc-ai/web-llm'
import { CreateMLCEngine } from '@mlc-ai/web-llm'

let enginePromise: Promise<MLCEngineInterface> | null = null
let currentModel = 'Phi-3-mini-4k-instruct-q4f16_1-MLC-1k' // small, faster first-load

export function setModel(id: string) {
  currentModel = id
  enginePromise = null
}

export function getModelId() { return currentModel }

export async function getEngine(progress?: (p:any)=>void): Promise<MLCEngineInterface> {
  if (!enginePromise) {
    enginePromise = CreateMLCEngine(currentModel, {
      initProgressCallback: progress ? progress : (p)=>console.log('init', p),
    })
  }
  return enginePromise
}

export async function chat(messages: {role:'system'|'user'|'assistant', content:string}[], stream=false, temperature=0.7) {
  const engine = await getEngine()
  if (stream) {
    const chunks = await engine.chat.completions.create({ messages, temperature, stream: true, stream_options: { include_usage: true } })
    let out = ''
    for await (const c of chunks as any) {
      out += c.choices?.[0]?.delta?.content || ''
      // streaming callback could be added
    }
    return out
  } else {
    const res:any = await engine.chat.completions.create({ messages, temperature })
    return res.choices?.[0]?.message?.content ?? ''
  }
}
