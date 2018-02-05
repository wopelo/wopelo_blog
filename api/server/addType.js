let User=require("../models/user.js");
let checkCode=require("./checkId.js");
let backClient=require("./backClient.js");

let Add=function(num,target,res){
	checkCode(num).then(()=>{
		return checkType(target);
	}).then(()=>{
		return addType(target);
	}).then((value)=>{
		backClient(res,value);
	}).catch((err)=>{
		backClient(res,err);
	})
}

function checkType(target){
	var promise=new Promise((resolve,reject)=>{
		User.findTarget(target,function(err,data){
			if(err){
				reject({"error":err});
			}else if(data.length!=0){
				console.log(data)
				reject({"error":"error"});
			}else{
				resolve()
			}
		});
	});
	return promise;
}

function addType(target){
	let promise=new Promise((resolve,reject)=>{
		User.addType(target,function(err,data){
			if(err){
				reject({"error":"添加错误"});
			}else{
				resolve({"success":"添加成功"});
			}
		});
	});
	return promise;
}

module.exports=Add;