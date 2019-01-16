/*引入path使用绝对路径，防止路径出错*/
const path = require('path')
/*webpack的官方插件,把webpack.base.js里面的配置进行合并*/
const webpackMerge = require('webpack-merge')
/*webpack的第三方loader*/
const baseConfig = require('./webpack.base')
/*判断是否是开发环境,只有开发环境才需要webpack-dev-server和热更新*/
const isDev = process.env.NODE_ENV === 'development'
/*指定当前环境*/
const mode = isDev ? 'development' : 'production'
module.exports = webpackMerge(baseConfig,{
    /*告诉webpack 它打包的js代码运行在什么环境下,web/node*/
    target: 'node',
    /*入口文件*/
    entry: {
        app: path.join(__dirname,'../client/server-entry.js')
    },
    /*打包之后的输出文件,因为服务器端没有浏览器缓存的概念，不需要hash
    libraryTarget 指定了打包之后的代码的规范,amd,cmd,commonJS等
    */
    mode: mode,
    output: {
        filename: 'server-entry.js',
        path: path.join(__dirname,'../dist'),
        publicPath: '/public',
        libraryTarget: 'commonjs2'
    }
})
