####  服务端代码的自动更新

```javascript
/*进行nodemon的配置*/
{
  /*以下文件的修改不需要重启*/
  "ignore": {
    ".git",
    /*node_modules 以及node_modules下面的文件夹里面的node_modules*/
    "node_modules/**/node_modules",
    "build",
    "client"
  },
  /*输出错误信息*/
  "verbose": true,
  /*只有js文件进行自动更新*/
  "ext": "js",
  /*指定当前执行环境*/
  "env": {
    "NODE_ENV": "development"
  }
}
```
