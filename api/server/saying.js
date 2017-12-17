let saying=require("../models/saying.js");
let findSaying=function(res){
	let result;
	saying.findSaying(function(err,data){
		if(err){
			result={"error":err};
		}else if(data.length==0){
			result={"error":"他居然一句话也没有说~"};
		}else{
			result=data;
		}
		res.statusCode=200;
		res.setHeader("Content-Type","text/plain");
		res.setHeader("Access-Control-Allow-Origin","*");
		res.write(JSON.stringify(result));
		console.log(result);
		res.end();
	});
}
module.exports=findSaying;