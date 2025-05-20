# Mentor Messenger Magic

A fully-fledged tool for automating mentor outreach with resource-based pay-as-you-go pricing.

## Features

- **Appealing Landing Page**: Highlights time savings and cost benefits of using the tool
- **Resource Monitoring System**: Tracks CPU, RAM, storage, bandwidth, and electricity usage
- **Pay-as-you-go Pricing Model**: Resources used × 2 = actual price
- **Resource Optimization**: Maximizes performance while minimizing resource usage

## Getting Started

### Prerequisites

- Node.js 16+ and npm
- Modern web browser

### Installation

1. Clone the repository:
```sh
git clone <repository-url>
cd mentor-messenger-magic
```

2. Install dependencies:
```sh
npm install
```

3. Start the development server:
```sh
npm run dev
```

4. Build for production:
```sh
npm run build
```

5. Preview the production build:
```sh
npm run preview
```

## Resource Monitoring System

The application includes a comprehensive resource monitoring system that tracks:

- **CPU Usage**: Measures CPU core-hours consumed
- **RAM Usage**: Tracks memory consumption in GB-hours
- **Storage**: Monitors storage usage in GB-hours
- **Bandwidth**: Records network traffic in GB
- **Electricity**: Estimates power consumption in kWh

The monitoring system automatically starts when the application loads and provides real-time usage statistics in the Dashboard.

## Pay-as-you-go Pricing Model

The pricing model follows a simple formula:

```
Final Price = Resource Cost × 2
```

Where Resource Cost is calculated based on:
- CPU: $0.02 per core-hour
- RAM: $0.01 per GB-hour
- Storage: $0.0005 per GB-hour
- Bandwidth: $0.08 per GB
- Electricity: $0.12 per kWh

Users receive detailed usage reports via email, showing resource consumption and associated costs.

## Resource Optimization

The application is optimized for maximum efficiency through:

- **Memoization**: Caches expensive function results
- **Debouncing & Throttling**: Reduces frequency of resource-intensive operations
- **Lazy Loading**: Loads components only when needed
- **Virtual Scrolling**: Renders only visible items in large lists
- **Image Optimization**: Reduces image size while maintaining quality
- **Request Batching**: Combines multiple API requests
- **Data Compression**: Minimizes bandwidth usage

## Deployment

### Static Deployment

The built application can be deployed to any static hosting service:

1. Build the project:
```sh
npm run build
```

2. Deploy the `dist` directory to your hosting service of choice (Netlify, Vercel, GitHub Pages, etc.)

### Docker Deployment

For containerized deployment:

1. Build the Docker image:
```sh
docker build -t mentor-messenger-magic .
```

2. Run the container:
```sh
docker run -p 8080:80 mentor-messenger-magic
```

## Project Structure

- `src/components/` - UI components
- `src/pages/` - Application pages
- `src/utils/` - Utility functions and services
  - `resourceMonitor.js` - Resource usage tracking
  - `pricingModel.js` - Pay-as-you-go pricing implementation
  - `resourceOptimizer.js` - Optimization utilities
  - `api.js` - API service with integrated optimizations
  - `appInitializer.js` - Application initialization

## License

This project is licensed under the MIT License - see the LICENSE file for details.
