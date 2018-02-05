let User=require("../models/user.js");
let checkCode=require("./checkId.js");
let backClient=require("./backClient.js");

let deleteType=function(num,target,res){
	checkCode(num).then(()=>{
		return rewriteType(target);
	}).then((value)=>{
		backClient(res,value);
	}).catch((err)=>{
		backClient(res,err);
	})
}

function rewriteType(target){
	let promise=new Promise((resolve,reject)=>{
		User.rewriteType(target,function(err,data){
			if(err){
				reject({"error":"删除错误"});
			}else{
				resolve({"success":"删除成功"});
			}
		});
	});
	return promise;
}

module.exports=deleteType;