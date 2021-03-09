# 项目
react-redux-cli

# 说明

React + React-Router + TS + JS + ant design + webpack4.0 脚手架

# 业务介绍

目录结构

    ├── dist                 // 编译结果目录
    ├── build                // webpack 配置目录
    │   ├── webpack.base.js     // 公用配置
    │   ├── webpack.dev.js    // 开发时配置
    │   └── product.dev.js     // 打包时配置
    ├── mock                   // mock 数据
    ├── script                  // node.js 脚本 
    ├── src                    // 源码目录
    │   ├── assets             // 图片字体文件
    │   ├── components             // 公共组件
    │   ├── config                 // 项目配置，路由、sideMenu等等
    │   ├── pages                  // 页面文件目录
    │   │   └── index
    │   │       ├── index.tsx           // 页面逻辑
    │   │       ├── index.less         // 页面样式
    │   ├── router                  // 路由
    │   ├── services                // ajax 封装
    │   ├── utils                   // 常用工具类
    │   ├── index.jsx               // 入口文件
    │   └── index.html
    ├── .eslintrc.js            // eslint 配置文件
    ├── .prettierrc.js        // prettier 配置
    ├── .global.d.ts            // Typescript 全局声明
    ├── postcss.config.js       // postcss 配置
    └── tsconfig.json           // Typescript 配置
