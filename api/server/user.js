let User=require("../models/user.js");
let haveUser=function(name,password,res){
	let result;
	User.Verification(name,password,function(err,data){
		console.log(data)
		if(err){
			result={"error":err};
			backClient(res,result);
		}else if(data.length==0){
			result={"error":"用户信息不存在"};
			backClient(res,result);
		}else{
			//生成验证码
			let a="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
			let b="";
			for(n=0;n<4;n++){
			    let c=Math.floor(Math.random()*62);
			    b+=a.charAt(c);
			}
			User.makeCode(name,b,function(err,data){
				result={"success":"身份验证成功","code":b};
				backClient(res,result);
			})
		}
	});
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