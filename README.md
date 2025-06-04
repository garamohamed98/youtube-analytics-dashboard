# 🎥 YouTube Analytics Dashboard

A professional, real-time analytics dashboard for YouTube content creators to track channel performance, analyze video metrics, and visualize growth trends.

# Features
### Channel Analytics

Real-time Statistics - Live subscriber count, total views, video count
Performance Metrics - Engagement rates, watch time, click-through rates
Growth Tracking - Historical data visualization and trend analysis

### Interactive Visualizations

Dynamic Charts - Line, bar, doughnut, and area charts with Chart.js
Responsive Design - Seamless experience across desktop, tablet, and mobile
Custom Interactions - Drill-down capabilities, zoom, and data filtering

###  Content Insights

Video Performance - Individual video analytics and comparison
Recent Content - Latest uploads with performance indicators
Milestone Tracking - Progress towards subscriber and view goals

###  User Experience

Material-UI Design - Professional, clean interface
Dark/Light Themes - Customizable viewing experience
Loading States - Smooth skeleton screens and animations
Error Handling - Graceful error recovery with retry mechanisms

#  Quick Start
## Prerequisites

Node.js 16+ and npm/yarn
YouTube Data API v3 key (Get one here)

## Installation
```bash
# Clone the repository
git clone https://github.com/garamohamed98/youtube-analytics-pro.git
cd youtube-analytics-pro

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Add your YouTube API key to .env file

# Start development server
npm run dev

```

## Environment Variables
```env
VITE_YOUTUBE_API_KEY=your_youtube_api_key_here
VITE_API_BASE_URL=https://www.googleapis.com/youtube/v3
```

# Tech Stack
## Frontend

- React 18 - Modern functional components with hooks
- Vite - Lightning-fast build tool and development server
- Redux Toolkit - Predictable state management
- Material-UI (MUI) - Professional React component library

## Data & Visualization

- Chart.js - Interactive and responsive charts
- YouTube Data API v3 - Real-time channel and video data
- Axios - HTTP client for API requests

## Development Tools

- ESLint + Prettier - Code quality and formatting
- Jest + Testing Library - Unit and integration testing
- GitHub Actions - CI/CD pipeline