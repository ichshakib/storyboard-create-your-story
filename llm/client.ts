import { GoogleGenAI, Type, Tool, Content } from "@google/genai"
import { GEMINI_API_KEY } from "@/lib/env"

export const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY })
export { Type }
export type { Tool, Content }
