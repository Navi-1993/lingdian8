<!--
 * @Description: 视频详情
 * @Author: Edmund
 * @Email: q1592193221@gmail.com
 * @Date: 2019-11-20 00:58:12
 * @LastEditTime: 2019-11-20 02:52:37
 * @LastEditors: Edmund
 -->

<template>
  <view class="container" :style="{ height: windowHeight + 'px' }">
    <view class="header">
      <player
        :url="url"
        :width="750"
        :height="420"
        :poster="poster"
        :type="type"
      />
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
      poster: `https://wongxuefeng.com/bg.jpg`
    }
  },
  beforeCreate() {
    // #ifndef APP-PLUS
    console.time('renderTime')
    // #endif
  },
  created() {
    that = this
    that.windowHeight = this.$sysCall.windowHeight()
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
  }
  .body {
    flex: 1;
    background: blue;
  }
}
</style>
