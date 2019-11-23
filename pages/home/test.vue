<!--
 * @Description: 首页index
 * @Author: Edmund
 * @Email: q1592193221@gmail.com
 * @Date: 2019-11-23 22:21:58
 * @LastEditTime: 2019-11-23 22:38:41
 * @LastEditors: Edmund
 -->

<template>
  <view
    class="container"
    :style="{ height: windowHeight + 'px', minHeight: windowHeight + 'px' }"
  >
    <!-- tabbar -->
    <swiper :options="swiperOption">
      <swiper-slide>I'm Slide 1</swiper-slide>
      <swiper-slide>I'm Slide 2</swiper-slide>
      <swiper-slide>I'm Slide 3</swiper-slide>
      <swiper-slide>I'm Slide 1</swiper-slide>
      <swiper-slide>I'm Slide 2</swiper-slide>
      <swiper-slide>I'm Slide 3</swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <tui-loading :visible="isLoading"></tui-loading>
  </view>
</template>

<script>
let that
import _ from 'underscore'
import 'swiper/dist/css/swiper.css' //在全局没引入，这里记得要！
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import calendar from 'components/time_module/calendar.vue'
import tuiLoading from 'components/loading/loading.vue'
import eventCard from 'components/sportsEvent/event-card.vue'
import { queryAllEvent, queryAllMatchList } from '@/api/match.js'
export default {
  components: {
    calendar,
    eventCard,
    tuiLoading,
    swiper,
    swiperSlide
  },
  data() {
    return {
      windowHeight: '', //窗口高度
      tabbarList: [], // tabbar数据
      matchList: [], // 赛事数据
      currentTab: 0, //预设当前tab项的值
      scrollLeft: 0, //tab标题的滚动条位置
      isLoading: false, // 加载弹窗
      // TODO:
      swiperOption: {
        pagination: {
          el: '.swiper-pagination'
        },
        slidesPerView: 1,
        loop: true,
        spaceBetween: 30
      }
    }
  },
  beforeCreate() {
    // #ifndef APP-PLUS
    console.time('renderTime')
    // #endif
  },
  created() {
    that = this
    async function initFetch() {
      await that._queryAllEvent()
      await that.fetchEvent()
    }
    initFetch()
    that.windowHeight = that.$sysCall.windowHeight()
  },
  onReady() {
    // #ifndef APP-PLUS
    console.log(
      '%c如果渲染用时超过3秒，则列入待优化项目',
      'color: yellow; background-color: black;padding: 2px'
    )
    console.timeEnd('renderTime')
    // #endif
  },
  methods: {
    async _queryAllEvent() {
      let params = {
        offset: 1,
        limit: 7
      }
      let res = await queryAllEvent(params)
      if (res.statusCode === 200) {
        that.tabbarList = res.data.data.list
      }
    },
    /**
     * @Description: 跳至赛事聊天室页面
     */
    navi2Chatroom(item) {
      that.$Router.push({ path: '/pages/home/chatroom', params: item })
    },
    /**
     * @Description: 跳至拖拽排序页
     */
    navi2Drag() {
      that.$Router.push({ path: '/pages/home/drag' })
    },
    // 滚动切换标签样式
    switchTab: e => {
      // console.log('changeTab', e.detail.current)
      that.currentTab = e.target.current
      that.checkCor()
      that.fetchEvent()
    },
    // 点击标题切换当前页时改变样式
    swichNav: function(idx) {
      that.currentTab = idx
    },
    //判断当前滚动超过一屏时，设置tab标题滚动条。
    checkCor: function() {
      if (that.currentTab === 0) {
        that.scrollLeft = 0
      }
      // 如果当前选项卡索引值大于5，设置横向滚动条
      if (that.currentTab > 5) {
        that.scrollLeft = 30 * that.currentTab
      }
    },

    /**
     * @Description: 获取赛事展示数据,进行防抖处理
     */
    fetchEvent: _.debounce(async () => {
      that.isLoading = true
      let params = {
        // id: `${that.tabbarList[that.currentTab].id}`,
        limit: 20,
        offset: 1,
        type: 5
      }
      let res = await queryAllMatchList(params)
      if (res.statusCode === 200) {
        // when success ,do sth you want
        that.isLoading = false
        that.matchList = res.data.data.list || []
      }
      // 2秒后加载不到数据关闭loading控件
      clearTimeout(timer)
      let timer = setTimeout(() => {
        that.isLoading = false
      }, 2000)
      // 1.5秒防抖
    }, 1500)
  },
  computed: {},
  watch: {}
}
</script>

<style lang="scss" scoped>
/*tabbar start*/
/* 该页面全局隐藏滚动条 */
::-webkit-scrollbar {
  width: 0;
  height: 0;
  color: transparent;
}
.container {
  display: flex;
  flex-direction: column;
  .tab-view {
    font-size: 24rpx;
    overflow: hidden;
    box-sizing: border-box;
    position: fixed;
    height: 76rpx;
    top: 0;
    /* #ifdef H5 */
    top: 88rpx;
    /* #endif */
    left: 0;
    z-index: 99;
    background: $default-bg-white;
    white-space: nowrap;
    .tabbar-controls {
      height: 76rpx;
      width: 76rpx;
      background: $default-bg-white;
      position: fixed;
      right: 0;
      top: 88rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 60rpx;
      z-index: 200;
    }
  }

  .tab-bar-item {
    padding: 0;
    height: 76rpx;
    line-height: 76rpx;
    margin: 0 28rpx;
    display: inline-block;
    text-align: center;
    box-sizing: border-box;
  }
  .scoll-y {
    height: 100%;
  }
  .tab-content {
    margin-top: 88rpx;
  }
  .tab-bar-title {
    color: $default-text-color-inverse;
  }

  .active {
    border-bottom: 2rpx solid $default-color-primary;
    .tab-bar-title {
      color: $default-text-color;
      font-weight: bold;
      transition: font-weight 0.5s;
    }
  }

  /*tabbar end*/
}
</style>
