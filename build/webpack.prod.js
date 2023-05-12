/**
 * 生产环境
 */
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = merge(baseConfig, {
    mode: 'production',// 生产环境
    plugins: [
        // 复制文件插件
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, '../public'), // 复制public下文件
                    to: path.resolve(__dirname, '../dist'), // 复制到dist目录中
                    noErrorOnMissing: true, // 忽略文件夹为空时报错
                    // public下有自建的html模板则使用下面的代码忽略复制
                    // filter: source => {
                    //     return !source.includes('index.html') // 忽略index.html
                    // },
                },
            ],
        }),
        // 抽离css插件
        new MiniCssExtractPlugin({
            filename: 'static/css/[name].[contenthash:8].css' // 抽离css的输出目录和名称
        }),
        new TerserPlugin({ // 压缩js
            parallel: true, // 开启多线程压缩
            terserOptions: {
                compress: {
                    pure_funcs: ["console.log"] // 删除console.log
                }
            }
        }),
    ],
    optimization: {
        minimizer: [
            new CssMinimizerPlugin(), // 压缩css
        ]
    }
})