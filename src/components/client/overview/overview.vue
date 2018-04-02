<template>
	<div id="overview">
		<div class="viewList" v-for="item in type">
			{{item.name}} : {{item.number}}篇
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				type:""
			}
		},
		created(){
		  this.$axios.get("/api/getType").then(res=>{
		  	console.log(res.data.type)
		    this.type=res.data.type;
		  });
		},
	}
</script>

<style lang="scss" rel="text/css">
	#overview{
		line-height:1.8;
		.viewList{
			padding:20px;
			margin-bottom:10px;
			border-bottom:1px solid #e6e6e6;
			color:#444;
			font-size:16px;
			font-weight:400;
		}
	}
</style>