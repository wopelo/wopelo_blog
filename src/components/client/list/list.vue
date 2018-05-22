<template>
	<div v-bind:class="$style.blogList">
		<div v-bind:class="$style.listContent">
			<div v-bind:class="$style.listTerm" v-for="item in list" v-on:click="gotoDetail(item._id)">
				<div v-bind:class="$style.listTermTitle">
					{{item.title}}
				</div>
				<div v-bind:class="$style.listTermOther">
					<span>{{item.date}} {{item.type}}</span>
				</div>
			</div>
		</div>

		<div v-bind:class="$style.pageControl">
			<a v-bind:class="$style.pageButton" v-on:click="previous()">{{Previous}}</a>
			<a v-bind:class="$style.pageButton" v-on:click="nextPage()">{{Next}}</a>
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				list:[],
				now:1,
				last:0,
				num:10,
				type:this.$route.query.type,
				Previous:"Previous",
				Next:"Next"
			}
		},
		created(){
			if(this.type == undefined){
				this.getBlog("/api/getList","/api/getTotal")
			}else{
				this.getBlog("/api/getTarget","/api/getTargetAll")
			}
		},
		beforeRouteUpdate(to, from, next){
			next();
			this.type = this.$route.query.type;
			this.now = 1;
			this.getBlog("/api/getList","/api/getTotal");
		},
		methods:{
			getBlog(listUrl,numUrl){
				Promise.all([
					this.$axios({
						method:"post",
						url:listUrl,
						data:{
							jump:this.now*this.num - this.num,
							type:this.type
						}
					}).then((res)=>{
						this.list = res.data;
					}),
					this.$axios({
						method:"post",
						url:numUrl,
						data:{
							type:this.type
						}
					}).then((res)=>{
						this.last = Math.ceil(res.data.length/this.num);
						this.checkControl();
					})
				])
			},
			gotoDetail(num){
				this.$router.push({name:'detail',query:{id:num}});
			},
			previous(){
				let targetUrl = "";
				if(this.type == undefined){
					targetUrl = "/api/getList";
				}else{
					targetUrl = "/api/getTarget";
				}
				if(this.now != 1){
					this.now--;
					this.checkControl();
					this.$axios({
						method:"post",
						url:targetUrl,
						data:{
							jump:this.now*this.num - this.num,
							type:this.type
						}
					}).then((res)=>{
						this.list=res.data;
					})
				}
			},
			nextPage(){
				let targetUrl = "";
				if(this.type == undefined){
					targetUrl = "/api/getList";
				}else{
					targetUrl = "/api/getTarget";
				}
				if(this.now != this.last){
					this.now++;
					this.checkControl();
					this.$axios({
						method:"post",
						url:targetUrl,
						data:{
							jump:this.now*this.num - this.num,
							type:this.type
						}
					}).then((res)=>{
						this.list=res.data;
					})
				}
			},
			checkControl(){
				if(this.now == 1){
					this.Previous = "";
				}else{
					this.Previous = "Previous";
				}
				if(this.now == this.last){
					this.Next = "";
				}else{
					this.Next = "Next";
				}
			}
		}
	}
</script>

<style lang="scss" rel="text/css" module>
	.blogList{
		.listContent{
			min-height: 90vh;
			box-sizing: border-box;
			padding-bottom: 40px;
		}
		.listTerm{
			max-width:1000px;
			padding:20px;
			border-bottom:1px solid #e6e6e6;
			cursor:pointer;
			.listTermTitle{
				color:white;
				font-size:18px;
    			font-weight:400;
    			letter-spacing:1px;
    			line-height:1.5;
    			overflow:hidden;
    			text-overflow:ellipsis;
    			white-space:nowrap;
    			transition: 0.5s;
			}
			.listTermOther{
				color:#999;
				font-size:13px;
				>div{
					margin-right:35px;
				}
			}
		}
		.listTerm:hover .listTermTitle{
			color: #f33;
		}
		.pageControl{
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 40px;
			margin-top: -40px;
			.pageButton{
				padding: 5px 10px;
				cursor: pointer;
				font-size: 15px;
				font-style: italic;
				color: white;
				border-bottom: 3px solid transparent;
				transition: 0.5s;
			}
			.pageButton:hover{
				color: black;
				border-bottom-color: black;
			}
		}
	}
</style>