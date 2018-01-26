<template>
	<div>
		<div id="title">
			<div id="text">
				<input type="text" placeholder="标题" v-model="title">
			</div>
			<div id="operation">
				<button v-on:click="submit">Submit</button>
				<button v-on:click="reset">Reset</button>
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
				title:""
			}
		},
		mounted(){
		  editor.customConfig.onchange=(html)=>{
		    this.editorContent=html
		  }
		  editor.customConfig.uploadImgServer='http://localhost:3000/upload';
		  editor.create();
		},
		methods:{
			submit(){
				console.log(editor.txt.html());
				// this.$axios({
				// 	method:"post",
				// 	url:"/api/modifySaying",
				// 	data:{
				// 		num:sessionStorage.getItem("code"),
				// 		newSaying:editor.txt.html()
				// 	}
				// }).then((res)=>{
				// 	console.log(res.data);
				// })
			},
			reset(){
				editor.txt.clear();
				this.title="";
			}
		}
	}
</script>

<style lang="scss" rel="text/css">
	@import '../../../common/css/title.scss';
	#editorElem{
		min-height:300px;
		padding:10px;
	}
</style>