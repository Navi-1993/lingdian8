<template>
    <view class="container">
        <scroll-view scroll-x="true"
                    scroll-y="true">
                    <view   class="scroll-view-item"
                            v-for="(item,idx) of 20"
                            scroll-top="200"
                            :style="[defaultStyle]"
                            :key="idx">
                      NBA大老粗
                    </view>
                    
        </scroll-view>
    </view>
</template>

<script>
export default {
  data() {
    return {
      defaultStyle: {
        color: 'red',
        fontSize: 24 + 'rpx'
      }
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
scroll-view {
  width: 100vw;
  display: flex;
  white-space: nowrap;
  align-items: center;
  .scroll-view-item {
    display: inline-block;
    margin: 0 58rpx;
    line-height: 76rpx;
    font-size: 36rpx;
  }
}
</style>