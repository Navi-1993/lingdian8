<!--
 * @Description: H5播放器--xgplayer-hls FIXME:全局仅支持单例
 * @Author: Edmund
 * @Email: q1592193221@gmail.com
 * @Date: 2019-11-18 16:16:10
 * @LastEditTime: 2019-11-20 02:53:28
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
import 'xgplayer'
import Player from 'xgplayer'
import hlsPlayer from 'xgplayer-hls.js'
let control
// #endif
export default {
  name: 'xgPlayer',
  props: {
    url: {
      type: String
    },
    type: {
      type: Number,
      default: 1
    },
    poster: {
      type: String
    },
    width: {
      type: Number,
      default: 750
    },
    height: {
      type: Number,
      default: 375
    }
  },
  components: {},
  data() {
    return {
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
        playsinline: true, // 开启IOS,微信内联样式
        useHls: true // 移动端是否开启hls解析
      }

      // TODO:基础配置参数对象
      let options = {
        el: that.$refs.player,
        url: that.url,
        volume: 1, // 设置默认音量为100% ,参考值为0~1
        videoInit: true, // 初始化视频显示第一帧
        // autoplay: true, // 是否自动播放
        loop: true, // 循环播放
        ideoInit: true, // 显示视频首帧,FIXME: 移动端无效
        // poster: that.poster, // 封面图
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
        cssFullscreen: true, // 是否开启css全屏样式，显示新控件
        width: (that.width / 750) * that.windowWidth, // 默认600px
        height:
          (that.height / that.width) * (that.width / 750) * that.windowWidth // 默认375px
      }
      // TODO: 播放速率配置项
      if (true) {
        delete options.playbackRate
        delete options.defaultPlaybackRate
      }
      let player
      switch (that.type) {
        case 1:
          player = new Player(options)
          break
        case 2:
          player = new hlsPlayer(options)
      }
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
  .player {
    background: transparent; // 通过占位元素div更改播放器的背景颜色
  }
}
</style>
