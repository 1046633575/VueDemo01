//由于webpack 是基于Node 进行构建的，所有webpack配置文件中，所有的Node代码都支持
var path=  require('path')
//在内存中，根据指定的模板页面，生成一份内存中的首页，同时自动把打包好的bundle注入到页面底部
//如果要配置插件，需要在导出对象中，挂在一个plugins 节点
var htmlWebpackPlugin = require('html-webpack-plugin')
//处理vue的
const VueLoaderPlugin = require('vue-loader/lib/plugin')
//配置打包入口和出口
module.exports = {
    entry: path.join(__dirname, './src/main.js'), //入口文件
    output: { //指定输出选项
        path: path.join(__dirname, './dist'),//输出路径
        filename: 'bundle.js' //指定输出文件的名称

    },
    plugins: [ //所有webpack 插件的配置节点
        new htmlWebpackPlugin({
            template: path.join(__dirname, './src/index.html'), //指定模板路径
            filename: 'index.html'
        }),
        new VueLoaderPlugin()
        
    ],
    module: { //配置所有第三方loader模块
        rules: [ //第三方模块的匹配规则

            { test: /\.css$/, use: ['style-loader', 'css-loader']}, //处理css文件的
            { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader']},
            { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader']},
            {
                test: /\.(jpg|png|gif|bmp|jpeg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            //处理图片路径的loader
                            //limit 给定的值，是图片的大小，单位是byte,如果我们引用的图片大于或等于给定的limit值，
                            // 则不会转为base64格式的字符串，如果小于，会被转为base64字符串
                            limit: 1000,
                            //将图片后缀名与文件名设置成原文件一样的，并且加 hash编码区别开
                            name: '[hash:8]-[name].[ext]',
                        }
                    }
                ]
            },
            { test: /\.{ttf|eot|svg|woff|woff2}$/, use: 'url-loader' }, //处理字体文件的 loader

            { test: /\.vue$/, use: 'vue-loader'}, //处理 .vue文件的loader
            // {
            //     test: /\.js$/,
            //     use: "babel-loader",
            //     exclude: /node_modules/
            // },
            { test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/, loader: 'file-loader'}
        ]
    },
    // resolve: {
    //     alias: { //修改 Vue 被导入时候的包的路径
    //         "vue$": "vue/dist/vue.js"
    //     }
    // }
}