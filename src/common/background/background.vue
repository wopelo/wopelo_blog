<template>
	<div id="top-image" v-bind:class="backImg"></div>
</template>

<script>
	import $ from "../../../static/js/jquery-2.1.1.min.js";

	export default {
		data(){
			return {
				backImg: ''
			}
		},
		created(){
			let str = 'abcde';
			// 图片预加载
			let imgLoad = sessionStorage.getItem("imgLoad");
			// 如果没有进行过预加载
			if(!imgLoad){
				let imgSrc = new Array(5);
				for(let i =0; i< str.length ;i++) {
		            imgSrc[i] = new Image();
		            imgSrc[i].src = '/static/image/bg_' + str[i] + '.jpg';
		        }
		        sessionStorage.setItem("imgLoad","true");
			}
			// 选择背景
			let pos = Math.floor(Math.random()*5);
			this.backImg = 'bg_' + str[pos];
		},
		mounted(){
			 background()
		}
	}

	function background(){
		(function ($) {
		  $.fn.circleMagic = function (options) {

		    var width, height, canvas, ctx, animateHeader = true;
		    var circles = [];

		    var settings = $.extend({
		      color: 'rgba(255,255,255,.5)',
		      radius: 10,
		      density: 0.3,
		      clearOffset: 0.2
		    }, options);

		    //  Main

		    var container = this['0'];
		    initContainer();
		    addListeners();

		    function initContainer() {
		      width = container.offsetWidth;
		      height = container.offsetHeight;

		      //  create canvas element

		      initCanvas();
		      canvas = document.getElementById('canvas');
		      canvas.width = width;
		      canvas.height = height;
		      ctx = canvas.getContext('2d');

		      //  create circles
		      for (var x = 0; x < width * settings.density; x++) {
		        var c = new Circle();
		        circles.push(c);
		      }
		      animate();
		    }

		    //Init canvas element
		    function initCanvas() {
		      var canvasElement = document.createElement('canvas');
		      canvasElement.id = 'canvas';
		      container.appendChild(canvasElement);
		      canvasElement.parentElement.style.overflow = 'hidden';

		    }

		    // Event handling
		    function addListeners() {
		      window.addEventListener('scroll', scrollCheck, false);
		      window.addEventListener('resize', resize, false);
		    }

		    function scrollCheck() {
		      if (document.body.scrollTop > height) {
		        animateHeader = false;
		      }
		      else {
		        animateHeader = true;
		      }
		    }

		    function resize() {
		      width = container.clientWidth;
		      height = container.clientHeight;
		      container.height = height + 'px';
		      canvas.width = width;
		      canvas.height = height;
		    }

		    function animate() {
		      if (animateHeader) {
		        ctx.clearRect(0, 0, width, height);
		        for (var i in circles) {
		          circles[i].draw();
		        }
		      }
		      requestAnimationFrame(animate);
		    }

		    function randomColor() {
		      var r = Math.floor(Math.random() * 255);
		      var g = Math.floor(Math.random() * 255);
		      var b = Math.floor(Math.random() * 255);
		      var alpha = Math.random().toPrecision(2);
		      return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')';
		    }

		    //  Canvas manipulation

		    function Circle() {
		      var that = this;

		      // constructor
		      (function () {
		        that.pos = {};
		        init();
		      })();

		      function init() {
		        that.pos.x = Math.random() * width;
		        that.pos.y = height + Math.random() * 100;
		        that.alpha = 0.1 + Math.random() * settings.clearOffset;
		        that.scale = 0.1 + Math.random() * 0.3;
		        that.speed = Math.random();
		        if (settings.color === 'random') {
		          that.color = randomColor();
		        }
		        else {
		          that.color = settings.color;
		        }
		      }

		      this.draw = function () {
		        if (that.alpha <= 0) {
		          init();
		        }
		        that.pos.y -= that.speed;
		        that.alpha -= 0.0005;
		        ctx.beginPath();
		        ctx.arc(that.pos.x, that.pos.y, that.scale * settings.radius, 0, 2 * Math.PI, false);
		        ctx.fillStyle = that.color;
		        ctx.fill();
		        ctx.closePath();
		      };
		    }
		  }
		})($);

		$('#top-image').circleMagic({
		  radius: 30,
		  density: .02,
		  color: 'rgba(255,255,255,.4)',
		  clearOffset: .2
		});
	}
</script>

<style lang="scss" type="text/css" src="../css/mixin.scss"></style>

<style lang="scss" rel="text/css">
	#top-image{
	  position:fixed;
	  top:0;
	  width:100vw;
	  z-index:0;
	  height:100vh;
	}
</style>