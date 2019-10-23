<!--
 * @Description: 视频首页
 * @Author: Edmund
 * @Email: q1592193221@gmail.com
 * @Date: 2019-10-21 14:16:12
 * @LastEditTime: 2019-10-23 15:51:35
 * @LastEditors: Edmund
 -->

<template>
    <view class="video_container">
        <my-player  class="player"
                    src="rtmp://live5.zdldwovldc.zhibo.tv/8live/s_248910?k=a5f4510b480416a2b33ccf4978809aeb&t=5db00648">
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
      console.log('the subNvue was opened')
      //
    })
    // #endif
  },
  onReady() {},
  onHide() {},
  onUnload() {},
  onPullDownRefresh() {},
  onReachBottom() {},
  onShareAppMessage() {},
  onPageScroll() {},
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