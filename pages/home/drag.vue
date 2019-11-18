<!--
 * @Description: 拖拽排序
 * @Author: Edmund
 * @Email: q1592193221@gmail.com
 * @Date: 2019-11-18 22:07:02
 * @LastEditTime: 2019-11-19 02:16:16
 * @LastEditors: Edmund
 -->


<template>
  <view class="container">
    <!-- #ifndef H5 -->
    <view class="color-list">
      <drag-sort :list="list" :props="props" @change="itemChange"> </drag-sort>
    </view>
    <!-- #endif -->
    <!-- #ifdef H5 -->
    <vuedraggable class="wrapper" v-model="list" handle=".handle">
      <transition-group>
        <div v-for="(item, idx) in list" :key="idx" class="item">
          <div>{{ item.name }}</div>
          <div class="handle">点击控件</div>
        </div>
      </transition-group>
    </vuedraggable>
    <!-- #endif -->
  </view>
</template>

<script>
let that
import dragSort from 'components/drag-sort/index.vue'
// #ifdef H5
import vuedraggable from 'vuedraggable'
// #endif
export default {
	name: 'drag',
	components: {
		dragSort,
		// #ifdef H5
		vuedraggable
		// #endif
	},
	props: {},
	data() {
		return {
			props: {
				label: 'name'
			},
			list: [
				{ name: 'John', text: '', id: 0 },
				{ name: 'Joao', text: '', id: 1 },
				{ name: 'Jean', text: '', id: 2 }
			]
		}
	},
	beforeCreate() {
		// #ifndef APP-PLUS
		console.time('renderTime') // 创建到渲染所耗时间，大于3秒则加入优化计划
		// #endif
	},
	created() {
		that = this
		// 测试时使用
		uni.getSystemInfo({
			success: (res) => {
				console.log('手机品牌', res.brand) // 手机品牌
				console.log('手机型号', res.model) // 手机型号
				console.log('可使用窗口的顶部位置', res.windowTop)
				this.windowHeight = res.windowHeight
				console.log('状态栏的高度', res.statusBarHeight)
				console.log('可使用的窗口高度 = 100vh', res.windowHeight)
				console.log('可使用窗口的底部位置', res.windowBottom)
				console.log('导航栏的高度	', res.navigationBarHeight)
			}
		})
	},
	beforeMount() {},
	mounted() {},
	onLoad() {},
	onShow() {},
	onReady() {
		// #ifndef APP-PLUS
		console.timeEnd('renderTime')
		console.log(`%c${that.__route__}`, 'color:yellow;background-color:black')
		// #endif
	},
	onHide() {},
	onUnload() {},
	beforeDestroy() {},
	destroyed() {},
	methods: {
		/**
		 * @Description: drag-sort组件$emit change 时更改 Item
		 * @e {Object} drag-组件定义的事件值
		 * @return: void
		 */
		itemChange(e) {
			let currentItem = e.item

			// 刷新数据
			that.updateList(currentItem)
		},
		updateList(currentItem) {
			console.log('currentItem', currentItem)
			// TODO:从数组中找1个符合需求的元素，返回其索引
			let currentIdx = currentItem.index
			let frontIdx = currentItem.oldIdx
			// 交换数组元素位置
			let temp = this.list[currentIdx]
			this.list[currentIdx] = this.list[frontIdx]
			this.list[frontIdx] = temp
			console.log('result', currentIdx)
			console.log('front', frontIdx)
			console.table('list', this.list)
		}
	},
	computed: {},
	watch: {}
}
</script>

<style lang="scss" scoped>
.container {
	height: 100vh;
	max-width: 100vw;
	overflow: auto;
}
.wrapper {
	display: flex;
	justify-content: center;
	flex-direction: column;
	width: 100vw;
	max-width: 100vw;
}
.item {
	position: relative;
	width: 100vw;
	height: 80rpx;
	padding-left: 40rpx;
	display: flex;
	align-items: center;
	border-bottom: 1px solid $default-border-color;
	.handle {
		height: 100%;
		width: 60rpx;
		font-size: 20rpx;
		position: absolute;
		right: 56rpx;
		top: 0.5em;
	}
}
</style>
