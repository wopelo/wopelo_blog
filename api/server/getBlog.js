let blog = require("../models/blog.js");
let getBlog = function(target,res){
	return new Promise((resolve, reject) => {
		blog.getBlog(target,function(err, data){
			if(err){
				reject({"error":err});
			}else{
				resolve(data);
			}
		});
	});
}
module.exports = getBlog;