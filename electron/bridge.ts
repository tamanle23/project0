// const { contextBridge } = require('electron');
import { contextBridge } from 'electron';
import * as electron from 'electron';

contextBridge.exposeInMainWorld('bridge', {
  electron: true
})

contextBridge.exposeInMainWorld('electron',electron)
