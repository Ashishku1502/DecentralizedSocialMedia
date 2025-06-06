"use client"

import { useState } from "react"
import { useAccount } from "wagmi"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, MessageCircle, Share } from "lucide-react"
import type { Post } from "@/lib/db"
import Link from "next/link"

interface PostCardProps {
  post: Post
  onLike?: (postId: number) => void
}

export function PostCard({ post, onLike }: PostCardProps) {
  const [isLiked, setIsLiked] = useState(post.is_liked || false)
  const [likesCount, setLikesCount] = useState(post.likes_count || 0)
  const { address, isConnected } = useAccount()

  const handleLike = async () => {
    if (!isConnected) return

    try {
      const response = await fetch(`/api/posts/${post.id}/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          wallet_address: address,
        }),
      })

      if (response.ok) {
        setIsLiked(!isLiked)
        setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1))
        onLike?.(post.id)
      }
    } catch (error) {
      console.error("Error liking post:", error)
    }
  }

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))

    if (hours < 1) {
      const minutes = Math.floor(diff / (1000 * 60))
      return `${minutes}m`
    } else if (hours < 24) {
      return `${hours}h`
    } else {
      const days = Math.floor(hours / 24)
      return `${days}d`
    }
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage
              src={
                post.user?.profile_pic_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${post.wallet_address}`
              }
            />
            <AvatarFallback>{post.wallet_address.slice(2, 4).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <Link href={`/profile/${post.wallet_address}`} className="font-semibold hover:underline">
                {post.user?.username || `${post.wallet_address.slice(0, 6)}...${post.wallet_address.slice(-4)}`}
              </Link>
              <span className="text-muted-foreground text-sm">{formatTime(post.timestamp)}</span>
            </div>
            <p className="text-sm text-muted-foreground">
              {post.wallet_address.slice(0, 6)}...{post.wallet_address.slice(-4)}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm leading-relaxed mb-4">{post.content}</p>
        <div className="flex items-center gap-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLike}
            className={`gap-2 ${isLiked ? "text-red-500 hover:text-red-600" : "text-muted-foreground hover:text-red-500"}`}
          >
            <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
            {likesCount > 0 && <span>{likesCount}</span>}
          </Button>
          <Link href={`/post/${post.id}`}>
            <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-blue-500">
              <MessageCircle className="h-4 w-4" />
              {post.comments_count && post.comments_count > 0 && <span>{post.comments_count}</span>}
            </Button>
          </Link>
          <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-green-500">
            <Share className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
