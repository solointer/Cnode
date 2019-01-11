const axios = require('axios')
const webpack = require('webpack')
const MemoryFs = require('memory-fs')
const path = require('path')
const ReactSSR = require('react-dom/server')
const proxy = require('http-proxy-middleware')
const serverConfig = require('../../build/webpack.config.server')
/* 获取webpack打包好的模版信息*/
const getTemplate = () => {
    return new Promise((reslove, reject) => {
        axios.get('http://localhost:8888/public/index.html')
        .then(res => {
            reslove(res.data)
        })
        .catch(reject)
    })
}
/*获取Node Module模块的构造函数*/
const Module = module.constructor
const mfs = new MemoryFs()
/**监听serverConfig的entry是否有变化,如果有变化就
重新打包*/
const serverCompiler = webpack(serverConfig)
/*通过配置将文件写到内存上*/
serverCompiler.outputFileSystem = mfs
/*配置文件为空,stats是webpack打包包含的信息*/
let serverBundle
serverCompiler.watch({}, (err, stats) => {
    if (err) throw error
    stats = stats.toJson()
    stats.errors.forEach(err => console.error(err))
    stats.warnings.forEach(err => console.warn(err))

    //先获取文件路径
    const bundlePath = path.join(
        serverConfig.output.path,
        serverConfig.output.filename
    )
    const bundle = mfs.readFileSync(bundlePath, 'utf-8')
    /*用Module 模块的编译函数将bundle解析为我们的模块*/
    const m = new Module()
    m._compile(bundle, 'server-entry.js')
    serverBundle = m.exports.default
})

module.exports = function (app) {
    /*处理JS等静态文件,因为静态文件是在内存中的，webpack-dev-server可以管理到它，所以这里
    使用代理去拿到JS等静态文件*/
    app.use('/public',proxy({
        target: "http://localhost:8888"
    }))
    /*配置了局部热更新，模版和JS都是不写入硬盘的,而是在内存中*/
    app.get('*', function (req, res) {
        getTemplate().then(template => {
            /*执行前端生成的JS文件,生成页面的HTML字符串*/
            const appString = ReactSSR.renderToString(serverBundle)
            /*将后段同构的字符串放入前端打包生成的HTMl中*/
            res.send(template.replace('<!-- app -->',appString))
        })
    })
}
