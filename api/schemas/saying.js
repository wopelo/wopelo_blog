let mongoose=require("mongoose");
mongoose.Promise=global.Promise;
let saying=new mongoose.Schema({
	saying:String
},{
	collection:"saying"
});

saying.statics={
	findSaying(callback){
		this.find({},callback);
	}
}

module.exports=saying;