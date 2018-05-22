<template>
	<div v-bind:class="$style.manage">
		<div v-bind:class="$style.manageContent">
			<div v-bind:class="$style.manageList" v-for="item in list">
				<div v-bind:class="$style.manageTitle">
					<span v-on:click="edBlog(item._id)">{{item.title}}</span>
				</div>
				<div v-bind:class="$style.manageMessage">
					<span>{{item.date}} {{item.type}}</span>
					<span class="iconfont icon-delete" v-bind:class="$style.manageDelete" v-on:click="manageDelete(item._id,item.type)"></span>
				</div>
			</div>
		</div>

		<div v-bind:class="$style.managePage">
			<a v-bind:class="$style.pageButton" v-on:click="previous()">Previous</a>
			<a v-bind:class="$style.pageButton" v-on:click="nextPage()">Next</a>
		</div>

		<div v-bind:class="$style.manageCurtain" v-show="alert"></div>

		<div v-bind:class="$style.manageAlert" v-show="alert">
			<div v-bind:class="$style.boxContent">
				<div v-bind:class="$style.contentTip">
					确认删除这篇文章？
				</div>
				<div v-bind:class="$style.contentBtn">
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

<style lang="scss" rel="text/css" src="./manage.scss" module></style>