import React from 'react'
import ReactDOM from 'react-dom'
/* 包裹根节点，想要渲染的内容 */
import { AppContainer } from 'react-hot-loader' //eslint-disable-line
import App from './App.jsx'

ReactDOM.hydrate(<App />, document.getElementById('root'))

const root = document.getElementById('root')
const render = (Component) => {
  ReactDOM.hydrate(
    <AppContainer>
      <Component />
    </AppContainer>,
    root,
  )
}

render(App)
/* 如果需要热更新的代码出现的时候,重新加载app.js */
if (module.hot) {
  module.hot.accept('./App.jsx', () => {
    /* 因为在App里使用的是export default语法，这里使用的是require,默认不会加载default的，所以需要手动加上 */
    /* eslint-disable global-require */
    const NextApp = require('./App.jsx').default
    /* eslint-enable global-require */
    render(NextApp)
  })
}
