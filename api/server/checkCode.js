let User=require("../models/user.js");
let checkCode=function(num,res){
	let result;
	User.checkCode(num,function(err,data){
		if(err){
			result={"error":err};
		}else if(data.length==0){
			result={"error":"code不匹配"};
		}else{
			result={"success":"code匹配"};
		}
		res.statusCode=200;
		res.setHeader("Content-Type","text/plain");
		res.setHeader("Access-Control-Allow-Origin","*");
		res.write(JSON.stringify(result));
		console.log(result);
		res.end();
	});
}
module.exports=checkCode;