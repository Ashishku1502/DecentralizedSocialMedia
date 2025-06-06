// Database connection utility
// In a real app, you'd use a proper database connection
// For this MVP, we'll simulate with localStorage and API routes

export interface User {
  wallet_address: string
  username?: string
  bio?: string
  profile_pic_url?: string
  created_at?: string
  updated_at?: string
}

export interface Post {
  id: number
  wallet_address: string
  content: string
  timestamp: string
  user?: User
  likes_count?: number
  comments_count?: number
  is_liked?: boolean
}

export interface Comment {
  id: number
  post_id: number
  wallet_address: string
  content: string
  timestamp: string
  user?: User
}

// Mock data for demonstration
export const mockUsers: User[] = [
  {
    wallet_address: "0x1234567890123456789012345678901234567890",
    username: "alice_crypto",
    bio: "Blockchain enthusiast and DeFi explorer 🚀",
    profile_pic_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=alice",
  },
  {
    wallet_address: "0x2345678901234567890123456789012345678901",
    username: "bob_web3",
    bio: "Building the decentralized future, one block at a time",
    profile_pic_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=bob",
  },
]

export const mockPosts: Post[] = [
  {
    id: 1,
    wallet_address: "0x1234567890123456789012345678901234567890",
    content: "Just connected my wallet to this amazing decentralized social platform! The future is here 🌟",
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    likes_count: 5,
    comments_count: 2,
  },
  {
    id: 2,
    wallet_address: "0x2345678901234567890123456789012345678901",
    content: "Love how my identity is tied to my wallet address. True ownership of digital identity! 💪",
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    likes_count: 3,
    comments_count: 1,
  },
]
