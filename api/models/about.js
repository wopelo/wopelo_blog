let mongoose=require("mongoose");
mongoose.Promise=global.Promise; 

let message=require("../information.json");

let db=mongoose.createConnection(message.database);
let blogSchema=require("../schemas/about.js");
db.on("error",function(err){
	console.log(err);
});
db.on("open",function(){
	console.log("about被打开");
});
let blogUser=db.model("about",blogSchema);

module.exports=blogUser;