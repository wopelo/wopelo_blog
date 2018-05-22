<template>
	<div id="edBlog">
		<div id="title">
			<div id="text">
				<input type="text" placeholder="标题" v-model="title">
			</div>
			<div id="operation">
				<button v-on:click="submit()">保存修改</button>
				<button v-on:click="reset()">重&ensp;&ensp;置</button>
			</div>
		</div>
		<div id="editorMenu"></div>
		<div id="editorElem">
			<p>博客内容</p>
		</div>
	</div>
</template>

<script>
	import E from 'wangeditor'
	let editor=new E('#editorMenu','#editorElem');
	export default {
		data(){
			return {
				id:"",
				oldTitle:"",
				oldContent:"",
				title:"",
				content:""
			}
		},
		created(){
			this.id=this.$route.query.id;
			this.$axios({
				method:"post",
				url:"/api/getBlog",
				data:{
					target:this.id
				}
			}).then((res)=>{
				this.oldTitle = res.data[0].title;
				this.oldContent = res.data[0].content;
				this.title = res.data[0].title;
				this.content = res.data[0].content;
				editor.txt.html(this.content);
			})
		},
		mounted(){
		  editor.customConfig.onchange=(html)=>{
		    this.editorContent=html
		  }
		  editor.create();
		},
		methods:{
			submit(){
				if(this.title==""){
					alert("请填写标题");
				}else{
					this.$axios({
						method:"post",
						url:"/api/modifyBlog",
						data:{
							code:sessionStorage.getItem("code"),
							target:this.id,
							newTitle:this.title,
							newContent:editor.txt.html()
						}
					}).then((res)=>{
						if(res.data.success){
							alert("修改成功");
						}else{
							alert("修改失败");
						}
					})
				}
			},
			reset(){
				this.title = this.oldTitle;
				editor.txt.html(this.oldContent);
			}
		}
	}
</script>

<style lang="scss" rel="text/css" src="../../../common/css/title.scss"></style>
<!-- 博客编辑器以及文章的样式 -->
<style lang="scss" rel="text/css" src="../../../common/css/file.scss"></style>
<style lang="scss" rel="text/css" src="./edBlog.scss"></style>