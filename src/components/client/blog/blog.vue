<template>
  <div id="bolgPage">
  	<div id="bolgPage-hidden"></div>
  	<div id="visualAngle">
  		<div id="angleContent">
  			<div class="angleContent-option angleContent-option-type">
  				<router-link to="/list">列表</router-link>
  			</div>
  			<div class="angleContent-option angleContent-option-type">
  				<router-link to="/overview">总览</router-link>
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
		name:"blog"
	}
</script>

<style lang="scss" rel="text/css">
	#bolgPage{
		background:#f6f6f6;
		min-height:100vh;
		overflow:auto;
		#bolgPage-hidden{
			position:fixed;
			top:0;
			width:100%;
			height:10px;
			background:#f6f6f6;
			z-index:100;
		}
		#visualAngle{
			position:fixed;
			top:10px;
			width:100%;
			height:50px;
			background:transparent;
			z-index:100;
			#angleContent{
				display:flex;
				max-width:1000px;
				height:100%;
				border-radius:2px;
				margin:0 auto;
				background:white;
				box-shadow:0 1px 3px rgba(26,26,26,.1);
				.angleContent-option{
					padding:0 20px;
					color:#1a1a1a;
					line-height:50px;
				}
				.angleContent-option-type{
					cursor:pointer;
					a{
						display:block;
						color:#1a1a1a;
						transition:0.5s;
						font-family:黑体;
						font-size:20px;
					}
					.router-link-exact-active{
						color:#f33;
					}
				}
				.angleContent-option-type:hover{
					a{
						color:#f33;
					}
				}
			}
		}
		#bolgPage-content{
			padding:70px 0 10px 0;
			max-width:1000px;
			margin:0 auto;
			z-index:1;
		}
	}
</style>