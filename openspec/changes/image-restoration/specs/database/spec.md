# Database Specification

## ADDED Requirements

### Requirement: Images Table Schema

The system SHALL define an `images` table in the Convex database schema to store image restoration records with proper indexing for user-specific queries.

#### Scenario: Images table created with required fields

- **WHEN** the Convex schema is defined
- **THEN** the `images` table MUST include:
  - `userId` field of type string (indexed for efficient user queries)
  - `storageId` field referencing Convex storage
  - `originalUrl` field of type string for original image URL
  - `restoredUrl` field of optional type string for restored image URL
  - `prompt` field of type string for AI prompt used
  - `status` field with union type of "pending", "processing", "completed", or "failed"
  - `error` field of optional type string for error messages
  - `createdAt` field of type number for creation timestamp
  - `completedAt` field of optional type number for completion timestamp

#### Scenario: User index for efficient queries

- **WHEN** a user queries their image history
- **THEN** the database MUST use the `by_userId` index on the `userId` field
- **AND** the query MUST complete efficiently even with large datasets

#### Scenario: Storage reference integrity

- **WHEN** an image record references a storage ID
- **THEN** the `storageId` MUST be a valid Convex storage reference
- **AND** the system MUST be able to retrieve the file from storage using this ID
