<template>
	<div id="blogList">
		<div class="listTerm" v-for="item in list" v-on:click="gotoDetail(item._id)">
			<div class="listTerm-title">
				{{item.title}}
			</div>
			<div class="listTerm-content" v-html="item.content"></div>
			<div class="listTerm-other">
				<div class="listTerm-other-date">
					{{item.date}}
				</div>
				<div class="listTerm-other-comment">
					评论:{{item.comment}}条
				</div>
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
		  	this.list=res.data
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
			padding:16px 20px;
			margin-bottom:10px;
			background-color:white;
			border-radius:2px;
			box-shadow:0 1px 3px rgba(26,26,26,.1);
			cursor:pointer;
			.listTerm-title{
				font-size:18px;
    			font-weight:600;
    			margin-bottom:10px;
			}
			.listTerm-content{
				max-height:72px;
				overflow:hidden;
				white-space:nowrap;
				text-overflow:ellipsis;
			}
			.listTerm-other{
				display:flex;
				justify-content:flex-end;
				color:#999;
				font-size:12px;
				>div{
					margin:0 5px;
				}
			}
		}
	}
</style>