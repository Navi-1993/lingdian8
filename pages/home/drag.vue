<!--
 * @Description: 拖拽排序
 * @Author: Edmund
 * @Email: q1592193221@gmail.com
 * @Date: 2019-11-18 22:07:02
 * @LastEditTime: 2019-11-20 12:30:58
 * @LastEditors: Edmund
 -->

<template>
  <view class="container" :style="{ height: windowHeight + 'px' }">
    <!-- #ifndef H5 -->
    <view class="header">
      <drag-sort :seletedList="seletedList" :props="props" @change="itemChange">
      </drag-sort>
    </view>
    <!-- #endif -->
    <!-- #ifdef H5 -->
    <view class="seleted_title">
      <text class="strong">请选择</text>
      <text class="mini">可长按并拖拽调整顺序</text>
    </view>

    <!-- 可排序列表 -->
    <vuedraggable class="wrapper" v-model="seletedList" handle=".handle">
      <transition-group>
        <div v-for="(item, idx) in seletedList" :key="idx" class="item">
          <div class="sortItem">
            <text class="iconfont sub" @tap="removeItem(item)">
              &#xe605;
            </text>
            <text class="">{{ item.name }}</text>
          </div>
          <div class="handle iconfont">&#xe689;</div>
        </div>
      </transition-group>
    </vuedraggable>

    <!-- 不可排序列表 -->
    <view class="seleted_title">
      <text class="strong">未选择</text>
    </view>
    <vuedraggable class="wrapper" v-model="unseletedList" handle=".nonono">
      <transition-group>
        <div v-for="(item, idx) in unseletedList" :key="idx" class="item">
          <div class="sortItem">
            <text class="">{{ item.name }}</text>
          </div>
          <div class="handle iconfont add">&#xe604;</div>
        </div>
      </transition-group>
    </vuedraggable>
    <!-- #endif -->
  </view>
</template>

<script>
let that
import dragSort from 'components/drag-sort/index.vue'
// #ifdef H5
import vuedraggable from 'vuedraggable'
// #endif
export default {
  name: 'drag',
  components: {
    dragSort,
    // #ifdef H5
    vuedraggable
    // #endif
  },
  props: {},
  data() {
    return {
      windowHeight: 0,
      props: {
        label: 'name'
      },
      seletedList: [
        { name: 'John', text: '', id: 0 },
        { name: 'Joao', text: '', id: 1 },
        { name: 'Jean', text: '', id: 2 }
      ],
      unseletedList: [
        { name: 'nana', text: '', id: 4 },
        { name: 'mimi', text: '', id: 5 },
        { name: 'coco', text: '', id: 6 }
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
    that.windowHeight = that.$sysCall.windowHeight()
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
    /**
     * @Description: drag-sort组件$emit change 时更改 Item
     * @e {Object} drag-组件定义的事件值
     * @return: void
     */
    itemChange(e) {
      let currentItem = e.item

      // 刷新数据
      that.updateList(currentItem)
    },
    updateList(currentItem) {
      console.log('currentItem', currentItem)
      // TODO:从数组中找1个符合需求的元素，返回其索引
      let currentIdx = currentItem.index
      let frontIdx = currentItem.oldIdx
      // 交换数组元素位置
      let temp = this.seletedList[currentIdx]
      this.seletedList[currentIdx] = this.seletedList[frontIdx]
      this.seletedList[frontIdx] = temp
      console.log('result', currentIdx)
      console.log('front', frontIdx)
      console.table('seletedList', this.seletedList)
    },
    /**
     * @Description: 删除数组内元素
     * @param {object}  item 点击时返回的对应数据
     * @return: void
     */
    removeItem(item) {
      // 找到目标在原数组中的索引
      let idx = that.seletedList.findIndex(ele => {
        return ele.id === item.id
      })
      // 删掉该元素
      that.seletedList.splice(idx, 1)
    }
  },
  computed: {},
  watch: {}
}
</script>

<style lang="scss" scoped>
.container {
  overflow: hidden;
  .seleted_title {
    height: 58rpx;
    padding: 0 38rpx;
    background: $default-bg-gray;
    display: flex;
    align-items: center;
    .strong {
      font-size: 26rpx;
      margin-right: 14rpx;
    }
    .mini {
      font-size: 22rpx;
      color: $default-text-color-inverse;
    }
  }
}
.wrapper {
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.item {
  position: relative;
  height: 80rpx;
  font-size: 30rpx;
  padding-left: 40rpx;
  display: flex;
  align-items: center;
  border-bottom: 1rpx solid $default-border-color;
  .add,
  .sub {
    font-size: 38rpx;
    color: red;
    margin-right: 17rpx;
  }
  .handle {
    height: 100%;
    width: 60rpx;
    font-size: 36rpx;
    position: absolute;
    right: 20rpx;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
