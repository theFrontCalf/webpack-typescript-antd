const htmlWebpackPlugins = require('html-webpack-plugin');
// const tsImportPluginFactory = require('ts-import-plugin')

module.exports = {
    mode: 'development',
    entry: "./src/index.tsx",
    output: {
        filename: "bundle.js",
        path: __dirname + "/dist"
    },

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            // {
            //     test: /\.(js|ts|tsx|jsx)$/,
            //     loader: "babel-loader",
            //     options: {
            //         customize: require.resolve('babel-preset-react-app/webpack-overrides')
            //     },
            //     plugin: [ require.resolve('babel-plugin-named-asset-import') ]
            // },
            // {
            //     test: /\.(js|ts|tsx|jsx)$/,
            //     use: [{loader:'babel-loader'}], 
            // },
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

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            {
                // enforce: "pre",              // 加载器的执行顺序，不设置为正常执行。可选值 'pre|post' 前|后
                test: /\.js$/,
                loader: "babel-loader",
                exclude: /node_modules/
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: "css-loader",
                    },
                    {
                        loader: "less-loader",
                        options: {
                            javascriptEnabled: true
                        }
                    },
                
                ]
            },
            {
                test: /\.css$/,
                use: [
                    {loader: 'style-loader'},
                    {loader: 'css-loader'}
                ]
            }
        ]
    },

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.

    // externals: {
    //     "react": "React",
    //     "react-dom": "ReactDOM"
    // },

    plugins:[
        new htmlWebpackPlugins({
            filename: 'index.html',                 // 输出文件的文件名称，默认为index.html
            template: 'index.html',                 // 本地模板文件的位置
            cache: true,
            minify: false,                          // 不压缩
            chunks: 'all',
            inject: 'body'
        })
    ],
    optimization: {
        minimize: false,                            // 是否压缩js代码
        minimizer: [],
        runtimeChunk: {                             // 公共运行时入口文件
            name: () => 'manifest'
        },
        splitChunks: {
            chunks: 'all',                          // all：同时分割同步和异步代码， async(默认): 分割异步打包代码， initial: 也会同时打包同步和异步，但是异步内部的引入不再考虑，直接打包在一起
            name: 'reactCommon'
            
        }
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",
    devServer: {
        host:'localhost',
        port: 9195,
        hot: true,
        open: true,
        compress: true,
        // contentBase: path.resolve(__dirname, "./"),
        // publicPath: "/assets",
        stats: 'errors-only',// 只显示bundle中的错误
        clientLogLevel: "error",
        noInfo: true,
        inline: true,// 实时刷新
        // proxy: [{
        //     context: PAGES.proxyContext,
        //     target: 'http://demo.guanyierp.com',
        //     changeOrigin: true,
        //     logLevel: 'debug',
        //     headers: {
        //         'Cookie': COOKIE.cookie
        //     }
        // }]
    }
};