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

#### 配置热更新

```javascript
npm install webpack-dev-server --save=dev
/*因为mac和window是的设置NODE_ENV的差异，所以使用这个包来进行设置*/
npm install cross-env --save-dev
```
