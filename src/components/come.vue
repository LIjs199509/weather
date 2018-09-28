<template>

  <div class="header" >

		<!-- <transition>
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
			@click="getWeather(IP),colse()"
			ref="anniu"
			>快开始吧({{ num }})</button>
		</div>
		</transition> -->

		<div class="next" :style="{'background-color':titleColor}">
			<div class='title' >
			<span class="weaTitle">{{ cityname }}</span>
			<span class="weaTitle2">当前城市</span>
			<button type="button" class="mui-btn mui-btn-outlined jia" @click="
			popToggle"><span class="mui-icon mui-icon-navigate"></span>
			</button>
			<div :class="icon"></div>
			</div>
			<p class="jinri">{{ riqi[0] }}{{ riqi[1] }}
				{{ riqi[2] }}&emsp;{{ xingqi }}</p>
			<p class="jinri">{{ high }}{{ low }}</p>
			<p class="jinri">{{ wendu }}</p>

			<div class="">
				<div class="seven" :style="{'background-color':sevenColor}">
					<div>
						<p>昨天</p><img :src="tupian[0]">
						<p class="sevenText">{{ tianqi[0] }}</p>
						<p>{{ daxiaowen[0] }}</p>
						<img :src="shangxia" class="shangxia">
						<p>{{ daxiaowen[1] }}</p>

						</div>
					<div>
						<p>今天</p><img :src="tupian[1]">
						<p class="sevenText">{{ tianqi[1] }}</p>
						<p>{{ daxiaowen[2] }}</p>
						<img :src="shangxia" class="shangxia">
						<p>{{ daxiaowen[3] }}</p>

						</div>
					<div>
						<p>{{ hou }}</p><img :src="tupian[2]">
						<p class="sevenText">{{ tianqi[2] }}</p>
						<p>{{ daxiaowen[4] }}</p>
						<img :src="shangxia" class="shangxia">
						<p>{{ daxiaowen[5] }}</p>

						</div>
					<div>
						<p>{{ hou2 }}</p><img :src="tupian[3]">
						<p class="sevenText">{{ tianqi[3] }}</p>
						<p>{{ daxiaowen[6] }}</p>
						<img :src="shangxia" class="shangxia">
						<p>{{ daxiaowen[7] }}</p>

						</div>
					<div
					><p>{{ hou3 }}</p><img :src="tupian[4]">
						<p class="sevenText">{{ tianqi[4] }}</p>
						<p>{{ daxiaowen[8] }}</p>
						<img :src="shangxia" class="shangxia">
						<p>{{ daxiaowen[9] }}</p>

					</div>
					<div>
						<p>{{ hou4 }}</p><img :src="tupian[5]">
						<p class="sevenText">{{ tianqi[5] }}</p>
						<p>{{ daxiaowen[10] }}</p>
						<img :src="shangxia" class="shangxia">
						<p>{{ daxiaowen[11] }}</p>

						</div>
				</div>
				<div class="weacontent">
					<p>{{ PM }}</p>
					<p>{{ PMtishi }}</p>
					<p>{{ tixing }}</p>

				</div>
				<div class="shijiandiv">
					<ul class="mui-table-view shijian">
						<p class="liship">历史上的{{ riqi[1] }}{{ riqi[2] }}</p>
						<li class="mui-table-view-cell mui-media" v-for="item in shijian" :key="item.eid">
							<div class="mui-media-body">
								<p class="mui-ellipsis">{{item.date}}</p>
								<p>{{item.title}}</p>
							</div>
						</li>
					</ul>
				</div>

			</div>
			<!-- 右侧弹窗 -->
			<mt-popup
				v-model="popupVisible"
				position="right">
				<div >
					<p class="taitou">这里可以选择城市</p>
					<ul class="tright" >
						<li v-for="i in right" :key="i.id">
							<!-- <input type="button" :value="i" @click="getWeather(i),popToggle()"> -->
							<mt-button class="citybutton" @click="getWeather(i),popToggle()">{{ i }}</mt-button>
						</li>
					</ul>
					<div class="rightDiv">
						<p>上面没有？</p>
						<input class="rightI" type="text" v-model="rightInput" placeholder="在这里输入试试吧">
					</div>
					<div class="rightDown">
						<mt-button type="danger" plain @click="popToggle">取消</mt-button>
						<mt-button type="primary" plain :disabled='tanfalse'
						@click="getWeather(rightInput),popToggle()">确定</mt-button>
					</div>
				</div>
			</mt-popup>
		</div>

  </div>



