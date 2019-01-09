#### webpack-dev-server

+ webpack-dev-server会根据webpack的配置启动一个服务，然后自动build我们每次修改之后的代码，然后刷新浏览器
并且这些编译之后的文件是存在内存中的，加快了访问速度

```javascript
config.devServer = {
    host: '0.0.0.0',
    port: '8888',
    /*webpack服务器的搭建目录是dist*/
    contentBase: path.join(__dirname,'../dist'),
    hot: true,
    /*如果访问的时候出现任何错误，就把错误显示到网页上,errors=true表示只显示错误信息不显示警告等信息*/
    overlay: {
        errors: true
    },
    /*因为webpack服务器的搭建目录是dist，所以localhost:8888/index.html就能访问到文件了，
    但是因为output配置了publicPath来让服务器区分静态资源,所以这里配置webpack服务器访问资源的前缀是publick*/
    publicPath: '/public',
    /*如果访问index就映射到index.html*/
    historyApiFallback: {
        index: '/public/index.html'
    }

}
```
