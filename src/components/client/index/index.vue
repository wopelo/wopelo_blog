<template>
	<div id="wrapper">
		<background></background>
		<div id="content">
			<div id="name">
				<h1>Hello, I'm Wopelo</h1>
			</div>
			<div id="saying">
				<h2>{{saying}}</h2>
			</div>
			<div id="navigation">
				<router-link to="/blog">
					<div class="index-router">
						<span class="iconfont icon-ego-blog"></span>
						<span class="index-message">
							Blog
						</span>
					</div>
				</router-link>
				<a href="http://blog.csdn.net/wopelo" target="_blank">
					<div  class="index-router">
						<span class="iconfont icon-CN_csdnnet"></span>
						<span class="index-message">
							CSDN
						</span>
					</div>
				</a>
				<a href="https://github.com/wopelo" target="_blank">
					<div  class="index-router">
						<span class="iconfont icon-github"></span>
						<span class="index-message">
							Github
						</span>
					</div>
				</a>
				<a href="https://www.zhihu.com/people/jiang-cheng-yuan-92-14/activities" target="_blank">
					<div  class="index-router">
						<span class="iconfont icon-zhihu"></span>
						<span class="index-message">
							知乎
						</span>
					</div>
				</a>
				<router-link to="/about">
					<div  class="index-router">
						<span class="iconfont icon-aboutme"></span>
						<span class="index-message">
							About me
						</span>
					</div>
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
	import background from "../../../common/background/background.vue";
	export default {
		data(){
			return {
				saying:""
			}
		},
		created(){
		 	this.cookieSaying();
		},
		components:{
			background
		},
		methods:{
			cookieSaying(){
				let haveCookie = document.cookie.indexOf('saying' + '=');
				function choose(str){
					let arr = str.split(/\@/g);
					let length = arr.length;
					let pos = Math.floor(Math.random()*length);
					return arr[pos];
				}
				if(haveCookie < 0){
					this.$axios.get("/api/saying").then(res=>{
						console.log(res.data)
					  	this.saying = choose(res.data.saying);
					  	let exdate = new Date()
					  	exdate.setDate(exdate.getDate() + 7)
					  	document.cookie = 'saying' + "=" + res.data.saying + ";expires="+exdate.toUTCString();
					});
				}else{
					this.saying = choose(document.cookie.split("=")[1]);
				}
			}
		}
	}
</script>

<style lang="scss" rel="text/css">
	@import './index.scss';
	@import '../../../../static/fonts/iconfont.css';
</style>