"use client"

import * as React from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ProfileImageUpload } from "@/components/profile-image-upload"
import { toast } from "sonner"
import {
  Laptop,
  Smartphone,
  Loader2,
  CheckCircle2,
  Mail,
  Shield,
  User,
  Globe,
  Trash2,
  Link as LinkIcon,
  Unlink,
} from "lucide-react"

interface SessionData {
  id: string
  token: string
  userAgent?: string | null
  ipAddress?: string | null
  updatedAt: string | Date
}

interface AccountData {
  id: string
  providerId: string
}

export default function AccountPage() {
  const { data: session, isPending, refetch } = authClient.useSession()
  const router = useRouter()

  // Profile States
  const [name, setName] = React.useState("")
  const [isUpdatingName, setIsUpdatingName] = React.useState(false)

  // Password States
  const [oldPassword, setOldPassword] = React.useState("")
  const [newPassword, setNewPassword] = React.useState("")
  const [isUpdatingPassword, setIsUpdatingPassword] = React.useState(false)

  // Dynamic Session/Account States
  const [sessions, setSessions] = React.useState<SessionData[]>([])
  const [isLoadingSessions, setIsLoadingSessions] = React.useState(true)
  const [accounts, setAccounts] = React.useState<AccountData[]>([])
  const [isLoadingAccounts, setIsLoadingAccounts] = React.useState(true)

  // Initialize display name from session data
  React.useEffect(() => {
    if (session?.user?.name) {
      Promise.resolve().then(() => setName(session.user.name))
    }
  }, [session])

  // Fetch Connected Accounts & Active Sessions
  const fetchAccountsAndSessions = React.useCallback(async () => {
    try {
      // 1. Fetch Connected Accounts
      const accRes = await authClient.listAccounts()
      if (accRes.data) {
        setAccounts(accRes.data as AccountData[])
      }

      // 2. Fetch Active Sessions
      const sessRes = await authClient.listSessions()
      if (sessRes.data) {
        setSessions(sessRes.data as unknown as SessionData[])
      }
    } catch (err) {
      console.error("Failed to fetch settings data:", err)
    } finally {
      setIsLoadingSessions(false)
      setIsLoadingAccounts(false)
    }
  }, [])

  React.useEffect(() => {
    if (session) {
      fetchAccountsAndSessions()
    }
  }, [session, fetchAccountsAndSessions])

  if (isPending) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#F8F9FB] dark:bg-[#0A0A0B]">
        <Loader2 className="size-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!session) {
    router.push("/login")
    return null
  }

  // Check if Google provider is connected
  const isGoogleLinked = accounts.some((acc) => acc.providerId === "google")

  // Update User Name
  const handleUpdateName = async () => {
    if (!name.trim()) return
    setIsUpdatingName(true)
    try {
      await authClient.updateUser({
        name: name,
      })
      toast.success("Profile updated successfully")
      refetch()
    } catch {
      toast.error("Failed to update profile")
    } finally {
      setIsUpdatingName(false)
    }
  }

  // Update User Password
  const handleUpdatePassword = async () => {
    if (!oldPassword || !newPassword) {
      toast.error("Please fill in both password fields")
      return
    }
    setIsUpdatingPassword(true)
    try {
      await authClient.changePassword({
        newPassword,
        currentPassword: oldPassword,
        revokeOtherSessions: true,
      })
      toast.success("Password updated successfully")
      setOldPassword("")
      setNewPassword("")
    } catch {
      toast.error("Failed to update password")
    } finally {
      setIsUpdatingPassword(false)
    }
  }

  // Link Social Provider
  const handleLinkSocial = async (providerId: "google") => {
    try {
      await authClient.linkSocial({
        provider: providerId,
        callbackURL: window.location.href,
      })
    } catch {
      toast.error(`Failed to connect ${providerId} account`)
    }
  }

  // Unlink Social Provider
  const handleUnlinkAccount = async (providerId: string) => {
    try {
      const { error } = await authClient.unlinkAccount({
        providerId,
      })

      if (error) {
        toast.error(error.message || `Failed to disconnect ${providerId}`)
        return
      }

      toast.success(`${providerId} account disconnected`)
      setAccounts((prev) => prev.filter((acc) => acc.providerId !== providerId))
    } catch {
      toast.error(`Error disconnecting ${providerId}`)
    }
  }

  // Revoke Session
  const handleRevokeSession = async (token: string) => {
    try {
      await authClient.revokeSession({ token })
      setSessions((prev) => prev.filter((s) => s.token !== token))
      toast.success("Active session terminated")
    } catch {
      toast.error("Failed to revoke session")
    }
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-6 p-6">
          <div className="space-y-0.5">
            <h2 className="text-foreground text-2xl font-bold tracking-tight">
              Account Settings
            </h2>
            <p className="text-muted-foreground">
              Manage your personal details, connected accounts, and security preferences.
            </p>
          </div>

          <Separator />

          <div className="grid gap-6">
            {/* Display Name Section */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <User className="text-primary size-5" />
                  <CardTitle>Display Name</CardTitle>
                </div>
                <CardDescription>
                  This name will be visible to collaborators on your storyboards.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6 pb-2">
                  <ProfileImageUpload 
                    src={session.user.image}
                    name={session.user.name}
                    onSuccess={() => refetch()}
                  />
                  <div className="flex-1 space-y-6 w-full">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                        className="max-w-md"
                      />
                    </div>
                    <div className="space-y-2 opacity-70">
                      <Label htmlFor="email">Email Address</Label>
                      <div className="flex items-center gap-2 text-sm font-medium bg-muted p-3 rounded-md border max-w-md">
                        <Mail className="size-4 text-muted-foreground" />
                        {session.user.email}
                      </div>
                      <p className="text-[11px] text-muted-foreground italic">
                        Email address cannot be changed directly.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t px-6 py-4">
                <Button
                  onClick={handleUpdateName}
                  disabled={isUpdatingName || name === session.user.name}
                >
                  {isUpdatingName ? (
                    <Loader2 className="mr-2 size-4 animate-spin" />
                  ) : (
                    <CheckCircle2 className="mr-2 size-4" />
                  )}
                  Save Changes
                </Button>
              </CardFooter>
            </Card>

            {/* Connected Accounts Section */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Globe className="text-primary size-5" />
                  <CardTitle>Connected Accounts</CardTitle>
                </div>
                <CardDescription>
                  Manage the third-party login providers linked to your account.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoadingAccounts ? (
                  <div className="flex justify-center py-6">
                    <Loader2 className="size-6 animate-spin text-muted-foreground" />
                  </div>
                ) : (
                  <div className="grid gap-3 max-w-md">
                    {/* Google OAuth Row */}
                    <div className="flex items-center justify-between p-4 border rounded-xl bg-card hover:shadow-sm transition-all">
                      <div className="flex items-center gap-3">
                        <Globe className="size-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-semibold">Google Account</p>
                          <p className="text-xs text-muted-foreground">Social Authentication</p>
                        </div>
                      </div>

                      <div>
                        {isGoogleLinked ? (
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 text-xs gap-1.5 text-destructive hover:bg-destructive/10 border-destructive/20 hover:border-destructive/30"
                            onClick={() => handleUnlinkAccount("google")}
                          >
                            <Unlink className="size-3" />
                            Disconnect
                          </Button>
                        ) : (
                          <Button
                            variant="secondary"
                            size="sm"
                            className="h-8 text-xs gap-1.5"
                            onClick={() => handleLinkSocial("google")}
                          >
                            <LinkIcon className="size-3" />
                            Connect
                          </Button>
                        )}
                      </div>
                    </div>

                    {/* Standard Email Row */}
                    <div className="flex items-center justify-between p-4 border rounded-xl bg-muted/20 opacity-80">
                      <div className="flex items-center gap-3">
                        <Mail className="size-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-semibold">Email & Password</p>
                          <p className="text-xs text-muted-foreground">Standard Credentials</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground bg-muted px-2 py-1 rounded">
                        Primary
                      </span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Security Password Section */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Shield className="text-primary size-5" />
                  <CardTitle>Security</CardTitle>
                </div>
                <CardDescription>
                  Update your authentication credentials securely.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 max-w-md">
                <div className="grid gap-2">
                  <Label htmlFor="old-password">Current Password</Label>
                  <Input
                    id="old-password"
                    type="password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    placeholder="••••••••"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input
                    id="new-password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••"
                  />
                </div>
              </CardContent>
              <CardFooter className="border-t px-6 py-4">
                <Button
                  onClick={handleUpdatePassword}
                  disabled={isUpdatingPassword || !oldPassword || !newPassword}
                >
                  {isUpdatingPassword ? (
                    <Loader2 className="mr-2 size-4 animate-spin" />
                  ) : (
                    <CheckCircle2 className="mr-2 size-4" />
                  )}
                  Update Password
                </Button>
              </CardFooter>
            </Card>

            {/* Active Sessions Section */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Laptop className="text-primary size-5" />
                  <CardTitle>Active Sessions</CardTitle>
                </div>
                <CardDescription>
                  Review and terminate active web sessions logged in on other devices.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoadingSessions ? (
                  <div className="flex justify-center py-6">
                    <Loader2 className="size-6 animate-spin text-muted-foreground" />
                  </div>
                ) : (
                  <div className="space-y-3 max-w-xl">
                    {sessions.map((sess) => (
                      <div
                        key={sess.id}
                        className="flex items-center justify-between gap-4 p-4 rounded-xl border bg-card hover:shadow-sm transition-all"
                      >
                        <div className="flex items-center gap-3 overflow-hidden min-w-0">
                          <div className="p-2 bg-muted rounded-lg shrink-0">
                            {sess.userAgent?.includes("Mobi") ? (
                              <Smartphone className="size-4 text-muted-foreground" />
                            ) : (
                              <Laptop className="size-4 text-muted-foreground" />
                            )}
                          </div>
                          <div className="truncate min-w-0">
                            <p className="text-sm font-semibold truncate flex items-center gap-2">
                              {sess.userAgent || "Unknown Browser / Client"}
                              {sess.token === session.session.token && (
                                <span className="shrink-0 text-[9px] bg-muted text-muted-foreground px-2 py-0.5 rounded-full font-bold uppercase tracking-tighter border">
                                  Current
                                </span>
                              )}
                            </p>
                            <p className="text-[10px] text-muted-foreground">
                              Last used: {new Date(sess.updatedAt).toLocaleDateString()} at{" "}
                              {new Date(sess.updatedAt).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </p>
                          </div>
                        </div>

                        {sess.token !== session.session.token && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive hover:bg-destructive/10 shrink-0 size-8"
                            onClick={() => handleRevokeSession(sess.token)}
                            title="Revoke session"
                          >
                            <Trash2 className="size-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                    {sessions.length === 0 && (
                      <p className="text-muted-foreground py-4 text-sm text-center">
                        No active sessions found.
                      </p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
