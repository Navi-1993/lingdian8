<!--
 * @Description: 视频详情
 * @Author: Edmund
 * @Email: q1592193221@gmail.com
 * @Date: 2019-11-24 10:20:42
 * @LastEditTime: 2019-11-24 12:31:23
 * @LastEditors: Edmund
 -->

<template>
  <view class="container" :style="{ height: windowHeight + 'px',
                                    minHeight: windowHeight + 'px'}">
    
    <!-- #ifdef APP-PLUS || MP -->
    <u-parse :content="content"
            :noData="'当前新闻没有数据'"/>
    <!-- #endif -->

		<!-- #ifdef H5 -->
		<div 	v-html="content"
					style="	height:100%;
									width:100%;
									background-red;">
		</div>
		<!-- #endif -->
  </view>
</template>

<script>
let that
import uParse from 'components/gaoyia-parse/parse.vue'
export default {
	name: 'news-detail',
	components: {
		uParse
	},
	props: {},
	data() {
		return {
			windowHeight: 0,
			content: `<div id="signals" class="content">  <p style="text-align: center;"><img src="http://tu.duoduocdn.com/uploads/day_191119/201911190951025059.jpg" alt=""></p> <p>直播吧11月19日讯 今日NBA官方给出了赛季至今得分前五的组合。其中哈登和威少排在第一，唐斯和维金斯排在第二，詹姆斯和浓眉排在第四。</p> <p>1、哈登 场均39.5分 / 威少 场均21分 合计 60.5分</p> <p>2、唐斯 场均26.8分 / 维金斯 场均25.9分 合计 52.7分</p> <p>3、利拉德 场均29.8分 / CJ-麦科勒姆 场均21分 合计 50.8分</p> <p>4、詹姆斯 场均25分 / 安东尼-戴维斯 场均24.5分 合计 49.5分</p> <p>5、字母哥 场均30.1分 / 米德尔顿 场均18.5分 合计 48.6分</p> <p>（莫莫）</p> </div>`
		}
	},
	beforeCreate() {
		// #ifndef APP-PLUS
		console.time('renderTime')
		// #endif
	},
	created() {
		that = this
		that.windowHeight = that.$sysCall.windowHeight()
	},
	mounted() {},
	onLoad() {},
	onShow() {},
	onReady() {
		// #ifndef APP-PLUS
		console.log(
			'%c如果渲染用时超过3秒，则列入待优化项目',
			'color: yellow; background-color: black;padding: 2px'
		)
		console.timeEnd('renderTime')
		console.log(`%c${that.$Route.path}`, 'color:yellow;background-color:black')
		// #endif
	},
	onHide() {},
	methods: {},
	computed: {},
	watch: {}
}
</script>

<style lang="scss" scoped>
.container {
	display: flex;
	flex-direction: column;
	padding: 0 20rpx;
	font-size: 30rpx;
}
</style>
