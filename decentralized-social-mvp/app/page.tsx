"use client"

import { useState, useEffect } from "react"
import { WalletConnect } from "@/components/wallet-connect"
import { PostComposer } from "@/components/post-composer"
import { PostCard } from "@/components/post-card"
import { Button } from "@/components/ui/button"
import { type Post, mockPosts, mockUsers } from "@/lib/db"
import Link from "next/link"
import { Home, User, Hash } from "lucide-react"

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call with mock data
    const loadPosts = async () => {
      setLoading(true)
      // Add user data to posts
      const postsWithUsers = mockPosts.map((post) => ({
        ...post,
        user: mockUsers.find((user) => user.wallet_address === post.wallet_address),
      }))
      setPosts(postsWithUsers)
      setLoading(false)
    }

    loadPosts()
  }, [])

  const handlePostCreated = () => {
    // Refresh posts when a new post is created
    // In a real app, you'd refetch from the API
    console.log("Post created, refreshing feed...")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
          <div className="flex items-center gap-2">
            <Hash className="h-6 w-6 text-purple-500" />
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Decentralized Social
            </h1>
          </div>
          <nav className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <Home className="h-4 w-4 mr-2" />
                Home
              </Button>
            </Link>
            <Link href="/profile">
              <Button variant="ghost" size="sm">
                <User className="h-4 w-4 mr-2" />
                Profile
              </Button>
            </Link>
            <WalletConnect />
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container max-w-2xl mx-auto py-8 space-y-6">
        {/* Welcome Section */}
        <div className="text-center space-y-4 py-8">
          <h2 className="text-3xl font-bold">Welcome to the Decentralized Web</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Connect your wallet to join the conversation. Your identity, your data, your control.
          </p>
        </div>

        {/* Post Composer */}
        <PostComposer onPostCreated={handlePostCreated} />

        {/* Posts Feed */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Latest Posts</h3>
          {loading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-muted rounded-lg h-32"></div>
                </div>
              ))}
            </div>
          ) : posts.length > 0 ? (
            posts.map((post) => <PostCard key={post.id} post={post} />)
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <p>No posts yet. Be the first to share something!</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
