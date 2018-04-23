let express = require("express");
let bodyParser = require("body-parser");
let app = express();
const backClient = require("./api/server/backClient.js");

//定义请求路由
//获取签名
app.get("/api/saying",function(req,res){
  let findSaying = require("./api/server/saying.js");
  findSaying().then((result) => {
    backClient(res, result);
  }).catch((err) => {
    backClient(res, err);
  });
});

//获取文章类型列表
app.get("/api/getType",function(req,res){
  let getType = require("./api/server/getType.js");
  getType().then((result) => {
    backClient(res, result);
  }).catch((err) => {
    backClient(res, err);
  });
});

//验证管理员身份
app.post("/api/haveUser",bodyParser.json(),function(req,res){
    let haveUser = require("./api/server/user.js");
    haveUser(req.body.name,req.body.password).then((result) => {
      backClient(res, result);
    }).catch((err) => {
      backClient(res, err);
    });
});

//检查验证码
app.post("/api/check",bodyParser.json(),function(req,res){
    let check = require("./api/server/checkCode.js");
    check(req.body.code).then((result) => {
      backClient(res, result);
    }).catch((err) => {
      backClient(res, err);
    });
});

//修改签名
app.post("/api/modifySaying",bodyParser.json(),function(req,res){
    let modifySaying = require("./api/server/modifySaying.js");
    modifySaying(req.body.num,req.body.newSaying).then((result) => {
      backClient(res, result);
    }).catch((err) => {
      backClient(res, err);
    });;
});

//删除种类
app.post("/api/deleteType",bodyParser.json(),function(req,res){
    let deleteType = require("./api/server/deleteType.js");
    deleteType(req.body.code,req.body.type).then((result) => {
      backClient(res, result);
    }).catch((err) => {
      backClient(res, err);
    })
});

//添加种类
app.post("/api/addType",bodyParser.json(),function(req,res){
    let addType = require("./api/server/addType.js");
    addType(req.body.code,req.body.type).then((result) => {
      backClient(res, result);
    }).catch((err) => {
      backClient(res, err);
    })
});

//添加新文章
app.post("/api/newBlog",bodyParser.json(),function(req,res){
    let newBlog = require("./api/server/newBlog.js");
    newBlog(req.body.code,req.body.title,req.body.type,req.body.content).then((result) => {
      backClient(res, result);
    }).catch((err) => {
      backClient(res, err);
    })
});

//获取个人相关
app.get("/api/getAbout",function(req,res){
    let getAbout = require("./api/server/getAbout.js");
    getAbout().then((result) => {
      backClient(res, result);
    }).catch((err) => {
      backClient(res, err);
    });
});

//修改个人相关
app.post("/api/modifyAbout",bodyParser.json(),function(req,res){
    let modifyAbout = require("./api/server/modifyAbout.js");
    modifyAbout(req.body.code,req.body.newArticle).then((result) => {
      backClient(res, result);
    }).catch((err) => {
      backClient(res, err);
    })
});

//获取全部博客列表
app.post("/api/getList",bodyParser.json(),function(req,res){
    let getList = require("./api/server/getList.js");
    getList(req.body.jump).then((result) => {
      backClient(res, result);
    }).catch((err) => {
      backClient(res, err);
    });
});

//获取某类型列表
app.post("/api/getTarget",bodyParser.json(),function(req,res){
    let getList = require("./api/server/getTarget.js");
    getList(req.body.jump,req.body.type).then((result) => {
      backClient(res, result);
    }).catch((err) => {
      backClient(res, err);
    });
});

//获取指定博客
app.post("/api/getBlog",bodyParser.json(),function(req,res){
    let getBlog=require("./api/server/getBlog.js");
    getBlog(req.body.target).then((result) => {
      backClient(res, result);
    }).catch((err) => {
      backClient(res, err);
    });
});

//获取总篇数
app.post("/api/getTotal",bodyParser.json(),function(req,res){
    let getTotal = require("./api/server/getTotal.js");
    getTotal().then((result) => {
      backClient(res, result);
    }).catch((err) => {
      backClient(res, err);
    });
});

//获取某类型总篇数
app.post("/api/getTargetAll",bodyParser.json(),function(req,res){
    let getTotal = require("./api/server/getTargetAll.js");
    getTotal(req.body.type).then((result) => {
      backClient(res, result);
    }).catch((err) => {
      backClient(res, err);
    });
});

//删除某篇博客
app.post("/api/removeBlog",bodyParser.json(),function(req,res){
    let getTotal = require("./api/server/removeBlog.js");
    getTotal(req.body.code,req.body.target,req.body.type).then((result) => {
      backClient(res, result);
    }).catch((err) => {
      backClient(res, err);
    });
});

//修改某篇博客
app.post("/api/modifyBlog",bodyParser.json(),function(req,res){
    let getTotal = require("./api/server/modifyBlog.js");
    getTotal(req.body.code,req.body.target,req.body.newTitle,req.body.newContent).then((result) => {
      backClient(res, result);
    }).catch((err) => {
      backClient(res, err);
    });
});

//定义static目录
app.use(express.static("./dist"));

//启动express
module.exports = app.listen(82, function (err) {
	if (err) {
		console.log(err);
		return
	}
	console.log('Listening at http://localhost:' + 82 + '\n')
});