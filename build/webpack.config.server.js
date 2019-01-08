/*引入path使用绝对路径，防止路径出错*/
const path = require('path')

module.exports = {
    /*告诉webpack 它打包的js代码运行在什么环境下,web/node*/
    target: 'node',
    /*入口文件*/
    entry: {
        app: path.join(__dirname,'../client/server-entry.js')
    },
    /*打包之后的输出文件,因为服务器端没有浏览器缓存的概念，不需要hash
    libraryTarget 指定了打包之后的代码的规范,amd,cmd,commonJS等
    */

    output: {
        filename: 'server-entry.js',
        path: path.join(__dirname,'../dist'),
        publicPath: '/public',
        libraryTarget: 'commonjs2'
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
    }
}
