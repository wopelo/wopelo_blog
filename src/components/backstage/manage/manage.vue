<template>
	<div id="manage">
		<div id="manageContent">
			<div class="manage-list" v-for="item in list">
				<div class="manage-title">
					<span v-on:click="edBlog(item._id)">{{item.title}}</span>
				</div>
				<div class="manage-message">
					<span>{{item.date}} {{item.type}}</span>
					<span class="iconfont icon-delete manage-delete" v-on:click="manageDelete(item._id,item.type)"></span>
				</div>
			</div>
		</div>

		<div id="managePage">
			<a class="pageButton" v-on:click="previous()">Previous</a>
			<a class="pageButton" v-on:click="nextPage()">Next</a>
		</div>

		<div id="manage-curtain" v-show="alert"></div>

		<div id="manage-alert" v-show="alert">
			<div class="boxContent">
				<div class="contentTip">
					确认删除这篇文章？
				</div>
				<div class="contentBtn">
					<button v-on:click="deleteArticle()">YES</button>
					<button v-on:click="alert=false">NO</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				list:[],
				alert:false,
				targetId:"",
				targetType:"",
				now:1,
				last:false,
				num:10,

			}
		},
		created(){
			this.loadData();
		},
		methods:{
			manageDelete(id,type){
				this.alert = true;
				this.targetId = id;
				this.targetType = type;
			},
			deleteArticle(){
				console.log(this.targetId,this.targetType);
				this.$axios({
					method:"post",
					url:"/api/removeBlog",
					data:{
						code:sessionStorage.getItem("code"),
						target:this.targetId,
						type:this.targetType
					}
				}).then((res)=>{
					this.alert = false;
					if(res.data.success){
						this.loadData();
					}else{
						alert("删除失败");
					}
				})
			},
			previous(){
				if(this.now != 1){
					this.now--;
					this.$axios({
						method:"post",
						url:"/api/getList",
						data:{
							jump:this.now*this.num - this.num
						}
					}).then((res)=>{
						this.list=res.data;
					})
				}
			},
			nextPage(){
				if(this.now != this.last){
					this.now++;
					this.$axios({
						method:"post",
						url:"/api/getList",
						data:{
							jump:this.now*this.num - this.num
						}
					}).then((res)=>{
						this.list=res.data;
					})
				}
			},
			loadData(){
				Promise.all([
					this.$axios({
						method:"post",
						url:"/api/getList",
						data:{
							jump:this.now*this.num - this.num
						}
					}).then((res)=>{
						this.list=res.data;
					}),
					this.$axios({
						method:"post",
						url:"/api/getTotal"
					}).then((res)=>{
						this.last = Math.ceil(res.data.length/this.num);
					})
				])
			},
			edBlog(item){
				this.$router.push({name:'edBlog',query:{id:item}});
			}
		}
	}
</script>

<style lang="scss" rel="text/css">
	@import './manage.scss';
</style>