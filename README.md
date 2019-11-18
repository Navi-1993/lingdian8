# lingdian8
> One Product of Ultron

### Author: Edmund
> Email: q1592193221@gmail.com
## Project setup

> check your node version ≥ 10.16
```js
yarn
```

### 项目结构
```
├─api
├─common
├─components
│  ├─gaoyia-parse
│  │  ├─components
│  │  └─libs
│  ├─mobile-calendar-simple
│  ├─neil-modal
│  ├─uni-icons
│  ├─uni-nav-bar
│  └─uni-status-bar
├─js_sdk
│  └─luch-request
│      └─luch-request-ts
├─node_modules
│  ├─underscore
│  └─uni-simple-router
│      ├─component
│      ├─helpers
│      ├─lifeCycle
│      └─patch
├─pages
│  ├─home
│  ├─mine
│  ├─news
│  └─video
├─router
│  └─modules
├─static
│  └─bottomBar
│      ├─active
│      └─sleep
├─store
│  └─modules
└─unpackage
```

## use the HBuilder-ide to compile this project
- [hbuilder](https://dcloud.io/)

---

### Technology stack

- [uni-app](https://uniapp.dcloud.io/)
- [vue](https://cn.vuejs.org/v2/api/)
- [moment.js](http://momentjs.cn/)
- [uni-simple-router](https://ext.dcloud.net.cn/plugin?id=578)
- [vuex](https://vuex.vuejs.org/zh/guide/)
- [webpack](https://www.webpackjs.com/)
- [underScore.js](https://www.html.cn/doc/underscore/)
- [axios-likes](https://ext.dcloud.net.cn/plugin?id=392)
- [ThorUI](http://www.donarui.com/)
- [xgPlayer](https://github.com/bytedance/xgplayer)

### 版本约束

采用"xxx.xxx.xxx"标准约束，小版本和修复版本均遵循三位。
> 严格执行,代码内部升级会使用版本计算

    例如： 公司版本发布， 3.11版本，则后台版本为3.11， 前端对应版本 3.11.001， 则表示3为大版本，11为小版本，001为修复版
    - 大版本发布均表示含有大量不向下兼容的新功能
    - 小版本表示新功能均为向下兼容
    - 修复版为修复bug
    
    版本          是否允许
    0.1.1         √
    0.1.123       √
    1.123.123     √
    1.1234.121    x
    1.1           x
    1.1.1234      x


> date: 2019-10-21 to ??? 
