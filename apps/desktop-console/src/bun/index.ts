import { BrowserWindow } from "electrobun/main";

// Electrobun handles the main process event loop natively.
// We just need to define our windows.

let mainWindow: BrowserWindow | null = null;
let isQuitting = false;

function createWindow() {
  const isLocal = process.env.APP_ENV === "LOCAL" && !!process.env.RENDERER_URL;
  const url = isLocal
    ? process.env.RENDERER_URL!
    : "views://electron-web/index.html"; // Ensure this matches electrobun.config.ts or routing

  mainWindow = new BrowserWindow({
    title: "Project 0",
    url,
    frame: {
      width: 1280,
      height: 800,
      x: 0,
      y: 0,
    },
  });

  // Note: DevTools are typically handled by Electrobun's built-in webview inspector in dev mode.
}

createWindow();
