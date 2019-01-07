/*引入path使用绝对路径，防止路径出错*/
const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
module.exports = {
    /*入口文件*/
    entry: {
        app: path.join(__dirname,'../client/app.js')
    },
    /*打包之后的输出文件,[]可以引用变量,name表示入口文件名称，即app,
    如果有任意一个js改动了，hash就会改变，就会强制更新浏览器缓存*/

    output: {
        filename: '[name].[hash].js',
        path: path.join(__dirname,'../dist'),
        publicPath: ''
    },
    /*通过第三方模块来帮助webpack识别react的jsx语法,import的时候可以不加
    .jsx的后缀*/

    module: {
        rules: [
            {
                test: /\.(jsx|js)?$/,
                exclude: [
                    path.join(__dirname,'../node_modules')
                ],
                loader: 'babel-loader'
            }
        ]
    },
    /*生成一个HTML的页面，把entry注入草html中*/
    plugins: [
        new HTMLPlugin()
    ]

}
