<!--
 * @Description: news默认索引页
 * @Author: Edmund
 * @Email: q1592193221@gmail.com
 * @Date: 2019-10-31 09:53:30
 * @LastEditTime: 2019-11-07 15:43:59
 * @LastEditors: Edmund
 * @FilePath: \lingdian8\pages\news\index.vue
 -->
<template>
	<view class="news_container">
		<swiper-bar :styleObject="styleObject"
                :renderData = "sportNameList">
    </swiper-bar>
		<swiper class="news_banner"
            :circular='true'
            :acceleration='true'
            :skip-hidden-item-layout='true'
            :scrollXshow ="true"
            display-multiple-items = 1
            duration = 100
            previous-margin = "70rpx"
            next-margin = "70rpx"
						:autoplay='true'>
        <swiper-item  class="news_banner_item"
                      v-for="item of 10"
                      :key="item">
            <view >
                <image  class="news_banner_img"
                        mode="aspectFill"
                        src="https://ws1.sinaimg.cn/large/c28979f3gy1g8ed7uh2icj206f06f76u.jpg" />
                <view class="news_banner_mask">
                  
                </view>
                <text class="news_banner_title">{{item}}</text>
            </view>
            
        </swiper-item>
		</swiper>
	</view>
</template>

<script>
import swiperBar from 'components/swiper-bar.vue'
export default {
  name: 'news',
  components: {
    swiperBar
  },
  props: {},
  data() {
    return {
      styleObject: {
        color: 'black'
      },
      faboriteData: [
        {
          name: 'wong'
        },
        {
          name: 'xue'
        },
        {
          name: 'feng'
        },
        {
          name: 'niu'
        },
        {
          name: 'xu'
        },
        {
          name: 'feng'
        },
        {
          name: 'jia'
        },
        {
          name: 'SB'
        }
      ]
    }
  },
  computed: {
    sportNameList() {
      return this.$_.map(this.faboriteData, item => {
        return item.name
      })
    }
  }
}
</script>

<style lang="scss">
.news_container {
  height: 100vh;
  .news_banner {
    display: flex;
    align-items: center;
    width: 100vw;
    height: 320rpx;
    border-top: 1rpx solid $default-border-color;
    border-bottom: 1rpx solid $default-border-color;
    &_item {
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
    }
    &_img {
      width: 586rpx;
      height: 280rpx;
      border-radius: 10rpx;
    }
    &_mask {
      position: absolute;
      bottom: 24rpx;
      left: 16rpx;
      width: 584rpx;
      height: 38rpx;
      background: $default-bg-black;
      opacity: 0.3;
      border-radius: 0 0 10rpx 10rpx;
    }
    &_title {
      color: $default-text-color-white;
      font-size: 24rpx;
      height: 38rpx;
      line-height: 38rpx;
      @include center;
      top: 276rpx;
    }
  }
}
</style>
