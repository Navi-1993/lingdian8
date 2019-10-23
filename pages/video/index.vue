<!--
 * @Description: 视频首页
 * @Author: Edmund
 * @Email: q1592193221@gmail.com
 * @Date: 2019-10-21 14:16:12
 * @LastEditTime: 2019-10-23 13:59:52
 * @LastEditors: Edmund
 -->

<template>
    <view class="video_container">
      <swiper-bar   :styleObject="styleObject"
                    :renderData = "sportNameList"
                    scrolltop = "200"
                    class="swiper-bar">
      </swiper-bar>
      <view style="height:76rpx;width:100vw;"></view>
      <view>

        <my-player  class="player"
                    src="https://r3---sn-i3b7knlk.googlevideo.com/videoplayback?expire=1571831965&ei=PeyvXZf1Ktay4wLWmZXABw&ip=103.35.74.224&id=o-AGmd29fBiACcGhZOgVIyZBZ1EhjnKBEXYb0FLdPg5abI&itag=18&source=youtube&requiressl=yes&mm=31%2C29&mn=sn-i3b7knlk%2Csn-i3belney&ms=au%2Crdu&mv=m&mvi=2&pl=24&initcwndbps=965000&mime=video%2Fmp4&gir=yes&clen=277221652&ratebypass=yes&dur=8085.304&lmt=1556525767223064&mt=1571810289&fvip=3&fexp=23842630&c=WEB&txp=5531432&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cmime%2Cgir%2Cclen%2Cratebypass%2Cdur%2Clmt&lsparams=mm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AHylml4wRQIhAP0Y0Gt_Bv7NSASsPcop4UY_TOsMPg5Y4FbyThh0AU0-AiBoM14BjqyVYpLM2dnxtwgc70kK8-kY95HH89uKeCbNWQ%3D%3D&sig=ALgxI2wwRgIhAIU9wubii1Tu7w475Ed3LCpR-XQGJerM8147KV0a_c26AiEA4XtjeXDe5MtS525VGgXcV0iGSKyygEyL6EcpH7kblL0=">
        </my-player>
		<nav></nav>
      </view>
    </view>
</template>


<script>
import uniNavBar from 'components/uni-nav-bar/uni-nav-bar.vue'
import swiperBar from 'components/swiper-bar.vue'
import myPlayer from 'components/my-player.vue'
export default {
  name: 'video',
  components: {
    swiperBar,
    uniNavBar,
    myPlayer
  },
  props: {},
  created() {},
  onLoad() {},
  onShow() {
    // 通过 id 获取 nvue 子窗体
    const subNVue = uni.getSubNVueById('swiper-bar')
    // 打开 nvue 子窗体
    subNVue.show('slide-in-left', 300, function() {
      console.log('the subNvue was opened')
      //
    })
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