'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')

//后台api
const express=require('express');
const querystring=require("querystring");
const bodyParser=require("body-parser");
const app=express();
const apiRoutes=express.Router();
app.use('/api',apiRoutes);

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: true,
    hot: true,
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    },
    before(app){
      //获取签名
      app.get("/api/saying",function(req,res){
        let findSaying=require("../api/server/saying.js");
        findSaying(res);
      });
      //获取文章类型列表
      app.get("/api/getType",function(req,res){
        let getType=require("../api/server/getType.js");
        getType(res);
      });
      //验证管理员身份
      app.post("/api/haveUser",bodyParser.json(),function(req,res){
          console.log(req.body);
          let haveUser=require("../api/server/user.js");
          haveUser(req.body.name,req.body.password,res);
      });
      //检查验证码
      app.post("/api/check",bodyParser.json(),function(req,res){
          let check=require("../api/server/checkCode.js");
          check(req.body.code,res);
      });
      //修改签名
      app.post("/api/modifySaying",bodyParser.json(),function(req,res){
          let modifySaying=require("../api/server/modifySaying.js");
          modifySaying(req.body.num,req.body.newSaying,res);
      });
      //删除种类
      app.post("/api/deleteType",bodyParser.json(),function(req,res){
          let deleteType=require("../api/server/deleteType.js");
          deleteType(req.body.code,req.body.type,res);
      });
      //添加种类
      app.post("/api/addType",bodyParser.json(),function(req,res){
          let addType=require("../api/server/addType.js");
          addType(req.body.code,req.body.type,res);
      });
      //添加新文章
      app.post("/api/newBlog",bodyParser.json(),function(req,res){
          let newBlog=require("../api/server/newBlog.js");
          newBlog(req.body.code,req.body.title,req.body.type,req.body.content,res);
      });
      //获取个人相关
      app.get("/api/getAbout",function(req,res){
          let getAbout=require("../api/server/getAbout.js");
          getAbout(res);
      });
      //修改个人相关
      app.post("/api/modifyAbout",bodyParser.json(),function(req,res){
          let modifyAbout=require("../api/server/modifyAbout.js");
          modifyAbout(req.body.code,req.body.newArticle,res);
      });
      //获取博客列表
      app.post("/api/getList",bodyParser.json(),function(req,res){
          let getList=require("../api/server/getList.js");
          getList(req.body.jump,res);
      });
      //获取指定博客
      app.post("/api/getBlog",bodyParser.json(),function(req,res){
          let getBlog=require("../api/server/getBlog.js");
          getBlog(req.body.target,res);
      })
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})