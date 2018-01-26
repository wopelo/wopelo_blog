let express=require("express");
let bodyParser=require("body-parser");
let app=express();

//定义请求路由
app.get("/api/saying",function(req,res){
  let findSaying=require("./api/server/saying.js");
  findSaying(res);
});
app.get("/api/getType",function(req,res){
  let getType=require("./api/server/getType.js");
  getType(res);
});
app.post("/api/haveUser",bodyParser.json(),function(req,res){
    console.log(req.body);
    let haveUser=require("./api/server/user.js");
    haveUser(req.body.name,req.body.password,res);
});
app.post("/api/check",bodyParser.json(),function(req,res){
    let check=require("./api/server/checkCode.js");
    check(req.body.code,res);
});
app.post("/api/modifySaying",bodyParser.json(),function(req,res){
    let modifySaying=require("./api/server/modifySaying.js");
    modifySaying(req.body.num,req.body.newSaying,res);
});
app.post("/api/deleteType",bodyParser.json(),function(req,res){
    let deleteType=require("./api/server/deleteType.js");
    deleteType(req.body.code,req.body.type,res);
});
app.post("/api/addType",bodyParser.json(),function(req,res){
    let addType=require("./api/server/addType.js");
    addType(req.body.code,req.body.type,res);
});

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