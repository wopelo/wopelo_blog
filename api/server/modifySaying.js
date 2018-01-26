let User=require("../models/user.js");

let modify=function(num,newSaying,res){
	checkCode(num).then(()=>{
		return userModify(num,newSaying);
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

function backClient(res,result){
	res.statusCode=200;
	res.setHeader("Content-Type","text/plain");
	res.setHeader("Access-Control-Allow-Origin","*");
	res.write(JSON.stringify(result));
	console.log(result);
	res.end();
}

module.exports=modify;