# StudyMate — Student Edition (Vercel-ready)

Private, in-browser study tools — **no server, no API keys**. Everything runs on the user's device with WebGPU (WebLLM).

**Tools included**
- Chat (Phi-3 Mini via WebLLM)
- OCR → Notes (Tesseract.js)
- Translator (uses the local LLM)
- Code Explainer (Baby / Normal / Full tones)
- Exam Practice (PDF/notes → summaries + questions)

## One‑click deploy (Vercel)
1. Download ZIP, unzip, and upload the folder as a new Vercel Project.
2. Framework preset: **Other** (or Vite).
3. Build Command: `npm run build`
4. Output Directory: `dist`
5. After deploy, open the site and click **Preload model** or run any tool — the model will download once and be cached.

## Requirements
- Browser with **WebGPU** (Chrome/Edge latest). If unsupported, try another device or browser.
- First load can take time (model download). Subsequent loads are much faster due to caching.

## Model Settings
Default model: `Phi-3-mini-4k-instruct-q4f16_1-MLC-1k` (lightweight). You can change the default in `src/lib/webllm.ts` or add a UI select. Another option included:
- `Phi-3-mini-4k-instruct-q4f32_1-MLC` (better quality, larger)

WebLLM fetches model artifacts from the official **MLC model registry/CDN**.

## Local development
```
npm i
npm run dev
```

## Notes
- Translator uses the same local LLM (keeps everything offline and simple).
- PDF extraction is via pdf.js; large/complex PDFs may need a refresh if memory is tight.
