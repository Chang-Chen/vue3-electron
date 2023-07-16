// electron 主进程文件

import { app, BrowserWindow } from "electron";


app.whenReady().then(() => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,  // 可以在渲染进程的时候使用node的api
            contextIsolation: false, // 关闭渲染进程的沙箱环境
            webSecurity: false, // 关闭跨域检测
        }
    });

    // 打开dev调试工具
    win.webContents.openDevTools();

    if (process.argv[2]) {
        win.loadURL(process.argv[2]); //开发环境
    } else {
        win.loadFile('index.html'); // 生产环境
    }

});