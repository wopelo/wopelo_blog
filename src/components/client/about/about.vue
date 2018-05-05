<template>
  <div id="aboutMe" v-bind:class="backImg">
  	<div v-html="article" id="articleContent"></div>
  </div>
</template>

<script>
	export default {
		data(){
			return {
				article:"",
				backImg: ''
			}
		},
		created(){
			this.$axios.get("/api/getAbout").then(res=>{
			  	this.article=res.data.article;
			});
			let pos = Math.floor(Math.random()*5);
			let str = 'abcde';
			this.backImg = 'bg_' + str[pos];
		}
	}
</script>

<style lang="scss" rel="text/css">
	@import '../../../common/css/mixin.scss';
	%title{
		margin:8px 0 16px 0;
		color:white;
	}

	#aboutMe{
		padding:50px 0;
		#articleContent{
			position:relative;
			max-width:600px;
			margin:0 auto;
			padding:0 5px;
			line-height:1.8em;
			font-family:'microsoft yahei';
			color:white;
			border-bottom:1px solid #e6e6e6;
			margin-bottom:30px;
			padding-bottom:30px;
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
			}
		}
	}
</style>