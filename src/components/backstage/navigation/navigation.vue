<template>
	<div id="navigation">
		<div id="header">
			<div id="brand">
				<div id="font">WOPELO</div>
			</div>
		</div>
		<div id="list">
			<div class="option">
				<router-link to="/backstage/saying">修改一句话</router-link>
			</div>
			<div class="option">
				<router-link to="/backstage/blog">博客总览</router-link>
			</div>
			<div class="option">
				<router-link to="/backstage/type">类别管理</router-link>
			</div>
			<div class="option">
				<router-link to="/backstage/manage">管理博客</router-link>
			</div>
			<div class="option">
				<router-link to="/backstage/comment">管理评论</router-link>
			</div>
			<div class="option">
				<router-link to="/backstage/editor">发表博客</router-link>
			</div>
			<div class="option">
				<router-link to="/backstage/about">关于我</router-link>
			</div>
			<div class="option" id="top">
				<a v-on:click="backTop">返回顶部</a>
			</div>
		</div>
		<div id="edit">
			<div id="view">
				<router-view></router-view>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				code:""
			}
		},
		created(){
			//身份验证
		  	let admin=sessionStorage.getItem("admin");
		  	let code=sessionStorage.getItem("code");
			if(!admin||!code){
				this.$router.push({path:'/backstage/'});
			}else{
				this.checkCode(code);
			}
		},
		methods:{
			checkCode(num){
				this.$axios({
					method:"post",
					url:"/api/check",
					data:{
						code:num
					}
				}).then((res)=>{
					console.log(res.data);
					if(res.data.error){
						this.$router.push({path:'/backstage/'});
					}else{
						console.log("code验证成功");
						this.code=num;
					}
				})
			},
			backTop(){
				document.documentElement.scrollTop=0;
			}
		}
	}
</script>

<style lang="scss" rel="text/css">
	@import './navigation.scss';
</style>