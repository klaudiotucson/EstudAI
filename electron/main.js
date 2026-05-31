const { app, BrowserWindow } = require('electron');
const path = require('path');
const http = require('http');

let mainWindow;
let nextServer;

async function startServer() {
  if (app.isPackaged) {
    // In production, start the Next.js server programmatically
    try {
      const next = require('next');
      const nextApp = next({
        dev: false,
        dir: app.getAppPath(),
        conf: {}
      });
      const handle = nextApp.getRequestHandler();
      await nextApp.prepare();
      
      return new Promise((resolve) => {
        nextServer = http.createServer((req, res) => {
          handle(req, res);
        });
        
        // Listen on a dynamic port assigned by the OS
        nextServer.listen(0, '127.0.0.1', () => {
          const port = nextServer.address().port;
          console.log(`Next.js server running on port ${port}`);
          resolve(`http://127.0.0.1:${port}`);
        });
      });
    } catch (err) {
      console.error('Failed to start Next.js programmatic server:', err);
      throw err;
    }
  } else {
    // In development, Next.js runs separately via npm run dev
    return 'http://localhost:3000';
  }
}

function createWindow(url) {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    title: 'EstudAI',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    }
  });

  mainWindow.setMenuBarVisibility(false);
  mainWindow.loadURL(url);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(async () => {
  try {
    const url = await startServer();
    createWindow(url);
  } catch (err) {
    console.error(err);
    app.quit();
  }
});

app.on('window-all-closed', () => {
  if (nextServer) {
    nextServer.close();
  }
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
