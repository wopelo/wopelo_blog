let blog = require("../models/blog.js");
let getTargetAll = function(target){
	return new Promise((resolve, reject) => {
		blog.getTargetAll(target,function(err, data){
			if(err){
				reject({"error":err});
			}else{
				resolve(data);
			}
		});
	})
}
module.exports = getTargetAll;