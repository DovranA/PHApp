const { app, BrowserWindow, ipcMain } = require("electron");
const { exApp } = require("../backend/server");
const url = require("url");
const path = require("path");
const socketio = require("../backend/socket");
const port = 8001;

const server = exApp.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on port http://localhost:${port}`);
});

socketio(server);

function createWindow() {
  const mainWindow = new BrowserWindow({
    title: "PH",
    autoHideMenuBar: true,
    fullscreenWindowTitle: true,
    minWidth: 1400,
    minHeight: 800,
    icon: path.join(__dirname, "ph.ico"),
  });
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "index.html"),
      protocol: "file:",
      slashes: true,
    })
  );
  // ipcMain.on("show-window", () => {
  //   mainWindow.show();
  // });
  // ipcMain.on("hide-window", () => {
  //   mainWindow.hide();
  // });

  // mainWindow.loadURL('https://tmbiz.info/')
}

// Create the window when the app is ready
app.whenReady().then(() => {
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});
// Quit the app when all windows are closed (except on macOS)
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// Create the window again when the app is activated (on macOS)
app.on("activate", async () => {
  if (mainWindow === null) {
    try {
      const port = await findArduinoPort();
      port.catch((err) => {
        console.log(err.message);
      });
      createWindow();
    } catch (error) {}
  }
});

// Close the Express server when the Electron app is quitting
app.on("before-quit", () => {
  server.close();
});
app.disableHardwareAcceleration(false);
