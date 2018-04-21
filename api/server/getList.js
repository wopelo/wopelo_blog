let blog = require("../models/blog.js");
let getList = function(jump){
	return new Promise((resolve, reject) => {
		blog.getList(jump,function(err, data){
			if(err){
				reject({"error":err});
			}else{
				reject(data);
			}
		});
	});
}
module.exports = getList;