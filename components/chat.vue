<!--
 * @Description: 聊天室组件
 * @Author: Edmund
 * @Email: q1592193221@gmail.com
 * @Date: 2019-11-20 17:32:51
 * @LastEditTime: 2019-11-20 20:26:50
 * @LastEditors: Edmund
 -->

<template>
    <view class="container">
      <scroll-view  :scroll-y="true"
                    class="scroll-box"
                    :style="{height: height + 'rpx'}">
          <loadmore :visible="loadding"
                        :index="3"
                        type="primary"
                        text=" ">
          </loadmore>
          <view class="chat-content">
              <block v-for="(item,idx) in chatDataList" :key="idx">
                <view >
                  <view class="chat-center"
                        v-if="time">
                    {{item.time}}
                  </view>
                  <!-- other people -->
                  <view   class="chat-right"
                          v-if="item.otherText">
                    <view class="chatbox chatbox-right">
                      {{item.otherText}}
                    </view>
                    <image src="" class="user-pic left"></image>
                  </view>
                  <!-- mine -->
                  <view   class="chat-left"
                          v-if="item.myText">
                    <image src="" class="user-pic right"></image>
                    <view class="chatbox chatbox-left">
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
.label {
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
.chat-center {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 28rpx;
	font-size: 28rpx;
	color: #666;
	padding-top: 36rpx;
}

.chat-left {
	display: flex;
	margin-left: 20rpx;
	justify-content: flex-start;
	padding-top: 36rpx;
}
.chat-right {
	display: flex;
	margin-right: 20rpx;
	justify-content: flex-end;
	padding-top: 36rpx;
}

.chatbox {
	max-width: 66%;
	border-radius: 10rpx;
	position: relative;
	margin: 0 20rpx;
	padding: 20rpx 22rpx;
	font-size: 32rpx;
	color: #000;
	/* text-align: justify; */
	word-break: break-all;
	word-wrap: break-word;
}
.chatbox-right {
	background: #a0d5f3;
	border: 1upx solid #a0d5f3;
}

.user-pic {
	width: 80rpx;
	height: 80rpx;
	flex-shrink: 0;
	border: 1rpx solid black;
	border-radius: 50%;
	display: block;
}

// .left {
// 	margin-left: 26rpx;
// }
// .right {
// 	margin-right: 26rpx;
// }

.chatbox-left {
	background: #fff;
	border: 1rpx solid #fff;
	display: inline-block;
}
</style>