const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3002;

// Check if build folder exists
const buildPath = path.join(__dirname, 'build');
const buildExists = fs.existsSync(buildPath);

if (buildExists) {
  // Production mode - serve the built React app
  app.use(express.static(buildPath));
  
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(buildPath, 'index.html'));
  });
  
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Open http://localhost:${PORT} in your browser`);
    console.log('Serving production build from ./build folder');
  });
} else {
  // Development mode - inform user to build or use npm run dev
  app.get('*', function(req, res) {
    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Raven Receipt - Build Required</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              display: flex;
              justify-content: center;
              align-items: center;
              min-height: 100vh;
              margin: 0;
              background: linear-gradient(135deg, #4a90e2 0%, #2c5aa0 100%);
              color: white;
            }
            .container {
              text-align: center;
              padding: 2rem;
              background: rgba(255, 255, 255, 0.1);
              border-radius: 15px;
              backdrop-filter: blur(10px);
              max-width: 600px;
            }
            h1 { margin-bottom: 1rem; }
            .command {
              background: rgba(0, 0, 0, 0.3);
              padding: 1rem;
              border-radius: 8px;
              margin: 1rem 0;
              font-family: 'Courier New', monospace;
              font-size: 1.1rem;
            }
            .or { margin: 1.5rem 0; opacity: 0.8; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>📦 Build Required</h1>
            <p>The production build hasn't been created yet.</p>
            <p>To use this server, first build the React app:</p>
            <div class="command">npm run build</div>
            <div class="or">OR</div>
            <p>For development with hot reload, use:</p>
            <div class="command">npm run dev</div>
            <p style="margin-top: 2rem; opacity: 0.8;">
              The dev server will run on port 3002 with live reloading enabled.
            </p>
          </div>
        </body>
      </html>
    `);
  });
  
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Open http://localhost:${PORT} in your browser`);
    console.log('⚠️  No build folder found. Run "npm run build" first or use "npm run dev" for development.');
  });
}