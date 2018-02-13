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
	//获取列表
	getList(jump,callback){
		this.find({},callback).skip(jump).limit(10);
	},
	//获取某篇博客
	getBlog(target,callback){
		this.find({_id:mongoose.mongo.ObjectId(target)},callback).limit(1);
	}
}

module.exports=blogUser;