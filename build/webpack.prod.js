/**
 * 生产环境
 */
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base.js')

module.exports = merge(baseConfig, {
    mode: 'production',// 生产环境
})