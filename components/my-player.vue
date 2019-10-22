<!--
 * @Description: 自定义播放组件
 * @Author: Edmund
 * @Email: q1592193221@gmail.com
 * @Date: 2019-10-22 16:33:21
 * @LastEditTime: 2019-10-22 18:01:22
 * @LastEditors: Edmund
 -->

<template>
      <view class="player_container">
              <video :src="src"></video>
      </view>
</template>

<script>
let that
export default {
  name: 'my-player',
  props: {
    src: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      isShowPlayIcon: true
    }
  },
  created() {
    that = this
  },
  onReady() {},
  methods: {
    sendDanmu() {},
    videoPlayCB() {},
    videoStopCB() {},
    videoErrorCallback() {}
  }
}
</script>

<style lang="scss" scoped>
.player_container {
  video {
    display: block;
    padding: 0;
    margin: 0 auto;
    width: 710rpx;
    height: 487rpx;
    border-radius: 10rpx;
  }
}
</style>
