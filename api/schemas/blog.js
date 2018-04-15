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
	//获取全部博客
	getList(jump,callback){
		this.find({},{_id:1,title:1,type:1,date:1},callback).skip(jump).limit(10).sort({_id:-1});
	},
	//获取指定类型全部博客
	getTarget(jump,target,callback){
		this.find({type:target},{_id:1,title:1,type:1,date:1},callback).skip(jump).limit(10).sort({_id:-1});
	},
	//获取某篇博客
	getBlog(target,callback){
		this.find({_id:mongoose.mongo.ObjectId(target)},callback).limit(1);
	},
	//获取总篇数
	getTotal(callback){
		this.find({},{_id:1},callback).count();
	},
	//获得某类型总篇数
	getTargetAll(target,callback){
		this.find({type:target},{_id:1},callback).count();
	},
	//删除某篇博客
	removeTarget(target,callback){
		this.remove({_id:mongoose.mongo.ObjectId(target)},callback);
	},
	//修改博客
	modifyBlog(target,newTitle,newContent,callback){
		this.update({_id:mongoose.mongo.ObjectId(target)},{$set:{title:newTitle,content:newContent}},callback);
	}
}

module.exports=blogUser;