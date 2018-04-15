let Blog = require("../models/blog.js");
let User = require("../models/user.js");
let checkCode = require("./checkId.js");
let backClient = require("./backClient.js");

let removeBlog = function(num,target,type,res){
	checkCode(num).then(()=>{
		let arr = [];
		for(let n=0;n<type.length;n++){
			arr.push(new Promise((resolve,reject)=>{
				User.reduceNum(type[n],function(err,data){
					if(err){
						reject({"error":err});
					}else{
						resolve()
					}
				});
			}));
			
		}
		return Promise.all(arr);
	}).then(()=>{
		return removeTarget(target);
	}).then((value)=>{
		backClient(res,value);
	}).catch((err)=>{
		let error={"error":err};
		backClient(res,error);
	})
}

function removeTarget(target){
	let promise = new Promise((resolve,reject)=>{
		Blog.removeTarget(target,function(err,data){
			if(err){
				reject({"error":err});
			}else{
				resolve({"success":"删除成功"});
			}
		})
	});
	return promise;
}

module.exports = removeBlog;