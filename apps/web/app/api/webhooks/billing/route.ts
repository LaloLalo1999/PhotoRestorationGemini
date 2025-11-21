import { NextRequest, NextResponse } from "next/server";
import { Webhook } from "svix";

// Clerk Billing Webhook Handler
// This handles subscription events from Clerk's billing system
export async function POST(request: NextRequest) {
  try {
    const webhookSecret = process.env.CLERK_BILLING_WEBHOOK_SECRET;

    if (!webhookSecret) {
      console.error("Missing CLERK_BILLING_WEBHOOK_SECRET");
      return NextResponse.json(
        { error: "Webhook secret not configured" },
        { status: 500 }
      );
    }

    // Get the headers
    const svix_id = request.headers.get("svix-id");
    const svix_timestamp = request.headers.get("svix-timestamp");
    const svix_signature = request.headers.get("svix-signature");

    if (!svix_id || !svix_timestamp || !svix_signature) {
      return NextResponse.json(
        { error: "Missing svix headers" },
        { status: 400 }
      );
    }

    // Get the body
    const body = await request.text();

    // Create a new Svix instance with your webhook secret
    const wh = new Webhook(webhookSecret);

    let evt: Record<string, unknown>;

    try {
      evt = wh.verify(body, {
        "svix-id": svix_id,
        "svix-timestamp": svix_timestamp,
        "svix-signature": svix_signature,
      }) as Record<string, unknown>;
    } catch (err) {
      console.error("Error verifying webhook:", err);
      return NextResponse.json(
        { error: "Invalid webhook signature" },
        { status: 400 }
      );
    }

    // Handle the webhook event
    const eventType = evt.type;
    
    console.log(`Webhook received: ${eventType}`);

    // Handle different event types
    switch (eventType) {
      case "subscription.created":
        // Handle new subscription
        console.log("New subscription created:", evt.data);
        // TODO: Update user's subscription status in your database
        break;

      case "subscription.updated":
        // Handle subscription update
        console.log("Subscription updated:", evt.data);
        // TODO: Update user's subscription status in your database
        break;

      case "subscription.deleted":
        // Handle subscription cancellation
        console.log("Subscription deleted:", evt.data);
        // TODO: Update user's subscription status in your database
        break;

      case "payment.succeeded":
        // Handle successful payment
        console.log("Payment succeeded:", evt.data);
        // TODO: Record payment in your database
        break;

      case "payment.failed":
        // Handle failed payment
        console.log("Payment failed:", evt.data);
        // TODO: Notify user of payment failure
        break;

      default:
        console.log("Unhandled event type:", eventType);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
