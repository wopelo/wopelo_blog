let User=require("../models/user.js");

let haveUser=function(name,password,res){
	Verification(name,password).then((code)=>{
		return makeCode(name,code);
	}).then((value)=>{
		backClient(res,value);
	}).catch((err)=>{
		backClient(res,err);
	})
}

function Verification(name,password){
	let promise=new Promise((resolve,reject)=>{
		User.Verification(name,password,function(err,data){
			console.log(data)
			if(err){
				reject({"error":err});
			}else if(data.length==0){
				reject({"error":"用户信息不存在"});
			}else{
				//生成验证码
				let sequence="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
				let code="";
				for(n=0;n<4;n++){
				    let c=Math.floor(Math.random()*62);
				    code+=sequence.charAt(c);
				}
				resolve(code);
			}
		});
	});
	return promise;
}

function makeCode(name,code){
	let promise=new Promise((resolve,reject)=>{
		User.makeCode(name,code,function(err,data){
			resolve({"success":"身份验证成功","code":code});
		})
	});
	return promise;
}

function backClient(res,result){
	res.statusCode=200;
	res.setHeader("Content-Type","text/plain");
	res.setHeader("Access-Control-Allow-Origin","*");
	res.write(JSON.stringify(result));
	console.log(result);
	res.end();
}

module.exports=haveUser;