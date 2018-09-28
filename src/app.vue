<template>
<div class="coming">
	<div v-if="flag" ref="yanse" class="start" >
		<div class="loader font4" ref="anniu">
			<span>哪</span>
			<span class="span2">看</span>
			<span class="span3">天</span>
			<span class="span4">气</span>
			<span class="span5">？</span>
		</div>
		<div class="rainbow" ref="anniu"></div>
		<button class="mui-btn mui-btn-outlined jinru " v-if="flag"
		@click="jinru()"
		ref="anniu"
		>快开始吧({{ num }})</button>
	</div>
	<div class="high">
		<transition :name="transitionName">
		<router-view></router-view>
		</transition>
	</div>


	<nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item" to="/come">
				<span class="mui-icon iconfont icon-tianqi"></span>
				<span class="mui-tab-label">天气</span>
			</router-link>
			<router-link class="mui-tab-item" to="/chat">
				<span class="mui-icon iconfont icon-zixun"></span>
				<span class="mui-tab-label">资讯</span>
			</router-link>
			<router-link class="mui-tab-item" to="/guanyu">
				<span class="mui-icon iconfont icon-wo"></span>
				<span class="mui-tab-label">关于</span>
			</router-link>
	</nav>
</div>
</template>

<script>
import "./router.js";
export default {
	data(){
		return{
			flag:true,
			num: 3,
			IP:'',
			transitionName:''
		}
	},
	created(){
		this.getIP()
	},
	watch:{
		$route(to,from){
			if( to.meta.index < from.meta.index){
				this.transitionName = 'slide-right';
			}else{
				this.transitionName = 'slide-left';
			}
		}
	},
	methods:{
		jinru(){
					$('.start').addClass('animated fadeOutDown');
					$('.high').removeClass('high')
					setInterval(() => {this.flag = false}, 500);
		},
		getIP(){
			this.$http.jsonp('http://api.map.baidu.com/location/ip?ak=abqkVZIs2sxvrdXR7XFH9L5qYTgRGPH4').then(res => {
				var textIP = res.body.address;
				this.IP = textIP.split('|')[2];
				setInterval(() => {
					if (this.num != 0) {
						this.num -= 1
					}
				}, 1000);
			})
			setInterval(() => {this.jinru()}, 3300)
		}
	}
}
</script>

<style lang="scss" scoped>
.high{
	height: 100px;
	overflow: hidden;
}
.coming{
	.slide-right-enter-active,
	.slide-right-leave-active,
	.slide-left-enter-active,
	.slide-left-leave-active {
			will-change: transform;
			transition: all .3s;
			position: absolute;
			width:100%;
			left:0;
	}
	.slide-right-enter {
			transform: translateX(-100%);
	}
	.slide-right-leave-active {
			transform: translateX(100%);
	}
	.slide-left-enter {
			transform: translateX(100%);
	}
	.slide-left-leave-active {
			transform: translateX(-100%);
	}
	nav{
		box-shadow: 0;
	}
	.mui-bar{
		z-index: 150;
	}
	.start{
		left: 0;
		top: 0;
		width: 100%;
		background-color: lightpink;
		height: 100%;
		position: absolute;
		transition: background-color 0.5s ease,opacity 0.01s ease 0.45s;
		z-index: 999;
		.loader{
			position: absolute;
			top: 40%;
			bottom: 60%;
			height: 50px;
			left: 25%;
			font-size: 0.9rem;
		}
		.jinru{
		position: absolute;
		bottom: 10%;
		right: 10%;
		}
	}
}
</style>
