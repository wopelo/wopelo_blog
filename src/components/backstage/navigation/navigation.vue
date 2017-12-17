<template>
	<div id="navigation">
		<div id="header">
			<div id="brand">
				<div id="font">WOPELO</div>
			</div>
			<div id="news">
				<div id="bell">
					<span class="icon-bell"></span>
				</div>
			</div>
		</div>
		<div id="list">
			<div class="option">
				<router-link to="/editor/saying">修改一句话</router-link>
			</div>
			<div class="option">
				<router-link to="/blog">博客总览</router-link>
			</div>
			<div class="option">
				<router-link to="/type">类别管理</router-link>
			</div>
			<div class="option">
				<router-link to="/manage">管理博客</router-link>
			</div>
			<div class="option">
				<router-link to="/comment">管理评论</router-link>
			</div>
			<div class="option">
				<router-link to="/editor/publish">发表博客</router-link>
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
	import VueRouter from 'vue-router'
	import editor from "../editor/editor.vue";
	import blog from "../blog/blog.vue";
	import type from "../type/type.vue";
	import manage from "../manage/manage.vue";
	import comment from "../comment/comment.vue";

	let router=new VueRouter({
		routes:[
			{
				path:"/editor/:id",
				component:editor,
				props:true
			},
			{
				path:"/blog",
				component:blog
			},
			{
				path:"/type",
				component:type
			},
			{
				path:"/manage",
				component:manage
			},
			{
				path:"/comment",
				component:comment
			}
		]
	})
	export default {
		data(){
			return {
				code:""
			}
		},
		router,
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