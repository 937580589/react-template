const isDev = process.env.NODE_ENV === 'development' // 是否是开发模式
module.exports = {
    // 执行顺序由右往左,所以先处理ts,再处理jsx,最后再试一下babel转换为低版本语法
    presets: [
        ["@babel/preset-react",{ runtime: "automatic", importSource: "@emotion/react" }],
    ],
    plugins: [
            isDev && require.resolve('react-refresh/babel'), // 如果是开发模式,就启动react热更新插件
            ["@babel/plugin-proposal-decorators", { "legacy": true }],
            ["@emotion/babel-plugin"]
    ].filter(Boolean),
}
