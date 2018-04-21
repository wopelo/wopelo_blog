let User = require("../models/user.js");
let checkCode = require("./checkId.js");

let Add = function(num,target){
	return new Promise((resolve, reject) => {
		checkCode(num).then(() => {
			return checkType(target);
		}).then(() => {
			return addType(target);
		}).then((value) => {
			resolve(value);
		}).catch((err) => {
			reject(err);
		})
	});
}

function checkType(target){
	let promise = new Promise((resolve, reject)=>{
		User.findTarget(target,function(err, data){
			if(err){
				reject({"error":err});
			}else if(data.length != 0){
				reject({"error":"error"});
			}else{
				resolve();
			}
		});
	});
	return promise;
}

function addType(target){
	let promise = new Promise((resolve, reject)=>{
		User.addType(target,function(err, data){
			if(err){
				reject({"error":"添加错误"});
			}else{
				resolve({"success":"添加成功"});
			}
		});
	});
	return promise;
}

module.exports = Add;