"use client"

import * as React from "react"
import { AlertCircle } from "lucide-react"

export default function NotificationsPage() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-6 p-6">
      {/* Service Unavailable Banner */}
      <div className="flex items-center gap-3 rounded-xl border border-destructive/20 bg-destructive/5 p-4 text-destructive text-sm font-medium">
        <AlertCircle className="size-4 shrink-0" />
        <span>Notification service is currently not available.</span>
      </div>

      <div className="space-y-0.5">
        <h2 className="text-foreground text-2xl font-bold tracking-tight">
          Notifications
        </h2>
        <p className="text-muted-foreground">
          Manage your app notifications and real-time updates.
        </p>
      </div>

      <div className="rounded-xl border border-dashed border-border/60 p-12 text-center">
        <p className="text-sm text-muted-foreground font-medium">
          We are currently building our notification engine to keep you updated on project milestones.
        </p>
      </div>
    </div>
  )
}

