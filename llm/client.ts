import { GoogleGenAI, Type, Tool, Content } from "@google/genai"
import { GOOGLE_API_KEY } from "@/lib/env"

export const ai = new GoogleGenAI({ apiKey: GOOGLE_API_KEY })
export { Type }
export type { Tool, Content }
