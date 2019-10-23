<!--
 * @Description: 自定义滚动tab组件
 * @Author: Edmund
 * @Email: q1592193221@gmail.com
 * @Date: 2019-10-21 15:41:34
 * @LastEditTime: 2019-10-23 11:39:17
 * @LastEditors: Edmund
 * @scrolltop {Number} 值为200时，滚动条移出视图
 * @styleObject {Object} 传入的样式，会覆盖掉当前默认样式
 -->
<template>
    <view class="container">
        <scroll-view  scroll-x="true"
                      class="scrollView"
                      scroll-y="true">
                    <view   class="scroll-view-item"
                            v-for="(item,idx) of renderData"
                            :scroll-top="scrolltop"
                            :style="[defaultStyle,styleObject]"
                            :key="idx">
                            {{item}}
                    </view>
                    
        </scroll-view>
    </view>
</template>

<script>
export default {
  name: '',
  props: {
    styleObject: {
      type: Object,
      default: {}
    },
    scrolltop: {
      type: Number,
      default: 0
    },
    renderData: {
      type: Array,
      default: []
    }
  },
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
.scrollView {
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