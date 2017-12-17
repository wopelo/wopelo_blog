let mongoose=require("mongoose");
mongoose.Promise=global.Promise;

let message=require("../information.json");

let db=mongoose.createConnection(message.database);
let sayingSchema=require("../schemas/saying.js");
db.on("error",function(err){
	console.log(err);
});
db.on("open",function(){
	console.log("saying被打开");
});
let saying=db.model("saying",sayingSchema);

module.exports=saying;