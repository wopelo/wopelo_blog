<template>
	<div id="manage">
		<div class="manage-list" v-for="item in list">
			<div class="manage-title">
				{{item.title}}
			</div>
			<div class="manage-message">
				<span>{{item.date}} {{item.type}}</span>
				<span class="icon-delete manage-delete" v-on:click="manageDelete(item._id)"></span>
			</div>
		</div>

		<div id="manage-curtain" v-show="alert"></div>

		<div id="manage-alert" v-show="alert">
			<div class="boxTop">
				<span class="icon-delete" v-on:click="alert=false"></span>
			</div>
			<div class="boxContent">
				<div class="contentTip">
					确认删除这篇文章？
				</div>
				<div class="contentBtn">
					<button v-on:click="deleteArticle()">YES</button>
					<button v-on:click="alert=false">NO</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				list:[],
				alert:false,
				targetId:""
			}
		},
		created(){
		  this.$axios({
		  	method:"post",
		  	url:"/api/getList",
		  	data:{
		  		jump:0
		  	}
		  }).then((res)=>{
		  	this.list=res.data.reverse();
		  	console.log(this.list)
		  })
		},
		methods:{
			manageDelete(id){
				this.alert=true;
				this.targetId=id;
			},
			deleteArticle(){
				console.log(this.targetId);
			}
		}
	}
</script>

<style lang="scss" rel="text/css">
	#manage{
		.manage-list{
			padding-bottom:5px;
			border-bottom:1px solid #e6e6e6;
			line-height:1.5;
			.manage-title{
				color:#444;
				font-size:20px;
    			font-weight:400;
    			letter-spacing:1px;
			}
			.manage-message{
				color:#999;
				font-size:13px;
				>span{;
					vertical-align:middle;
				}
				.manage-delete{
					font-size:25px;
					cursor:pointer;
					float:right;
					transition:0.5s;
				}
				.manage-delete:hover{
					color:red;
				}
			}
		}
		#manage-curtain{
	    	position:fixed;
	        top:0;
	        left:0;
	        width:100%;
	        height:100%;
	        background:rgba(0,0,0,0.5);
	        z-index:200;
		}
		#manage-alert{
			position:fixed;
		    top:25%;
		    left:0;
		    right:0;
		    margin:0 auto;
		    padding:10px;
		    width:535px;
		    height:auto;
		    z-index:201;
		    background-color:white;
	        .boxTop{
	        	text-align:right;
	        	.icon-delete{
	        		font-size:30px;
	        		cursor:pointer;
	        	}
	        }
	        .boxContent{
	        	padding:10px 50px 60px 50px;
	        	.contentTip{
	        		font-size:18px;
	    		    font-weight:200;
	    		    text-align:center;
	    		    min-height:50px;
	    		    input{
	    		    	width:80%;
	    		    	padding:5px;
	    		    	border:1px #d9d9d9 solid;
	    		    	border-radius:5px;
	    		    	text-align:center;
	    		    }
	    		    input:focus{
	    		    	border-color:#03a9f4;
	    		    	box-shadow:0 0 15px #03a9f4;
	    		    }
	        	}
	        	.contentBtn{
	        		text-align:center;
	        		button{
	        			width:45%;
	    			    height:45px;
	    			    border:2px solid #999;
	    			    border-radius:5px;
	    			    background-color:transparent;
	    			    color:#999;
	        			transition:0.5s;
	        			cursor:pointer;
	        			font-size:16px;
	        			font-family:Arial;
	        			font-weight:bold;
	        		}
	        		button:hover{
	        			color:#fa9fa4;
	        			border:2px solid #fa9fa4;
	        		}
	        	}
	        }
		}
	}
</style>