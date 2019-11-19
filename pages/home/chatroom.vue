<!--
 * @Description: 赛程聊天室
 * @Author: Edmund
 * @Email: q1592193221@gmail.com
 * @Date: 2019-11-19 09:49:44
 * @LastEditTime: 2019-11-19 14:01:14
 * @LastEditors: Edmund
 -->

<template>
  <view class="container" :style="{height: windowHeight + 'px'}">
    <view class="header">
      <event-card :homeTeamName="'中国'"
                  :guestTeamName="'韩国'"
                  :livesUrl="'www.test.com'"
                  @toast="actionsheetOpen"/>
      <progress-bar class="progress"
                    :leftNum="leftNum"
                    :rightNum="rightNum"
                    :percent ="percent"
                    @leftTap="leftTap"
                    @rightTap="rightTap">
      </progress-bar>
    </view>
    <view class="body">

    </view>
    <view class="footer">
      <input  type="text"
              class="input"
              placeholder="聊天室尚未接入"
              ref="input"
              v-model="value">
    </view>
    <tui-actionsheet  :show="showActionSheet"
                      :tips="tips"
                      :item-list="actionsheetList" 
                      :mask-closable="maskClosable"
                      :color="color"
                      :size="size" 
                      :is-cancel="isCancel"
                       @click="itemClick" 
                       @cancel="closeActionSheet"
                      />
  </view>
</template>

<script>
let that
import eventCard from 'components/sportsEvent/event-card.vue'
import progressBar from 'components/sportsEvent/progress-bar.vue'
import tuiActionsheet from '@/components/actionsheet/actionsheet.vue'
export default {
	name: 'chatroom',
	components: {
		eventCard,
		progressBar,
		tuiActionsheet
	},
	props: {},
	data() {
		return {
			windowHeight: 0,
			value: '', // 聊天框value
			showActionSheet: false, // 是否显示操作栏
			leftNum: 0,
			rightNum: 0,
			// 操作栏数据组
			actionsheetList: [
				{
					text: '龙珠',
					color: '#1a1a1a'
				},
				{
					text: '斗鱼',
					color: '#1a1a1a'
				}
			],
			tips: '请选择一个播放源', //
			maskClosable: true, // 点击蒙版是否可以关闭组件
			color: '#9a9a9a',
			size: 26,
			isCancel: false, // 是否有取消选项
			// 定义投票这一行为的对象
			vote: {
				times: 1,
				able: true,
				leftAble: true,
				rightAble: true
			}
		}
	},
	beforeCreate() {
		// #ifndef APP-PLUS
		console.time('renderTime')
		// #endif
	},
	created() {
		that = this
		uni.getSystemInfo({
			success: (res) => {
				this.windowHeight = res.windowHeight
			}
		})
	},
	onLoad() {},
	onShow() {},
	onReady() {
		// #ifndef APP-PLUS
		console.log(
			'%c如果渲染用时超过3秒，则列入待优化项目',
			'color: yellow; background-color: black;padding: 2px'
		)
		console.timeEnd('renderTime')
		// #endif
	},
	onHide() {},
	onUnload() {},
	onPullDownRefresh() {},
	onReachBottom() {},
	onShareAppMessage() {},
	onPageScroll() {},
	methods: {
		actionsheetOpen() {
			that.showActionSheet = true
		},
		leftTap() {
			if (!that.vote.leftAble) return
			if (that.vote.able) {
				that.leftNum++
				that.vote.times--
				that.vote.rightAble = false
				that.vote.able = false
			} else {
				that.vote.times++
				that.leftNum--
				that.vote.rightAble = true
				that.vote.able = true
			}
		},
		rightTap() {
			if (!that.vote.rightAble) return
			if (that.vote.able) {
				that.rightNum++
				that.vote.times--
				that.vote.leftAble = false
				that.vote.able = false
			} else {
				that.vote.times++
				that.rightNum--
				that.vote.leftAble = true
				that.vote.able = true
			}
		},
		itemClick(e) {
			console.log('item click')
			let idx = e.index
			that.$sysCall.toast(`您点击的按钮索引为：${idx}`)
		},
		closeActionSheet() {
			that.showActionSheet = false
		}
	},
	computed: {
		/**
		 * @Description: 计算评论比例
		 * @return: number 0~100
		 */
		percent() {
			// 正反方支持数相等时，返回50
			if (that.leftNum === that.rightNum) return 50
			// 正反方不对等时，根据正方计算进度条
			return (that.leftNum / that.sum) * 100
		},
		/**
		 * @Description: 计算评论总数
		 * @return: number
		 */
		sum() {
			// 返回当前正反方支持数的和
			return that.leftNum + that.rightNum
		}
	},
	watch: {}
}
</script>

<style lang="scss" scoped>
.container {
	width: 100vw;
	display: flex;
	flex-direction: column;
}
.header {
	position: fixed;
	width: 100vw;
	height: 222rpx;
	z-index: 100;
	background: $default-bg-white;
	.progress {
		position: absolute;
		bottom: 0;
	}
}
.body {
	flex: 1;
	background: $default-bg-grey;
}
.footer {
	position: fixed;
	bottom: 0;
	width: 100vw;
	height: 88rpx;
	z-index: 100;
	display: flex;
	justify-content: center;
	align-items: center;
	background: $default-bg-white;
	.input {
		width: 670rpx;
		height: 60rpx;
		font-size: 24rpx;
		border-radius: 30rpx;
		background: $default-bg-grey;
		padding-left: 40rpx;
	}
}
</style>
