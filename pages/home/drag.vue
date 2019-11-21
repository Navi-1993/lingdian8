<!--
 * @Description: 拖拽排序
 * @Author: Edmund
 * @Email: q1592193221@gmail.com
 * @Date: 2019-11-18 22:07:02
 * @LastEditTime: 2019-11-21 21:44:46
 * @LastEditors: Edmund
 -->

<template>
  <view class="container" :style="{ height: windowHeight + 'px' }">
    <!-- #ifndef H5 -->
    <view class="header">
      <drag-sort :selectedList="selectedList" :props="props" @change="itemChange">
      </drag-sort>
    </view>
    <!-- #endif -->
    <!-- #ifdef H5 -->
    <view class="seleted_title">
      <text class="strong">请选择</text>
      <text class="mini">可长按并拖拽调整顺序</text>
    </view>

    <!-- 可排序列表 -->
    <vuedraggable class="wrapper" v-model="selectedList" handle=".handle">
      <transition-group>
				<block  v-for="(item,idx) in selectedList" :key="idx">
        <div class="item">
          <div class="sortItem">
            <text class="iconfont sub" @tap="add2UnselectedList(item)">
              &#xe605;
            </text>
            {{ item.name }}
          </div>
          <div class="handle iconfont">&#xe689;</div>
        </div>
				</block>
      </transition-group>
    </vuedraggable>

    <!-- 不可排序列表 -->
    <view class="seleted_title">
      <text class="strong">未选择</text>
    </view>
    <vuedraggable class="wrapper" v-model="unseletedList" handle=".nonono">
      <transition-group>
				<block v-for="(item, idx) in unseletedList" :key="idx">
						<div  class="item">
								<div class="sortItem">
										{{ item.name }}
								</div>
								<div 	class="handle iconfont add"
											@tap.stop="add2SelectedList(item)">&#xe604;</div>
						</div>
				</block>
      </transition-group>
    </vuedraggable>
    <!-- #endif -->
  </view>
</template>

<script>
let that
import dragSort from 'components/drag-sort/index.vue'
import {
	updateUserAttend,
	queryAllEvent,
	queryUserAttendEventList
} from 'api/match.js'
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
			windowHeight: 0,
			// TODO: H5拖拽排序组件数据
			selectedList: [],
			unseletedList: []
		}
	},
	beforeCreate() {
		// #ifndef APP-PLUS
		console.time('renderTime') // 创建到渲染所耗时间，大于3秒则加入优化计划
		// #endif
	},
	created() {
		that = this
		that.windowHeight = that.$sysCall.windowHeight()
	},
	beforeMount() {},
	mounted() {
		that._queryAllEvent()
		that._updateUserAttend()
	},
	onLoad() {},
	onShow() {},
	onReady() {
		// #ifndef APP-PLUS
		console.timeEnd('renderTime')
		// #endif
	},
	onHide() {},
	onUnload() {},
	beforeDestroy() {},
	destroyed() {},
	methods: {
		/**
		 * @Description: 查询所有赛事项目接口
		 */
		async _queryAllEvent() {
			let params = {
				limit: 10,
				offset: 1
			}
			let res = await queryAllEvent(params)
			if (res.statusCode === 200) {
				that.unseletedList = res.data.data.list
			}
		},
		async _updateUserAttend(params) {
			let res = updateUserAttend(params)
			if (res.statusCode === 200) {
				// do sth
			}
		},

		/**
		 * @Description: 添加至选择列表
		 */
		add2SelectedList(item) {
			// 拼接参数
			let params = {
				attentedType: item.type,
				controlType: 0,
				id: item.id
			}
			// 请求更新接口
			that._updateUserAttend(params)
			let idx = that.unseletedList.findIndex((ele) => {
				return ele.type === item.type && ele.id === item.id
			})
			that.selectedList.push(that.unseletedList[idx])
			that.unseletedList.splice(idx, 1)
		},
		/**
		 * @Description: 添加至未选择列表
		 */
		add2UnselectedList(item) {
			// 拼接参数
			let params = {
				attentedId: item.id,
				controlType: 1,
				attentedType: item.type
			}
			// 请求更新接口
			that._updateUserAttend(params)
			let idx = that.selectedList.findIndex((ele) => {
				return ele.type === item.type && ele.id === item.id
			})
			that.unseletedList.push(that.selectedList[idx])
			that.selectedList.splice(idx, 1)
		},
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
			let temp = this.selectedList[currentIdx]
			this.selectedList[currentIdx] = this.selectedList[frontIdx]
			this.selectedList[frontIdx] = temp
		}
	},
	computed: {},
	watch: {}
}
</script>

<style lang="scss" scoped>
.container {
	overflow: hidden;
	.seleted_title {
		height: 58rpx;
		padding: 0 38rpx;
		background: $default-bg-gray;
		display: flex;
		align-items: center;
		.strong {
			font-size: 26rpx;
			margin-right: 14rpx;
		}
		.mini {
			font-size: 22rpx;
			color: $default-text-color-inverse;
		}
	}
}
.wrapper {
	max-width: 100vw;
	display: flex;
	justify-content: center;
	flex-direction: column;
}
.item {
	position: relative;
	height: 80rpx;
	font-size: 30rpx;
	padding-left: 40rpx;
	display: flex;
	align-items: center;
	border-bottom: 1rpx solid $default-border-color;
	.add,
	.sub {
		font-size: 38rpx;
		color: red;
		margin-right: 17rpx;
	}
	.handle {
		height: 100%;
		width: 60rpx;
		font-size: 36rpx;
		position: absolute;
		right: 20rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
}
</style>
