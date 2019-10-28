<!--
 * @Description: 时间控件
 * @Author: Edmund
 * @Email: q1592193221@gmail.com
 * @Date: 2019-10-28 11:46:01
 * @LastEditTime: 2019-10-28 14:22:05
 * @LastEditors: Edmund
 -->

<template>
    <view class="calendar_container">
        <view class="calendar_content">
            <slot name="date"></slot>
        </view>
    </view>
</template>


<script>
export default {
  name: 'calendar',
  components: {},
  props: {},
  created() {},
  onLoad() {},
  onReady() {},
  onUnload() {},
  methods: {},
  computed: {},
  watch: {}
}
</script>

<style lang="scss" scoped>
.calendar_container {
  position: relative;
  background-color: $default-bg-grey;
  display: flex;
  //   justify-items: center;
  justify-content: center;
  //   align-items: center;
}
.calendar_content {
  height: 58rpx;
  font-size: 26rpx;
  line-height: 58rpx;
  color: $default-text-color;
}
</style>