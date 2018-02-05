let User=require("../models/user.js");
let checkId=require("./checkId.js");
let backClient=require("./backClient.js");

let checkCode=function(num,res){
	checkId(num).then(()=>{
		let result={"success":"code匹配"};
		return backClient(res,result);
	}).catch((err)=>{
		backClient(res,err);
	})
}

module.exports=checkCode;