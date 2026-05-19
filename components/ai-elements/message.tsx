"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export function MessageContent({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return <div className={cn("text-sm", className)}>{children}</div>
}

export function MessageResponse({ children }: { children: React.ReactNode }) {
  return (
    <div className="prose prose-sm dark:prose-invert max-w-none">
      {children}
    </div>
  )
}

export function parseMarkdown(text: string): React.ReactNode {
  if (!text) return null

  const lines = text.split("\n")
  const elements: React.ReactNode[] = []
  let inList = false
  let listItems: React.ReactNode[] = []
  let inCodeBlock = false
  let codeBlockLines: string[] = []

  const parseInlineStyles = (lineText: string): React.ReactNode[] => {
    const parts: React.ReactNode[] = []
    const codeTokens = lineText.split("`")
    
    codeTokens.forEach((token, codeIdx) => {
      const isCode = codeIdx % 2 === 1
      if (isCode) {
        parts.push(
          <code key={`code-${codeIdx}`} className="bg-muted-foreground/15 dark:bg-muted-foreground/20 px-1 py-0.5 rounded text-[12px] font-mono">
            {token}
          </code>
        )
      } else {
        const boldTokens = token.split("**")
        boldTokens.forEach((boldToken, boldIdx) => {
          const isBold = boldIdx % 2 === 1
          if (isBold) {
            parts.push(<strong key={`bold-${codeIdx}-${boldIdx}`} className="font-semibold text-foreground">{boldToken}</strong>)
          } else {
            const italicTokens = boldToken.split("*")
            italicTokens.forEach((italicToken, italicIdx) => {
              const isItalic = italicIdx % 2 === 1
              if (isItalic) {
                parts.push(<em key={`italic-${codeIdx}-${boldIdx}-${italicIdx}`} className="italic">{italicToken}</em>)
              } else {
                parts.push(italicToken)
              }
            })
          }
        })
      }
    })
    
    return parts
  }

  lines.forEach((line, index) => {
    if (line.trim().startsWith("```")) {
      if (inCodeBlock) {
        elements.push(
          <pre key={`codeblock-${index}`} className="bg-muted border rounded-lg p-3 my-2 text-xs font-mono overflow-x-auto text-foreground leading-normal">
            <code>{codeBlockLines.join("\n")}</code>
          </pre>
        )
        codeBlockLines = []
        inCodeBlock = false
      } else {
        inCodeBlock = true
      }
      return
    }

    if (inCodeBlock) {
      codeBlockLines.push(line)
      return
    }

    if (line.startsWith("### ")) {
      if (inList) {
        elements.push(<ul key={`list-${index}`} className="list-disc pl-5 my-2 space-y-1">{listItems}</ul>)
        listItems = []
        inList = false
      }
      elements.push(
        <h3 key={`h3-${index}`} className="text-[14px] font-bold text-foreground mt-3 mb-1">
          {parseInlineStyles(line.slice(4))}
        </h3>
      )
      return
    }

    if (line.startsWith("## ")) {
      if (inList) {
        elements.push(<ul key={`list-${index}`} className="list-disc pl-5 my-2 space-y-1">{listItems}</ul>)
        listItems = []
        inList = false
      }
      elements.push(
        <h2 key={`h2-${index}`} className="text-[15px] font-bold text-foreground mt-4 mb-1.5 border-b pb-0.5">
          {parseInlineStyles(line.slice(3))}
        </h2>
      )
      return
    }

    const isBullet = line.trim().startsWith("- ") || line.trim().startsWith("* ")
    if (isBullet) {
      inList = true
      const content = line.trim().slice(2)
      listItems.push(
        <li key={`li-${index}`} className="text-[13px] leading-relaxed text-muted-foreground">
          {parseInlineStyles(content)}
        </li>
      )
      return
    }

    if (inList && !isBullet) {
      elements.push(<ul key={`list-${index}`} className="list-disc pl-5 my-2 space-y-1">{listItems}</ul>)
      listItems = []
      inList = false
    }

    if (line.trim().length > 0) {
      elements.push(
        <p key={`p-${index}`} className="text-[13px] leading-relaxed text-muted-foreground my-1">
          {parseInlineStyles(line)}
        </p>
      )
    } else {
      elements.push(<div key={`br-${index}`} className="h-1.5" />)
    }
  })

  if (inList) {
    elements.push(<ul key={`list-end`} className="list-disc pl-5 my-2 space-y-1">{listItems}</ul>)
  }

  if (inCodeBlock && codeBlockLines.length > 0) {
    elements.push(
      <pre key={`codeblock-end`} className="bg-muted border rounded-lg p-3 my-2 text-xs font-mono overflow-x-auto text-foreground leading-normal">
        <code>{codeBlockLines.join("\n")}</code>
      </pre>
    )
  }

  return <div className="space-y-0.5">{elements}</div>
}
