"use client"

import * as React from "react"
import { Camera, Loader2, User } from "lucide-react"
import { toast } from "sonner"
import { authClient } from "@/lib/auth-client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface ProfileImageUploadProps {
  src?: string | null
  name?: string | null
  className?: string
  onSuccess?: () => void
}

export function ProfileImageUpload({
  src,
  name,
  className = "",
  onSuccess,
}: ProfileImageUploadProps) {
  const [isUploading, setIsUploading] = React.useState(false)
  const [displaySrc, setDisplaySrc] = React.useState<string | null>(src || null)
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  // Fetch signed URL if src is an S3 key
  React.useEffect(() => {
    if (src && src.startsWith("uploads/")) {
      const fetchSignedUrl = async () => {
        try {
          const res = await fetch(`/api/s3/signed-url?key=${encodeURIComponent(src)}`)
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
      setDisplaySrc(src || null)
    }
  }, [src])

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Basic validation
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file")
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be less than 5MB")
      return
    }

    setIsUploading(true)

    try {
      // 1. Get presigned URL
      const presignedRes = await fetch("/api/s3/presigned-url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          filename: file.name,
          contentType: file.type,
        }),
      })

      if (!presignedRes.ok) {
        throw new Error("Failed to get upload URL")
      }

      const { url, key } = await presignedRes.json()

      // 2. Upload file to S3
      const uploadRes = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": file.type,
        },
        body: file,
      })

      if (!uploadRes.ok) {
        throw new Error("Failed to upload image to S3")
      }

      // 3. We save the path (key) to the database to keep it private, not the full URL.
      const imagePath = key

      // 4. Update user profile
      const updateRes = await authClient.updateUser({
        image: imagePath,
      })

      if (updateRes.error) {
        throw new Error(updateRes.error.message || "Failed to update profile")
      }

      toast.success("Profile image updated")
      onSuccess?.()
    } catch (error) {
      console.error(error)
      toast.error(error instanceof Error ? error.message : "Upload failed")
    } finally {
      setIsUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  }

  return (
    <div className={`relative group inline-block ${className}`}>
      <Avatar className="h-24 w-24 border-2 border-border/50 shadow-sm transition-all duration-300 group-hover:opacity-75">
        <AvatarImage src={displaySrc || ""} alt={name || "User"} className="object-cover" />
        <AvatarFallback className="bg-primary/5 text-primary text-xl font-bold">
          {name ? name.substring(0, 2).toUpperCase() : <User className="h-8 w-8" />}
        </AvatarFallback>
      </Avatar>

      {/* Overlay */}
      <div 
        className="absolute inset-0 flex cursor-pointer items-center justify-center rounded-full bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        onClick={() => !isUploading && fileInputRef.current?.click()}
      >
        {isUploading ? (
          <Loader2 className="h-6 w-6 animate-spin text-white" />
        ) : (
          <Camera className="h-6 w-6 text-white" />
        )}
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
    </div>
  )
}
