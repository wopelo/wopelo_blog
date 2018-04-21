let User = require("../models/user.js");
let checkCode = require("./checkId.js");

let deleteType = function(num,target){
	return new Promise((resolve, reject) => {
		checkCode(num).then(() => {
			return rewriteType(target);
		}).then((value) => {
			resolve(value);
		}).catch((err) => {
			reject(err);
		})
	});
}

function rewriteType(target){
	let promise = new Promise((resolve, reject) => {
		User.rewriteType(target,function(err, data){
			if(err){
				reject({"error":"删除错误"});
			}else{
				resolve({"success":"删除成功"});
			}
		});
	});
	return promise;
}

module.exports = deleteType;