<!--
 * @Description: 
 * @Author: Edmund
 * @Email: q1592193221@gmail.com
 * @Date: 2019-11-16 18:28:05
 * @LastEditTime: 2019-11-16 21:31:32
 * @LastEditors: Edmund
 -->
<template>
  <movable-area
    class="drag-sort"
    :style="{ height: currentListLength + 'px' }"
    id="drag"
  >
    <block v-for="(item, index) in currentList" :key="index">
      <movable-view
        :x="0"
        :y="item.y"
        direction="vertical"
        disabled
        damping="0"
        :animation="active !== index"
        class="drag-sort-item"
        style="height:55px"
        :class="{ active: active === index, 'vh-1px-t': item.index > 0 }"
      >
        <view class="item" @tap="deleteItem">{{ item[props.label] }}</view>
        <view class="touch-tight">
          <view class="ico_drag"></view>
        </view>
      </movable-view>
    </block>
    <movable-view
      class="touch"
      :x="2000"
      @touchstart.stop="touchstart"
      @touchmove.stop="touchmove"
      @touchend.stop="touchend"
      catchtouchstart
      catchtouchmove
      catchtouchend
    ></movable-view>
  </movable-area>
</template>

<script>
export default {
  name: 'drag-sort',
  mixins: [],
  components: {},
  data() {
    return {
      height: 55, // 高度
      currentList: [],
      active: -1, // 当前激活的item
      itemIndex: 0, // 当前激活的item的原index
      topY: 0, // 距离顶部的距离
      deviationY: 0 // 偏移量
    }
  },
  computed: {
    // 动态计算拖拽组件高度
    currentListLength() {
      return this.currentList.length * this.height
    }
  },
  props: {
    list: {
      type: Array,
      default: () => {
        return []
      }
    },
    props: {
      type: Object,
      default: () => {
        return {
          label: 'label',
          value: 'value'
        }
      }
    }
  },
  watch: {
    // 对父组件来值list进行监听，当发生变化时，执行更新方法
    list(val) {
      this.onUpdateCurrentList()
    }
  },
  created() {
    this.onUpdateCurrentList()
  },
  mounted() {},
  updated() {},
  filters: {},
  methods: {
    deleteItem() {
      this.currentList.push({ key: `${new Date() * 1}` })
      this.$forceUpdate()
    },
    /**
     * @Description: 更新数据
     * @param {type}
     * @return:
     */
    onUpdateCurrentList() {
      let arr = []
      for (let key in this.list) {
        arr.push({
          ...this.list[key],
          index: Number(key),
          y: key * this.height,
          animation: true
        })
      }
      this.currentList = arr
    },
    touchstart(e) {
      // 计算y轴点击位置
      var query = wx.createSelectorQuery().in(this)
      query.select('#drag').boundingClientRect()
      query.exec(res => {
        console.log('点击元素信息:', res)
        this.topY = res[0].top
        let touchY = e.mp.touches[0].clientY - res[0].top
        this.deviationY = touchY % this.height
        // console.log(touchY)
        // 点击时对每个数组元素进行判断
        for (let key in this.currentList) {
          if (
            this.currentList[key].index * this.height <= touchY &&
            (this.currentList[key].index + 1) * this.height >= touchY
          ) {
            console.log('seleted success')
            this.active = Number(key)
            this.itemIndex = this.currentList[key].index
            break
          }
        }
      })
    },
    touchmove(e) {
      // 没有选中元素则退出
      if (this.active < 0) return
      let touchY = e.mp.touches[0].clientY - this.topY - this.deviationY
      console.log('鼠标当前y坐标', touchY)
      // 更新激活item的y坐标
      this.currentList[this.active].y = touchY
      for (const key in this.currentList) {
        // 跳过当前操作的item
        if (
          this.currentList[key].index !== this.currentList[this.active].index
        ) {
          if (
            this.currentList[key].index > this.currentList[this.active].index
          ) {
            if (
              touchY >
              this.currentList[key].index * this.height - this.height / 2
            ) {
              this.currentList[this.active].index = this.currentList[key].index
              this.currentList[key].index = this.currentList[key].index - 1
              this.currentList[key].y =
                this.currentList[key].index * this.height
              break
            }
          } else {
            // 若移动距离超过格子的一半，则更新所有元素的索引值
            if (
              touchY <
              this.currentList[key].index * this.height + this.height / 2
            ) {
              console.log('activeItem idx', this.currentList[this.active].index)
              this.currentList[this.active].index = this.currentList[key].index
              this.currentList[key].index = this.currentList[key].index + 1
              this.currentList[key].y =
                this.currentList[key].index * this.height
              break
            }
          }
        }
      }
    },
    touchend(e) {
      if (
        this.itemIndex !== this.currentList[this.active].index &&
        this.active > -1
      ) {
        this.$emit('change', {
          // 操作值
          data: (() => {
            let data = {
              ...this.currentList[this.active]
            }
            delete data.index
            delete data.y
            delete data.animation
            return data
          })(),
          // 插队的位置前面的值
          frontData: (() => {
            for (const iterator of this.currentList) {
              if (this.currentList[this.active].index - 1 === iterator.index) {
                let data = {
                  ...iterator
                }
                delete data.index
                delete data.y
                delete data.animation
                return data
              }
            }
          })()
        })
      }
      console.log('改变前item的y=', this.currentList[this.active].y)
      this.currentList[this.active].animation = true
      this.currentList[this.active].y =
        this.currentList[this.active].index * this.height
      console.log('改变后item的y=', this.currentList[this.active].y)
      this.active = -1
      // 修正拖拽后出错的高度
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~./1px.scss';
.drag-sort {
  width: 100%;
}
.drag-sort-item {
  position: absolute !important;
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0;
  margin: 0;
  background: #fff;
  padding: 0 15rpx;
  box-sizing: border-box;
  .item {
    flex: 1;
  }
  .touch-tight {
    width: 24px;
    display: flex;
    justify-content: center;
  }
}
.touch {
  height: 100%;
  width: 50rpx;
}
.ico_drag {
  display: inline-block;
  width: 24rpx;
  height: 12rpx;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAYCAYAAAC8/X7cAAAAAXNSR0IArs4c6QAAAEtJREFUWAnt1cEJACAMA0B1/506moIr5FEK51+Jl0d2Vd01+JzB2X90H5jeoPwECBDIBLYlzgDj25Y4JvQAAQIERgtY4u76LHF3Aw8rGQnK3sYAXQAAAABJRU5ErkJggg==)
    0 0 no-repeat;
  background-size: 100% auto;
}
.active {
  box-shadow: 0 0 40rpx #dddddd;
  z-index: 99;
}
</style>
