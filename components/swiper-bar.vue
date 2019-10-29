<!--
 * @Description: 自定义滚动tab组件
 * @Author: Edmund
 * @Email: q1592193221@gmail.com
 * @Date: 2019-10-21 15:41:34
 * @LastEditTime: 2019-10-29 16:07:10
 * @LastEditors: Edmund
 * @scrollXshow {Boolean} 值为true时，通过设置scroll-y的位置，让scroll-x消失
 * @styleObject {Object} 传入的样式，会覆盖掉当前默认样式
 -->
<template>
    <view class="container">
        <scroll-view  scroll-x="true"
                      class="scrollView"
                      :scroll-top="scrollXshow ? 1 : 0">
            <view   class="scroll-view-item"
                    v-for="(item,idx) of renderData"
                    :style="[defaultStyle,styleObject]"
                    :key="idx">
                    {{item}}
            </view>
                    
        </scroll-view>
        <view class="stepping-stone"></view>
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
    scrollXshow: {
      type: Boolean,
      default: false
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
$height: 76rpx;
.container {
  overflow: hidden;
}
.scrollView {
  position: fixed;
  z-index: 100;
  width: 100vw;
  background: $default-bg-white;
  display: flex;
  white-space: nowrap;
  align-items: center;
  .scroll-view-item {
    display: inline-block;
    height: $height;
    margin: 0 58rpx;
    line-height: 76rpx;
    font-size: 36rpx;
  }
}
.stepping-stone {
  width: 100vw;
  height: $height;
}
</style>