<template>
	<div id="blogList">
		<div class="listTerm" v-for="item in list" v-on:click="gotoDetail(item._id)">
			<div class="listTerm-title">
				{{item.title}}
			</div>
			<div class="listTerm-other">
				<span>{{item.date}} {{item.type}}</span>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				list:[]
			}
		},
		created(){
		  this.$axios({
		  	method:"post",
		  	url:"/api/getList",
		  	data:{
		  		jump:0
		  	}
		  }).then((res)=>{
		  	this.list=res.data.reverse();
		  	console.log(this.list)
		  })
		},
		methods:{
			gotoDetail(num){
				this.$router.push({name:'detail',query:{id:num}});
			}
		}
	}
</script>

<style lang="scss" rel="text/css">
	#blogList{
		.listTerm{
			max-width:1000px;
			padding:20px;
			margin-bottom:10px;
			border-bottom:1px solid #e6e6e6;
			cursor:pointer;
			.listTerm-title{
				color:#444;
				font-size:20px;
    			font-weight:400;
    			letter-spacing:1px;
    			line-height:1.5;
    			overflow:hidden;
    			text-overflow:ellipsis;
    			white-space:nowrap;
			}
			.listTerm-other{
				color:#999;
				font-size:13px;
				>div{
					margin-right:35px;
				}
			}
		}
	}
</style>