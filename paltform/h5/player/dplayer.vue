<template>
  <div class="container">
    <video ref="player" id="player"></video>
  </div>
</template>
<script>
// #ifdef H5
import 'dplayer/dist/DPlayer.min.css'
import DPlayer from 'dplayer'
// #endif
export default {
  name: 'player-h5',
  props: {},
  components: {},
  data() {
    return {
      url: `https://media.w3.org/2010/05/sintel/trailer.mp4`, // 链接地址
      pic: `https://wongxuefeng.com/bg.jpg` //封面图
    }
  },
  mounted() {
    // 加载hls播放功能
    window.Hls = require('hls.js')
    // 加载flv播放功能
    window.Flv = require('flv.js')
    this.playerInit()
  },
  methods: {
    playerInit() {
      const dp = new DPlayer({
        lang: 'zh-cn',
        preload: 'auto',
        mutex: true, // 播放互斥
        theme: '#58bc58',
        container: document.getElementById('player'),
        screenshot: true,
        video: {
          url: this.url,
          pic: this.pic
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  #player {
    width: 100vw;
    height: 360rpx;
  }
}
</style>
