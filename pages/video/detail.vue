<!--
 * @Description: 视频详情
 * @Author: Edmund
 * @Email: q1592193221@gmail.com
 * @Date: 2019-11-20 00:58:12
 * @LastEditTime: 2019-11-20 10:21:06
 * @LastEditors: Edmund
 -->

<template>
  <view class="container" :style="{ height: windowHeight + 'px' }">
    <view class="header">
      <!-- TODO:player -->
      <player
        :url="url"
        :width="750"
        :height="420"
        :poster="poster"
        :type="type"
      />
      <view class="detail">
        <view class="title">诺维奇如何破解卫冕冠军曼城的前场高位逼抢？</view>
        <view class="controls">
          <view class="controls_left">
            <text class="time"></text>
            <text class="playTimes"></text>
          </view>
          <view class="controls_right"></view>
        </view>
      </view>
    </view>
    <view class="body"> </view>
  </view>
</template>

<script>
let that
export default {
  name: 'video-detail',
  components: {
    // #ifdef H5
    player: () => {
      return import('platform/h5/player/xgplayer.vue')
    }
    // #endif
  },
  props: {},
  data() {
    return {
      windowHeight: 0,
      url: `http://devimages.apple.com/iphone/samples/bipbop/bipbopall.m3u8`,
      type: 2,
      poster: `https://wongxuefeng.com/bg.jpg`,
      time: ''
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
    that.time = that.$sysCall.getYear()
    console.log('moment', that.time)
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
  methods: {},
  computed: {},
  watch: {}
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  background: red;
  .header {
    height: 564rpx;
    background: gray;
    .detail {
      padding: 23rpx 20rpx 23rpx 20rpx;
      .title {
        white-space: nowrap;
        font-size: 34rpx;
      }
      .controls {
        display: flex;
        width: 100%;
        height: 30rpx;
        line-height: 30rpx;
        font-size: 22rpx;
        &_left {
          flex: 1;
          display: flex;
          justify-content: flex-start;
        }
        &_right {
          flex: 1;
        }
      }
    }
  }
  .body {
    flex: 1;
    background: blue;
  }
}
</style>
