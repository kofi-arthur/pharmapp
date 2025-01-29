import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png'
import { initializeDatabase } from '../renderer/src/db/init'
import {
  deleteMedicine,
  getAllMedicines,
  getAllSales,
  getBestSoldProductToday,
  getSalesByDate,
  getTodaysSales,
  insertMedicine,
  insertSales,
  updateMedicine,
  updateMedicineQuantity
} from '../renderer/src/db/data'

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1920,
    height: 1080,
    show: false,
    autoHideMenuBar: true,
    icon: join(__dirname, '../../resources/icon.png'),
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.maximize()
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.ace.pharmapp')

  initializeDatabase()

  ipcMain.handle('fetch-medicines', async () => {
    return getAllMedicines()
  })

  ipcMain.handle('add-medicine', async (_, data) => {
    insertMedicine(data.name, data.description, data.quantity, data.price)
  })

  ipcMain.handle('update-medicine', async (_, data) => {
    updateMedicine(data.id, data.name, data.description, data.quantity, data.price)
  })

  ipcMain.handle('delete-medicine', async (_, id) => {
    deleteMedicine(id)
  })

  ipcMain.handle('sell-medicine', async (_, data) => {
    data.forEach((med) => {
      updateMedicineQuantity(med.id, med.remainingQuantity)
      insertSales(med.name, med.unitPrice, med.soldQuantity, med.price, med.paymentMethod)
    })
  })

  ipcMain.handle('fetch-sales', async () => {
    return getAllSales()
  })

  ipcMain.handle('fetch-best-sold-product', async () => {
    return getBestSoldProductToday()
  })

  ipcMain.handle('fetch-todays-sales', async () => {
    return getTodaysSales()
  })

  ipcMain.handle('fetch-sales-by-date', async (_, date) => {
    return getSalesByDate(date)
  })

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
