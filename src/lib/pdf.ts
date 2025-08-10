import * as pdfjsLib from 'pdfjs-dist'

// @ts-ignore - set worker
(pdfjsLib as any).GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.7.76/pdf.worker.min.js`

export async function extractPdfText(file: File): Promise<string> {
  const buf = await file.arrayBuffer()
  const loadingTask = (pdfjsLib as any).getDocument({ data: buf })
  const pdf = await loadingTask.promise
  let text = ''
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i)
    const content = await page.getTextContent()
    const pageText = content.items.map((it: any) => it.str).join(' ')
    text += `\n\n## Page ${i}\n` + pageText
  }
  return text
}
