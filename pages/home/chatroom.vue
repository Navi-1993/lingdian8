<!--
 * @Description: 赛程聊天室
 * @Author: Edmund
 * @Email: q1592193221@gmail.com
 * @Date: 2019-11-19 09:49:44
 * @LastEditTime: 2019-11-20 20:20:51
 * @LastEditors: Edmund
 -->

<template>
  <view class="container" :style="{ height: windowHeight + 'px' }">
    <!-- HTML:header -->

    <view class="header">
      <event-card
        :homeTeamName="'中国'"
        :guestTeamName="'韩国'"
        :livesUrl="'https://www.wongxuefeng.com'"
        @toast="actionsheetOpen"
      />
      <progress-bar
        class="progress"
        :leftNum="leftNum"
        :rightNum="rightNum"
        :percent="percent"
        @leftTap="leftTap"
        @rightTap="rightTap"
      >
      </progress-bar>
    </view>
    <view class="stepStone"></view>
    <!-- HTML:body -->

    <view class="body">
      <chat :chatDataList="chatDataList"
            :height="940" />
    </view>

    <!--  HTML:footer -->

    <view class="footer">
      <input
        type="text"
        class="input"
        placeholder="聊天室尚未接入"
        ref="input"
        v-model="value"
      />
    </view>
    <tui-actionsheet
      :show="showActionSheet"
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
import tuiActionsheet from 'components/actionsheet/actionsheet.vue'
import chat from 'components/chat.vue'
export default {
	name: 'chatroom',
	components: {
		eventCard,
		progressBar,
		tuiActionsheet,
		chat
	},
	props: {},
	data() {
		return {
			// TODO: 页面初始化数据
			windowHeight: 0,
			value: '', // 聊天框value
			showActionSheet: false, // 是否显示操作栏
			leftNum: 0,
			rightNum: 0,
			// TODO: 聊天数据组
			chatDataList: [
				{ otherText: '你吃饭了吗？' },
				{ myText: '我吃了' },
				{ myText: '我吃了' },
				{ myText: '我吃了' },
				{ myText: '我吃了' },
				{ myText: '我吃了' },
				{ myText: '我吃了' },
				{ myText: '我吃了' },
				{ otherText: '你吃饭了吗？' },
				{ otherText: '你吃饭了吗？' },
				{ otherText: '你吃饭了吗？' },
				{ otherText: '你吃饭了吗？' }
			],
			// TODO: 底部弹窗控件
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

			// TODO: 定义投票这一行为的对象
			vote: {
				times: 1, // 可投票数
				able: true, // 能否投票
				leftAble: true, // 正方能否投票
				rightAble: true // 反方能否投票
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
		that.windowHeight = that.$sysCall.windowHeight()
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
	onHide() {
		// 离开页面时，初始化一些数据
		that.showActionSheet = false // 关闭操作面板
		uni.hideKeyboard() // 隐藏软键盘
	},
	onUnload() {},
	methods: {
		/**
		 * @Description: 打开操作菜单
		 * @return: void
		 */
		actionsheetOpen() {
			that.showActionSheet = true
			// do sth
			uni.hideKeyboard() // 隐藏软键盘
		},
		/**
		 * @Description: 关闭操作菜单
		 * @return: void
		 */

		closeActionSheet() {
			that.showActionSheet = false
			// do sth
		},
		/**
		 * @Description: 点赞控件 left icon
		 * @param {object} vote 投票这一行为的对象
		 * @return: void
		 */
		leftTap() {
			if (!that.vote.leftAble) return that.$sysCall.toast('已点过赞')
			if (that.vote.able) {
				that.leftNum++
				that.vote.times--
				that.vote.rightAble = false
				that.vote.able = false
				that.$sysCall.toast('成功点赞')
			} else {
				that.vote.times++
				that.leftNum--
				that.vote.rightAble = true
				that.vote.able = true
				that.$sysCall.toast('已取消点赞')
			}
		},

		/**
		 * @Description: 点赞控件 right icon
		 * @return: void
		 */
		rightTap() {
			if (!that.vote.rightAble) return that.$sysCall.toast('已点过赞')
			if (that.vote.leftAble) {
				that.rightNum++
				that.vote.times--
				that.vote.leftAble = false
				that.vote.able = false
				that.$sysCall.toast('成功点赞')
			} else {
				that.vote.times++
				that.rightNum--
				that.vote.leftAble = true
				that.vote.able = true
				that.$sysCall.toast('已取消点赞')
			}
		},
		itemClick(e) {
			that.$sysCall.toast(`当前点击的按钮索引为：${e.index}`)
			uni.navigateTo({
				url: '/pages/video/detail'
			})
			// do sth
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
			// 正反方不对等时，根据正方计算进度条比例
			return (that.leftNum / that.sum) * 100
		},
		/**
		 * @Description: 计算评论总数
		 * @return: number
		 */
		sum() {
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
// 垫脚石，填补header fixed定位的空缺
.stepStone {
	height: 222rpx;
}
.body {
	flex: 1;
	background: $default-bg-gray;
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
		background: $default-bg-gray;
		padding-left: 40rpx;
	}
}
</style>
