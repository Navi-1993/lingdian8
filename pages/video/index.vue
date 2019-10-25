<!--
 * @Description: 视频首页
 * @Author: Edmund
 * @Email: q1592193221@gmail.com
 * @Date: 2019-10-21 14:16:12
 * @LastEditTime: 2019-10-25 15:43:35
 * @LastEditors: Edmund
 -->

<template>
    <view class="video_container">
        <my-player  class="player"
                    src="https://r1---sn-i3b7knlk.googlevideo.com/videoplayback?expire=1572010710&ei=dqayXfDiIoScqQHeipeYDw&ip=103.113.156.26&id=o-ALF07uAMmFs8UEcPdhyle4w3gYkZT-5OQVlsKujKOpNA&itag=18&source=youtube&requiressl=yes&mm=31%2C26&mn=sn-i3b7knlk%2Csn-npoeen7y&ms=au%2Conr&mv=m&mvi=0&pl=24&initcwndbps=1680000&mime=video%2Fmp4&gir=yes&clen=21537494&ratebypass=yes&dur=292.687&lmt=1540747309774125&mt=1571989007&fvip=1&fexp=23842630&c=WEB&txp=5531432&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cmime%2Cgir%2Cclen%2Cratebypass%2Cdur%2Clmt&lsparams=mm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AHylml4wRAIgMaq8F_nLe96D6hId6sk6CSnziLOYSrfJ_12u2ObycnYCIGUi5_7r5c5bHNwgPrYe3BWI7hPxhQMI99OXHjakmaSm&sig=ALgxI2wwRgIhAP6DUzPpFDf9e9h2hirN_6Th1AXsDA2Y91KQfJcQl2k9AiEAzQZhoLsjcXNNE2USF4F10bC4qnp6swgvBeeQKhGWL4M=">
        </my-player>
        <view class="iconfont">&#xe604;123123</view>
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