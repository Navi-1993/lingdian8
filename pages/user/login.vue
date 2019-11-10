<!--
 * @Description: 登陆页
 * @Author: Edmund
 * @Email: q1592193221@gmail.com
 * @Date: 2019-11-06 17:16:48
 * @LastEditTime: 2019-11-10 21:42:52
 * @LastEditors: Edmund
 -->


<template>
    <view class="container">
        <view class="bg_top">
            <image  src=""
                    class="logo"/>
        </view>
        <view class="form-card">
            <input  type="text"
                    placeholder-class="placeholder"
                    class="input-username"
                    placeholder="请输入账号">
            <input  type="password"
                    class="input-psw"
                    placeholder="请输入密码">
        </view>
	</view>
</template>

<script>
let that
export default {
  name: '',
  components: {
  },
  props: {},
  data () {
    return {
      windowHeight: 0
    }
  },
  beforeCreate () {
    // #ifndef APP-PLUS
    console.time('renderTime') // 创建到渲染所耗时间，大于3秒则加入优化计划
    // #endif
  },
  created () {
    that = this
    // 测试时使用
    // uni.getSystemInfo({
    //   success: res => {
    //     that.windowHeight = res.windowHeight
    //   }
    // })
  },
  beforeMount () { },
  mounted () { },
  onLoad () { },
  onShow () { },
  onReady () {
    // #ifndef APP-PLUS
    console.timeEnd('renderTime')
    // #endif
  },
  onHide () { },
  onUnload () { },
  beforeDestroy () { },
  destroyed () { },
  methods: {},
  computed: {},
  watch: {}
}
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  height: 100vh;
  display: flex;
  flex-direction: column;
  .bg_top {
    background-color: $default-bg-black;
    height: 366rpx;
    display: flex;
    justify-content: center;
    .logo {
      height: 196rpx;
      width: 196rpx;
      background-color: green;
    }
  }
  .placeholder {
    padding: 0 50rpx;
    color: red;
  }
  .form-card {
    width: 690rpx;
    height: 800rpx;
    background: $default-bg-white;
    box-shadow: 0rpx 0rpx 16rpx 0rpx rgba(0, 0, 0, 0.1);
    border-radius: 12rpx;
    @include center;
    top: 600rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    .input-username {
      width: 580rpx;
      height: 78rpx;
      border: 1rpx solid $default-border-color;
      border-radius: 39rpx;
      font-size: 26rpx;
      margin: {
        top: 50rpx;
        right: auto;
        bottom: 26rpx;
        left: auto;
      }
    }
    .input-psw {
      width: 580rpx;
      height: 78rpx;
      border: 1rpx solid $default-border-color;
      border-radius: 39rpx;
      font-size: 26rpx;
    }
  }
}
</style>