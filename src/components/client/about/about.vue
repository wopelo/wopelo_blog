<template>
  <div id="aboutMe">
  	<div v-html="article" id="articleContent"></div>
  </div>
</template>

<script>
	export default {
		data(){
			return {
				article:""
			}
		},
		created(){
			this.$axios.get("/api/getAbout").then(res=>{
			  	this.article=res.data.article;
			});
		}
	}
</script>

<style lang="scss" rel="text/css">
	//文章样式
	@import '../../../common/css/page.scss';
</style>