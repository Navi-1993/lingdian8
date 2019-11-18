<!--
 * @Description: 视频首页
 * @Author: Edmund
 * @Email: q1592193221@gmail.com
 * @Date: 2019-10-21 14:20:23
 * @LastEditTime: 2019-11-18 15:04:43
 * @LastEditors: Edmund
 -->

<template>
  <view class="container">
    <!-- #ifdef H5 -->
    <player-h5 class="player_H5"> </player-h5>

    <!-- #endif -->
  </view>
</template>

<script>
// #ifdef H5
import playerH5 from 'components/h5/player/player.vue'
// #endif
export default {
  name: 'video',
  components: {
    // #ifdef H5
    playerH5
    // #endif
  },
  props: {},
  created() {},
  onLoad() {},
  onShow() {
    // #ifdef APP-PLUS
    // 通过id获取nvue子窗体
    const playerNVue = uni.getSubNVueById('myplayer')
    // 打开 nvue 子窗体
    playerNVue.show('slide-in-left', 300, function() {
      console.log('open')
    })
    // #endif
  },
  onReady() {
    uni.$emit('test', { title: '你好' })
  },
  onHide() {},
  onUnload() {},
  data() {
    return {
      navBarBackColor: '#1B1B30',
      navBarColor: '#FFFFFF',
      styleObject: {
        color: 'black'
      },
      faboriteData: [
        {
          name: 'wong'
        },
        {
          name: 'xue'
        },
        {
          name: 'feng'
        },
        {
          name: 'niu'
        },
        {
          name: 'xu'
        },
        {
          name: 'feng'
        },
        {
          name: 'jia'
        },
        {
          name: 'SB'
        }
      ]
    }
  },
  methods: {},
  computed: {
    sportNameList() {
      return this.$_.map(this.faboriteData, item => {
        return item.name
      })
    }
  },
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
  .player_H5 {
    background: red;
  }
}
</style>
