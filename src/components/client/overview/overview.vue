<template>
	<div v-bind:class="$style.overview">
		<div
      v-bind:class="$style.viewList"
      v-for="(item, index) in type"
      :key="index"
      v-on:click="typeList(item.name)">
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
		methods:{
			typeList(name){
				this.$router.push({name:'list',query:{type:name}});
			}
		}
	}
</script>

<style lang="scss" rel="text/css" module>
	.overview{
		line-height:1.8;
		.viewList{
			padding:20px;
			margin-bottom:10px;
			border-bottom:1px solid #e6e6e6;
			color:white;
			font-size:16px;
			font-weight:400;
			cursor: pointer;
			transition: 0.5s;
		}
		.viewList:hover{
			color: #f33;
		}
	}
</style>