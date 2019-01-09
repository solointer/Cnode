#### hot-module-replacement

+ 配置babel的热更新插件,有修改的时候加载修改部分的react代码

```javascript
{
    "presets": [
        ["es2015",{ "loose": true }],
        "react"
    ],
    "plugin": ["react-hot-loader/babel"]
}

```
+ 配置需要热更替的代码

```javascript
/*如果需要热更新的代码出现的时候,重新加载app.js*/
if (module.hot) {
    module.hot.accept('./App.jsx', () => {
        const NextApp = require('./App.jsx').default
        ReactDOM.hydrate(<NextApp/>, document.getElementById('root'))
    })
}

```

+ webpack配置热更新的插件,每次build之后,server进行热更新

```javascript
/*打包的时候需要除了入口还必须把热更新模块的代码加进去*/
config.entry = {
    entry:[
        'react-hot-loader/patch',
        path.join(__dirname,'../client/app.js')

    ]
}
/*webpack的服务器的相关信息*/
config.devServer = {
    host: '0.0.0.0',
    port: '8888',
    contentBase: path.join(__dirname,'../dist'),
    hot: true,
    overlay: {
        errors: true
    },
    publicPath: '/public',
    historyApiFallback: {
        index: '/public/index.html'
    }
}

config.plugins.push(new webpack.HotModuleReplacementPlugin())
```
+ 然后在代码的入口entry 根节点包含热更新

```javascript
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.jsx'
import { AppContainer } from 'react-hot-loader'; // 包裹根节点，想要渲染的内容
ReactDOM.hydrate(<App/>, document.getElementById('root'))

const root = document.getElementById('root')
const render = Component => {
    ReactDOM.hydrate(
        <AppContainer>
            <Component />
        </AppContainer>,
        root
    )
}

render(App)
/*如果需要热更新的代码出现的时候,重新加载app.js*/
if (module.hot) {
    module.hot.accept('./App.jsx', () => {
        /*因为在App里使用的是export default语法，这里使用的是require,默认不会加载default的，所以需要手动加上*/
        const NextApp = require('./App.jsx').default
        render(NextApp)
    })
}

```
