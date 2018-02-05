let about=require("../models/about.js");
let getAbout=function(res){
	let result;
	about.getAbout(function(err,data){
		if(err){
			result={"error":err};
		}else{
			result=data[0];
		}
		res.statusCode=200;
		res.setHeader("Content-Type","text/plain");
		res.setHeader("Access-Control-Allow-Origin","*");
		res.write(JSON.stringify(result));
		res.end();
	});
}
module.exports=getAbout;