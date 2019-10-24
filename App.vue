<script>
export default {
  globalData: {
    vuex: 'hello'
  },
  onLaunch: function() {
    console.log('App Launch')
    // #ifdef APP-PLUS
    // 锁定app屏幕
    plus.screen.lockOrientation('portrait-primary')
    // #endif
  },
  onShow: function() {},
  onHide: function() {
    console.log('App Hide')
  }
}
</script>

<style lang="scss">
/*每个页面公共css */
/* #ifndef APP-PLUS-NVUE */
pages {
  color: $default-text-color;
}
/* #endif */
</style>
