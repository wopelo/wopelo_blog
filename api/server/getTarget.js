let blog = require("../models/blog.js");
let getTarget = function(jump,target){
	return new Promise((resolve, reject) => {
		blog.getTarget(jump,target,function(err, data){
			if(err){
				reject({"error":err});
			}else{
				resolve(data);
			}
		});
	});
}
module.exports = getTarget;