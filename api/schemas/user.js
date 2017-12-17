let mongoose=require("mongoose");
mongoose.Promise=global.Promise;
let blogUser=new mongoose.Schema({
	name:String,
	password:String,
	code:String
},{
	collection:"user"
});

blogUser.statics={
	Verification(userName,userWord,callback){
		this.find({name:userName,password:userWord},callback).limit(1);
	},
	makeCode(userName,num,callback){
		this.update({name:userName},{$set:{code:num}},callback);
	},
	checkCode(num,callback){
		this.find({code:num},callback).limit(1);
	}
}

module.exports=blogUser;