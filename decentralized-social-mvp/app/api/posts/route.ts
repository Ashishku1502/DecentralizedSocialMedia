import { type NextRequest, NextResponse } from "next/server"

export async function GET() {
  // In a real app, this would query your database
  // For now, return mock data
  const posts = [
    {
      id: 1,
      wallet_address: "0x1234567890123456789012345678901234567890",
      content: "Just connected my wallet to this amazing decentralized social platform! The future is here 🌟",
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      likes_count: 5,
      comments_count: 2,
    },
  ]

  return NextResponse.json(posts)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { wallet_address, content } = body

    if (!wallet_address || !content) {
      return NextResponse.json({ error: "Wallet address and content are required" }, { status: 400 })
    }

    if (content.length > 280) {
      return NextResponse.json({ error: "Content must be 280 characters or less" }, { status: 400 })
    }

    // In a real app, you would:
    // 1. Verify the wallet signature
    // 2. Insert the post into your database
    // 3. Return the created post

    const newPost = {
      id: Date.now(), // Simple ID generation for demo
      wallet_address,
      content,
      timestamp: new Date().toISOString(),
      likes_count: 0,
      comments_count: 0,
    }

    return NextResponse.json(newPost, { status: 201 })
  } catch (error) {
    console.error("Error creating post:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
