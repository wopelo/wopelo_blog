<template>
  <div id="bolgPage" v-bind:class="backImg">
  	<div id="visualAngle">
  		<div id="angleContent">
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
  	<div id="bolgPage-content">
  		<router-view></router-view>
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

<style lang="scss" rel="text/css">
	@import '../../../common/css/mixin.scss';
	#bolgPage{
		min-height:100vh;
		overflow:auto;
		#visualAngle{
			position:relative;
			width:100%;
			height:50px;
			background:transparent;
			z-index:100;
			#angleContent{
				display:flex;
				max-width:1000px;
				height:100%;
				margin:0 auto;
				.angleContent-option{
					padding:0 20px;
					color:#1a1a1a;
					line-height:50px;
				}
				.angleContent-option-type{
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
					.router-link-exact-active{
						color:#f33;
					}
				}
				.angleContent-option-type:hover{
					a{
						color:black;
						border-bottom-color: black;
					}
				}
			}
		}
		#bolgPage-content{
			padding:0 0 10px 0;
			max-width:1000px;
			margin:0 auto;
			z-index:1;
		}
	}
</style>