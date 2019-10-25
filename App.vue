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

/* 阿里字体图标库引入（已使用项目管理） */
@import url('common/css/font-family/iconfont.css');
/* #ifndef APP-PLUS-NVUE */
pages {
  color: $default-text-color;
}
/* #endif */
</style>
