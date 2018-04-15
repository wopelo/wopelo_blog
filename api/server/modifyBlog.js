let Blog=require("../models/blog.js");
let checkCode=require("./checkId.js");
let backClient=require("./backClient.js");

let modify = function(num,target,newTitle,newContent,res){
	checkCode(num).then(()=>{
		return blogModify(target,newTitle,newContent);
	}).then((value)=>{
		backClient(res,value);
	}).catch((err)=>{
		backClient(res,err);
	})
}

function blogModify(target,newTitle,newContent){
	let promise = new Promise((resolve,reject)=>{
		Blog.modifyBlog(target,newTitle,newContent,function(err,data){
			if(err){
				reject({"error":err});
			}else{
				resolve({"success":"修改成功"});
			}
		});
	});
	return promise;
}

module.exports=modify;