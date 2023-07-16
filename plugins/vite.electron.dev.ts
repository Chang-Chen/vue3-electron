// electron 开发环境的插件文件
import type { Plugin } from "vite";
import type { AddressInfo } from "net";
import { spawn } from "child_process";
import fs from "node:fs";
import { bundleBackground } from "./background.build";

export const ElectronDevPlugin = (): Plugin => {
    return {
        name: "electron-dev",
        configureServer(server) {
            bundleBackground();
            server.httpServer?.once('listening', () => {
                // 读取vite服务信息
                const addressInfo = server.httpServer?.address() as AddressInfo;
                // 拼接IP地址  给 electron 启动服务的时候使用
                const IP = `http://localhost:${addressInfo.port}/`;
                // 第一个参数是electron的入口文件
                // 主要 electron 不认识ts文件
                // 进程传参发送给electron IP
                let ElectronProcess = spawn(require('electron'), ['dist/background.js', IP]);

                // 实现background.ts文件内的热更新
                fs.watchFile('src/background.ts', () => {
                    ElectronProcess.kill();
                    bundleBackground();
                    ElectronProcess = spawn(require('electron'), ['dist/background.js', IP]);
                });
                
                ElectronProcess.stderr.on('data', (data) => {
                    console.log('electron的日志：', data.toString());
                });
            });
        }
    }
}