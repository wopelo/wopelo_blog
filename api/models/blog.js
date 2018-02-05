let mongoose=require("mongoose");
mongoose.Promise=global.Promise; 

let message=require("../information.json");

let db=mongoose.createConnection(message.database);
let blogSchema=require("../schemas/blog.js");
db.on("error",function(err){
	console.log(err);
});
db.on("open",function(){
	console.log("blog被打开");
});
let blogUser=db.model("blog",blogSchema);

module.exports=blogUser;