<script>
export default {
	// 可以在此定义全局属性，常用于与nuve页面通讯
	// globalData: {
	// 	vuex: 'hello'
	// },
	onLaunch: function() {
		uni.onWindowResize((res) => {
			console.log('变化后的窗口宽度=' + res.size)
			console.log('变化后的窗口高度=' + res.size.windowHeight)
		})
		console.log('App Launch')
		// #ifdef APP-PLUS
		// 锁定app屏幕
		plus.screen.lockOrientation('portrait-primary')
		// #endif

		/**
		 * @Description: 每10分钟重新写入1次store到全局data
		 */
		// setInterval(() => {
		//  do sth
		// }, 3600000)
	},
	onShow: function() {},
	onHide: function() {
		console.log('App Hide')
	}
}
</script>

<style lang="scss">
/*每个页面公共css */

/* 阿里字体图标库引入（已使用项目管理） */
@import url('common/css/font-family/iconfont.css');

/* #ifndef APP-PLUS-NVUE */
/* 富文本组件样式引入 */
@import url('components/gaoyia-parse/parse.css');
page {
	color: $default-text-color;
}
/* #endif */
</style>
