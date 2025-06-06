"use client"

import { useState, useEffect } from "react"
import { useAccount } from "wagmi"
import { WalletConnect } from "@/components/wallet-connect"
import { ProfileCard } from "@/components/profile-card"
import { PostCard } from "@/components/post-card"
import { Button } from "@/components/ui/button"
import { type User, mockUsers, type Post, mockPosts } from "@/lib/db"
import Link from "next/link"
import { ArrowLeft, Hash } from "lucide-react"

export default function ProfilePage() {
  const { address, isConnected } = useAccount()
  const [user, setUser] = useState<User | null>(null)
  const [userPosts, setUserPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (isConnected && address) {
      // Simulate API call with mock data
      const loadUserData = async () => {
        setLoading(true)

        // Find user data
        const userData = mockUsers.find((u) => u.wallet_address === address) || null
        setUser(userData)

        // Find user's posts
        const posts = mockPosts
          .filter((post) => post.wallet_address === address)
          .map((post) => ({
            ...post,
            user: userData,
          }))
        setUserPosts(posts)

        setLoading(false)
      }

      loadUserData()
    } else {
      setLoading(false)
    }
  }, [address, isConnected])

  const handleProfileUpdate = (updatedUser: User) => {
    setUser(updatedUser)
    // Update posts with new user data
    setUserPosts((prev) =>
      prev.map((post) => ({
        ...post,
        user: updatedUser,
      })),
    )
  }

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800">
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-14 items-center justify-between">
            <div className="flex items-center gap-2">
              <Hash className="h-6 w-6 text-purple-500" />
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Decentralized Social
              </h1>
            </div>
            <WalletConnect />
          </div>
        </header>

        <main className="container max-w-2xl mx-auto py-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Connect Your Wallet</h2>
          <p className="text-muted-foreground mb-8">You need to connect your wallet to view and edit your profile.</p>
          <WalletConnect />
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <Hash className="h-6 w-6 text-purple-500" />
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Profile
              </h1>
            </div>
          </div>
          <WalletConnect />
        </div>
      </header>

      {/* Main Content */}
      <main className="container max-w-2xl mx-auto py-8 space-y-6">
        {loading ? (
          <div className="animate-pulse space-y-6">
            <div className="bg-muted rounded-lg h-48"></div>
            <div className="bg-muted rounded-lg h-32"></div>
          </div>
        ) : (
          <>
            <ProfileCard user={user} isOwnProfile={true} onProfileUpdate={handleProfileUpdate} />

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Your Posts</h3>
              {userPosts.length > 0 ? (
                userPosts.map((post) => <PostCard key={post.id} post={post} />)
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>You haven't posted anything yet.</p>
                  <Link href="/">
                    <Button className="mt-4">Create your first post</Button>
                  </Link>
                </div>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  )
}
