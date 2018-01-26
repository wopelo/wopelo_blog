let mongoose=require("mongoose");
mongoose.Promise=global.Promise;
let blogUser=new mongoose.Schema({
	name:String,
	password:String,
	code:String,
	saying:String,
	type:Array
},{
	collection:"user"
});

blogUser.statics={
	//身份验证
	Verification(userName,userWord,callback){
		this.find({name:userName,password:userWord},callback).limit(1);
	},
	//产生验证码
	makeCode(userName,num,callback){
		this.update({name:userName},{$set:{code:num}},callback);
	},
	//检查验证码
	checkCode(num,callback){
		this.find({code:num},callback).limit(1);
	},
	//获取saying
	findSaying(callback){
		this.find({},{"saying":1},callback).limit(1);
	},
	//修改saying
	modify(num,newSaying,callback){
		this.update({code:num},{$set:{saying:newSaying}},callback);
	},
	//获取type
	getType(callback){
		this.find({},{"type":1},callback).limit(1);
	},
	//删除类型
	rewriteType(target,callback){
		this.update({},{$pull:{type:{name:target}}},callback);
	},
	//查找指定类型
	findTarget(target,callback){
		this.find({"type.name":target},callback).limit(1);
	},
	//添加类型
	addType(newType,callback){
		this.update({},{$push:{type:{name:newType,number:0}}},callback)
	}
}

module.exports=blogUser;