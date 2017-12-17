<template>
	<div>
		<div id="editorMenu"></div>
		<div id="editorElem">
			<p>{{id}}</p>
		</div>
		<div id="operation">
			<button v-on:click="submit">Submit</button>
			<button v-on:click="reset">Reset</button>
		</div>
	</div>
</template>

<script>
	import E from 'wangeditor'
	let editor=new E('#editorMenu','#editorElem');
	export default {
		props:["id"],
		mounted(){
		  editor.customConfig.onchange=(html)=>{
		    this.editorContent=html
		  }
		  editor.customConfig.uploadImgServer='http://localhost:3000/upload';
		  editor.create();
		},
		methods:{
			submit(){
				console.log(this.id);
			},
			reset(){
				editor.txt.clear()
			}
		}
	}
</script>

<style lang="scss" rel="text/css">
	#editorElem{
		min-height:300px;
	}
	#operation{
		margin-top:10px;
		text-align:center;
		button{
			width: 180px;
			height: 50px;
			border:2px solid #999;
			background-color:transparent;
			color:#999;
			cursor:pointer;
			font-size:18px;
			font-family:Arial;
			font-weight:bold;
			transition:0.5s;
		}
		button:hover{
			color:#fa9fa4;
			border:2px solid #fa9fa4;
		}
	}
</style>