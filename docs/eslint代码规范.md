#### eslint

+ 整个项目的项目规范在项目的根目录下新建.eslintrc

```javascript
{
    "extends": "stardand"
}
```

+ 因为客户端的代码是用JSX写到，很多规则和nodejs不一样

```javascript
{
    "parser": "babel-eslint", /*解析我们的js的代码查看问题*/
    "env": {                 /*指定代码的执行环境,这样就可以使用window变量*/
        "browser": true,
        "es6": true,
        "node": true
    },
    /*babel-eslint参数,ES6,文件类型是模块化的*/
    "parserOptions": {
        "eamaVersion": 6,
        "sourceType": "module"
    },
    "extends": "airbnb", /*继承这个规则，下面也可以自己修改*/
    "rules": {
        "semi": [0],   /*分号不需要检测*/
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }], /*重写继承的规则,js中可以出现jsx的语言*/
        "comma-dangle": [1, "always-multiline"], /*数组和对象键值对最后一个逗号， never参数：不能带末尾的逗号, always参数：必须带末尾的逗号，always-multiline：多行模式必须带逗号，单行模式不能带逗号*/
        "indent": ["error", 2, {"ignoredNodes": ["JSXElement"]}],
        "react/jsx-indent": ["error", 2],
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }]
    }
}
```

+ 代码每一次编译之前都应该检测代码
```javascript
{
    enforce: 'pre',
    test: /.(js|jsx)$/,
    exclude: [
        path.resolve(__dirname,'../node_modules')
    ],
}
```
+ 解决一些常见的报错

    + 解决indent 必须缩进四个空格,但是覆盖了jsxElement的问题

    ```javascript
    "rules": {
        "semi": [0],
        "indent": ["error", 4, {"ignoredNodes": ["JSXElement"]}],
        "react/jsx-indent": ["error", 4]
    }
    ```

    +

    + Expect linelinebreaks to be "LF" but fount "CRLF"

    ```javascript
    /*window保存文件行末是CRLF,mac是LF,eslint无法解决，新建.editorconfig*/
    /*安装扩展editorconfig(cmd+shift+p)*/
    /*这是项目的根目录*/
    root = true
    /*所以的文件都使用这个规则*/
    [*]
    charset = utf-8
    /*tab 以空格的形式存在*/
    indent_style = space
    indent_size = 2
    /*航末的结束标志*/
    end_of_line = lf
    /*代码结束的时候,如果文件末尾没有空行自动添加*/
    insert_final_newline = true
    /*忽略代码行末的空格*/
    trim_trailing_whitespace = true
    ```

+ commit 之前先检测代码的规范性

 ```javascript
 /*检测client 下面所有的js和jsx文件代码的合法性*/
"lint": "eslint --ext .js --ext.jsx client/",
/*husky 自带的git的钩子*/
"precommit": "npm run lint"
 ```