</template>


<script>
import { Indicator,Picker,Popup,MessageBox,Toast } from 'mint-ui';
export default {
	data(){
		return{
			shangxia:'./images/sx.png',
			tanfalse:true,
			rightInput:'',
			flag:true,
			IP:'',
			cityname:'',
			PM:'',
			PMtishi:'',
			wendu:'',
			tixing:'',
			day:'',
			high:'',
			low:'',
			fengxiang:'',
			tianqi:[],
			tupian:[],
			daxiaowen:[],
			icon:'',
			titleColor:'',
			sevenColor:'',
			hou:'',
			hou2:'',
			hou3:'',
			hou4:'',
			riqi:'',
			yue:'',
			ri:'',
			xingqi:'',
			shijian:'',
			num:'3',
    	popupVisible: false,
			right:['成都','重庆','武汉','昆明','大理','丽江','西安','厦门',
			'广州','深圳','上海','北京']
		}
	},
	watch:{
		rightInput:function ( newQuestion, oldQuestion) {
			this.tanfalse = false;
			if (newQuestion == '') {
				this.tanfalse = true;
			}
		}
	},
	created(){
		this.getDay();
		this.getIP();
		this.getHistory();
	},
	methods:{

		colse(){
			$('.start').addClass('animated fadeOutDown');
			setTimeout(this.toggle, 500);
		},
		popToggle(){
			this.popupVisible = !this.popupVisible;
		},
		toggle(){
			this.flag = !this.flag;

		},
		getIP(){
			this.$http.jsonp('http://api.map.baidu.com/location/ip?ak=abqkVZIs2sxvrdXR7XFH9L5qYTgRGPH4').then(res => {
				var textIP = res.body.address;
				this.IP = textIP.split('|')[2];
				setTimeout(this.getWeather(this.IP), 3000);
				setTimeout(this.colse, 3000);
				setInterval(() => {
					if (this.num != 0) {
						this.num -= 1
					}
				}, 1000);
			})
		},
		getWeather(city){
			Indicator.open({text:'正在更新。。',spinnerType:'double-bounce'});
			this.$http.get('https://www.apiopen.top/weatherApi?city='+ city).then(res => {
				var text = eval('(' + res.bodyText + ')');
				var everyTian = new Array();
				if ( text.code === 200){
					var today = text.data;
					console.log(text)
 					this.cityname = today.city;
					this.PM = '今天的PM2.5指数：' + today.aqi;
					if (0 < today.aqi < 50) {
						this.PMtishi = '空气质量令人满意，基本无空气污染，各类人群可正常活动。';
					}else if(51 < today.aqi < 100) {
						this.PMtishi = '空气质量可接受，但某些污染物可能对极少数异常敏感人群健康有较弱影响，建议极少数异常敏感人群应减少户外活动。';
					}else if(101 < today.aqi < 150) {
						this.PMtishi = '空气质量状况属于轻度污染。此时，易感人群症状有轻度加剧，健康人群出现刺激症状。建议儿童、老年人及心脏病、呼吸系统疾病患者应减少长时间、高强度的户外锻炼。';
					}else if(151 < today.aqi < 200) {
						this.PMtishi = '空气质量状况属于中度污染。此时，进一步加剧易感人群症状，可能对健康人群心脏、呼吸系统有影响，建议疾病患者避免长时间、高强度的户外锻练，一般人群适量减少户外运动。';
					}else if(201 < today.aqi < 300) {
						this.PMtishi = '空气质量状况属于重度污染。此时，心脏病和肺病患者症状显著加剧，运动耐受力降低，健康人群普遍出现症状，建议儿童、老年人和心脏病、肺病患者应停留在室内，停止户外运动，一般人群减少户外运动。';
					}else if(today.aqi >= 300) {
						this.PMtishi = '空气质量状况属于严重污染。此时，健康人群运动耐受力降低，有明显强烈症状，提前出现某些疾病，建议儿童、老年人和病人应当留在室内，避免体力消耗，一般人群应避免户外活动。';
					}
					this.tixing = today.ganmao;
					this.wendu = '实时温度：' + today.wendu +'℃';
					var every = today.forecast;
					console.log(every);
					this.tianqi = every[0].type;
					everyTian.unshift(every[0].type);
					this.xingqi = every[1].date.split('日')[1];
					switch (every[0].type) {
						case '阴':
						case '晴':
						case '多云':
						case '少云':
							this.titleColor = 'lightsalmon'
							this.sevenColor = '#FFA783'
							break;
						default:
						this.titleColor = 'lightblue'
						this.sevenColor = '#B2E0ED'
							break;
					}
					// if (every[0].type === '阴'|'晴'|'多云'|'少云') {
					// 	this.titleColor = 'lightsalmon'
					// 	this.sevenColor = '#FFA783'
					// }else{
					// 	this.titleColor = 'lightblue'
					// 	this.sevenColor = '#B2E0ED'
					// };
					console.log(every[0].type)
					switch (every[0].type) {
						case '多云':
						case '阴':
							this.icon = 'cloudy';
							break;
						case '晴':
							this.icon = 'sunny';
							break;
						case '小雨':
						case '中雨':
						case '暴雨':
						case '阵雨':
							this.icon = 'rainy';
							break;
						case '雷阵雨':
							this.icon = 'starry';
							break;
						case '小雪':
						case '中雪':
						case '大雪':
						case '暴雪':
						case '雨夹雪':
							this.icon = 'stormy';
							break;
						default:
							break;
					};
					this.high = '今日：最' + every[0].high;
					this.low = '，最' + every[0].low;
					console.log(every[1].date.split('星期'));

					this.hou = '周' + every[1].date.split('星期')[1];
					this.hou2 = '周' + every[2].date.split('星期')[1];
					this.hou3 = '周' + every[3].date.split('星期')[1];
					this.hou4 = '周' + every[4].date.split('星期')[1];
					everyTian.unshift(today.yesterday.type);
					everyTian.push(every[1].type);
					everyTian.push(every[2].type);
					everyTian.push(every[3].type);
					everyTian.push(every[4].type);
					console.log(everyTian);
					this.tianqi = everyTian;
					var dizhi = new Array();
					for (let i = 0; i < everyTian.length; i++) {
						switch (everyTian[i]) {
							case '多云':
							case '阴':
								dizhi.push('./images/yun.png')
								break;
							case '晴':
								dizhi.push('./images/qing.png')
								break;
							case '小雨':
							case '中雨':
							case '暴雨':
							case '阵雨':
								dizhi.push('./images/yu.png')
								break;
							case '雷阵雨':
								dizhi.push('./images/lei.png')
								break;
							case '小雪':
							case '中雪':
							case '大雪':
							case '暴雪':
							case '雨夹雪':
								dizhi.push('./images/xue.png')
								break;
							default:
								break;
						}
					}
					this.tupian = dizhi;
					console.log(dizhi);
					var daxiaowen = new Array();
					daxiaowen.push(today.yesterday.high.split(' ')[1]);
					daxiaowen.push(today.yesterday.low.split(' ')[1]);
					for (let a = 0; a <= 4; a++) {
						daxiaowen.push(every[a].high.split(' ')[1])
						daxiaowen.push(every[a].low.split(' ')[1])
					}
					console.log(daxiaowen);
					this.daxiaowen=daxiaowen;
					Indicator.close();
				}else{
          Indicator.close();
          Toast({
            message: `未找到该城市`,
            iconClass: 'icon icon-success'
          });
				}
			})

		},
		getDay(){
			var date = new Date();
			const riqi = new Array();
			var year = date.getFullYear();
			var month = date.getMonth() + 1;
			var day = date.getDate();
			riqi.push(year + '年');
			riqi.push(month + '月');
			riqi.push(day + '日');
			this.riqi = riqi;
			this.yue = month;
			this.ri = day;
		},
		getHistory(){
			this.$http.jsonp('https://api.shenjian.io/todayOnhistory/queryEvent?appid=43b6e16563966a4387d5b83e5fb9c6c2&date='
			 + this.yue + '/' + this.ri).then(res => {
				console.log(res);
				console.log(res.body.data);
				var shijian = new Array();
				shijian = res.body.data;
				this.shijian = shijian;
			})
		}
	}
}

