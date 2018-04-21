let user = require("../models/user.js");
let getType = function(res){
	return new Promise((resolve, reject) => {
		user.getType(function(err,data){
			if(err){
				reject({"error":err});
			}else{
				resolve(data[0])
			}
		});
	});
}
module.exports = getType;