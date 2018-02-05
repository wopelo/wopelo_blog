let express=require("express");
let bodyParser=require("body-parser");
let app=express();

//定义请求路由
//获取签名
app.get("/api/saying",function(req,res){
  let findSaying=require("./api/server/saying.js");
  findSaying(res);
});
//获取文章类型列表
app.get("/api/getType",function(req,res){
  let getType=require("./api/server/getType.js");
  getType(res);
});
//验证管理员身份
app.post("/api/haveUser",bodyParser.json(),function(req,res){
    console.log(req.body);
    let haveUser=require("./api/server/user.js");
    haveUser(req.body.name,req.body.password,res);
});
//检查验证码
app.post("/api/check",bodyParser.json(),function(req,res){
    let check=require("./api/server/checkCode.js");
    check(req.body.code,res);
});
//修改签名
app.post("/api/modifySaying",bodyParser.json(),function(req,res){
    let modifySaying=require("./api/server/modifySaying.js");
    modifySaying(req.body.num,req.body.newSaying,res);
});
//删除种类
app.post("/api/deleteType",bodyParser.json(),function(req,res){
    let deleteType=require("./api/server/deleteType.js");
    deleteType(req.body.code,req.body.type,res);
});
//添加种类
app.post("/api/addType",bodyParser.json(),function(req,res){
    let addType=require("./api/server/addType.js");
    addType(req.body.code,req.body.type,res);
});
//添加新文章
app.post("/api/newBlog",bodyParser.json(),function(req,res){
    let newBlog=require("./api/server/newBlog.js");
    newBlog(req.body.code,req.body.title,req.body.type,req.body.content,res);
});
//获取个人相关
app.get("/api/getAbout",function(req,res){
    let getAbout=require("./api/server/getAbout.js");
    getAbout(res);
});
//修改个人相关
app.post("/api/modifyAbout",bodyParser.json(),function(req,res){
    let modifyAbout=require("./api/server/modifyAbout.js");
    modifyAbout(req.body.code,req.body.newArticle,res);
})

//定义static目录
app.use(express.static("./dist"));

//启动express
module.exports = app.listen(80, function (err) {
	if (err) {
		console.log(err);
		return
	}
	console.log('Listening at http://localhost:' + 80 + '\n')
});