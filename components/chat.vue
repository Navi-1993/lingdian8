<!--
 * @Description: 组件模板
 * @Author: Edmund
 * @Email: q1592193221@gmail.com
 * @Date: 2019-11-18 22:07:02
 * @LastEditTime: 2019-11-20 20:23:06
 * @LastEditors: Edmund
 -->

<template>
    <view class="container">
      <scroll-view  :scroll-y="true"
                    class="scroll-box"
                    :style="{height: height + 'rpx'}">
          <tui-loadmore :visible="loadding"
                        :index="3"
                        type="primary"
                        text=" ">
          </tui-loadmore>
          <view class="tui-chat-content">
              <block v-for="(item,idx) in chatDataList" :key="idx">
                <view >
                  <view class="tui-chat-center"
                        v-if="time">
                    {{item.time}}
                  </view>
                  <!-- other people -->
                  <view   class="tui-chat-right"
                          v-if="item.otherText">
                    <view class="tui-chatbox tui-chatbox-right">
                      {{item.otherText}}
                    </view>
                    <image src="" class="tui-user-pic tui-left"></image>
                  </view>
                  <!-- mine -->
                  <view   class="tui-chat-left"
                          v-if="item.myText">
                    <image src="" class="tui-user-pic tui-right"></image>
                    <view class="tui-chatbox tui-chatbox-left">
                        {{item.myText}}
                    </view>
                  </view>
                </view>
            </block>
            <view style="height:40rpx;"/>
          </view>
      </scroll-view>
  </view>
</template>


<script>
let that
import tuiLoadmore from '@/components/loadmore/loadmore'

export default {
	name: '',
	components: {
		tuiLoadmore
	},
	props: {
		chatDataList: {
			type: Array,
			default: []
		},
		height: {
			type: Number,
			default: 930
		}
	},
	data() {
		return {
			loadding: true,
			show: true,
			bottom: 0
		}
	},
	beforeCreate() {},
	created() {
		that = this
	},
	beforeMount() {},
	mounted() {},
	beforeDestroy() {},
	destroyed() {},
	methods: {},
	computed: {},
	watch: {}
}
</script>

<style lang="scss" scoped>
.container {
	box-sizing: border-box;
	width: 100vw;
	height: 100%;
	overflow: hidden;
}
.scroll-box {
	display: flex;
	flex-direction: column;
}
.tui-label {
	display: inline-block;
	background: rgba(0, 0, 0, 0.4);
	color: #fff;
	font-size: 24rpx;
	line-height: 24rpx;
	margin-top: 36rpx;
	padding: 12rpx 16rpx;
	text-align: center;
	border-radius: 8rpx;
	margin-left: 50%;
	transform: translateX(-50%);
}
.tui-chat-center {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 28rpx;
	font-size: 28rpx;
	color: #666;
	padding-top: 36rpx;
}

.tui-chat-left {
	display: flex;
	margin-left: 20rpx;
	justify-content: flex-start;
	padding-top: 36rpx;
}
.tui-chat-right {
	display: flex;
	margin-right: 20rpx;
	justify-content: flex-end;
	padding-top: 36rpx;
}

.tui-chatbox {
	max-width: 66%;
	border-radius: 10rpx;
	position: relative;
	padding: 20rpx 22rpx;
	font-size: 32rpx;
	color: #000;
	/* text-align: justify; */
	word-break: break-all;
	word-wrap: break-word;
}
.tui-chatbox-right {
	background: #a0d5f3;
	border: 1upx solid #a0d5f3;
}

.tui-user-pic {
	width: 80rpx;
	height: 80rpx;
	flex-shrink: 0;
	border: 1rpx solid black;
	border-radius: 50%;
	display: block;
}

// .tui-left {
// 	margin-left: 26rpx;
// }
// .tui-right {
// 	margin-right: 26rpx;
// }

.tui-chatbox-left {
	background: #fff;
	border: 1rpx solid #fff;
	display: inline-block;
}
</style>