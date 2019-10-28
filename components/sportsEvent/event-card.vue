<!--
 * @Description: 赛事信息卡片组件
 * @Author: Edmund
 * @Email: q1592193221@gmail.com
 * @Date: 2019-10-28 14:37:31
 * @LastEditTime: 2019-10-28 17:07:38
 * @LastEditors: Edmund
 -->


<template>
    <view class="eventCard_container">
        <view class="eventCard_content">
            <view class="eventCard_title">
              <slot name="text" />
            </view>
            <view class="team">
              <view class="teamA">
                <image />
                <text>teamA</text>
              </view>
              <view class="controls">
                <text class="iconfont">&#xe600;</text>
                <text class="videoControls">视频直播</text>
              </view>
              <view class="teamB">
                <image />
                <text>teamB</text>
              </view>
            </view>
        </view>
    </view>
</template>


<script>
export default {
  name: 'eventCard',
  props: {},
  created() {},
  onLoad() {},
  onReady() {},
  onUnload() {},
  methods: {},
  computed: {},
  watch: {}
}
</script>

<style lang="scss" scoped>
.eventCard_container {
  display: flex;
  flex-direction: column;
  padding-top: 24rpx;
  width: 100vw;
  height: 206rpx;
}
.eventCard_title {
  display: flex;
  font-size: 24rpx;
  width: 100vw;
  justify-content: center;
}
.team {
  display: flex;
  font-size: 26rpx;
  image {
    width: 88rpx;
    height: 88rpx;
    border: 1px solid #000;
  }
  .teamA,
  .controls,
  .teamB {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .teamA {
    margin-left: 106rpx;
  }
  .controls {
    margin: 46rpx 122rpx 0 122rpx;
    width: 118rpx;
    color: $default-text-color-inverse;
    text {
      font-size: 40rpx;
    }
    .videoControls {
      display: inline-block;
      height: 30rpx;
      padding: 0 20rpx;
      margin-top: 18rpx;
      line-height: 30rpx;
      border-radius: 15rpx;
      background-color: $default-bg-black;
      color: $default-text-color-white;
      font-size: 18rpx;
    }
  }
}
</style>