let Blog=require("../models/blog.js");
let checkCode=require("./checkId.js");
let backClient=require("./backClient.js");

let addNewBlog=function(num,title,type,content,res){
	checkCode(num).then(()=>{
		return newBlog(title,type,content);
	}).then((value)=>{
		backClient(res,value);
	}).catch((err)=>{
		let error={"error":"发生错误"};
		backClient(res,error);
	})
}

function newBlog(Title,Type,Content){
	let promise=new Promise((resolve,reject)=>{
		let kind=[];
		let nowDate=new Date();
		for(let n=0;n<Type.length;n++){
			if(Type[n].checked){
				kind.push(Type[n].name);
			}
		}
		let blog=new Blog({
			title:Title,
			type:kind,
			content:Content,
			date:nowDate.getFullYear()+"年"+(nowDate.getMonth()+1)+"月"+nowDate.getDate()+"日",
			comment:0
		});
		blog.save(function(){
			resolve({"success":"添加成功"});
		});
	});
	return promise;
}

module.exports=addNewBlog;