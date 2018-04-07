let blog=require("../models/blog.js");
let getTotal=function(res){
	let result;
	blog.getTotal(function(err,data){
		if(err){
			result={"error":err};
		}else{
			result=data;
		}
		res.statusCode=200;
		res.setHeader("Content-Type","text/plain");
		res.setHeader("Access-Control-Allow-Origin","*");
		res.write(JSON.stringify(result));
		res.end();
	});
}
module.exports=getTotal;