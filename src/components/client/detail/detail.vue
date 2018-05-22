<template>
	<div v-bind:class="$style.detailPage">
		<div v-bind:class="$style.detailTitle">
			{{article.title}}
		</div>
		<div v-bind:class="$style.detailTpye">
			<span>标签：</span>
			<span v-for="item in article.type">
				{{item}}&ensp;
			</span>
		</div>
		<div v-bind:class="$style.detailTime">
			<span>{{article.date}}</span>
			<span>评论({{article.comment}})</span>
		</div>
		<div v-bind:class="$style.detailContent" v-html="article.content"></div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				id:"",
				article:""
			}
		},
		created(){
		  this.id=this.$route.query.id;
		  this.$axios({
		  	method:"post",
		  	url:"/api/getBlog",
		  	data:{
		  		target:this.id
		  	}
		  }).then((res)=>{
		  	this.article=res.data[0];
		  })
		}
	}
</script>

<style lang="scss" rel="text/css" module>
	%title{
		margin:8px 0 16px 0;
		color:white;
	}
	.detailPage{
		padding:0 10px;
		.detailTitle{
			font-size:2em;
			color:white;
			margin:8px 0 8px 0;
		}
		.detailTpye,.detailTime{
			display:inline-block;
			margin-bottom:5px;
			color:#c88326;
			font-size:12px;
		}
		.detailContent{
			line-height:1.8;
			color:white;
			margin-top:15px;
			margin-bottom:50px;
			b{
				font-weight:bold;
			}
			h1{
				font-size:2em;
				@extend %title;
			}
			h2{
				font-size:1.5em;
				@extend %title;
			}
			h3{
				font-size:1.17em;
				@extend %title;
			}
			h4{
				font-size:1em;
				@extend %title;
			}
			h5{
				font-size:0.83em;
				@extend %title;
			}
			a{
				color:#f66;
			}
			img{
			    max-width:600px;
			    height:auto;
			    box-shadow:0 0 5px rgb(51,51,51)
			}
			pre{
				font-size: 16px;
				font-style: italic;
			}
		}
	}
</style>