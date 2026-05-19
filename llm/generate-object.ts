import { ai } from "./client"
import { CHAT_MODEL } from "./constants"
import { zodToJsonSchema } from "zod-to-json-schema"
import { GenerateObjectOptions } from "./types"
import { Content, Schema } from "@google/genai"

export const generateObject = async (options: GenerateObjectOptions) => {
  const {
    schema,
    jsonSchema,
    messages,
    temperature = 1.0,
    abortSignal,
  } = options

  const finalSchema =
    jsonSchema ||
    (schema
      ? zodToJsonSchema(schema as unknown as Parameters<typeof zodToJsonSchema>[0], {
          target: "openApi3",
          $refStrategy: "none",
          definitionPath: "definitions",
        })
      : undefined)

  if (abortSignal?.aborted) {
    throw new Error("AbortError")
  }

  // Gemini 3 Interaction Pattern
  // Separate system instruction from user input
  const systemMessage = messages.find((m) => m.role === "system")
  const systemInstruction = systemMessage ? systemMessage.content : undefined
  const chatHistory = messages.filter((m) => m.role !== "system")

  // The last message is the current input
  const lastMessage = chatHistory[chatHistory.length - 1]
  const input = lastMessage ? lastMessage.content : ""

  // History is everything else
  const history: Content[] = chatHistory.slice(0, -1).map((msg) => ({
    role: msg.role === "assistant" ? "model" : "user",
    parts: [{ text: msg.content }],
  }))

  const chat = ai.chats.create({
    model: CHAT_MODEL,
    history: history,
    config: {
      systemInstruction: systemInstruction,
      temperature,
      responseMimeType: "application/json",
      responseSchema: finalSchema as Schema,
    },
  })

  const response = await chat.sendMessage({ message: input })

  try {
    const text = response.text || "{}"
    const object = JSON.parse(text)

    const validated = schema ? schema.parse(object) : object
    return { object: validated }
  } catch (error) {
    console.error("Schema validation failed. Raw response:", response.text)
    console.error("Validation Error details:", error)
    throw new Error("Failed to parse or validate AI response as JSON")
  }
}
