<template>
  <div class="container">
    <div class="player" ref="player"></div>
  </div>
</template>
<script>
let that
// #ifdef H5

import Player from 'xgplayer'

// #endif
export default {
  name: 'xgPlayer',
  props: {},
  components: {},
  data() {
    return {
      url: `https://media.w3.org/2010/05/sintel/trailer.mp4`, // 链接地址
      pic: `https://wongxuefeng.com/bg.jpg` //封面图
    }
  },
  created() {
    that = this
  },
  mounted() {
    that.playerInit()
  },
  methods: {
    playerInit() {
      let player = new Player({
        el: that.$refs.player,
        url: that.url,
        fluid: true
        // width: 600, // 默认600px
        // height: 375, // 默认375px
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  .player {
    width: 100vw;
    height: 360rpx;
    // background: red; // 通过占位元素div更改播放器的背景颜色
  }
}
</style>
