# Raven Receipt

Employee equipment receipt management system for Globalkom/LimoLabs.

## Features

- 🎯 **Dual Receipt Types**: Office pickup and work from home scenarios
- 🌐 **Bilingual Support**: English interface with Serbian document output
- 📄 **PDF Generation**: Print-ready receipts with signatures
- ⚡ **Real-time Preview**: See receipt changes as you type
- 📱 **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- React 18
- React Router for navigation
- Express.js server
- Lucide React for icons

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

Runs the app in development mode on http://localhost:3002

## Production

```bash
npm run build
npm start
```

## Project Structure

```
raven-receipt/
├── src/
│   ├── components/
│   │   ├── Home.jsx       # Landing page
│   │   ├── Pickup.jsx     # Office pickup form
│   │   └── Delivery.jsx   # Work from home form
│   └── styles/           # CSS files
├── public/               # Static assets
└── server.js            # Express server
```

## License

Developed for Globalkom/LimoLabs internal use.
