let User = require("../models/user.js");

function checkCode(num){
	let promise = new Promise((resolve, reject)=>{
		User.checkCode(num,function(err, data){
			if(err){
				reject({"error":err});
			}else if(data.length == 0){
				reject({"error":"code不匹配"});
			}else{
				resolve();
			}
		})
	});
	return promise;
}

module.exports = checkCode;