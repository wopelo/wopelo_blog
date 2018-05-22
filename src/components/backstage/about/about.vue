<template>
	<div>
		<div id="title">
			<div id="text">
				<span v-bind:class="$style.aboutTilte">关于我</span>
			</div>
			<div id="operation">
				<button v-on:click="submit()">提&ensp;&ensp;交</button>
				<button v-on:click="reset()">重&ensp;&ensp;置</button>
			</div>
		</div>
		<div id="aboutMenu"></div>
		<div id="aboutElem" v-bind:class="$style.aboutElem"></div>
	</div>
</template>

<script>
	import E from 'wangeditor'
	let editor=new E('#aboutMenu','#aboutElem');
	export default {
		data(){
			return {
				aboutMe:"",
				oldAboutMe:""
			}
		},
		created(){
			this.$axios.get("/api/getAbout").then(res=>{
			  	this.aboutMe=res.data.article;
			  	this.oldAboutMe=res.data.article;
			  	editor.txt.html(this.aboutMe);
			});
		},
		mounted(){
		  	editor.customConfig.onchange=(html)=>{
		  		this.editorContent=html
		  	}
		  	editor.create();
		},
		methods:{
			submit(){
				this.$axios({
					method:"post",
					url:"/api/modifyAbout",
					data:{
						code:sessionStorage.getItem("code"),
						newArticle:editor.txt.html()
					}
				}).then((res)=>{
					console.log(res.data);
					if(res.data.success){
						alert("修改成功");
					}else{
						alert("修改失败");
					}
				})
			},
			reset(){
				editor.txt.html(this.oldAboutMe);
			}
		}
	}
</script>

<style lang="scss" rel="text/css" src="../../../common/css/title.scss"></style>
<!-- 博客编辑器以及文章的样式 -->
<style lang="scss" rel="text/css" src="../../../common/css/file.scss"></style>
<style lang="scss" rel="text/css" src="./backAbout.scss" module></style>