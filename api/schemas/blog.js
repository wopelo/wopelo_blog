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
		this.find({},{_id:1,title:1,type:1,date:1},callback).skip(jump).limit(10).sort({_id:-1});
	},
	//获取某篇博客
	getBlog(target,callback){
		this.find({_id:mongoose.mongo.ObjectId(target)},callback).limit(1);
	},
	//获取总篇数
	getTotal(callback){
		this.find({},{_id:1},callback).count();
	}
}

module.exports=blogUser;