<template>
  <div v-bind:class="backImg">
	  <div v-bind:class="$style.aboutMe">
	  	<div v-bind:class="$style.aboutBack">
	  		<router-link to="/">Home</router-link>
	  	</div>
	  	<div v-html="article" v-bind:class="$style.articleContent"></div>
	  </div>
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

<style lang="scss" rel="text/css" src="../../../common/css/mixin.scss"></style>
<style lang="scss" rel="text/css" module>
	%title{
		margin:8px 0 16px 0;
		color:white;
	}

	.aboutMe{
		padding:0 0 50px 0;
		.aboutBack{
			position:relative;
			margin:0 auto 20px auto;
			max-width:600px;
			height: 50px;
			line-height: 50px;
		    font-family: 黑体;
		    font-size: 20px;
		    font-style: italic;
		    cursor: pointer;
		    a{
		    	display: inline-block;
		    	color: white;
		    	border-bottom: 3px solid transparent;
		    	transition: 0.5s;
		    }
		    a:hover{
		    	color: black;
		    	border-bottom: 3px solid black;
		    }
		}
		.articleContent{
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