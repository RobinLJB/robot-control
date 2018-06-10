const webpack = require('webpack');
//加载webpack模块
const HtmlWebpackPlugin = require('html-webpack-plugin');
//html模板模块
const CopyWebpackPlugin = require('copy-webpack-plugin');
//静态资源复制模块
const path = require('path');

const theme = require('./theme.js');

'use strict'

module.exports = {
  target: 'electron-renderer',
  //输入
  entry: {
    app: __dirname + "/src/app.js" // 编译入口是app.js
  },
  //输出
  output: {
    path: __dirname + "/build", //测试输出目录
    filename: "[name].[hash:8].js" //用回编译前的key名字
  },
  //服务器设置
  devServer: {
    useLocalIp: true, //用本地ip
    contentBase: "/build", //访问目录
    host: "0.0.0.0", //允许所有地址访问
    port: 8180, //端口
    open: true, //执行时 打开浏览器
    historyApiFallback: true //适合单页应用
  },
	//别名配置
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  //非js模块加载器
  module: {
    rules: [
      {
        //此类后缀文件用 babel编译器编译
        test: /(\.jsx|\.js)$/,
        use: {
          loader: "babel-loader",
          options: {
            "presets": ["react", "env", "stage-1", "stage-0"]
          }
        },
        include: /src/
      }, { //css样式加载器
        test: /\.css$/,
        use: [
          {
            loader: "style-loader" //css文件应用到dom节点上
          }, {
            loader: "css-loader", //可以读取css文件
            options: {
              modules: false //样式全局化 不能自我调用
            }
          }
        ],
        include: /(src|react-draft-wysiwyg)/
      },  { //静态less样式加载器
        test: /\.less$/,
        use: [
          {
            loader: "style-loader" //css文件应用到dom节点上
          }, {
            loader: "css-loader", //可以读取css文件
            options: {
              modules: false //样式全局化 不能自我调用
            }
          },{
            loader: "less-loader", //可以读取css文件
            options: {
              "paths" : ["/Users/robinluo/git-repository/robin-background/node_modules/_antd@3.2.3@antd/es/style"],
              "javascriptEnabled" : true,
              "relativeUrls": false,
              "modifyVars": theme
            }
          }
        ],
        include: /(antd|src)/
      }, { //ico加载器
        test: /\.ico?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: "url-loader?limit=10000&name=favicon.ico"
          }
        ]
      }
    ]
  },

  //插件
  plugins: [
    //html模板插件
    new HtmlWebpackPlugin({
      //页面title
      title: "巡检机器人控制客户端",
      //模板地址
      template: __dirname + "/src/index.tmpl.html",
      //js导入分类
      chunks: ["vendor", "app"]
    }),
    //js分类插件 依赖包
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      filename: "vendor.[hash:8].js",
      minChunks(module) {
        const context = module.context;
        return context && context.indexOf("node_modules") >= 0;
      }
    }),
    //添加js 压缩模块
    new webpack.optimize.UglifyJsPlugin(),
    //模块顺序优化
    new webpack.optimize.OccurrenceOrderPlugin(),
    //添加css 压缩模块
    // //静态文件复制模块
    new CopyWebpackPlugin([
      {
        from: __dirname + "/src/tinymce.min.js",
        to: "[name].[ext]"
      },{
        from: __dirname + "/src/langs/zh_CN.js",
        to: "langs/[name].[ext]"
      }
      ,{
        from: __dirname + "/src/skins/lightgray/skin.min.css",
        to: "skins/lightgray/[name].[ext]"
      }
      ,{
        from: __dirname + "/src/skins/lightgray/content.min.css",
        to: "skins/lightgray/[name].[ext]"
      },{
        from: __dirname + "/src/skins/lightgray/fonts/tinymce.ttf",
        to: "skins/lightgray/fonts/[name].[ext]"
      },{
        from: __dirname + "/src/skins/lightgray/fonts/tinymce.woff",
        to: "skins/lightgray/fonts/[name].[ext]"
      },{
        from: __dirname + "/src/video.jpeg",
        to: "[name].[ext]"
      },{
        from: __dirname + "/src/infrared.jpg",
        to: "[name].[ext]"
      },{
        from: __dirname + "/src/radar.jpg",
        to: "[name].[ext]"
      },{
        from: __dirname + "/src/chuang.png",
        to: "[name].[ext]"
      }
    ])
  ]

}
