<template>
    <scroll-view class="container">
       <scroll-view scroll-x="true"
                    scroll-y="true"
                    @scrolltoupper="upper" 
                    @scrolltolower="lower"
                    @scroll="scroll">
                    <view id="demo1" class="scroll-view-item uni-bg-red">A</view>
                    <view id="demo2" class="scroll-view-item uni-bg-green">B</view>
                    <view id="demo3" class="scroll-view-item uni-bg-blue">C</view>
                </scroll-view>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    scroll() {
      console.log('wongwongwong')
    }
  }
}
</script>

<style lang="scss" scoped>
scroll-view {
  height: 100rpx;
}
</style>