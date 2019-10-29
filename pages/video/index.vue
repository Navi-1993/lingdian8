<!--
 * @Description: 视频首页
 * @Author: Edmund
 * @Email: q1592193221@gmail.com
 * @Date: 2019-10-21 14:16:12
 * @LastEditTime: 2019-10-29 11:52:40
 * @LastEditors: Edmund
 -->

<template>
    <view class="video_container">
        <my-player  class="player"
                    v-for="(item,idx) of 10"
                    :key="idx"
                    src="https://cloud.video.taobao.com/play/u/168578/p/1/e/6/t/1/228434593543.mp4?auth_key=YXBwX2tleT04MDAwMDAwMTImYXV0aF9pbmZvPXsidGltZXN0YW1wRW5jcnlwdGVkIjoiY2FiNjg3ZWM5N2Y0MThkN2Q2ZjI1ZDEwODY0NGE1YmIifSZkdXJhdGlvbj0mdGltZXN0YW1wPTE1NzIzMTg4NTA=">
        </my-player>
    </view>
</template>


<script>
import myPlayer from 'components/my-player.vue'
export default {
  name: 'video',
  components: {
    myPlayer
  },
  props: {},
  created() {},
  onLoad() {},
  onShow() {
    // #ifdef APP-PLUS
    // 通过 id 获取 nvue 子窗体
    const subNVue = uni.getSubNVueById('swiper-nav')
    // 打开 nvue 子窗体
    subNVue.show('slide-in-left', 300, function() {
      // console.log('the subNvue was opened')
      //
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
.video_container {
  height: 400vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: auto;
  .swiper-bar {
    position: fixed;
  }
  .player {
    border-radius: 20rpx;
  }
}
</style>