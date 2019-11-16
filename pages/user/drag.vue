<!--
 * @Description: 注册页
 * @Author: Edmund
 * @Email: q1592193221@gmail.com
 * @Date: 2019-11-06 17:16:48
 * @LastEditTime: 2019-11-16 18:59:13
 * @LastEditors: Edmund
 -->

<template>
  <view class="container">
    <view class="color-list">
      <drag-sort :list="list" :props="props" @change="onDragSortChange">
      </drag-sort>
    </view>
  </view>
</template>

<script>
let that
import dragSort from 'components/drag-sort/index.vue'
export default {
  components: { dragSort },
  props: {},
  data() {
    return {
      props: {
        label: 'label'
      },
      list: [
        {
          label: '标题1'
        },
        {
          label: '标题2'
        },
        {
          label: '标题3'
        },
        {
          label: '标题4'
        },
        {
          label: '标题5'
        }
      ]
    }
  },
  beforeCreate() {
    // #ifndef APP-PLUS
    console.time('renderTime') // 创建到渲染所耗时间，大于3秒则加入优化计划
    // #endif
  },
  created() {
    that = this
    // 测试时使用
    uni.getSystemInfo({
      success: res => {
        console.log('手机品牌', res.brand) // 手机品牌
        console.log('手机型号', res.model) // 手机型号
        console.log('可使用窗口的顶部位置', res.windowTop)
        this.windowHeight = res.windowHeight
        console.log('状态栏的高度', res.statusBarHeight)
        console.log('可使用的窗口高度 = 100vh', res.windowHeight)
        console.log('可使用窗口的底部位置', res.windowBottom)
        console.log('导航栏的高度	', res.navigationBarHeight)
      }
    })
  },
  beforeMount() {},
  mounted() {},
  onLoad() {},
  onShow() {},
  onReady() {
    // #ifndef APP-PLUS
    console.timeEnd('renderTime')
    // #endif
  },
  onHide() {},
  onUnload() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    onDragSortChange(e) {
      console.log('list', list)
      console.log('e', e)
    }
  },
  computed: {},
  watch: {}
}
</script>

<style lang="scss" scoped>
.container {
  height: 100vh;
  overflow: auto;
  .moveBox {
    height: 600rpx;
    width: 100vw;
    background-color: gray;
    .moveItem {
      height: 80rpx;
      width: 100vw;
      background: red;
    }
  }
}
</style>
