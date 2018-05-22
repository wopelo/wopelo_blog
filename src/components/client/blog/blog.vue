<template>
  <div v-bind:class="backImg">
  	<div v-bind:class="$style.bolgPage">
  		<div v-bind:class="$style.visualAngle">
  			<div v-bind:class="$style.angleContent">
  				<div class="angleContent-option angleContent-option-type">
  					<router-link to="/">Home</router-link>
  				</div>
  				<div class="angleContent-option angleContent-option-type">
  					<router-link :to="{name:'list',query:{type:undefined}}">List</router-link>
  				</div>
  				<div class="angleContent-option angleContent-option-type">
  					<router-link to="/overview">Type</router-link>
  				</div>
  			</div>
  		</div>
  		<div v-bind:class="$style.bolgPageContent">
  			<router-view></router-view>
  		</div>
  	</div>
  </div>
</template>

<script>
	export default {
		data(){
			return {
				backImg: ''
			}
		},
		created(){
			let pos = Math.floor(Math.random()*5);
			let str = 'abcde';
			this.backImg = 'bg_' + str[pos];
		}
	}
</script>

<style lang="scss" rel="text/css" src="../../../common/css/mixin.scss"></style>
<style lang="scss" rel="text/css" module>
	.bolgPage{
		min-height:100vh;
		overflow:auto;
		.visualAngle{
			position:relative;
			width:100%;
			height:50px;
			background:transparent;
			z-index:100;
			.angleContent{
				display:flex;
				max-width:1000px;
				height:100%;
				margin:0 auto;
				:global(.angleContent-option){
					padding:0 20px;
					color:#1a1a1a;
					line-height:50px;
				}
				:global(.angleContent-option-type){
					cursor:pointer;
					a{
						display:block;
						color:white;
						transition:0.5s;
						font-family:黑体;
						font-size:20px;
						font-style: italic;
						border-bottom: 3px solid transparent;
					}
					:global(.router-link-exact-active){
						color:#f33;
					}
					&:hover{
						a{
							color:black;
							border-bottom-color: black;
						}
					}
				}
			}
		}
		.bolgPageContent{
			padding:0 0 10px 0;
			max-width:1000px;
			margin:0 auto;
			z-index:1;
		}
	}
</style>