#### mobx

#### 配置babel

+ “Decorators”从好三年前就开始炒的特性，这个特性在Typescript 、 angular、 mobx中广为使用，然而经过多年的努力，Decorators的是目前仍然处于Stage2，babel官方从babel 5 就有支持 Decorators的plugin，因为草案不稳定的原因，在babel6中从内置插件中移除了对“装饰器”语法转换的支持，之前我们都是使用 “民间”的第三方插件(babel-plugin-transform-decorators-legacy)来转换装饰器语法，babel7中把这个插件纳入了babel的内置插件列表中,名字也改为 @babel/plugin-proposal-decorators

+ 当我们编写mobx装饰器以及使用babel的时候,需要支持es7的部分功能
stage-1除了包含stage-2和stage-3，还包含了下面4个插件：

  + transform-class-constructor-call (Deprecated)

  + transform-class-properties

  + transform-decorators – disabled pending proposal update

  + transform-export-extensions

```javascript
{
    "presets": [
        ["es2015",{ "loose": true }],
        "stage-1",
        "react"
    ],
    "plugins": ["transform-decorators-legacyde","react-hot-loader/babel"]
}

```
