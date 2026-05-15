import { z } from "zod"

/**
 * Message interface for conversational AI requests.
 */
export interface Message {
  role: "system" | "user" | "assistant" | "model"
  content: string
}

/**
 * Options for generateObject utility.
 */
export interface GenerateObjectOptions {
  schema?: z.ZodSchema
  jsonSchema?: unknown // Replaced any with unknown
  messages: Message[]
  temperature?: number
  abortSignal?: AbortSignal
}

/**
 * Options for generateText utility.
 */
export interface GenerateTextOptions {
  messages: Message[]
  temperature?: number
  maxTokens?: number
  abortSignal?: AbortSignal
}
