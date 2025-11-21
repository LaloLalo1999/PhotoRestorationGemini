# Frontend Components Specification

## ADDED Requirements

### Requirement: Upload Component

The system SHALL provide a reusable Upload component that handles image file selection and upload using drag-and-drop functionality.

#### Scenario: Drag and drop file upload

- **WHEN** a user drags an image file over the upload area
- **THEN** the component MUST visually indicate the drag-over state
- **AND** accept the file when dropped
- **AND** validate the file type is an image (PNG, JPG, JPEG, WebP)
- **AND** reject non-image files with an error message

#### Scenario: Click to select file

- **WHEN** a user clicks the upload area
- **THEN** the component MUST open a file selection dialog
- **AND** allow selection of image files only
- **AND** load the selected file

#### Scenario: Upload to Convex storage

- **WHEN** a file is selected or dropped
- **THEN** the component MUST:
  - Call the `generateUploadUrl` mutation
  - Upload the file to the returned URL
  - Call the `save` mutation with the storage ID
  - Display upload progress to the user
  - Handle upload errors gracefully

#### Scenario: Single file limitation

- **WHEN** a user attempts to upload multiple files
- **THEN** the component MUST only accept the first file
- **AND** ignore additional files

#### Scenario: File size validation

- **WHEN** a user selects a file
- **THEN** the component SHOULD validate the file size
- **AND** reject files that are too large (e.g., >10MB)
- **AND** display an appropriate error message

### Requirement: Gallery Component

The system SHALL provide a Gallery component that displays the user's image restoration history in a grid layout.

#### Scenario: Display image grid

- **WHEN** the gallery is rendered
- **THEN** the component MUST:
  - Use the `list` query to fetch user images
  - Display images in a responsive grid layout
  - Show a thumbnail of the original image
  - Display the restoration status (pending/processing/completed/failed)
  - Show creation timestamp
  - Order images by newest first

#### Scenario: Status indicators

- **WHEN** displaying an image in the gallery
- **THEN** the component MUST show appropriate visual indicators:
  - "Pending" status with waiting icon
  - "Processing" status with spinner/loading animation
  - "Completed" status with success indicator
  - "Failed" status with error indicator and message

#### Scenario: View restored image

- **WHEN** a user clicks on a completed restoration
- **THEN** the component MUST display the restored image
- **AND** provide a download button
- **AND** show a comparison with the original (optional)

#### Scenario: Download restored image

- **WHEN** a user clicks the download button for a completed restoration
- **THEN** the component MUST trigger a download of the restored image
- **AND** use an appropriate filename (e.g., "restored-{timestamp}.png")

#### Scenario: Empty state

- **WHEN** a user has no image history
- **THEN** the component MUST display an empty state message
- **AND** encourage the user to upload their first image

#### Scenario: Real-time updates

- **WHEN** an image status changes (e.g., from processing to completed)
- **THEN** the gallery MUST update automatically via Convex subscriptions
- **AND** reflect the new status without requiring a page refresh

### Requirement: Dashboard Integration

The system SHALL integrate the Upload and Gallery components into the dashboard page.

#### Scenario: Dashboard layout

- **WHEN** a user visits the dashboard
- **THEN** the page MUST display:
  - The Upload component prominently
  - The Gallery component below or beside the upload area
  - User information in the header
  - Clear instructions on how to use the features

#### Scenario: Upload triggers gallery update

- **WHEN** a user successfully uploads an image
- **THEN** the gallery MUST automatically reflect the new image
- **AND** show its current status

#### Scenario: Restoration triggers from upload

- **WHEN** a user uploads an image
- **THEN** the Upload component SHOULD provide an option to:
  - Automatically trigger restoration after upload, OR
  - Manually trigger restoration via a button
- **AND** provide feedback during the restoration process

### Requirement: React Dropzone Integration

The system SHALL use the `react-dropzone` library for file upload functionality.

#### Scenario: Dropzone configuration

- **WHEN** the Upload component initializes
- **THEN** it MUST configure react-dropzone with:
  - Accepted file types: image/png, image/jpeg, image/jpg, image/webp
  - Maximum of 1 file at a time
  - Drag-and-drop enabled
  - Click to browse enabled
- **AND** provide appropriate callbacks for file handling

#### Scenario: Visual feedback

- **WHEN** the dropzone state changes
- **THEN** the component MUST update visual styles:
  - Default state: Neutral styling with upload icon
  - Drag active state: Highlighted border and background
  - Loading state: Disabled with spinner
  - Error state: Red border with error message
  - Success state: Green border with success message
