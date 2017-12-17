<template>
	<div id="wrapper">
		<background></background>
		<div id="content">
			<div id="name">
				<h1>WOPELO</h1>
			</div>
			<div id="saying">
				<h2>{{saying}}</h2>
			</div>
			<div id="navigation">
				<p>
					<span>
						<router-link to="/blog">Blog</router-link>
					</span>
				</p>
				<p>
					<span>
						<a href="http://blog.csdn.net/wopelo" target="_blank">CSDN</a>
					</span>
				</p>
				<p>
					<span>
						<a href="https://gitee.com/wopelo" target="_blank">码云</a>
					</span>
				</p>
				<p>
					<span>
						<router-link to="/about">关于wopelo</router-link>
					</span>
				</p>
				<p>
					<span>
						<a href="https://github.com/wopelo" target="_blank">Github</a>
					</span>
				</p>
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
		  this.$axios.get("/api/saying").then(res=>{
		    this.saying=res.data[0].saying;
		  });
		},
		components:{
			background
		}
	}
</script>

<style lang="scss" rel="text/css">
	@import './index.scss';
</style>