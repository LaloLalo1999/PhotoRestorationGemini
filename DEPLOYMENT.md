# Deployment Guide

This guide will help you deploy the Photo Restoration Gemini application to Vercel.

## Prerequisites

Before deploying, ensure you have:
1. A [Vercel account](https://vercel.com)
2. A [Clerk account](https://clerk.com) with a configured application
3. A [Google Gemini API key](https://ai.google.dev/gemini-api/docs)
4. Your repository pushed to GitHub

## Step 1: Set Up Clerk

1. Go to [Clerk Dashboard](https://dashboard.clerk.com/)
2. Create a new application or select an existing one
3. Navigate to **API Keys** section
4. Copy your:
   - Publishable Key (starts with `pk_`)
   - Secret Key (starts with `sk_`)

### Enable Clerk Billing (Beta)

1. In your Clerk dashboard, navigate to **Billing** section
2. Enable the beta billing feature
3. Configure your subscription plans
4. Set up a webhook endpoint (will be configured after deployment)

## Step 2: Get Google Gemini API Key

1. Visit [Google AI Studio](https://ai.google.dev/gemini-api/docs)
2. Click "Get API Key" 
3. Create a new API key or use an existing one
4. Copy your API key

### Note on Gemini 3 Pro Image Preview (Nano Banana Pro)

This application uses **Gemini 3 Pro Image Preview (Nano Banana Pro Preview)** - the professional model for high-quality photo restoration:

**Professional Features**:
1. **Google Search Grounding**: Real-world context awareness for accurate restoration
2. **Thinking Process**: AI refines composition and quality before generating the image
3. **4K Resolution**: Capable of generating professional-quality images up to 4K
4. **Complex Instructions**: Handles sophisticated restoration requirements
5. **Single-Step Process**: Complete analysis and generation in one call

**Setup Requirements**:
1. Ensure your Google AI API key has [Gemini 3 Pro Image Preview access](https://ai.google.dev/gemini-api/docs/image-generation)
2. Model identifier: `gemini-3.0-pro-image-preview` (Preview status)
3. For production: Implement cloud storage (Google Cloud Storage, AWS S3) for 4K images
4. Monitor API costs as this is a premium professional model

## Step 3: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard

1. Log in to [Vercel](https://vercel.com)
2. Click **"New Project"**
3. Import your GitHub repository
4. Configure build settings:
   - **Framework Preset**: Next.js
   - **Root Directory**: Leave as `.` (monorepo detected automatically)
   - **Build Command**: `npm run build` (or leave default)
   - **Output Directory**: Leave default
5. Click **"Deploy"**

### Option B: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel
```

## Step 4: Configure Environment Variables

After deployment, add these environment variables in your Vercel project:

1. Go to your project in Vercel Dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add the following variables:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_xxxxx
CLERK_SECRET_KEY=sk_live_xxxxx

# Clerk URLs (update with your production domain)
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# Clerk Billing Webhook Secret
CLERK_BILLING_WEBHOOK_SECRET=whsec_xxxxx

# Google Gemini API
GEMINI_API_KEY=your_gemini_api_key

# Application URL (update with your production domain)
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
```

4. Make sure to set environment for **Production**, **Preview**, and **Development**
5. Click **"Save"**
6. Redeploy your application for changes to take effect

## Step 5: Configure Clerk Webhooks

1. Get your production deployment URL from Vercel (e.g., `https://your-app.vercel.app`)
2. Go to your Clerk Dashboard → **Webhooks**
3. Click **"Add Endpoint"**
4. Set the endpoint URL: `https://your-app.vercel.app/api/webhooks/billing`
5. Select the following events:
   - `subscription.created`
   - `subscription.updated`
   - `subscription.deleted`
   - `payment.succeeded`
   - `payment.failed`
6. Copy the **Signing Secret** (starts with `whsec_`)
7. Add this as `CLERK_BILLING_WEBHOOK_SECRET` in Vercel environment variables
8. Redeploy your application

## Step 6: Configure Clerk Redirect URLs

1. In Clerk Dashboard, go to **Paths**
2. Update the redirect URLs:
   - Sign-in URL: `https://your-app.vercel.app/sign-in`
   - Sign-up URL: `https://your-app.vercel.app/sign-up`
   - After sign-in URL: `https://your-app.vercel.app/dashboard`
   - After sign-up URL: `https://your-app.vercel.app/dashboard`

## Step 7: Test Your Deployment

1. Visit your production URL
2. Test the following:
   - [ ] Home page loads correctly
   - [ ] Sign up flow works
   - [ ] Sign in flow works
   - [ ] Dashboard is accessible after authentication
   - [ ] Image upload works
   - [ ] Image restoration API responds (even with placeholder)
   - [ ] User can sign out

## Step 8: Monitor and Debug

### View Logs

- In Vercel Dashboard, go to your project → **Deployments** → Select a deployment → **Functions**
- Check logs for any errors

### Common Issues

**Issue**: Build fails with Clerk errors
- **Solution**: Ensure all Clerk environment variables are set correctly

**Issue**: Middleware errors at runtime
- **Solution**: Verify `CLERK_SECRET_KEY` is set in production environment

**Issue**: Image restoration fails
- **Solution**: Check `GEMINI_API_KEY` is valid and has proper quotas

**Issue**: Webhooks not working
- **Solution**: Verify webhook secret and that the endpoint is publicly accessible

## Production Considerations

### 1. Image Storage
Currently, images are processed in-memory. For production:
- Implement cloud storage (Google Cloud Storage, AWS S3)
- Store original and restored images
- Generate signed URLs for downloads
- Implement cleanup policies

### 2. Rate Limiting
Add rate limiting to protect your API:
- Use Vercel Edge Config or Upstash Redis
- Implement per-user limits
- Add tier-based quotas with billing

### 3. Monitoring
Set up monitoring:
- Configure Vercel Analytics
- Add error tracking (Sentry, etc.)
- Monitor API usage and costs

### 4. Security
- Enable CORS properly
- Validate file types and sizes
- Implement CSRF protection
- Rate limit authentication endpoints

### 5. Performance
- Enable image optimization
- Implement caching strategies
- Use CDN for static assets
- Consider edge functions for better latency

## Custom Domain (Optional)

1. In Vercel Dashboard, go to your project → **Settings** → **Domains**
2. Click **"Add"**
3. Enter your custom domain
4. Follow DNS configuration instructions
5. Update `NEXT_PUBLIC_APP_URL` environment variable
6. Update Clerk redirect URLs with new domain

## Scaling Considerations

- Vercel automatically scales your deployment
- Monitor Gemini API quotas and costs
- Consider implementing a queue for heavy processing
- Use Vercel's serverless function timeout limits (10s on free, 60s on pro)

## Support

If you encounter issues:
- Check [Vercel documentation](https://vercel.com/docs)
- Review [Clerk documentation](https://clerk.com/docs)
- Check [Gemini API documentation](https://ai.google.dev/gemini-api/docs)
- Open an issue in the GitHub repository
