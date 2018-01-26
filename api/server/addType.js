let User=require("../models/user.js");

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

function checkCode(num){
	let promise=new Promise((resolve,reject)=>{
		User.checkCode(num,function(err,data){
			if(err){
				reject({"error":err});
			}else if(data.length==0){
				reject({"error":"code不匹配"});
			}else{
				resolve()
			}
		})
	});
	return promise;
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

function backClient(res,result){
	res.statusCode=200;
	res.setHeader("Content-Type","text/plain");
	res.setHeader("Access-Control-Allow-Origin","*");
	res.write(JSON.stringify(result));
	console.log(result);
	res.end();
}

module.exports=Add;