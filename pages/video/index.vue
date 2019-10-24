<!--
 * @Description: 视频首页
 * @Author: Edmund
 * @Email: q1592193221@gmail.com
 * @Date: 2019-10-21 14:16:12
 * @LastEditTime: 2019-10-24 17:23:52
 * @LastEditors: Edmund
 -->

<template>
    <view class="video_container">
        <my-player  class="player"
                    src="https://r5---sn-i3b7knsl.googlevideo.com/videoplayback?expire=1571930596&ei=hG2xXaS6H5KHs8IPxIqOoAU&ip=103.35.74.224&id=o-AJskgsVg2yQ9FU2au-VyWEf5pRob6rD6RvmeE6iuNUKM&itag=22&source=youtube&requiressl=yes&mm=31%2C26&mn=sn-i3b7knsl%2Csn-a5mlrnek&ms=au%2Conr&mv=m&mvi=4&pl=24&initcwndbps=1150000&mime=video%2Fmp4&ratebypass=yes&dur=700.499&lmt=1571052307327041&mt=1571908898&fvip=5&fexp=23842630&c=WEB&txp=5535432&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cmime%2Cratebypass%2Cdur%2Clmt&sig=ALgxI2wwRgIhAJKD3grQ54XWtnp8vjgJTUiACQ_0a4OEIj9WAObvEIMhAiEAnoPzwq9fW5OuYWrhgePK-EEUJrbLF3yZgK1aNMiItb8%3D&lsparams=mm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AHylml4wRAIgdCnWBGwuz6sCYnG-WVj2JN_eUWLlDmOElUqi0WqnngcCICS2oCETzoMrmRdnDNfkXM6_xoJbMQ6CwZ-mL83dA6_U">
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