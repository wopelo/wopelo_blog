let Blog = require("../models/blog.js");
let User = require("../models/user.js");
let checkCode = require("./checkId.js");

let removeBlog = function(num, target, type){
	return new Promise((resolve, reject) => {
		checkCode(num).then(() => {
			let arr = [];
			for(let n=0;n<type.length;n++){
				arr.push(new Promise((resolve,reject) => {
					User.reduceNum(type[n],function(err, data){
						if(err){
							reject({"error":err});
						}else{
							resolve();
						}
					});
				}));
				
			}
			return Promise.all(arr);
		}).then(() => {
			return removeTarget(target);
		}).then((value) => {
			resolve(value);
		}).catch((err) => {
			reject({"error":err});
		})
	});
}

function removeTarget(target){
	let promise = new Promise((resolve, reject) => {
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