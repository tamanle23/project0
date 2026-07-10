import "v8-compile-cache";
import { app, BrowserWindow, Menu, Tray, nativeImage, screen } from "electron";
import path from "node:path";
import started from "electron-squirrel-startup";

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit();
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow: BrowserWindow | null;
let tray: Tray | null;
let isQuitting = false;

function createWindow() {
  const electronScreen = screen;
  const size = electronScreen.getPrimaryDisplay().workAreaSize;

  if (process.env.APP_ENV === "LOCAL" && !!process.env.RENDERER_URL) {
    mainWindow = new BrowserWindow({
      x: 0,
      y: 0,
      width: 1280,
      height: 800,
      autoHideMenuBar: true,
      webPreferences: {
        nodeIntegration: true,
        webSecurity: false,
        devTools: true,
        contextIsolation: true,
        preload: path.resolve(__dirname, "preload.js"),
      },
    });

    mainWindow.loadURL(process.env.RENDERER_URL);
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow = new BrowserWindow({
      x: 0,
      y: 0,
      width: size.width,
      height: size.height,
      autoHideMenuBar: true,
      webPreferences: {
        nodeIntegration: true,
        webSecurity: false,
        devTools: true,
        contextIsolation: true,
        preload: "preload.js",
      },
    });

    mainWindow.loadFile(
      path.join(process.resourcesPath, "electron-web/index.html"),
    );
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on("close", (event) => {
    if (!isQuitting) {
      event.preventDefault(); // This WORKS here because it's a BrowserWindow event
      mainWindow?.hide();
    }
  });
}

function createNativeIcon() {
  const path = `${app.getAppPath()}/resources/brand-icon.png`;
  const image = nativeImage.createFromPath(path);
  return image;
}

function onReady() {
  tray = new Tray(createNativeIcon());
  const contextMenu = Menu.buildFromTemplate([
    { label: "Open app", type: "normal", click: () => mainWindow?.show() },
    {
      label: "Exit",
      type: "normal",
      click: () => {
        isQuitting = true;
        app.quit();
      },
    },
  ]);
  tray.setToolTip("project0");
  tray.setContextMenu(contextMenu);

  createWindow();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", onReady);

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  // if (process.platform !== 'darwin') {
  //   app.quit();
  // }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
