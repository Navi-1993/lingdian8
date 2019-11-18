<!--
 * @Description: H5播放器--xgplayer FIXME:全局仅支持单例，页面需要有多个播放器，需到对应页面通过遍历反复创建实例
 * @Author: Edmund
 * @Email: q1592193221@gmail.com
 * @Date: 2019-11-18 16:16:10
 * @LastEditTime: 2019-11-18 19:00:50
 * @LastEditors: Edmund
 -->
<template>
  <div class="container">
    <div class="fluentBox">
      <div class="player" ref="player"></div>
    </div>
  </div>
</template>
<script>
let that
// #ifdef H5
import Player from 'xgplayer'
let control
// #endif
export default {
  name: 'xgPlayer',
  props: {},
  components: {},
  data() {
    return {
      url: `https://r6---sn-i3b7kn7k.googlevideo.com/videoplayback?expire=1574089407&ei=X17SXZLuFZWClQTehLqgBA&ip=103.35.74.224&id=o-ALeuelcHhusR03RZwjdAbaxk92tqrTkj6-5LFJ4ZAOA1&itag=22&source=youtube&requiressl=yes&mm=31%2C26&mn=sn-i3b7kn7k%2Csn-a5meknl7&ms=au%2Conr&mv=m&mvi=5&pl=24&initcwndbps=635000&mime=video%2Fmp4&ratebypass=yes&dur=1371.834&lmt=1569408290356171&mt=1574067641&fvip=6&fexp=23842630&c=WEB&txp=2316222&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cmime%2Cratebypass%2Cdur%2Clmt&sig=ALgxI2wwRQIhAPlJcT8HLcdmopbx6iTRz7gS58af3jIlQUGZxsSfLK44AiAjXalqbR-BpdJKalhDlL-EfZl1-_TfnhTXD8yif13o6Q%3D%3D&lsparams=mm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AHylml4wRgIhAPuLDe9teRfcL-47ocZatkhUGrzdK-V6kI0PuZo2iPvfAiEA5WfTgOxNzND3i0fDd3svvYPVGOIqo9hsfALtZEGemXU%3D`, // 链接地址
      poster: `https://wongxuefeng.com/bg.jpg`, //封面图
      windowWidth: 0
    }
  },
  created() {
    that = this
    uni.getSystemInfo({
      success: function(res) {
        that.windowWidth = res.windowWidth
      }
    })
  },
  mounted() {
    that.playerInit()
    // 播放器实例控制器
    if (control) {
      // do sth for player
    }
  },
  methods: {
    /**
     * @Description: 播放器初始化
     */
    playerInit() {
      // TODO:移动端配置参数对象
      let mobileOptions = {
        // 移动端配置白名单,[字符串，正则，函数]
        whitelist: [],
        playsinline: true // 开启IOS,微信内联样式
      }

      // TODO:基础配置参数对象
      let options = {
        el: that.$refs.player,
        url: that.url,
        volume: 1, // 设置默认音量为100% ,参考值为0~1
        // autoplay: true, // 是否自动播放
        loop: true, // 循环播放
        ideoInit: true, // 显示视频首帧,FIXME: 移动端无效
        poster: this.poster, // 封面图
        playbackRate: [0.5, 0.75, 1, 1.5, 2], // 播放速率
        defaultPlaybackRate: 1, // 默认播放速度
        ...mobileOptions, // 将移动端配置展开

        // fluid: true, // 流式布局，跟随容器宽度，通过比例调整高度
        // preloadTime: 15, // 预加载15秒,需配置nginx实现跨域
        // rotate: {
        //   //视频旋转按钮配置项
        //   innerRotate: true, //只旋转内部video
        //   clockwise: true // 旋转方向是否为顺时针
        // }
        width: (710 / 750) * that.windowWidth, // 默认600px
        height: (488 / 710) * (710 / 750) * that.windowWidth // 默认375px
      }
      // 当不是
      if (true) {
        delete options.playbackRate
        delete options.defaultPlaybackRate
      }
      let player = new Player(options)
      control = player
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  .fluentBox {
    width: 710rpx;
    height: 488rpx;
  }
  .player {
    background: gray; // 通过占位元素div更改播放器的背景颜色
  }
}
</style>
