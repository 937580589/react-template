/**
 * 公共配置
 */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const isDev = process.env.NODE_ENV === 'development' // 是否是开发模式

module.exports = {
    entry: path.resolve(__dirname, '../src/index.js'),   // 入口文件
    output: {
        path: path.resolve(__dirname, '../dist'),    // 打包结果输出的路径，必须是一个绝对路径
        filename: 'static/js/[name].[chunkhash:8].js',    // 文件输出名。可以在名称前指定一个输出路径，让文件夹输出在这个路径下。也可以使用占位符[name]指定不同的文件夹名称
        clean: true,    // 清除之前打包出来的dist文件
        publicPath: '/' // 打包后文件的公共前缀路径
    },
    module: {
        rules: [
            {
                include: [path.resolve(__dirname, '..src')],    //只对项目src的js,jsx进行loader解析
                test: /.jsx?$/,
                use: ['thread-loader']
            },
            {
                test: /\.jsx?$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-react'],
                        ],
                        plugins: [
                            ["@babel/plugin-transform-react-jsx", { "runtime": "automatic" }],
                            isDev && require.resolve('react-refresh/babel'), // 如果是开发模式,就启动react热更新插件
                            ['@babel/plugin-proposal-decorators', { 'legacy': true }],
                        ].filter(Boolean),
                    }
                },
                exclude: /node_modules/,    // 排除 node_modules 目录
            },
            {
                test: /\.(css|less)$/, // 匹配css文件
                use: [
                    isDev ? 'style-loader' : MiniCssExtractPlugin.loader,   // 开发环境使用style-looader,打包模式抽离css
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: ['autoprefixer']
                            }
                        }
                    },
                    'less-loader'
                ],
                exclude: /node_modules/,    // 排除 node_modules 目录
            },
            {
                test: /.(png|jpg|jpeg|gif|svg)$/, // 匹配图片文件
                type: "asset", // type选择asset
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024, // 小于10kb转base64位
                    }
                },
                generator: {
                    filename: 'static/images/[name].[contenthash:8][ext]', // 文件输出目录和命名
                },
                exclude: /node_modules/,    // 排除 node_modules 目录
            },
            {
                test: /.(woff2?|eot|ttf|otf)$/, // 匹配字体图标文件
                type: "asset", // type选择asset
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024, // 小于10kb转base64位
                    }
                },
                generator: {
                    filename: 'static/fonts/[name].[contenthash:8][ext]', // 文件输出目录和命名
                },
                exclude: /node_modules/,    // 排除 node_modules 目录
            },
            {
                test: /.(mp4|webm|ogg|mp3|wav|flac|aac)$/, // 匹配媒体文件
                type: "asset", // type选择asset
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024, // 小于10kb转base64位
                    }
                },
                generator: {
                    filename: 'static/media/[name].[contenthash:8][ext]', // 文件输出目录和命名
                },
                exclude: /node_modules/,    // 排除 node_modules 目录
            },
        ]
    },
    resolve: {
        extensions: ['.js', '.json', '.jsx'],
        alias: {
            '@': path.join(__dirname, "../src")
        }
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
        }),
    ],
    cache: {
        type: 'filesystem'  // 使用文件缓存
    }
}