<template>
	<div>
		<div id="title">
			<div id="text">
				<input type="text" placeholder="标题" v-model="title">
			</div>
			<div id="operation">
				<button v-on:click="submit">提&ensp;&ensp;交</button>
				<button v-on:click="reset">重&ensp;&ensp;置</button>
				<button>保存为草稿</button>
			</div>
		</div>
		<div id="editorMenu"></div>
		<div id="editorElem">
			<p>博客内容</p>
		</div>
		<div v-show="showType" id="typeMask"></div>
		<div v-show="showType" id="chooseType">
			<div id="editorTypeList">
				<div class="type" v-for="item in typeList">
					<input type="checkbox" name="typeItem" v-bind:value="item.name" v-bind:id="item.name" v-on:click="itemChecked(item)">
					<label v-bind:for="item.name">{{item.name}}</label>
				</div>
			</div>
			<div id="submitButton">
				<div v-if="! sending">
					<button v-on:click="editorSubmitGo()">发&ensp;&ensp;表</button>
					<button v-on:click="submitGiveup()">放&ensp;&ensp;弃</button>
				</div>
				<div v-if="sending">
					<button disabled="disabled">发&ensp;&ensp;表</button>
					<button disabled="disabled">放&ensp;&ensp;弃</button>
				</div>
			</div>
			<div id="editorSendingState">
				{{sendState}}
			</div>
		</div>
	</div>
</template>

<script>
	import E from 'wangeditor'
	let editor=new E('#editorMenu','#editorElem');
	export default {
		data(){
			return {
				title:"",
				showType:false,
				typeList:"",
				checkedNum:0,
				sending:false,
				sendState:""
			}
		},
		mounted(){
		  editor.customConfig.onchange=(html)=>{
		    this.editorContent=html
		  }
		  // editor.customConfig.uploadImgServer='http://localhost:3000/upload';
		  editor.create();
		},
		methods:{
			submit(){
				if(this.title==""){
					alert("请填写标题");
				}else{
					this.showType=true;
					this.$axios.get("/api/getType").then(res=>{
						console.log(res.data.type)
					  	this.typeList=res.data.type;
					});
				}
			},
			reset(){
				editor.txt.clear();
				this.title="";
			},
			submitGiveup(){
				this.showType=false;
			},
			itemChecked(item){
				if(typeof item.checked=="undefined"){
					//向item中添加字段
					this.$set(item,"checked",true);
					this.checkedNum++;
				}else{
					item.checked=!item.checked;
					this.checkedNum--;
				}
			},
			editorSubmitGo(){
				console.log(this.typeList);
				if(this.checkedNum==0){
					alert("请选择类型");
				}else{
					this.sendState="正在发送，请稍等";
					this.sending=true;
					this.$axios({
						method:"post",
						url:"/api/newBlog",
						data:{
							code:sessionStorage.getItem("code"),
							title:this.title,
							type:this.typeList,
							content:editor.txt.html()
						}
					}).then((res)=>{
						console.log(res.data);
						if(res.data.success){
							this.sendState="发送成功";
							this.$router.push("/backstage/manage");
						}else{
							this.sendState="发送失败";
							this.sending=false;
						}
					})
				}
			}
		}
	}
</script>

<style lang="scss" rel="text/css">
	@import '../../../common/css/title.scss';
	// 博客编辑器以及文章的样式
	@import '../../../common/css/file.scss';
	@import './editor.scss';
</style>