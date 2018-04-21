let saying = require("../models/user.js");
let findSaying = function(){
	return new Promise((resolve, reject) => {
		saying.findSaying(function(err, data){
			if(err){
				reject({"error":err});
			}else if(data.length == 0){
				resolve({"saying":"他居然一句话也没有说~"});
			}else{
				resolve(data[0]);
			}
		});
	});
}
module.exports = findSaying;