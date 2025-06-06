"use client"

import type React from "react"

import { useState } from "react"
import { useAccount } from "wagmi"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send } from "lucide-react"

interface PostComposerProps {
  onPostCreated?: () => void
}

export function PostComposer({ onPostCreated }: PostComposerProps) {
  const [content, setContent] = useState("")
  const [isPosting, setIsPosting] = useState(false)
  const { address, isConnected } = useAccount()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim() || !isConnected) return

    setIsPosting(true)
    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          wallet_address: address,
          content: content.trim(),
        }),
      })

      if (response.ok) {
        setContent("")
        onPostCreated?.()
      }
    } catch (error) {
      console.error("Error creating post:", error)
    } finally {
      setIsPosting(false)
    }
  }

  if (!isConnected) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">Connect your wallet to start posting</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${address}`} />
            <AvatarFallback>{address?.slice(2, 4).toUpperCase()}</AvatarFallback>
          </Avatar>
          What's happening?
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            placeholder="Share your thoughts on the decentralized web..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            maxLength={280}
            className="min-h-[100px] resize-none"
          />
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">{content.length}/280</span>
            <Button
              type="submit"
              disabled={!content.trim() || isPosting}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              {isPosting ? (
                "Posting..."
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Post
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
