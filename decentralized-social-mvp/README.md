# Decentralized Social Media MVP

A decentralized social media platform built on Ethereum with wallet-based authentication, user profiles, and social interactions.

## 🚀 Features

- **Wallet Authentication**: Login using RainbowKit and Ethereum wallets
- **User Profiles**: Create and update profiles with username, bio, and profile picture
- **Posts**: Share short messages (up to 280 characters)
- **Social Feed**: View posts from all users in chronological order
- **Interactions**: Like and comment on posts
- **Responsive Design**: Mobile-first design with Tailwind CSS

## 🛠 Tech Stack

### Frontend
- **React.js** - UI library
- **Next.js** - React framework with App Router
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - UI component library

### Web3 Integration
- **RainbowKit** - Wallet connection UI
- **wagmi** - React hooks for Ethereum
- **viem** - TypeScript interface for Ethereum

### Backend
- **Next.js API Routes** - RESTful API endpoints
- **PostgreSQL** - Database (schema provided)

## 🏗 Database Schema

The application uses PostgreSQL with the following tables:

- `users` - User profiles linked to wallet addresses
- `posts` - User posts with content and timestamps
- `likes` - Post likes with user associations
- `comments` - Post comments with user associations

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- Ethereum wallet (MetaMask, WalletConnect, etc.)

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd decentralized-social-mvp
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Set up environment variables**
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`
   
   Fill in your environment variables:
   \`\`\`env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/decentral_social"
   
   # WalletConnect Project ID (get from https://cloud.walletconnect.com)
   NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID="your_project_id"
   \`\`\`

4. **Set up the database**
   
   Run the SQL scripts in the `scripts/` folder:
   \`\`\`sql
   -- Run 01-create-tables.sql first
   -- Then run 02-seed-data.sql for sample data
   \`\`\`

5. **Start the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

6. **Open your browser**
   
   Navigate to `http://localhost:3000`

## 📱 Usage

### Connecting Your Wallet

1. Click "Connect Wallet" in the header
2. Choose your preferred wallet (MetaMask, WalletConnect, etc.)
3. Approve the connection in your wallet

### Creating Your Profile

1. Navigate to the Profile page
2. Click the edit button
3. Add your username, bio, and profile picture URL
4. Save your changes

### Posting Content

1. Use the post composer on the home page
2. Write your message (max 280 characters)
3. Click "Post" to share with the community

### Interacting with Posts

- **Like**: Click the heart icon on any post
- **Comment**: Click the comment icon to view and add comments
- **View Details**: Click on a post to see full details and comments

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/verify` - Verify wallet signature

### Users
- `GET /api/users/:wallet` - Get user profile
- `POST /api/users` - Create/update user profile

### Posts
- `GET /api/posts` - Get all posts
- `POST /api/posts` - Create new post
- `GET /api/posts/:id` - Get specific post
- `POST /api/posts/:id/like` - Toggle post like
- `POST /api/posts/:id/comment` - Add comment to post

## 🔐 Security Features

- **Wallet-based Authentication**: No passwords, just cryptographic signatures
- **Data Ownership**: Users control their own data through their wallet
- **Transparent Interactions**: All actions are tied to wallet addresses
- **Decentralized Identity**: No central authority controls user accounts

## 🎨 Design Principles

- **Mobile-first**: Responsive design that works on all devices
- **Clean UI**: Minimal and intuitive interface
- **Web3 Native**: Designed specifically for blockchain users
- **Accessibility**: Follows web accessibility best practices

## 🚧 Development Status

This is an MVP (Minimum Viable Product) focusing on core functionality:

✅ **Completed Features:**
- Wallet connection and authentication
- User profile management
- Post creation and viewing
- Social feed
- Like and comment system
- Responsive design

🔄 **Future Enhancements:**
- Message signing for authentication
- Real-time updates
- Image and media support
- Advanced search and filtering
- Direct messaging
- NFT profile pictures
- Token-gated communities

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [RainbowKit](https://rainbowkit.com) for wallet connection UI
- [wagmi](https://wagmi.sh) for Ethereum React hooks
- [shadcn/ui](https://ui.shadcn.com) for UI components
- [Tailwind CSS](https://tailwindcss.com) for styling

---

**Built with ❤️ for the decentralized web**
