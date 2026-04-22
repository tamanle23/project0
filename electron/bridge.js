"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// const { contextBridge } = require('electron');
var electron_1 = require("electron");
var electron = require("electron");
electron_1.contextBridge.exposeInMainWorld('bridge', {
    electron: true
});
electron_1.contextBridge.exposeInMainWorld('electron', electron);
//# sourceMappingURL=bridge.js.map