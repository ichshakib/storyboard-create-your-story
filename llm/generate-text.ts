import { ai } from "./client"
import { CHAT_MODEL } from "./constants"
import { GenerateTextOptions } from "./types"

/**
 * Generates text using Google GenAI through the official SDK.
 * Simplified version without tool-calling support as requested.
 *
 * @param options - messages, temperature, maxTokens, etc.
 * @returns Object containing the generated text.
 */
export const generateText = async (options: GenerateTextOptions) => {
  const { messages, temperature = 1.0, maxTokens, abortSignal } = options

  if (abortSignal?.aborted) {
    throw new Error("AbortError")
  }

  // Gemini 3 Interaction Pattern
  const systemMessage = messages.find((m) => m.role === "system")
  const systemInstruction = systemMessage ? systemMessage.content : undefined
  const chatHistory = messages.filter((m) => m.role !== "system")

  const lastMessage = chatHistory[chatHistory.length - 1]
  const input = lastMessage ? lastMessage.content : ""

  const history = chatHistory.slice(0, -1).map((msg) => ({
    role: msg.role === "assistant" ? "model" : "user",
    parts: [{ text: msg.content }],
  }))

  const response = await ai.models.generateContent({
    model: CHAT_MODEL,
    contents: [...history, { role: "user", parts: [{ text: input }] }],
    config: {
      systemInstruction: systemInstruction,
      temperature,
      maxOutputTokens: maxTokens,
    },
  })

  return {
    text: response.text || "",
    finishReason: "STOP",
  }
}
