<!--
 * @Description: 自定义播放组件
 * @Author: Edmund
 * @Email: q1592193221@gmail.com
 * @Date: 2019-10-22 16:33:21
 * @LastEditTime: 2019-10-25 10:34:04
 * @LastEditors: Edmund
 -->

<template>
      <view class="player_container">
              <video  :src="src"
                      id="player"
                      class="player"
                      :objectFit="objectFit"
                      :show-center-play-btn="false">
                <cover-view class="controls-title iconfont"
                             @click="Play">
                             &#xe606;
                </cover-view>
              </video>
              
      </view>
</template>

<script>
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
      isShowPlayIcon: true,
      // #ifdef APP-PLUS
      objectFit: 'fill',
      // #endif
      // #ifndef APP-PLUS
      objectFit: 'cover'
      // #endif
    }
  },
  created() {},
  onReady() {
    this.videoContext = uni.createVideoContext('player', this)
  },
  methods: {
    Play() {
      console.log('start')
      this.videoContext.play()
    },
    sendDanmu() {},
    videoPlayCB() {},
    videoStopCB() {},
    videoErrorCallback() {}
  }
}
</script>

<style lang="scss" scoped>
.player_container {
  .player {
    margin-left: 20rpx;
    width: 710rpx;
    height: 486rpx;
    position: relative;
  }
  .cover {
    color: #fff;
    display: inline-block;
    position: absolute;
    z-index: 999999;
  }
  .controls-title {
    width: 100%;
    margin-top: 200rpx;
    text-align: center;
    color: #ffffff;
  }
}
</style>
