// Core entity types
export interface User {
  wallet_address: string
  username?: string
  bio?: string
  profile_pic_url?: string
  created_at?: string
  updated_at?: string
  followers_count?: number
  following_count?: number
  posts_count?: number
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
  is_bookmarked?: boolean
  media_urls?: string[]
  hashtags?: string[]
}

export interface Comment {
  id: number
  post_id: number
  wallet_address: string
  content: string
  timestamp: string
  user?: User
  likes_count?: number
  is_liked?: boolean
}

export interface Like {
  post_id: number
  wallet_address: string
  timestamp: string
}

// API Response types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    has_next: boolean
    has_prev: boolean
  }
}

// Form data types
export interface CreatePostData {
  content: string
  media_urls?: string[]
  hashtags?: string[]
}

export interface UpdateProfileData {
  username?: string
  bio?: string
  profile_pic_url?: string
}

export interface CreateCommentData {
  post_id: number
  content: string
}

// Auth and Web3 types
export interface WalletConnection {
  address: string
  chain_id: number
  is_connected: boolean
  connector_name?: string
}

export interface SignedMessage {
  message: string
  signature: string
  wallet_address: string
  timestamp: string
}

// UI State types
export interface LoadingState {
  posts: boolean
  profile: boolean
  comments: boolean
  likes: boolean
  connection: boolean
}

export interface ErrorState {
  posts?: string
  profile?: string
  comments?: string
  connection?: string
  general?: string
}

// Feed and Timeline types
export interface FeedPost extends Post {
  interaction_type?: "like" | "comment" | "repost"
  interaction_user?: User
  interaction_timestamp?: string
}

export interface Timeline {
  posts: FeedPost[]
  last_updated: string
  has_new_posts: boolean
}

// Notification types
export interface Notification {
  id: string
  type: "like" | "comment" | "follow" | "mention"
  from_user: User
  target_post?: Post
  content?: string
  timestamp: string
  is_read: boolean
}

// Search and Discovery types
export interface SearchResult {
  users: User[]
  posts: Post[]
  hashtags: string[]
}

export interface TrendingHashtag {
  tag: string
  post_count: number
  growth_rate: number
}

// Component prop types
export interface PostCardProps {
  post: Post
  onLike?: (postId: number) => void
  onComment?: (postId: number) => void
  onShare?: (postId: number) => void
  showActions?: boolean
  compact?: boolean
}

export interface ProfileCardProps {
  user: User | null
  isOwnProfile?: boolean
  onProfileUpdate?: (user: User) => void
  onFollow?: (walletAddress: string) => void
}

export interface CommentCardProps {
  comment: Comment
  onLike?: (commentId: number) => void
  onReply?: (commentId: number) => void
}

// Hook return types
export interface UsePostsResult {
  posts: Post[]
  loading: boolean
  error: string | null
  refresh: () => Promise<void>
  loadMore: () => Promise<void>
  hasMore: boolean
}

export interface UseProfileResult {
  user: User | null
  loading: boolean
  error: string | null
  updateProfile: (data: UpdateProfileData) => Promise<void>
  refreshProfile: () => Promise<void>
}

export interface UseWalletResult {
  address: string | null
  isConnected: boolean
  chain: number | null
  connect: () => Promise<void>
  disconnect: () => void
  signMessage: (message: string) => Promise<string>
}

// Database schema types (for backend)
export interface DatabaseUser {
  wallet_address: string
  username: string | null
  bio: string | null
  profile_pic_url: string | null
  created_at: Date
  updated_at: Date
}

export interface DatabasePost {
  id: number
  wallet_address: string
  content: string
  media_urls: string[] | null
  hashtags: string[] | null
  timestamp: Date
}

export interface DatabaseComment {
  id: number
  post_id: number
  wallet_address: string
  content: string
  timestamp: Date
}

export interface DatabaseLike {
  post_id: number
  wallet_address: string
  timestamp: Date
}

// Utility types
export type PostSortBy = "timestamp" | "likes" | "comments"
export type PostFilter = "all" | "following" | "trending"
export type ThemeMode = "light" | "dark" | "system"
export type NetworkChain = "mainnet" | "sepolia" | "polygon" | "arbitrum"

// Event types for real-time updates
export interface SocketEvent {
  type: "post_created" | "post_liked" | "comment_added" | "user_followed"
  data: any
  timestamp: string
}

export interface PostCreatedEvent {
  type: "post_created"
  data: Post
  timestamp: string
}

export interface PostLikedEvent {
  type: "post_liked"
  data: {
    post_id: number
    user: User
    likes_count: number
  }
  timestamp: string
}

// Configuration types
export interface AppConfig {
  max_post_length: number
  max_bio_length: number
  max_username_length: number
  supported_chains: NetworkChain[]
  api_base_url: string
  ipfs_gateway: string
}

// Error types
export class WalletError extends Error {
  code: string
  constructor(message: string, code: string) {
    super(message)
    this.code = code
    this.name = "WalletError"
  }
}

export class APIError extends Error {
  status: number
  constructor(message: string, status: number) {
    super(message)
    this.status = status
    this.name = "APIError"
  }
}

// Validation types
export interface ValidationResult {
  isValid: boolean
  errors: Record<string, string>
}

export interface PostValidation {
  content: {
    required: boolean
    maxLength: number
  }
  media: {
    maxFiles: number
    allowedTypes: string[]
    maxSize: number
  }
}
