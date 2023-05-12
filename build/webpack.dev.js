/**
 * 开发环境
 */
const path = require('path');
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base.js')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = merge(baseConfig, {
    mode: 'development',// 开发环境
    devServer: {
        port: 8888,
        open: true, // 编译完成自动打开浏览器
        compress: false, //gzip压缩，开发环境不开启，提升热更新速度
        hot: true, // 开启热更新
        historyApiFallback:true, // 解决history路由404问题
        static: {
            directory: path.join(__dirname, "../public"), //托管静态资源public文件夹
        }
    },
    plugins: [
        new ReactRefreshWebpackPlugin(), // 添加热更新插件
    ]
})