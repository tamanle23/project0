import { app, BrowserWindow, screen,Menu, Tray ,nativeImage } from 'electron';
import * as path from 'path';

require('v8-compile-cache');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow: BrowserWindow | null;
let tray: Tray | null;

// Enable live reload if process is started with the --serve argument
const liveReload = process.argv.slice(2).some((arg) => arg === '--serve');

function createWindow() {
  const electronScreen = screen;
  const size = electronScreen.getPrimaryDisplay().workAreaSize;

  if (liveReload) {
    mainWindow = new BrowserWindow({
      x: 0,
      y: 0,
      width: 1280,
      height: 800,
      webPreferences: {
        nodeIntegration: true,
        webSecurity: false,
        devTools: true,
        contextIsolation: true,
        preload: path.resolve(__dirname, "bridge.js"),
      },
    });

    require('electron-reload')(__dirname, { electron: require(`${__dirname}/node_modules/electron`) });
    mainWindow.loadURL('http://localhost:5500');
    // mainWindow.loadFile('dist.electron/index.html');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow = new BrowserWindow({
      x: 0,
      y: 0,
      width: size.width,
      height: size.height,
      webPreferences: {
        nodeIntegration: true,
        webSecurity: false,
        devTools: false,
        contextIsolation: true,
        preload: 'bridge.js',
      },
    });
    // Load the index.html of the app.
    mainWindow.loadFile('dist.electron/index.html');
  }
  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

function createNativeIcon() {
  const path = `${app.getAppPath()}/resources/brand-icon.png`;
  const image = nativeImage.createFromPath(path);
  return image;
}

function onReady() {
  tray = new Tray(createNativeIcon())
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Item1', type: 'radio' },
    { label: 'Item2', type: 'radio' },
    { label: 'Item3', type: 'radio', checked: true },
    { label: 'Exit', type: 'radio' }
  ])
  tray.setToolTip('project0')
  tray.setContextMenu(contextMenu);

  createWindow();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', onReady);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
