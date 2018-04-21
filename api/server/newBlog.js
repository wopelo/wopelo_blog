let Blog = require("../models/blog.js");
let User = require("../models/user.js");
let checkCode = require("./checkId.js");

let addNewBlog = function(num, title, type, content){
	return new Promise((resolve, reject) => {
		checkCode(num).then(() => {
			let arr = [];
			for(let n=0;n<type.length;n++){
				if(type[n].checked){
					arr.push(new Promise((resolve, reject)=>{
						User.addNum(type[n].name, function(err, data){
							if(err){
								reject({"error":err});
							}else{
								resolve();
							}
						});
					}));
				}
			}
			return Promise.all(arr);
		}).then(() => {
			return newBlog(title, type, content);
		}).then((value) => {
			resolve(value);
		}).catch((err) => {
			reject({"error":"发生错误"});
		});
	});
}

function newBlog(Title,Type,Content){
	let promise = new Promise((resolve,reject)=>{
		let kind = [];
		let nowDate = new Date();
		for(let n=0;n<Type.length;n++){
			if(Type[n].checked){
				kind.push(Type[n].name);
			}
		}
		let blog = new Blog({
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

module.exports = addNewBlog;