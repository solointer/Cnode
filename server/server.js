const express = require('express')
const fs = require('fs')
const path = require('path')
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const ReactSSR = require('react-dom/server')
const session = require('express-session')
const isDev = process.env.NODE_ENV === 'development'

const app = express()
/* 将http请求转换为json 存入body */
app.use(bodyParser.json())
/*  处理http请求的formData 转换为json 存入body */
app.use(bodyParser.urlencoded({ extended: false }))
/* session的有效期是10分钟,name为cookie ID, 每次请求不需要重新生成
cookieID,并对cookie进行加密*/
app.use(session({
  maxAge: 10 * 60 * 10000,
  name: 'tid',
  resave: false,
  saveUninitialized: false,
  secret: "React cnode"

}))
app.use(favicon(path.join(__dirname, '../favicon.ico')))

app.use('/api/user', require('./util/handle-login'))
app.use('/api', require('./util/proxy'))

if (!isDev) {
  /*因为commonjs2规范,以及client/server-entry.js的export default导出的问题,
  这里必须.default*/
  const serverEntry = require('../dist/server-entry').default
  /*读取前端build之后的HTML字符串*/
  const template = fs.readFileSync(path.join(__dirname,'../dist/index.html'), 'utf8')
  /*处理JS等静态文件*/
  app.use('/public',express.static(path.join(__dirname,'../dist')))
  app.get('*', function (req, res) {
      /*执行前端生成的JS文件,生成页面的HTML字符串*/
      const appString = ReactSSR.renderToString(serverEntry)
      /*将后段同构的字符串放入前端打包生成的HTMl中*/
      res.send(template.replace('<!-- app -->',appString))
  })
} else {
  const devStatic = require('./util/dev-static')
  devStatic(app)
}
app.listen(3000, function() {
  console.log('server is listening on 3000')
})
