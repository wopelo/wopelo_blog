<template>
	<div v-bind:class="$style.auth">
		<background></background>
		<div v-bind:class="$style.content">
			<div v-bind:class="$style.information">
				<input type="text" placeholder="用户名" v-model="name">
			</div>
			<div v-bind:class="$style.information">
				<input type="password" placeholder="密码" v-model="password">
			</div>
			<div v-bind:class="$style.information">
				<button v-on:click="checkAuth">登录</button>
			</div>
			<div v-bind:class="$style.authError" v-show="authError">
				身份验证失败
			</div>
		</div>
	</div>
</template>

<script>
	import background from "../../../common/background/background.vue";
	export default {
		data(){
			return {
				name:"",
				password:"",
				authError:false
			}
		},
		components:{
			background
		},
		methods:{
			checkAuth(){
				this.$axios({
					method:"post",
					url:"/api/haveUser",
					data:{
						name:this.name,
						password:this.password
					}
				}).then((res)=>{
					console.log(res.data);
					if(res.data.error){
						this.authError=true;
					}else{
						this.authError=false;
						sessionStorage.setItem("admin",true);
						sessionStorage.setItem("code",res.data.code);
						this.$router.push({path:'/backstage/index'});
					}
				})
			}
		}
	}
</script>

<style lang="scss" rel="text/css" module>
	.auth{
		div{
			position:relative;
			z-index:50;
		}
		.content{
			position:fixed;
			top:30%;
			margin:0 auto;
			right: 0;
	    	left: 0;
	    	width:300px;
			padding:20px;
			.information{
				margin-top:20px;
				input{
					width: 300px;
					height: 50px;
					padding-left: 10px;
					border: 1px #d9d9d9 solid;
					border-radius: 5px;
					font-size: 14px;
					box-sizing: border-box;
					background-color:transparent;
					color:white;
				}
				input:focus{
					border-color: #03a9f4;
					box-shadow: 0 0 15px #03a9f4;
				}
				button{
					width: 300px;
				    height: 50px;
				    line-height: 50px;
				    font-size: 16px;
				    border: 0;
				    background-color: #03a9f4;
				    color: #fff;
				    border-radius: 5px;
				    cursor:pointer;
				}
				button:hover{
					background-color: #0096da;
				}
			}
			.authError{
				font-size:16px;
				color:red;
				margin-top:10px;
				text-align:center;
			}
		}
	}
</style>