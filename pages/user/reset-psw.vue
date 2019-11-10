<!--
 * @Description: 重置密码
 * @Author: Edmund
 * @Email: q1592193221@gmail.com
 * @Date: 2019-11-10 21:43:59
 * @LastEditTime: 2019-11-10 22:07:45
 * @LastEditors: Edmund
 -->

<template>
    <view class="container">
        <input  class="input1" 
                placeholder="请输入手机号" 
                type="number" />
            <view>
                  <view v-if="getCode" class="btGet">60s</view>
                  <view v-else class="btnGet">获取</view>
                  <input  class="input2" 
                          placeholder="请输入手机验证码"
                          type="text" />
            </view>
        <input  class="input1" 
                placeholder="重置密码" 
                type="password" />
        <input  class="input1"
                placeholder="确认密码" 
                type="password" />
        <button class="btnSubmit" 
                type="default">
                确定</button>
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
      getCode: false
    }
  },
  beforeCreate () {
    // #ifndef APP-PLUS
    console.time('renderTime')
    // #endif
  },
  created () {
    that = this
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

.container {
  margin-left: 30rpx;
  margin-top: 40rpx;
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
  .btnSubmit {
    color: $default-bg-white;
    height: 80rpx;
    line-height: 80rpx;
    border-radius: 40rpx;
    font-size: 30rpx;
    width: 600rpx;
    background-color: $default-bg-black;
    margin-top: 120rpx;
  }
  .btnGet {
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
}
</style>