# Diagnoxix - Diagnostic Center Finder & Booking Platform

A modern web application that helps patients find and book diagnostic centers based on location, test type, practitioner gender, and cost. Features an interactive AI agent for seamless booking and payment processing.

## Features

### 🔍 Search & Discovery
- **Location-based Search**: Find nearby diagnostic centers using geolocation
- **Distance Calculation**: Haversine formula for accurate distance measurement
- **Advanced Filters**:
  - Test type (Blood Test, MRI, CT Scan, X-Ray, etc.)
  - Practitioner gender preference
  - Maximum cost range
  - Maximum distance range

### 📍 Interactive Map View
- Real-time map visualization using Leaflet/OpenStreetMap
- User location marker
- Diagnostic center markers with distance indicators
- Click markers to scroll to center details

### 📋 Center Details
- Complete center information (name, address, rating, contact)
- Available tests with costs
- Practitioner details (name, gender, specialization)
- Book tests directly from center cards

### 🎫 Booking System
- Multi-step booking flow:
  1. Select date and time slot
  2. Enter patient details
  3. Complete payment
- Mock payment integration
- Real-time booking confirmation

### 💬 AI Assistant
- Interactive chat interface
- Natural language commands:
  - "Search for nearby centers"
  - "Book an appointment"
  - "Help me find a blood test"
- Automated booking assistance
- Intelligent responses to user queries

### 🔔 Notifications
- Email notifications to patients and diagnostic centers
- Booking confirmations
- Payment receipts

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Maps**: Leaflet + OpenStreetMap
- **Icons**: Lucide React
- **State Management**: React Hooks

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd diagnoxix-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm start
```

## Project Structure

```
diagnoxix-frontend/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Main page
│   │   └── globals.css         # Global styles
│   ├── components/
│   │   ├── AIAgentChat.tsx     # AI assistant chat component
│   │   ├── BookingModal.tsx    # Booking modal with payment
│   │   ├── CenterCard.tsx      # Diagnostic center card
│   │   ├── LeafletMap.tsx      # Map component
│   │   ├── MapView.tsx         # Map wrapper
│   │   └── SearchFilters.tsx   # Search filters component
│   ├── lib/
│   │   ├── api.ts              # API functions (mock backend)
│   │   ├── data.ts             # Mock data for centers, tests, practitioners
│   │   └── utils.ts            # Utility functions
│   └── types/
│       └── index.ts            # TypeScript type definitions
├── public/                     # Static assets
└── package.json
```

## Mock Data

The application includes mock data for:
- 5 diagnostic centers in Lagos, Nigeria
- 8 different test types
- 6 practitioners
- Multiple test offerings with varying costs

You can modify the data in `src/lib/data.ts` to add or update test centers.

## Features in Detail

### Geolocation
- Automatically detects user location
- Falls back to default location (Lagos) if permission denied
- Distance calculated in kilometers

### Search Algorithm
- Filters by test type, practitioner gender, cost, and distance
- Results sorted by distance (nearest first)
- Returns matching centers with available tests

### Booking Flow
1. Select test from center card
2. Choose date and available time slot
3. Enter patient details (name, email, phone)
4. Review and proceed to payment
5. Enter payment details (mock)
6. Confirm booking and send notifications

### AI Agent Capabilities
- Understands natural language queries
- Searches for diagnostic centers
- Initiates booking process
- Provides help and information
- Responds to greetings

## Environment Variables

Currently, the app uses mock data and doesn't require environment variables. For production use, you would need:

```env
# API Endpoints
NEXT_PUBLIC_API_URL=http://localhost:8000

# Payment Gateway (e.g., Stripe, Paystack)
NEXT_PUBLIC_PAYMENT_PUBLIC_KEY=

# Notification Service
NEXT_PUBLIC_NOTIFICATION_API_URL=

# Map API (optional, if using Google Maps or Mapbox)
NEXT_PUBLIC_MAP_API_KEY=
```

## Future Enhancements

- [ ] Integrate with real diagnostic center APIs
- [ ] Connect to actual payment gateway (Stripe, Paystack)
- [ ] Implement real-time availability updates
- [ ] Add user authentication and booking history
- [ ] Email and SMS notifications via SendGrid/Twilio
- [ ] Advanced AI agent with machine learning
- [ ] Review and rating system
- [ ] Waitlist management
- [ ] Multi-language support

## Contributing

This is a demonstration project. Feel free to fork and enhance!

## License

MIT License

## Support

For issues or questions, please open an issue in the repository.
