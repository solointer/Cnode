const path = require('path')
module.exports = {
  /*通过第三方模块来帮助webpack识别react的jsx语法,import的时候可以不加
    .jsx的后缀*/
    /*在编译之前使用eslint去检测代码*/
    module: {
      rules: [
          {
              enforce: 'pre',
              test: /.(js|jsx)$/,
              exclude: [
                  path.resolve(__dirname,'../node_modules')
              ],
              loader: 'eslint-loader'
          },
          {
              test: /\.(jsx|js)?$/,
              exclude: [
                  path.resolve(__dirname,'../node_modules')
              ],
              loader: 'babel-loader'
          }
      ]
  },
}
