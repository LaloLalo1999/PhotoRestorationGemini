# Image Storage Specification

## ADDED Requirements

### Requirement: Secure File Upload

The system SHALL provide a secure mechanism for uploading images to Convex Storage using pre-signed URLs.

#### Scenario: Generate upload URL

- **WHEN** an authenticated user requests an upload URL
- **THEN** the system MUST verify the user is authenticated via `ctx.auth.getUserIdentity()`
- **AND** the system MUST generate a pre-signed upload URL using `ctx.storage.generateUploadUrl()`
- **AND** the system MUST return the URL to the client

#### Scenario: Unauthorized upload attempt

- **WHEN** an unauthenticated user attempts to generate an upload URL
- **THEN** the system MUST reject the request
- **AND** return an appropriate authentication error

### Requirement: Image Metadata Storage

The system SHALL save image metadata after successful file upload to Convex Storage.

#### Scenario: Save image metadata

- **WHEN** a user uploads a file to storage
- **AND** calls the save mutation with storageId and metadata
- **THEN** the system MUST verify the user is authenticated
- **AND** create a new image record in the database with:
  - The authenticated user's ID as `userId`
  - The provided `storageId`
  - Generated URL for the original image via `ctx.storage.getUrl()`
  - Initial status of "pending"
  - Current timestamp as `createdAt`
  - Optional prompt text
- **AND** return the image record ID

#### Scenario: Invalid storage ID

- **WHEN** a user attempts to save metadata with an invalid storageId
- **THEN** the system MUST reject the request with a validation error

### Requirement: User Image History

The system SHALL provide a query to retrieve a user's image restoration history.

#### Scenario: List user images

- **WHEN** an authenticated user requests their image history
- **THEN** the system MUST verify the user is authenticated
- **AND** query images where `userId` matches the authenticated user
- **AND** return images sorted by `createdAt` in descending order (newest first)
- **AND** include all image fields in the response

#### Scenario: Empty history

- **WHEN** a user has no images
- **THEN** the system MUST return an empty array
- **AND** not throw an error

#### Scenario: User isolation

- **WHEN** a user queries their image history
- **THEN** the system MUST only return images owned by that user
- **AND** MUST NOT return images from other users
