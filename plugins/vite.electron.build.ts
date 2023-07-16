// electron 生产环境的插件文件
import type { Plugin } from "vite";
import fs from 'node:fs';
import { bundleBackground } from "./background.build";
import * as electronBuilder from 'electron-builder';
import path from "node:path";


// 打包需要index.html文件
// 需要先等vite打完包结束之后在electron-builder打包
export const ElectronBuild = (): Plugin => {
    return {
        name: 'electron-build',
        closeBundle() {
            bundleBackground();
            // electron-builder 需要指定package.json文件  main
            const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf-8'));
            packageJson.main = 'background.js';
            fs.writeFileSync('dist/package.json', JSON.stringify(packageJson, null, 4));
            // electron-builder的bug    会下载垃圾文件  解决bug
            fs.mkdirSync('dist/node_modules');

            electronBuilder.build({
                config: {
                    directories: {
                        output: path.resolve(process.cwd(), 'relase'),
                        app: path.resolve(process.cwd(), 'dist'),

                    },
                    asar: true,
                    appId: 'com.example.app',
                    productName: "electronTestAPP",
                    nsis: {
                        oneClick: false, // 取消一键安装
                        allowToChangeInstallationDirectory: true, // 允许用户指定目录安装
                    }
                }
            });
        },
    }
}