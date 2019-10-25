<!--
 * @Description: 自定义播放组件
 * @Author: Edmund
 * @Email: q1592193221@gmail.com
 * @Date: 2019-10-22 16:33:21
 * @LastEditTime: 2019-10-25 17:35:25
 * @LastEditors: Edmund
 -->

<template>
      <view class="player_container">
              <video  :src="src"
                      id="player"
                      class="player"
                      @play="videoPlayCB"
                      @pause="videoPauseCB"
                      :objectFit="objectFit"
                      :show-center-play-btn="false">
                <cover-image  class="poster"
                              v-show="isShowPoster"
                              v-cloak
                               src="https://pic1.zhimg.com/50/v2-3aff4f7ec4e3a677d0c88020989b9444_hd.jpg">
                </cover-image>
                <cover-image  class="controls-play img"
                              v-show="isPlayBtnShow"
                              @click="play"
                               src="static/controls/play.png">
                </cover-image>
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
      isShowPoster: true,
      isPlayBtnShow: true,
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
    play() {
      this.videoContext.play()
      console.log('player start')
    },
    pause() {
      this.videoContext.pause()
      console.log('player pause')
    },
    sendDanmu() {},
    videoPlayCB() {
      this.isShowPoster = false // 播放器隐藏当前封面
      this.isPlayBtnShow = false // 播放器隐藏播放按钮
    },
    videoPauseCB() {
      this.isPlayBtnShow = true // 视频处于暂停时显示播放按钮
    },
    videoErrorCallback() {}
  }
}
</script>

<style lang="scss" scoped>
.player_container {
  .player {
    margin: 24rpx 0 0 20rpx;
    width: 710rpx;
    height: 486rpx;
    position: relative;
  }
  .controls-play {
    width: 160rpx;
    height: 160rpx;
    @include center;
  }
  .poster {
    width: 100%;
    height: 100%;
    position: absolute;
  }
}
</style>