</script>


<style lang="scss" scoped>
.header{
  z-index: 99;
	.mint-popup-right{
		background-color: #FCFCF7;
		margin: 0 5%;
		border-radius: 15px;
		.taitou{
			margin: 10px;
			font-size: .35rem;
		}
		p{
			text-align: center;
		}
		.rightDown{
			margin: 0 5%;
			margin-bottom: 10px;
			label{
				border: none;
			}
			button{
				border: none;
				width: 49%;
			}
		}
		.rightDiv{
			input{
				margin: 10px auto;
				padding:0;
				width: 90%;
				display: block;
				padding-left: 10px;
			}
		}
		.tright{
			margin: 10px;
			overflow: hidden;
			list-style: none;
			padding: 0;
			li{
				float: left;
				width: 25%;
				padding: 2px;
				button{
					width: 100%;
				}
			}

		}
	}
	.next{
    padding: 5px 0 50px 0;
		.jia{
			position: absolute;
			right: 0;
			top: 0;
      margin: 17px 10px 10px 0;

      .mui-icon{
        font-size: 0.37rems;
      }
		}
	}
	p{
		color: #000;
	}
	.seven{
		display: flex;
		border-radius: 5px;
		margin: 15px 2px ;
		background-color: #B2E0ED;
		div{
			flex: 1;
			overflow: hidden;
			img{
				width: 1rem;
				margin: 0 auto;
				display: table-cell;
			}
			.shangxia{
				width: 0.25rem;
			}
			.sevenText{
				margin: 5px 0;
			}
			p{
			text-align: center;
			font-size: 0.25rem;
			}
		}
	}
	.jinri{
		text-align: center;
		margin-bottom: 10px;
	}
	p{
		font-size: 0.30rem;
		margin-bottom: 0;
	}
	.start{
		left: 0;
		top: 0;
		width: 100%;
		background-color: lightpink;
		height: 100%;
		position: absolute;
		transition: background-color 0.5s ease,opacity 0.01s ease 0.45s;
		z-index: 99;
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
	.weacontent{
			margin: 0.2rem 10% 0 10%;
			p{
				margin: 10px 0;
			}


		}
		.shijiandiv{
				margin: 0 6%;
				.shijian{
					border-radius: 10px;
					background-color:rgba(255,255,255,0.2);
					height: 300px;
					overflow: auto;
					margin-bottom: 5px;
					.liship{
						text-align: center;
						padding: 5px;
						font-size: 0.35rem;
						border-radius: 10px 10px 0 0;
						background-color:rgba(255,255,255,0.1);
					}
					p{
						margin: 0;
					}
				}
			}
	.title{
		text-align: center;
		height: 220px;
		.weaTitle{
			margin: 15px 0;
			display: inline-block;
			font-size: 0.4rem;
		}
		.weaTitle2{
			font-size: 0.25rem;
			color:#6C6C6C;
		}
	}
}
</style>