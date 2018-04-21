let About = require("../models/about.js");
let checkCode = require("./checkId.js");

let modify = function(num, newArticle){
	return new Promise((resolve, reject) => {
		checkCode(num).then(() => {
			return aboutModify(newArticle);
		}).then((value) => {
			resolve(value);
		}).catch((err) => {
			reject(err);
		})
	})
}

function aboutModify(newArticle){
	let promise = new Promise((resolve, reject) => {
		About.modifyAbout(newArticle, function(err, data){
			if(err){
				reject({"error":err});
			}else{
				resolve({"success":"修改成功"});
			}
		});
	});
	return promise;
}

module.exports = modify;