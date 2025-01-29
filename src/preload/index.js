import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
    contextBridge.exposeInMainWorld('electronAPI', {
      fetchMedicines: () => ipcRenderer.invoke('fetch-medicines'),
      addMedicine: (name, description, quantity, price) =>
        ipcRenderer.invoke('add-medicine', { name, description, quantity, price }),
      updateMedicine: (id, name, description, quantity, price) =>
        ipcRenderer.invoke('update-medicine', { id, name, description, quantity, price }),
      updateMedicineQuantity: (id, quantity) =>
        ipcRenderer.invoke('update-medicine-quantity', { id, quantity }),
      deleteMedicine: (id) => ipcRenderer.invoke('delete-medicine', id),
      sellMedicine: (data) => ipcRenderer.invoke('sell-medicine', data),
      fetchSales: () => ipcRenderer.invoke('fetch-sales'),
      fetchBestSoldProduct: () => ipcRenderer.invoke('fetch-best-sold-product'),
      fetchTodaysSales: () => ipcRenderer.invoke('fetch-todays-sales'),
      fetchSalesByDate: (date) => ipcRenderer.invoke('fetch-sales-by-date', date)
    })
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.api = api
}
