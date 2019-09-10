# webpack-typescript-antd
不使用create-react-app来生成，自己动手配置的 ts 
以下文档是默认你已经对webpack及相关配置有一定的了解，并且此配置仅是我基于之前webpack基础修改，并没有详细说明配置缘由，仅供学习参考

## 在项目中添加配置typescript
#### 1、添加 `tsconfig.json` 文件
```
{
  "compilerOptions": {
      "outDir": "./assets/",                            // 重定向输出目录
      "sourceMap": false,
      "noImplicitAny": false,                           // 在表达式和声明上有隐含的 any 类型时是否报错
      "module": "es6",                                  // 指定生成哪个模块系统代码
      "target": "es6",                                  // 指定ECMAScript目标版本 "ES3"（默认）
      "jsx": "preserve",                                // ts支持的模式，preserve模式将JSX保留为输出的一部分，以供其他转换步骤（例如Babel）进一步使用
      "moduleResolution": "node",                       // 决定如何处理模块。或者是"Node"对于Node.js/io.js，或者是"Classic"（默认）        
      "allowJs": true,                                  // 是否允许编译javascript文件
      "allowSyntheticDefaultImports": true,             // 允许从没有设置默认导出的模块中默认导入。这并不影响代码的输出，仅为了类型检查。
      "lib": [                                          // 编译过程中需要引入的库文件的列表
          "es5", 
          "dom",
          "dom.iterable",
          "es2015"
      ]
  },
  "include": [
      "./js/**/*"
  ],
  "exclude": ["./node_modules/"]
}
```
#### 2、更改 webpack babel 配置
在`webpack.config.js`文件`rules`添加配置
```
...
  module: {
    rules: [
        {
            test: /\.(tsx|ts)?$/,
            use: [
                {
                    loader: 'babel-loader'
                }, {
                    loader: 'awesome-typescript-loader'
                }
            ]
        },
    ]
  }
...
```
#### 3、安装相关依赖包
```
npm i typescript awesome-typescript-loader --save-dev
```
#### 4、确保`package.json`中的依赖与对应版本一致
常见报错：
```
Plugin/Preset files are not allowed to export objects...
```
上述类似报错是因为`babel`版本冲突导致的

解决：将所有与`babel`有关的包都升级为`7.x.x`版本（或降级到`6.x.x`版本），并且修改`.babelrc`文件`preset`属性为对应版本；
如：
```
"presets": [
    "@babel/preset-env", "@babel/preset-react"
]
```
另外，请确保`package.json`依赖中包含`@types/react`,`@types/react-dom`，typescript在编译时不仅会使用`react`、`react-dom`，还用使用到上述两个包

#### 5、引入`Ant-Design`
修改`.babelrc`文件
```
"plugins": [
      ["import", {"libraryName": "antd", "style": true}]
  ]
```
安装`antd`公共的依赖包
```
npm i babel-plugin-import --save-dev
```
在webpack中添加解析 js、less、css 配置
```
module: {
    rules: [
        ...
        {
           test: /\.js$/,
            loader: "babel-loader",
            exclude: /node_modules/ 
        },
        {
            test: /\.less$/,
            use: [
                { loader: 'style-loader' },
                { loader: "css-loader" },
                { loader: "less-loader", options: { javascriptEnabled: true } }
            ]
        },
        {
           test: /\.css$/,
            use: [
                {loader: 'style-loader'},
                {loader: 'css-loader'}
            ] 
        },
        ...
    ]
}
```
