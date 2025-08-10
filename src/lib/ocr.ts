import Tesseract from 'tesseract.js'

export async function ocrImage(file: File, lang='eng'): Promise<string> {
  const { data } = await Tesseract.recognize(file, lang, {
    logger: m => console.log(m)
  })
  return data.text || ''
}
