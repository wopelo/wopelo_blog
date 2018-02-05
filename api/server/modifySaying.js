let User=require("../models/user.js");
let checkCode=require("./checkId.js");
let backClient=require("./backClient.js");

let modify=function(num,newSaying,res){
	checkCode(num).then(()=>{
		return userModify(num,newSaying);
	}).then((value)=>{
		backClient(res,value);
	}).catch((err)=>{
		backClient(res,err);
	})
}

function userModify(num,newSaying){
	let promise=new Promise((resolve,reject)=>{
		User.modify(num,newSaying,function(err,data){
			if(err){
				reject({"error":err});
			}else{
				resolve({"success":"修改成功"});
			}
		});
	});
	return promise;
}

module.exports=modify;