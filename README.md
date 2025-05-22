# Yebora

![Yebora Logo](src/assets/logo.svg)

Yebora is a React-based single-page application that integrates with the Yebora Campaign Donation API. It allows users to browse campaigns, view campaign details, contribute donations, and create new campaigns.

---

## Features

- **Campaign Listing**  
  Displays all campaigns with pagination, showing title, description, target amount, and image.

- **Campaign Details**  
  View detailed campaign info, donation progress, and paginated contributions.

- **Contribution Form**  
  Users can donate to campaigns, entering personal details, selecting payment provider (Paystack/Flutterwave), with basic form validation.

- **Campaign Creation**  
  Form to create new campaigns with validation for required fields.

---

## Tech Stack

- **React.js** for building the UI
- **Styled-components** for CSS-in-JS styling
- **Material-UI Tabs** for campaign navigation and UI structure
- **Axios** (via reusable API client) for API requests
- **Custom Loader Component** for loading states

---

## Project Structure Highlights

- `src/api/utils.js`  
  Contains a reusable `apiClient` Axios instance configured with base URL and Bearer token authorization.

- `src/components/Loader.js`  
  Custom loader/spinner component to indicate loading states.

- `src/assets/logo.svg`  
  Project logo imported and displayed in the app header.

- `src/components`  
  Contains React components for campaign listing, details, contribution form, and creation form.

---

## API Integration

The app integrates with the Yebora API hosted at `https://v2-api-engine.onrender.com/v1` using these endpoints:

- `GET /campaign/all` — Fetch paginated campaign list
- `GET /campaign/detail/{campaignId}` — Fetch campaign details
- `GET /campaign/{campaignId}/contribution/all` — Fetch paginated contributions
- `POST /transaction/initiate` — Initiate donation transaction
- `POST /campaign/create` — Create new campaign

The API client handles authorization via Bearer token (`YEBORA_KEY`) and manages errors with proper feedback in the UI.

---

## How to Run

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/yebora.git
   ```
