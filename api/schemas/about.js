let mongoose=require("mongoose");
mongoose.Promise=global.Promise;
let blogUser=new mongoose.Schema({
	article:String
},{
	collection:"about"
});

blogUser.statics={
	//获取个人相关
	getAbout(callback){
		this.find({},callback).limit(1);
	},
	//修改个人相关
	modifyAbout(newArticle,callback){
		this.update({},{$set:{article:newArticle}},callback);
	}
}

module.exports=blogUser;