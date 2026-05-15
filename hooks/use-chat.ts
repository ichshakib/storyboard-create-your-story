import { useState, useCallback } from "react"
import { toast } from "sonner"

export interface ChatMessage {
  role: "user" | "assistant"
  content: string
}

interface Project {
  id: string
  title: string
  description: string | null
  slides: Array<{
    id: string
    title: string
    description: string
    prompt: string
    index: number
    html: string
  }>
}

interface UseChatOptions {
  projectId: string
  onProjectUpdate?: (project: Project) => void
}

/**
 * useChat: A custom hook to manage the AI Architect conversation.
 * Handles streaming, tool call status tracking, and project state synchronization.
 */
export function useChat({ projectId, onProjectUpdate }: UseChatOptions) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState<string | null>(null)

  const sendMessage = useCallback(
    async (text: string, projectData: Record<string, unknown>) => {
      if (!text.trim() || isLoading) return

      const userMsg = text.trim()
      setMessages((prev) => [...prev, { role: "user", content: userMsg }])
      setIsLoading(true)
      setStatus("Thinking...")

      try {
        const res = await fetch("/api/generate/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            projectId,
            message: userMsg,
            history: messages,
            projectData,
          }),
        })

        if (res.status === 403) {
          const data = await res.json()
          if (data.error === "INSUFFICIENT_CREDITS") {
            toast.error("Insufficient Credits", {
              description:
                "You need at least 10 credits to chat with the AI Architect.",
            })
            return
          }
        }

        if (!res.ok) throw new Error("Chat connection failed")

        const reader = res.body?.getReader()
        if (!reader) throw new Error("No readable stream found")

        const decoder = new TextDecoder()
        let assistantMsg = ""

        // Prepare the assistant's message slot
        setMessages((prev) => [...prev, { role: "assistant", content: "" }])

        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          const chunk = decoder.decode(value, { stream: true })
          const lines = chunk.split("\n").filter((l) => l.trim())

          for (const line of lines) {
            try {
              const event = JSON.parse(line)

              if (event.type === "text") {
                setStatus(null)
                if (event.isThought) {
                  setStatus("Reasoning...")
                } else {
                  assistantMsg += event.content
                  setMessages((prev) => {
                    const next = [...prev]
                    const last = next[next.length - 1]
                    if (last && last.role === "assistant") {
                      last.content = assistantMsg
                    }
                    return next
                  })
                }
              } else if (event.type === "tool_call") {
                setStatus(`Executing: ${event.name.replace(/_/g, " ")}`)
              } else if (event.type === "project_update") {
                if (onProjectUpdate) onProjectUpdate(event.project)
              } else if (event.type === "error") {
                toast.error(event.message)
              }
            } catch (e) {
              console.error("Stream parsing error:", e)
            }
          }
        }
      } catch (error) {
        console.error("Chat error:", error)
        toast.error("Failed to reach AI Architect")
      } finally {
        setIsLoading(false)
        setStatus(null)
      }
    },
    [messages, isLoading, projectId, onProjectUpdate]
  )

  return {
    messages,
    isLoading,
    status,
    sendMessage,
    setMessages,
  }
}
