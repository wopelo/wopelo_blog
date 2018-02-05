let mongoose=require("mongoose");
mongoose.Promise=global.Promise;
let blogUser=new mongoose.Schema({
	title:String,
	type:Array,
	content:String,
	date:String,
	comment:Number
},{
	collection:"blog"
});

blogUser.statics={
	
}

module.exports=blogUser;