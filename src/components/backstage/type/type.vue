<template>
	<div>
		<div id="typeList">
			<div class="type" v-for="item in type" v-on:click="showDelete(item.name)">
				<span class="name">{{item.name}}</span>
			</div>
			<div class="type icon" v-on:click="Add=true">
				<span class="iconfont icon-add1"></span>
			</div>
		</div>
		<div v-show="Delete || Add" id="typeMask"></div>
		<div v-show="Delete" class="typeBox">
			<div class="boxContent">
				<div class="contentTip">
					确认删除类型 {{target}}
				</div>
				<div class="contentBtn">
					<button v-on:click="deleteType()">YES</button>
					<button v-on:click="Delete=false">NO</button>
				</div>
			</div>
		</div>
		<div v-show="Add" class="typeBox">
			<div class="boxContent">
				<div class="contentTip">
					<input type="text" v-model="typeName" placeholder="新的类型">
				</div>
				<div class="contentBtn">
					<button v-on:click="addType()">添加</button>
					<button v-on:click="Add=false">放弃</button>
				</div>
			</div>
			<div id="Already" v-show="Already">
				{{waring}}
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				type:"",
				Delete:false,
				Add:false,
				target:"",
				typeName:"",
				Already:false,
				waring:"同名类型已经存在"
			}
		},
		created(){
		  this.$axios.get("/api/getType").then(res=>{
		  	console.log(res.data.type)
		    this.type=res.data.type;
		  });
		},
		methods:{
			showDelete(name){
				this.Delete=true;
				this.target=name;
			},
			deleteType(){
				this.$axios({
					method:"post",
					url:"/api/deleteType",
					data:{
						code:sessionStorage.getItem("code"),
						type:this.target
					}
				}).then((res)=>{
					console.log(res.data);
					if(res.data.success){
						for(let n=0;n<this.type.length;n++){
							if(this.type[n].name==this.target){
								this.type.splice(n,1);
								break;
							}
						}
					}
					this.Delete=false;
				});
			},
			addType(){
				if(this.typeName==""){
					this.waring="请填写名称";
				}else{
					this.$axios({
						method:"post",
						url:"/api/addType",
						data:{
							code:sessionStorage.getItem("code"),
							type:this.typeName
						}
					}).then((res)=>{
						console.log(res.data);
						if(res.data.success){
							this.type.push({name:this.typeName,number:0});
						}
						this.Add=false;
					});
				}
			}
		}
	}
</script>

<style lang="scss" rel="text/css">
	@import './type.scss';
</style>