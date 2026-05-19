"use client"

import * as React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User } from "lucide-react"

interface UserAvatarProps {
  user: {
    name?: string | null
    image?: string | null
  }
  className?: string
}

export function UserAvatar({ user, className }: UserAvatarProps) {
  const [displaySrc, setDisplaySrc] = React.useState<string | null>(user.image || null)

  React.useEffect(() => {
    if (user.image && user.image.startsWith("uploads/")) {
      const fetchSignedUrl = async () => {
        try {
          const res = await fetch(`/api/s3/signed-url?key=${encodeURIComponent(user.image as string)}`)
          if (res.ok) {
            const data = await res.json()
            setDisplaySrc(data.url)
          }
        } catch (error) {
          console.error("Failed to fetch signed URL", error)
        }
      }
      fetchSignedUrl()
    } else {
      setDisplaySrc(user.image || null)
    }
  }, [user.image])

  return (
    <Avatar className={className}>
      <AvatarImage src={displaySrc || ""} alt={user.name || "User"} className="object-cover" />
      <AvatarFallback className="bg-primary/5 text-primary font-bold">
        {user.name ? user.name.substring(0, 2).toUpperCase() : <User className="h-4 w-4" />}
      </AvatarFallback>
    </Avatar>
  )
}
