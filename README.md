# GitHub Dashboard SPA 🚀

A modern GitHub dashboard built with React 19, Relay, and TailwindCSS. View and manage your repositories efficiently!

## ✨ Current Features

### User Interactions
- 👥 Follow/Unfollow Users
  - Manage following status
  - View follower/following counts
  - Quick user profile access


### Repository Details
- 🌿 Branch Management
  - List all branches
  - Branch protection status
  - Latest commit information
- 📝 Commit History
  - View recent commits
  - Commit details and messages
  - Author information


### Repository Management
- 🗑️ Bulk Repository Deletion
  - Select multiple repositories
  - Confirm and delete in batch
- 📋 Repository Listing
  - View all your repositories
  - Sort by various criteria
  - Quick access to repository details

### Advanced Search
- 🔍 Visual Query Builder
  - Complex GitHub search syntax made easy
  - Date range filters (created, updated, pushed)
  - Language filters
  - Star count filters
  - Size and fork filters



## 🔥 Tech Stack

- ⚛️ React 19 (Latest)
- 🎯 Relay - Facebook's GraphQL client
- 🎨 TailwindCSS 4
- ⚡ Vite
- 🛣️ TanStack Router
- 🔒 Clerk Auth
- 💅 Radix UI + shadcn/ui

## Why Relay over Apollo? 🤔

Relay is purpose-built by Meta (Facebook) for efficient data fetching with GraphQL:

- Collocated data requirements with components
- Compile-time GraphQL validation
- Built-in data consistency
- Automatic query/fragment composition
- Optimized for performance with automatic request batching
- Strong TypeScript support

## Why SPA instead of SSR? 🌐

This application is built as a Single Page Application (SPA) using Vite instead of Next.js SSR for several reasons:

1. No SEO requirements - dashboard is private/authenticated
2. Better GitHub API rate limiting - requests are per-user browser instead of shared server
3. Faster subsequent page loads with client-side caching
4. Simpler deployment (static files only)

## 🚀 Getting Started

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Generate Relay types
pnpm relay

# Build for production
pnpm build
```

## 📜 Available Scripts

pnpm dev - Start development server
pnpm build - Build for production
pnpm relay - Generate Relay types
pnpm lint - Lint code
pnpm preview - Preview production build
pnpm tsc - Type check

## 📦 Key Dependencies

React 19 for modern React features
Relay 18.2 for GraphQL data fetching
TailwindCSS 4 for styling
Radix UI primitives with shadcn/ui components
TanStack Router for type-safe routing
Clerk for authentication
