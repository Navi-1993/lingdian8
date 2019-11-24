<!--
 * @Description: 轮播图组件
 * @Author: Edmund
 * @Email: q1592193221@gmail.com
 * @Date: 2019-11-24 15:34:09
 * @LastEditTime: 2019-11-24 15:51:33
 * @LastEditors: Edmund
 -->

<template>
    <view class="container"
          :style="{ height: height + 'rpx'}">
      <swiper :autoplay="true"
              :interval="3000"
              :duration="300"
              :circular="true">
      </swiper>
    </view>
</template>


<script>
let that
export default {
	name: '',
	components: {},
	props: {
		height: {
			type: Number,
			default: 300
		}
	},
	beforeCreate() {},
	created() {
		that = this
	},
	beforeMount() {},
	mounted() {},
	beforeDestroy() {},
	destroyed() {},
	methods: {},
	computed: {},
	watch: {}
}
</script>

<style lang="scss" scoped>
.container {
	background: red;
	position: relative;
}
</style>