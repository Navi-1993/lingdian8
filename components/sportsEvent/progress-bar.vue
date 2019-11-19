<!--
 * @Description: 进度条
 * @Author: Edmund
 * @Email: q1592193221@gmail.com
 * @Date: 2019-11-19 10:43:39
 * @LastEditTime: 2019-11-19 10:57:41
 * @LastEditors: Edmund
 -->

<template>
    <view class="container">
        <progress :percent="percent"
                  :active="isAnimate"
                  :stroke-width="barHeight" 
                  :activeColor="leftBgColor"
                  :backgroundColor="rightBgColor"/>
    </view>
</template>


<script>
let that
export default {
	name: '',
	components: {},
	props: {
		barHeight: {
			type: Number,
			default: 3
		},
		percent: {
			type: Number,
			default: 50
		},
		leftBgColor: {
			type: String,
			default: '#FF8400'
		},
		rightBgColor: {
			type: String,
			default: '#1B1B30'
		},
		isAnimate: {
			type: Boolean,
			default: false
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
</style>