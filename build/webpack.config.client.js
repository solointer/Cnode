/*引入path使用绝对路径，防止路径出错*/
const path = require('path')
const webpack = require('webpack')
const HTMLPlugin = require('html-webpack-plugin')
/*webpack的官方插件,把webpack.base.js里面的配置进行合并*/
const webpackMerge = require('webpack-merge')
/*webpack的第三方loader*/
const baseConfig = require('./webpack.base')
/*判断是否是开发环境,只有开发环境才需要webpack-dev-server和热更新*/
const isDev = process.env.NODE_ENV === 'development'
/*指定当前环境*/
const mode = isDev ? 'development' : 'production'
/*合并webpack的配置, 后面的会覆盖前面的*/
const config = webpackMerge(baseConfig,{
    /*入口文件*/
    entry: {
        app: path.join(__dirname,'../client/app.js')
    },
    /*打包之后的输出文件,[]可以引用变量,name表示入口文件名称，即app,
    如果有任意一个js改动了，hash就会改变，就会强制更新浏览器缓存，
    publicPath可以将JS的引用路径加上public前缀，后端根据这个区分是不是
    静态资源的请求*/

    output: {
        filename: '[name].[hash].js',
        path: path.join(__dirname,'../dist'),
        publicPath: '/public/'
    },
    mode: mode,
    /*生成一个HTML的页面，把entry注入草html中,如果指定了tempalte,
    就会以我们的指定的模版插入JS*/
    plugins: [
        new HTMLPlugin({
            template: path.join(__dirname,'../client/template.html')
        })
    ]

})
if (isDev) {
    /*打包的时候需要除了入口还必须把热更新模块的代码加进去*/
    config.entry = {
        entry:[
            'react-hot-loader/patch',
            path.join(__dirname,'../client/app.js')

        ]
    }
    /*webpack的服务器的相关信息*/
    config.devServer = {
        host: '127.0.0.1',
        port: '8888',
        contentBase: path.join(__dirname,'../dist'),
        hot: true,
        overlay: {
            errors: true
        },
        publicPath: '/public',
        historyApiFallback: {
            index: '/public/index.html'
        },
        proxy: {
          '/api': 'http://localhost:3000'
        }
    }
    /*webpack的热重载有两种模式，一种是iframe的内部刷新，一种是全局组件替换。HotModuleReplacementPlugin插件可以实现组件差异性更换*/
    config.plugins.push(new webpack.HotModuleReplacementPlugin())
}
module.exports = config
