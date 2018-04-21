let User = require("../models/user.js");
let checkId = require("./checkId.js");

let checkCode = function(num,res){
	return new Promise((resolve, reject) => {
		checkId(num).then(() => {
			resolve({"success":"code匹配"});
		}).catch((err) => {
			reject(err);
		})
	});
}

module.exports = checkCode;