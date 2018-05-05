<template>
	<div>
		<router-view></router-view>
	</div>
</template>

<script>
	import auth from "../auth/auth.vue";

	export default {
		name:"backstage_index",
		components:{
			"v-auth":auth
		}
	}
</script>

<style lang="scss" rel="text/css">
	@import '../../../../static/fonts/iconfont.css';
</style>