/**
 * stream-text.ts
 * Utility for handling AI streaming responses in Next.js Route Handlers.
 */

export type StreamEvent =
  | { type: "text"; content: string; isThought?: boolean }
  | { type: "tool_call"; name: string; args: Record<string, unknown> }
  | { type: "project_update"; project: Record<string, unknown> }
  | { type: "error"; message: string }
  | { type: "done" }

/**
 * Creates a ReadableStream that encodes StreamEvents as Server-Sent Events (SSE)
 * or simple JSON chunks for the client to parse.
 */
export function createAIStream(
  execute: (send: (event: StreamEvent) => void) => Promise<void>
) {
  const encoder = new TextEncoder()

  return new ReadableStream({
    async start(controller) {
      const send = (event: StreamEvent) => {
        const chunk = encoder.encode(JSON.stringify(event) + "\n")
        controller.enqueue(chunk)
      }

      try {
        await execute(send)
        send({ type: "done" })
      } catch (error) {
        console.error("Stream execution error:", error)
        send({ type: "error", message: String(error) })
      } finally {
        controller.close()
      }
    },
  })
}
