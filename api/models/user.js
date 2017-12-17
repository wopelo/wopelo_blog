let mongoose=require("mongoose");
mongoose.Promise=global.Promise; 

let message=require("../information.json");

let db=mongoose.createConnection(message.database);
let userSchema=require("../schemas/user.js");
db.on("error",function(err){
	console.log(err);
});
db.on("open",function(){
	console.log("user被打开");
});
let blogUser=db.model("saying",userSchema);

module.exports=blogUser;