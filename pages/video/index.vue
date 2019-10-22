<!--
 * @Description: vue文件模板
 * @Author: Edmund
 * @Email: q1592193221@gmail.com
 * @Date: 2019-10-21 14:16:12
 * @LastEditTime: 2019-10-22 17:59:07
 * @LastEditors: Edmund
 -->

<template>
    <view class="video_container">
      <!--  #ifndef MP-WEIXIN  -->
        <!-- 状态栏 -->
        <uni-nav-bar  title="视频"
                      :fixed="true"
                      :color = "navBarColor"
                      :background-color = "navBarBackColor"
                      status-bar="true"
                      :border="false">
          <view slot="right"
                style="font-size: 40rpx;"
                class="iconfont">
          </view>
        
        </uni-nav-bar>
      <!--  #endif -->
      <swiper-bar   :styleObject="styleObject"
                    :renderData = "sportNameList"
                    style="display:block;"
                    scrollTop="200">
      </swiper-bar>
      <view>
        <my-player  src="https://r4---sn-i3beln7k.googlevideo.com/videoplayback?expire=1571759394&ei=wtCuXcXZKdGn4ALTga_QAw&ip=103.35.74.224&id=o-AJ_RHfEJQ4PAZcqMV1AFiYWCyS8hRC02Gmy0ny4GD-qB&itag=22&source=youtube&requiressl=yes&mm=31%2C29&mn=sn-i3beln7k%2Csn-i3b7knld&ms=au%2Crdu&mv=m&mvi=3&pl=24&initcwndbps=908750&mime=video%2Fmp4&ratebypass=yes&dur=494.259&lmt=1571319586069714&mt=1571737718&fvip=4&fexp=23842630&c=WEB&txp=5535432&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cmime%2Cratebypass%2Cdur%2Clmt&sig=ALgxI2wwRQIhAN8xa_KzbwkgWPpFax3LseXkPL8z3yBC36KesaudIIugAiAC9l9583HogxysIqvzVqZVCklzjHzSgO3LIVG4mKsCdg%3D%3D&lsparams=mm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AHylml4wRQIhAOSNMDkug673fg4-JYCQQwiDLCha_-CNheAdg8nTkl9DAiAmU70IDJT1IBUC0im3rNHjr9oJiW3d8FFYeIrveY-EfA%3D%3D">
        </my-player>
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
  onShow() {},
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
  height: calc(100vh-108rpx);
}
</style>