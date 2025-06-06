"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { useAccount } from "wagmi"
import { WalletConnect } from "@/components/wallet-connect"
import { PostCard } from "@/components/post-card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { type Post, type Comment, mockPosts, mockUsers } from "@/lib/db"
import Link from "next/link"
import { ArrowLeft, Hash, Send } from "lucide-react"

export default function PostDetailPage() {
  const params = useParams()
  const postId = Number.parseInt(params.id as string)
  const { address, isConnected } = useAccount()

  const [post, setPost] = useState<Post | null>(null)
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState("")
  const [isCommenting, setIsCommenting] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadPostData = async () => {
      setLoading(true)

      // Find the post
      const foundPost = mockPosts.find((p) => p.id === postId)
      if (foundPost) {
        const postWithUser = {
          ...foundPost,
          user: mockUsers.find((user) => user.wallet_address === foundPost.wallet_address),
        }
        setPost(postWithUser)
      }

      // Mock comments data
      const mockComments: Comment[] = [
        {
          id: 1,
          post_id: postId,
          wallet_address: "0x2345678901234567890123456789012345678901",
          content: "Great post! The future of social media is definitely decentralized.",
          timestamp: new Date(Date.now() - 1800000).toISOString(),
          user: mockUsers.find((u) => u.wallet_address === "0x2345678901234567890123456789012345678901"),
        },
        {
          id: 2,
          post_id: postId,
          wallet_address: "0x1234567890123456789012345678901234567890",
          content: "Web3 is changing everything.",
          timestamp: new Date(Date.now() - 900000).toISOString(),
          user: mockUsers.find((u) => u.wallet_address === "0x1234567890123456789012345678901234567890"),
        },
      ]

      setComments(mockComments.filter((c) => c.post_id === postId))
      setLoading(false)
    }

    loadPostData()
  }, [postId])

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim() || !isConnected || !address) return

    setIsCommenting(true)
    try {
      // Simulate API call
      const newCommentObj: Comment = {
        id: comments.length + 1,
        post_id: postId,
        wallet_address: address,
        content: newComment.trim(),
        timestamp: new Date().toISOString(),
        user: mockUsers.find((u) => u.wallet_address === address),
      }

      setComments((prev) => [...prev, newCommentObj])
      setNewComment("")
    } catch (error) {
      console.error("Error posting comment:", error)
    } finally {
      setIsCommenting(false)
    }
  }

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))

    if (hours < 1) {
      const minutes = Math.floor(diff / (1000 * 60))
      return `${minutes}m ago`
    } else if (hours < 24) {
      return `${hours}h ago`
    } else {
      const days = Math.floor(hours / 24)
      return `${days}d ago`
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container max-w-2xl mx-auto py-8">
          <div className="animate-pulse space-y-6">
            <div className="bg-muted rounded-lg h-48"></div>
            <div className="bg-muted rounded-lg h-32"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container max-w-2xl mx-auto py-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Post Not Found</h2>
          <Link href="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
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
                Post
              </h1>
            </div>
          </div>
          <WalletConnect />
        </div>
      </header>

      {/* Main Content */}
      <main className="container max-w-2xl mx-auto py-8 space-y-6">
        {/* Post */}
        <PostCard post={post} />

        {/* Comment Form */}
        {isConnected ? (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Add a comment</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitComment} className="space-y-4">
                <div className="flex gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${address}`} />
                    <AvatarFallback>{address?.slice(2, 4).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <Textarea
                    placeholder="Share your thoughts..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="flex-1"
                  />
                </div>
                <div className="flex justify-end">
                  <Button
                    type="submit"
                    disabled={!newComment.trim() || isCommenting}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  >
                    {isCommenting ? (
                      "Posting..."
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Comment
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-muted-foreground mb-4">Connect your wallet to join the conversation</p>
              <WalletConnect />
            </CardContent>
          </Card>
        )}

        {/* Comments */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Comments ({comments.length})</h3>
          {comments.length > 0 ? (
            comments.map((comment) => (
              <Card key={comment.id}>
                <CardContent className="pt-4">
                  <div className="flex gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={
                          comment.user?.profile_pic_url ||
                          `https://api.dicebear.com/7.x/avataaars/svg?seed=${comment.wallet_address}`
                        }
                      />
                      <AvatarFallback>{comment.wallet_address.slice(2, 4).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-sm">
                          {comment.user?.username ||
                            `${comment.wallet_address.slice(0, 6)}...${comment.wallet_address.slice(-4)}`}
                        </span>
                        <span className="text-muted-foreground text-xs">{formatTime(comment.timestamp)}</span>
                      </div>
                      <p className="text-sm">{comment.content}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <p>No comments yet. Be the first to comment!</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
