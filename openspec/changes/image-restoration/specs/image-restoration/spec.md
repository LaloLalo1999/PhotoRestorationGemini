# Image Restoration Specification

## ADDED Requirements

### Requirement: AI-Powered Image Restoration

The system SHALL integrate with Google Gemini 3 Pro Image Preview (Nano Banana Pro) to restore and enhance uploaded images.

#### Scenario: Successful image restoration

- **WHEN** a user initiates restoration for an uploaded image
- **THEN** the system MUST:
  - Verify the user is authenticated
  - Verify the image belongs to the authenticated user
  - Update the image status to "processing"
  - Retrieve the original image from Convex storage
  - Convert the image to base64 format
  - Call the Gemini API with the restoration prompt and image
  - Upload the restored image to Convex storage
  - Generate a URL for the restored image
  - Update the image record with:
    - `restoredUrl` pointing to the restored image
    - `status` set to "completed"
    - `completedAt` timestamp
  - Return the restored image URL

#### Scenario: Restoration failure

- **WHEN** the Gemini API fails during restoration
- **THEN** the system MUST:
  - Update the image status to "failed"
  - Store the error message in the `error` field
  - Set the `completedAt` timestamp
  - Return an error response to the client

#### Scenario: Invalid image reference

- **WHEN** a user attempts to restore a non-existent image
- **THEN** the system MUST return a "not found" error
- **AND** not modify any database records

#### Scenario: Unauthorized restoration attempt

- **WHEN** a user attempts to restore an image they do not own
- **THEN** the system MUST reject the request with an authorization error
- **AND** not process the restoration

### Requirement: Restoration Prompt Configuration

The system SHALL use a professional restoration prompt that guides the Gemini model to produce high-quality results.

#### Scenario: Restoration prompt content

- **WHEN** the system calls the Gemini API
- **THEN** the prompt MUST include instructions to:
  - Enhance clarity and sharpness naturally
  - Correct and balance colors accurately
  - Reduce noise, grain, and compression artifacts
  - Repair visible damage (scratches, tears, stains, fading)
  - Improve contrast and exposure
  - Enhance fine details and textures
  - Remove dust spots and blemishes
- **AND** the prompt MUST emphasize:
  - Preserving original composition
  - Maintaining historical authenticity
  - Keeping restorations realistic
  - Not adding or removing major elements

### Requirement: Gemini Model Configuration

The system SHALL use the `gemini-3.0-pro-image-preview` model with appropriate configuration.

#### Scenario: Model selection

- **WHEN** the system initializes the Gemini client
- **THEN** it MUST use the model identifier "gemini-3.0-pro-image-preview"
- **AND** include the API key from environment variables

#### Scenario: API key validation

- **WHEN** the system attempts to call the Gemini API
- **AND** the API key is missing or invalid
- **THEN** the system MUST fail gracefully
- **AND** update the image status to "failed" with an appropriate error message

### Requirement: Convex Action Implementation

The system SHALL implement the restoration logic as a Convex action for backend consistency and authentication integration.

#### Scenario: Action invocation

- **WHEN** a user triggers image restoration
- **THEN** the system MUST use a Convex action (not a Next.js API route)
- **AND** the action MUST have access to `ctx.auth`, `ctx.storage`, and `ctx.runMutation`
- **AND** the action MUST handle asynchronous operations properly

#### Scenario: Status updates during processing

- **WHEN** the restoration action is running
- **THEN** the system MUST update the database status to "processing"
- **AND** the frontend MUST be able to observe this status change in real-time
- **AND** update the UI accordingly
