<!--
 * @Description: 视频首页
 * @Author: Edmund
 * @Email: q1592193221@gmail.com
 * @Date: 2019-10-21 14:20:23
 * @LastEditTime: 2019-11-18 18:15:22
 * @LastEditors: Edmund
 -->

<template>
  <view class="container" :style="{ height: windowHeight + 'px' }">
    <!-- #ifdef H5 -->
    <!-- <d-player class="dplayer"> </d-player> -->

    <xg-player class="xgplayer" src=""></xg-player>
    <!-- #endif -->
  </view>
</template>

<script>
let that
// #ifdef H5
import dPlayer from 'paltform/h5/player/dplayer.vue'
import xgPlayer from 'paltform/h5/player/xgplayer.vue'
// #endif
export default {
  name: 'video',
  components: {
    // #ifdef H5
    dPlayer,
    xgPlayer
    // #endif
  },
  props: {},
  created() {
    that = this
  },
  onLoad() {},
  onShow() {
    // #ifdef APP-PLUS
    // 通过id获取nvue子窗体
    const playerNVue = uni.getSubNVueById('myplayer')
    // 打开 nvue 子窗体
    playerNVue.show('slide-in-right', 300, function() {
      console.log('open')
    })
    // #endif
  },
  mounted() {
    uni.getSystemInfo({
      success: function(res) {
        that.windowHeight = res.windowHeight
        console.log(that.windowHeight)
      }
    })
  },
  onHide() {},
  onUnload() {},
  data() {
    return {
      windowHeight: 0 // 设备可用高度
    }
  },
  methods: {},
  computed: {},
  watch: {}
}
</script>

<style lang="scss" scoped>
.container {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: auto;
  background: gray;
}
</style>
