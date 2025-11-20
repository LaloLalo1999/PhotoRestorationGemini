# Contributing to Photo Restoration Gemini

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing to this project.

## Development Setup

### Prerequisites

- Node.js 18.0.0 or higher
- npm 10.2.5 or higher
- Git

### Getting Started

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/PhotoRestorationGemini.git
   cd PhotoRestorationGemini
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Set up environment variables:
   ```bash
   cp apps/web/.env.example apps/web/.env.local
   ```
   Then edit `.env.local` with your actual keys (see README.md for details)

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open http://localhost:3000 in your browser

## Project Structure

```
PhotoRestorationGemini/
├── apps/
│   └── web/                    # Next.js application
│       ├── app/
│       │   ├── api/            # API routes
│       │   │   ├── restore/    # Image restoration endpoint
│       │   │   └── webhooks/   # Webhook handlers
│       │   ├── dashboard/      # Dashboard page (protected)
│       │   ├── sign-in/        # Authentication pages
│       │   └── sign-up/
│       ├── middleware.ts       # Clerk authentication middleware
│       └── package.json
├── packages/
│   ├── ui/                     # Shared UI components
│   │   ├── button.tsx
│   │   └── index.tsx
│   └── typescript-config/      # Shared TypeScript configurations
│       ├── base.json
│       └── nextjs.json
├── package.json                # Root package.json (workspaces)
├── turbo.json                  # Turborepo configuration
└── vercel.json                 # Vercel deployment config
```

## Development Workflow

### Running Commands

```bash
# Start development server for all apps
npm run dev

# Build all apps and packages
npm run build

# Lint all code
npm run lint

# Format code with Prettier
npm run format
```

### Making Changes

1. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes

3. Test your changes:
   ```bash
   npm run build
   npm run lint
   ```

4. Commit your changes:
   ```bash
   git add .
   git commit -m "feat: your descriptive commit message"
   ```

5. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```

6. Create a Pull Request

## Commit Message Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

Examples:
```
feat: add image download functionality
fix: resolve authentication redirect issue
docs: update deployment guide
```

## Code Style

- Use TypeScript for all new code
- Follow the existing code style
- Use meaningful variable and function names
- Add comments for complex logic
- Use Prettier for formatting (run `npm run format`)

## Testing Guidelines

Currently, there are no automated tests. When adding tests:
- Place tests next to the files they test
- Use descriptive test names
- Test edge cases
- Mock external dependencies

## Adding New Features

### Adding a New Page

1. Create a new directory in `apps/web/app/`
2. Add `page.tsx` for the page component
3. Add route-specific components if needed
4. Update middleware if authentication is required

### Adding an API Route

1. Create a directory in `apps/web/app/api/`
2. Add `route.ts` with handler functions
3. Implement proper error handling
4. Add authentication checks if needed
5. Document the endpoint

### Adding a UI Component

1. Add component to `packages/ui/`
2. Export it from `packages/ui/index.tsx`
3. Use TypeScript for props
4. Make it reusable and customizable

## Architecture Decisions

### Why Turborepo?

- Efficient monorepo management
- Fast builds with caching
- Easy to add new apps/packages
- Scales well for large projects

### Why Clerk?

- Easy authentication setup
- Built-in UI components
- Beta billing integration
- Good developer experience

### Why Next.js App Router?

- Modern React features
- Better performance
- Server components
- Built-in routing

## Common Tasks

### Adding a New Dependency

For the web app:
```bash
cd apps/web
npm install package-name
```

For shared packages:
```bash
cd packages/ui
npm install package-name
```

### Updating Environment Variables

1. Update `apps/web/.env.example`
2. Update `DEPLOYMENT.md` with the new variable
3. Document what it's used for in `README.md`

### Debugging

1. Use browser DevTools for frontend issues
2. Check Vercel logs for deployment issues
3. Use `console.log` strategically
4. Check network requests in DevTools

## Pull Request Process

1. Ensure your code builds successfully
2. Update documentation if needed
3. Add a clear PR description:
   - What changes were made
   - Why they were made
   - How to test them
4. Link related issues
5. Wait for review

### PR Checklist

- [ ] Code builds without errors
- [ ] Linting passes
- [ ] Documentation updated (if needed)
- [ ] Environment variables documented (if added)
- [ ] Commit messages follow conventions
- [ ] PR description is clear

## Getting Help

- Open an issue for bugs or feature requests
- Start a discussion for questions
- Check existing issues and discussions first

## Code of Conduct

- Be respectful and inclusive
- Welcome newcomers
- Focus on constructive feedback
- Help others learn and grow

## License

By contributing, you agree that your contributions will be licensed under the same license as the project.

## Thank You!

Your contributions help make this project better for everyone. We appreciate your time and effort!
