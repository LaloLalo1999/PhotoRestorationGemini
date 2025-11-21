# Important Note About Model Selection

## Current Implementation

This application is configured to use **`gemini-3.0-pro-image-preview`** as specified in the requirements for "Gemini 3 Pro Image Preview (Nano Banana Pro Preview)".

## Model Verification Required

Before deploying to production, please verify:

1. **Check the actual model identifier** in the [Gemini API documentation](https://ai.google.dev/gemini-api/docs/image-generation)
2. **Confirm model availability** with your API key access level
3. **Update the model identifier** if needed in `/apps/web/app/api/restore/route.ts`

## Possible Model Identifiers

Based on Gemini API documentation, the image generation models include:
- `gemini-2.5-flash-image` - Fast image generation and editing
- Other preview models may be available with special access

## How to Update

If you need to change the model identifier:

1. Open `/apps/web/app/api/restore/route.ts`
2. Find line with:
   ```typescript
   model: "gemini-3.0-pro-image-preview"
   ```
3. Replace with the correct model identifier from Google's documentation
4. Test the API endpoint to ensure it works

## Features by Model

The application is designed to work with any Gemini image generation model. Features will vary based on the model used:

- **Image Analysis**: All models can analyze images
- **Image Generation**: All models can generate/edit images
- **Resolution**: Varies by model (check documentation)
- **Speed**: Varies by model (Pro models may be slower but higher quality)

## Testing

To test your API configuration:

1. Set up your `.env.local` with a valid `GEMINI_API_KEY`
2. Upload a test image through the dashboard
3. Check browser console and server logs for any API errors
4. If you get model-not-found errors, update the model identifier

## Reference Documentation

- [Gemini API Image Generation](https://ai.google.dev/gemini-api/docs/image-generation)
- [Available Models](https://ai.google.dev/gemini-api/docs/models/gemini)
- [API Reference](https://ai.google.dev/api/generate-content)

---

**Last Updated**: November 2025  
**Status**: ⚠️ Model identifier requires verification with current Gemini API
