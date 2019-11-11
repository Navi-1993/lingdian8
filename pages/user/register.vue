<!--
 * @Description: 注册页
 * @Author: Edmund
 * @Email: q1592193221@gmail.com
 * @Date: 2019-11-10 21:42:14
 * @LastEditTime: 2019-11-11 17:12:21
 * @LastEditors: Edmund
 -->

<template>
    <view class="container">
        <view class="topLayout">
            <image class="iconLogo"></image>
        </view>
        <view class="contentLayout"
              :style="[{'height':contentHeight}]">
            <input  class="input1" 
                    placeholder="请输入手机号"
                    v-model="user"
                    type="number" />
          <view>
            <view   v-if="getCode"
                    class="btGet">
                    60s
            </view>
            <view v-else class="btGet">获取</view>
            <input  class="input2"
                    v-model="verifiCode"
                    placeholder="请输入手机验证码"
                    type="text" />
          </view>
          <input  class="input1" 
                  placeholder="请输入密码"
                  v-model="password"
                  type="password" />
          <button class="btSubmit"
                  type="default">
                  注册
          </button>
        </view>
    </view>
</template>

<script>
let that
export default {
  name: '',
  components: {},
  props: {},
  data () {
    return {
      contentHeight: '0px',
      getCode: false,
      user: '',
      password: '',
      verifiCode: ''
    }
  },
  beforeCreate () {
    // #ifndef APP-PLUS
    console.time('renderTime')
    // #endif
  },
  created () {
    that = this
    uni.getSystemInfo({
      success (res) {
        let naviHeight = 45;
        if (res.platform == 'android') {
          naviHeight = 50;
        }
        that.contentHeight = res.windowHeight - res.statusBarHeight - naviHeight - uni.upx2px(360 - 100 - 20) + "px";
      }
    })
  },
  onLoad () { },
  onShow () { },
  onReady () {
    // #ifndef APP-PLUS
    console.log(
      '%c如果渲染用时超过3秒，则列入待优化项目',
      'color: yellow; background-color: black;padding: 2px'
    )
    console.timeEnd('renderTime')
    // #endif
  },
  onHide () { },
  onUnload () { },
  onPullDownRefresh () { },
  onReachBottom () { },
  onShareAppMessage () { },
  onPageScroll () { },
  methods: {},
  computed: {},
  watch: {}
}
</script>

<style lang="scss" scoped>
page {
  background-color: $default-bg-white;
}

.topLayout {
  background-color: $default-bg-black;
  height: 360rpx;
  .iconLogo {
    background-color: $default-color-warning;
    width: 180rpx;
    height: 180rpx;
    border-radius: 8rpx;
    margin-top: 20rpx;
    margin-left: 285rpx;
  }
}

.contentLayout {
  background-color: $default-bg-white;
  border-radius: 10rpx;
  margin-top: -100rpx;
  width: 690rpx;
  margin-left: 30rpx;
  -moz-box-shadow: 0px 0px 5px $default-border-shadow;
  -webkit-box-shadow: 0px 0px 5px $default-border-shadow;
  box-shadow: 0px 0px 5px $default-border-shadow;
  padding-top: 40rpx;
  .input1 {
    width: 580rpx;
    height: 80rpx;
    line-height: 50rpx;
    margin-left: 45rpx;
    border: solid 1px $default-border-color;
    border-radius: 40rpx;
    font-size: 30rpx;
    text-align: center;
    padding: 0 10rpx;
    margin-bottom: 20rpx;
  }
  .input2 {
    width: 320rpx;
    height: 80rpx;
    line-height: 50rpx;
    margin-left: 45rpx;
    border: solid 1px $default-border-color;
    border-radius: 40rpx;
    font-size: 30rpx;
    text-align: center;
    padding: 0 130rpx;
    margin-bottom: 20rpx;
  }
  .btGet {
    width: 140rpx;
    height: calc(80rpx + 2px);
    line-height: calc(80rpx + 2px);
    text-align: center;
    color: $default-text-color-white;
    font-size: 30rpx;
    background-color: $default-bg-black;
    border-top-right-radius: 40rpx;
    border-bottom-right-radius: 40rpx;
    position: absolute;
    margin-left: 510rpx;
  }
  .btSubmit {
    color: $default-text-color-white;
    height: 80rpx;
    line-height: 80rpx;
    border-radius: 40rpx;
    font-size: 30rpx;
    width: 600rpx;
    background-color: $default-bg-black;
    margin-top: 120rpx;
  }
}
</style>