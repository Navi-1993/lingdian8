<!--
 * @Description: 注册页
 * @Author: Edmund
 * @Email: q1592193221@gmail.com
 * @Date: 2019-11-06 17:16:48
 * @LastEditTime: 2019-11-17 00:12:43
 * @LastEditors: Edmund
 -->

<template>
  <view class="container">
    <view class="color-list">
      <drag-sort :list="list" :props="props" @change="itemChange"> </drag-sort>
    </view>
  </view>
</template>

<script>
let that
import dragSort from 'components/drag-sort/index.vue'
export default {
  name: 'drag',
  components: { dragSort },
  props: {},
  data() {
    return {
      props: {
        label: 'key'
      },
      list: [
        {
          key: '标题1'
        },
        {
          key: '标题2'
        },
        {
          key: '标题3'
        },
        {
          key: '标题4'
        },
        {
          key: '标题5'
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
    console.log(`%c${that.__route__}`, 'color:yellow;background-color:black')
    // #endif
  },
  onHide() {},
  onUnload() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    /**
     * @Description: drag-组件$emit change 时更改 Item
     * @e {Object} drag-组件定义的事件值
     * @return: void
     */
    itemChange(e) {
      let currentItem = e.item
      let frontItem = e.frontItem

      // 刷新数据
      that.updateList(currentItem, frontItem)
    },
    updateList(currentItem, frontItem) {
      console.log('currentItem', currentItem)
      console.log('frontItem', frontItem)
      // TODO:从数组中找1个符合需求的元素，返回其索引
      let idx = this.$_.findIndex(this.list, item => {
        return item.key === currentItem.key
      })
      console.log('result', idx)
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
