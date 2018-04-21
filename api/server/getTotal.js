let blog = require("../models/blog.js");
let getTotal = function(res){
	return new Promise((resolve, reject) => {
		blog.getTotal(function(err, data){
			if(err){
				reject({"error":err});
			}else{
				resolve(data);
			}
		});
	});
}
module.exports = getTotal;