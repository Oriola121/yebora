# Yebora

![Yebora Logo](src/assets/logo.svg)

**Yebora** is a React-based single-page application that integrates with the Yebora Campaign Donation API. It allows users to browse campaigns, view detailed information, contribute donations, and create new campaigns.

---

## ✨ Features

- **Campaign Listing**  
  Displays all campaigns with pagination, showing title, description, target amount, and image.

- **Campaign Details**  
  View detailed campaign info, donation progress, and paginated list of contributions.

- **Contribution Form**  
  Users can donate to campaigns by entering personal details, selecting a payment provider (Paystack/Flutterwave), and submitting via a validated form.

- **Campaign Creation**  
  Users can create new campaigns using a validated input form.

---

## 🧰 Tech Stack

- **React.js** – Frontend framework
- **Styled-components** – Scoped and modular CSS-in-JS styling
- **Material-UI** (`@mui/material`, `@mui/lab`) – UI components and Tabs
- **Axios** – For HTTP requests via a reusable API client
- **React Icons** – Icon library for UI enhancements
- **Lucide React** – Lightweight and modern icon library
- **Custom Loader Component** – For global loading states

---

## 📁 Project Structure Highlights

- `src/api/utils.js`  
  Reusable `apiClient` instance built with Axios for consistent API integration and token handling.

- `src/components/Loader.js`  
  Custom spinner to indicate loading states globally or in specific sections.

- `src/components/`  
  Contains campaign-related UI: listing, details, contribution form, and creation form.

- `src/assets/logo.svg`  
  App logo used in the header and branding.

---

## 🔌 API Integration

The app connects to the Yebora API at:  
`https://v2-api-engine.onrender.com/v1`

### Supported Endpoints

| Endpoint                                  | Method | Purpose                             |
| ----------------------------------------- | ------ | ----------------------------------- |
| `/campaign/all`                           | GET    | Get all campaigns (with pagination) |
| `/campaign/detail/{campaignId}`           | GET    | Get a single campaign's details     |
| `/campaign/{campaignId}/contribution/all` | GET    | Get contributions for a campaign    |
| `/transaction/initiate`                   | POST   | Initiate a donation transaction     |
| `/campaign/create`                        | POST   | Create a new campaign               |

Authorization is handled using a Bearer token (`YEBORA_KEY`), set globally in the API client.

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/yebora.git
   cd yebora
   ```

2. **Install Dependencies**

   Using yarn:

   ```bash
   yarn add react react-dom
   yarn add styled-components
   yarn add @mui/material @mui/lab @emotion/react @emotion/styled
   yarn add axios
   yarn add react-icons
   yarn add lucide-react
   ```

   Using npm:

   ```bash
   npm install react react-dom
   npm install styled-components
   npm install @mui/material @mui/lab @emotion/react @emotion/styled
   npm install axios
   npm install react-icons
   npm install lucide-react
   ```

   > **Note:** Material-UI depends on `@emotion/react` and `@emotion/styled` as peer dependencies.

3. **Start the Development Server**

   ```bash
   npm start
   # or
   yarn start
   ```

4. **Open the App**
   Navigate to: [http://localhost:3000](http://localhost:3000)

---

## 💡 Design Decisions & Trade-offs

- **Styled-components** used for local and modular styling inside components
- **Material-UI Tabs** for elegant, responsive navigation
- **Centralized API client** (via `apiClient`) to DRY up request logic and simplify token handling
- **Loader component** ensures consistent loading UX
- **Icon libraries** (`react-icons`, `lucide-react`) used for visual enhancement
- **Payment flow simulation** implemented due to time constraints—actual redirect logic would be added with more time

---

## 🔮 Future Improvements

With more time, I would enhance the application with:

- **Full Payment Integration** – Implement complete payment provider redirection and callback handling
- **Enhanced Validation** – Add more robust form validations and user-friendly error messages
- **UI/UX Polish** – Improve with transitions, animations, and better mobile responsiveness
- **Testing Suite** – Write unit and integration tests for key components and the API layer
- **Performance Optimization** – Add caching, virtualization, or infinite scroll capabilities
- **User Authentication** – Enable users to create accounts and manage their campaigns

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/yourusername/yebora/issues).

---

## 📧 Contact

For questions or support, please reach out through the project's GitHub repository.
