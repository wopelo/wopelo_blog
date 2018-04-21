let about = require("../models/about.js");
let getAbout = function(){
	return new Promise((resolve, reject) => {
		about.getAbout(function(err, data){
			if(err){
				reject({"error":err})
			}else{
				resolve(data[0]);
			}
		});
	})
}
module.exports = getAbout;