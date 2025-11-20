# Photo Restoration Gemini

AI-powered photo restoration application using Google Gemini API, built with Next.js, Turborepo, and Clerk authentication.

## Features

- 🎨 **AI Photo Restoration**: Leverage Google Gemini AI to restore and enhance old or low-quality photos
- 🔐 **Secure Authentication**: Clerk integration for user authentication and session management
- 💳 **Billing Integration**: Clerk's beta billing system for subscription management
- ⚡ **Modern Stack**: Built with Next.js 16, TypeScript, and Tailwind CSS
- 📦 **Monorepo Structure**: Organized with Turborepo for scalable development
- 🚀 **Vercel Deployment**: Optimized for seamless deployment on Vercel

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Authentication**: Clerk
- **AI**: Google Gemini API (@google/generative-ai)
- **Monorepo**: Turborepo
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18.0.0 or higher
- npm 10.2.5 or higher

### Installation

1. Clone the repository:
```bash
git clone https://github.com/LaloLalo1999/PhotoRestorationGemini.git
cd PhotoRestorationGemini
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:

Create a `.env.local` file in `apps/web/`:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Clerk URLs
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# Clerk Billing (Beta)
CLERK_BILLING_WEBHOOK_SECRET=your_webhook_secret

# Google Gemini API
GEMINI_API_KEY=your_gemini_api_key

# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Getting API Keys

#### Clerk Setup
1. Go to [Clerk.com](https://clerk.com) and create an account
2. Create a new application
3. Copy your publishable and secret keys from the dashboard
4. Enable billing in your Clerk dashboard (Beta feature)
5. Set up webhook endpoint at `/api/webhooks/billing` for billing events

#### Google Gemini API
1. Visit [Google AI Studio](https://ai.google.dev/gemini-api/docs)
2. Create a new API key
3. Copy the API key to your environment variables

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

Build all apps and packages:

```bash
npm run build
```

### Lint

Lint all apps and packages:

```bash
npm run lint
```

## Project Structure

```
PhotoRestorationGemini/
├── apps/
│   └── web/                 # Next.js application
│       ├── app/
│       │   ├── api/         # API routes
│       │   ├── dashboard/   # Dashboard page
│       │   ├── sign-in/     # Sign in page
│       │   └── sign-up/     # Sign up page
│       └── middleware.ts    # Clerk middleware
├── packages/
│   ├── ui/                  # Shared UI components
│   └── typescript-config/   # Shared TypeScript configs
├── package.json
└── turbo.json
```

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com)
3. Configure environment variables in Vercel dashboard
4. Deploy!

Vercel will automatically detect the Next.js app and configure the build settings.

### Environment Variables on Vercel

Add all environment variables from `.env.example` in your Vercel project settings:
- Go to Project Settings → Environment Variables
- Add each variable with its production value

## Features in Detail

### Image Restoration
- Upload photos via drag-and-drop or file selector
- AI analysis using Google Gemini
- Real-time processing feedback
- Download restored images

### Authentication
- Email/password authentication
- Social login options
- Session management
- Protected routes

### Billing (Beta)
- Subscription management through Clerk
- Webhook integration for payment events
- Usage tracking

## API Routes

- `POST /api/restore` - Restore and enhance uploaded images
- `POST /api/webhooks/billing` - Handle Clerk billing webhooks

## Notes

### Gemini Image Generation
This application currently uses Gemini 1.5 Flash for image analysis. Full image generation with Imagen 3 requires special API access from Google. To enable image generation:

1. Request access to [Imagen 3 API](https://ai.google.dev/gemini-api/docs/image-generation)
2. Update the `/api/restore` route to use Imagen 3 generation capabilities
3. Implement image storage solution (e.g., cloud storage)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

See LICENSE file for details.

## Support

For support, please open an issue in the GitHub repository or contact the maintainers.

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Clerk Documentation](https://clerk.com/docs)
- [Google Gemini API](https://ai.google.dev/gemini-api/docs)
- [Turborepo Documentation](https://turbo.build/repo/docs)
- [Vercel Deployment](https://vercel.com/docs)