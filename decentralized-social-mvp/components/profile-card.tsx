"use client"

import { useState } from "react"
import { useAccount } from "wagmi"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Edit, Save, X } from "lucide-react"
import type { User } from "@/lib/db"

interface ProfileCardProps {
  user: User | null
  isOwnProfile?: boolean
  onProfileUpdate?: (user: User) => void
}

export function ProfileCard({ user, isOwnProfile, onProfileUpdate }: ProfileCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [username, setUsername] = useState(user?.username || "")
  const [bio, setBio] = useState(user?.bio || "")
  const [profilePicUrl, setProfilePicUrl] = useState(user?.profile_pic_url || "")
  const [isSaving, setIsSaving] = useState(false)
  const { address } = useAccount()

  const handleSave = async () => {
    if (!address) return

    setIsSaving(true)
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          wallet_address: address,
          username: username.trim() || undefined,
          bio: bio.trim() || undefined,
          profile_pic_url: profilePicUrl.trim() || undefined,
        }),
      })

      if (response.ok) {
        const updatedUser = await response.json()
        onProfileUpdate?.(updatedUser)
        setIsEditing(false)
      }
    } catch (error) {
      console.error("Error updating profile:", error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleCancel = () => {
    setUsername(user?.username || "")
    setBio(user?.bio || "")
    setProfilePicUrl(user?.profile_pic_url || "")
    setIsEditing(false)
  }

  const displayAddress = user?.wallet_address || address || ""
  const displayProfilePic = user?.profile_pic_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${displayAddress}`

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Profile</CardTitle>
          {isOwnProfile && (
            <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? <X className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={isEditing ? profilePicUrl || displayProfilePic : displayProfilePic} />
            <AvatarFallback>{displayAddress.slice(2, 4).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            {isEditing ? (
              <div className="space-y-2">
                <Input
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  maxLength={50}
                />
                <Input
                  placeholder="Profile picture URL"
                  value={profilePicUrl}
                  onChange={(e) => setProfilePicUrl(e.target.value)}
                />
              </div>
            ) : (
              <div>
                <h3 className="font-semibold">
                  {user?.username || `${displayAddress.slice(0, 6)}...${displayAddress.slice(-4)}`}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {displayAddress.slice(0, 6)}...{displayAddress.slice(-4)}
                </p>
              </div>
            )}
          </div>
        </div>

        {isEditing ? (
          <div className="space-y-4">
            <Textarea
              placeholder="Tell us about yourself..."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              maxLength={200}
              className="min-h-[80px]"
            />
            <div className="flex gap-2">
              <Button onClick={handleSave} disabled={isSaving} className="flex-1">
                <Save className="h-4 w-4 mr-2" />
                {isSaving ? "Saving..." : "Save"}
              </Button>
              <Button variant="outline" onClick={handleCancel} disabled={isSaving}>
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          user?.bio && <p className="text-sm text-muted-foreground">{user.bio}</p>
        )}
      </CardContent>
    </Card>
  )
}
