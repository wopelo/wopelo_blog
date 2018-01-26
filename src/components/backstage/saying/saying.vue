<template>
	<div>
		<div id="title">
			<div id="text">
				<input type="text" placeholder="标题" v-model="title">
			</div>
			<div id="operation">
				<button v-on:click="submit">Submit</button>
				<button v-on:click="reset">Reset</button>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				title:""
			}
		},
		created(){
		  this.$axios.get("/api/saying").then(res=>{
		  	console.log(res.data)
		    this.title=res.data.saying;
		  });
		},
		methods:{
			submit(){
				console.log(this.title);
				this.$axios({
					method:"post",
					url:"/api/modifySaying",
					data:{
						num:sessionStorage.getItem("code"),
						newSaying:this.title
					}
				}).then((res)=>{
					console.log(res.data);
					if(res.data.success){
						alert("修改成功");
					}else{
						alert("修改失败");
					}
				})
			},
			reset(){
				this.title="";
			}
		}
	}
</script>

<style lang="scss" rel="text/css">
	@import '../../../common/css/title.scss';
</style>