### 项目的基本搭建流程

```javascript
/*初始化package.json*/
npm init
/*安装webpack*/
npm install webpack
/*安装webpack的命令行依赖,这样就可以执行npm run build*/
npm install webpack-cli --save-dev
/*安装react*/
npm install react
/*安装react-dom,将react虚拟DOM渲染成真实的DOM*/
npm instal react-dom
/*可以引入jsx等其他后缀的文件,是webpack的插件*/
npm install babel-loader --save-dev
/*babel的核心语法，必须加载*/
npm install babel-core --save-dev

/*这个时候npm run build还不能识别react的jsx的语法，
打包的时候会失败(ReactDOM.render(<App/>, document.body)根本就没办法识别
因为babel默认编译的成的是ES6的代码，所以
必须在babelrc中进行配置,让babel可以以JSX和ES5的标准进行编译*/

/*首先，这个配置文件是针对babel 6的。Babel 6做了一系列模块化，不像Babel 5一样把所有的内容都加载。比如需要编译ES6，我们需要设置presets为"es2015"，也就是预先加载es6编译的相关模块，如果需要编译jsx，需要预先加载"react"这个模块*/

{
    /*babel要编译的语法*/
    "presets": [
        ["es2015",{ "loose": true }],
        "react"
    ]
}

npm install babel-preset-es2015 babel-preset-es2015-loose babel-preset-react --save-dev

/*在打包的时候自动生成HTML,并且根据入口文件生成JS的引用路径*/
npm install html-webpack-plugin --save-dev

/*小型的node的命令包,用来删除dist目录*/

npm install rimraf --save-dev

```
#### 配置服务器端渲染

```javascript
npm install express --save
```

#### 配置webpack-dev-server

```javascript
npm install webpack-dev-server --save=dev
/*因为mac和window是的设置NODE_ENV的差异，所以使用这个包来进行设置*/
npm install cross-env --save-dev
```

#### 配置热更新

```javascript
npm install react-hot-loader@next --save
```

#### 局部热更新重新配置服务器端渲染

```javascript
/*前端发送请求,后端发送请求获取模版*/
npm install axios --save
/*从内存中读写文件*/
npm install memory-fs --save-dev
/*express 的代理的中间件,主要用来处理静态文件*/
npm install http-proxy-middleware --save-dev
```

#### eslint和editorconfig规范代码

```javascript
/*代码规范*/
npm install eslint --save-dev
/*"eslint代码解析babel-eslint"*/
npm install babel-eslint --save-dev
/*eslint 检测继承的标准*/
npm isntall eslint-config-airbnb eslint-config-standard --save-dev
/*webpack使用的第三方模块,编译之前检测代码*/
npm install eslint-loader --save-dev
/*airbnb所依赖的插件 https://www.npmjs.com/package/eslint-config-airbnb*/
npm install eslint-plugin-import --save-dev
npm install eslint-plugin-jsx-a11y --save-dev
npm install eslint-plugin-node --save-dev
npm install eslint-plugin-promise --save-dev
npm install eslint-plugin-react --save-dev
npm install eslint-plugin-standard --save-dev
/*git的钩子 commit之前先检测代码*/
npm install husky --save-dev
/*npm install webpack-merge -save-dev*/
```

#### favicon请求的处理

```javascript
npm install serve-favicon --save
```

####  服务端代码的自动更新

```javascript
/*不像客户端存在webpack-dev-server,我们的服务端的代码每次修改都需要重启服务*/
npm install nodemon -save-dev
```

#### react-router的配置

```javascript
/*react-router包含了react-router-dom和react-router-native*/
npm install react-router --save
npm install react-router-dom --save
```

#### mobex的配置

 ```javascript
 /*支持js的装饰器*/
 npm install babel-plugin-transform-decorators-legacy --dev-save
/*es7 stage-1标准*/
 npm install babel-preset-stage-1 --dev-save
 /*安装mobx和mobx链接react的库*/
npm install mobx mobx-react --save
/*检测属性的类型*/
npm install prop-types --save
 ```

 #### CNode API代理实现

 ```javascript
 /*解析http请求的body*/
 npm install body-parser express-session --save
/*解析url为json*/
npm install query-string --save
 ```



