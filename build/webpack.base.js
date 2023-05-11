/**
 * 公共配置
 */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: path.resolve(__dirname, '../src/index.js'),   // 入口文件
    output: {
        path: path.resolve(__dirname, '../dist'),    // 打包结果输出的路径，必须是一个绝对路径
        filename: '[name].[hash:8].js',    // 文件输出名。可以在名称前指定一个输出路径，让文件夹输出在这个路径下。也可以使用占位符[name]指定不同的文件夹名称
        clean: true,    // 清除之前打包出来的dist文件
        publicPath: '/' // 打包后文件的公共前缀路径
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-react'],
                        ]
                    }
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js','.json','.jsx'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: 'body', //  将JavaScript资源放置在body元素的底部
            meta: {
                viewport: 'width=device-width, initial-scale=1, user-scalable=no',
                charset: 'utf-8',
            },
            // template: path.resolve(__dirname, '../index.html'), // 使用自定义模板
            templateContent:    // 代替template，自写模板
                `<!DOCTYPE html>
                <html>
                <head>
                </head>
                <body><div id="root"></div></body>
                </html>`,
        })
    ]
}