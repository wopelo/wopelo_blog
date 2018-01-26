let user=require("../models/user.js");
let getType=function(res){
	let result;
	user.getType(function(err,data){
		if(err){
			result={"error":err};
		}else{
			result=data[0];
		}
		res.statusCode=200;
		res.setHeader("Content-Type","text/plain");
		res.setHeader("Access-Control-Allow-Origin","*");
		res.write(JSON.stringify(result));
		console.log(result);
		res.end();
	});
}
module.exports=getType;