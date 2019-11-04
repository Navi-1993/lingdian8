<!--
 * @Description: 首页index
 * @Author: Edmund
 * @Email: q1592193221@gmail.com
 * @Date: 2019-10-21 12:54:43
 * @LastEditTime: 2019-11-04 18:08:04
 * @LastEditors: Edmund
 -->
<template>
	<view class="home_container">
    <!--  #ifndef MP-WEIXIN  -->
    <!-- 状态栏 -->
    <uni-nav-bar  title="零点吧"
                  :fixed="true"
                  :color = "navBarColor"
                  :background-color = "navBarBackColor"
                  status-bar="true"
                  :border="false">
      <view slot="right"
            style="font-size: 40rpx;"
            class="iconfont">
      </view>
    
    </uni-nav-bar>
    <!--  #endif -->
    <!-- 赛事导航 -->
    <swiper-bar :styleObject="styleObject"
                :renderData = "sportNameList"
                :scrollXshow ="true">
    </swiper-bar>
    <view class="body">
          <u-parse  :content="article"
                    v-show="show" />
        </view>
    <!-- 赛事列表 -->
    <view class="home_content">
      <scroll-view  :scroll-y="true"
                    class="scrollView">
          <calendar>
              <text slot="date">11月6日  星期六</text>
          </calendar>
          <event-card v-for="(item,idx) of 10"
                      :key="idx">
              <text slot="text">17:00   PCM大师赛-决赛</text>
          </event-card>
      </scroll-view>
    </view>
	</view>
</template>

<script>
import uniNavBar from 'components/uni-nav-bar/uni-nav-bar.vue' // 头部导航组件
import swiperBar from 'components/swiper-bar.vue'
import calendar from 'components/time_module/calendar.vue'
import eventCard from 'components/sportsEvent/event-card.vue'
import uParse from 'components/gaoyia-parse/parse.vue'
export default {
  components: {
    uniNavBar,
    swiperBar,
    calendar,
    eventCard,
    uParse
  },
  data() {
    return {
      article: `<p>直播吧10月24日讯 凯尔特人在今天的比赛中93-107负于76人。赛后，肯巴-沃克表示希望自己能打得更好。</p>
 <p>肯巴-沃克说：“对我们很多人来说，这都是个艰难的夜晚。”</p>
 <p>“但对我个人来说，我只希望自己能够打得更好，为队友做更多的事情。”</p>
 <p>本场比赛，沃克打了34分钟，贡献12分2篮板2助攻。</p>
 <p>（威尔）</p> 
</div>
18:01:37.307  - 标题:沃克：艰难的夜晚 我只想为队友做更多事情,当前时间:2019-10-24 11:04:53 
18:01:37.307  - 标题:少帅谈失利：未感到沮丧 我们在场上进行了竞争,href://news.zhibo8.cc/nba/2019-10-24/5db10fb7b7dd3.htm
18:01:37.307  - url:https://news.zhibo8.cc/nba/2019-10-24/5db10fb7b7dd3.htm
18:01:37.350  - 正常时间
18:01:37.350  - signalsElement:<div id="signals" class="content"> 
 <p style="text-align: center;"><img src="http://tu.duoduocdn.com/uploads/day_190420/5cbaf88166244.jpg" alt=""></p>
 <p>直播吧10月24日讯 在今天结束的一场常规赛比赛中，凯尔特人客场93-107不敌76人。赛后，主帅史蒂文斯接受了采访。</p>
 <p>谈及比赛，史蒂文斯表示：“我只是告诉我们的球员我们做了许多出色的事情，我认为我们在场上进行了竞争。我们需要更好地去保护篮筐，更多地利用进攻来赢得比赛。我感到更多的是鼓舞，而不是沮丧情绪。我认为我们踏上了球场，在场上进行了竞争。”</p>
 <p>同时少帅表示：“所有的这一切都表明沃克和塔图姆未来会有许多表现出色的夜晚。”</p>
 <p>本场比赛，沃克得到12分2篮板2助攻；塔图姆得到21分10篮板2助攻2抢断。</p>
 <p>（雷阿男）</p> 
</div>
18:01:37.350  - 标题:少帅谈失利：未感到沮丧 我们在场上进行了竞争,当前时间:2019-10-24 10:43:03 
18:01:37.350  - 标题:进攻效率堪忧！凯尔特人揭幕战命中率低于上赛季最低水平,href://news.zhibo8.cc/nba/2019-10-24/5db10eec6cad6.htm
18:01:37.350  - url:https://news.zhibo8.cc/nba/2019-10-24/5db10eec6cad6.htm
18:01:37.405  - 正常时间
18:01:37.405  - signalsElement:<div id="signals" class="content"> 
 <p style="text-align: center;"><img src="http://tu.duoduocdn.com/uploads/day_191024/659913478726090761.jpg" alt=""></p>
 <p>直播吧10月24日讯 在刚刚结束的一场NBA比赛中，凯尔特人客场93-107不敌76人，新赛季揭幕战尝到败绩。</p>
 <p>全场比赛凯尔特人命中率为36.7%（90投33中），低于其上赛季单场比赛的最低水平（38.2%）。</p>
 <p>其中新援沃克全场更是只有18投4中，3分6投仅1中，比赛也就早早失去了悬念。</p>
 <p>（Andy）</p> 
</div>
18:01:37.405  - 标题:进攻效率堪忧！凯尔特人揭幕战命中率低于上赛季最低水平,当前时间:2019-10-24 10:39:40 
18:01:37.405  - 标题:【专访】黄蜂随队记者：华盛顿值得培养 罗齐尔得分能力不如沃克,href://news.zhibo8.cc/nba/2019-10-20/5dac20836b7df.htm
18:01:37.405  - url:https://news.zhibo8.cc/nba/2019-10-20/5dac20836b7df.htm
18:01:37.467  - 正常时间
18:01:37.468  - signalsElement:<div id="signals" class="content"> 
 <p style="text-align: center;"><img src="http://tu.duoduocdn.com/uploads/day_190806/5d48c1eb57677.jpg" alt=""></p>
 <p>新赛季的夏洛特黄蜂将迎来过渡期，来听一听黄蜂随队记者里克-邦内尔对黄蜂季前赛的表现以及新赛季的看法。</p>
 <p><strong>问题：新秀PJ-华盛顿在季前赛里有不错的表现，主要原因是他的球技很好还是黄蜂队里没有太多更有实力的球员？</strong></p>
 <p>里克-邦内尔：其实这两个都是主要的原因，根据华盛顿季前赛中不错的表现，球队可能会让他在新赛季的揭幕战里打首发，因为肯巴-沃克的离开需要更有实力的球员站出来，球迷们也一直期待有人能弥补沃克的空缺。华盛顿在过去两场季前赛里都首发了，球队主教练詹姆斯-博雷戈也表示会让华盛顿成为常规赛的首发。上一次有黄蜂队新秀在揭幕战里担任首发还是德韦恩-培根，不过培根那次是因为代替受伤的尼古拉斯-巴图姆才进入的首发，并且他也不是场场比赛都是首发。如果华盛顿在美国时间10月23日黄蜂队对阵公牛队的比赛里首发出场，那这也意味着黄蜂队或许已经明确了他们重建的方向。</p>
 <p><strong>问题：在看到华盛顿的表现后，你觉得他的未来能走多远？现在是否可以确定他是沃克之后的第一位超值球员？</strong></p>
 <p>里克-邦内尔：华盛顿比赛的阅读能力比较出色，加上他出色的技术可以在场上有比较亮眼的表现，他已经证明了自己可以在比赛里为球队提供很大帮助，但是其他的一些东西现在确定还为时尚早，至于他是否有像沃克那样的球星潜力还不好说。华盛顿是以首轮第12顺位的身份进入球队的，曾经有一个研究表明，那些在首轮十顺位之后的新秀，他们是否可以成为球星和顺位没有太大的直接关系。如果华盛顿证明自己是一位值得信任的首发球员，那这对黄蜂队也是一件好事，或许他还有可能变得更强。现在主教练博雷戈对于华盛顿的表现感到比较满意，他说：“华盛顿有着不错的运动能力，并且身材很适合打NBA，他在低位展现出来的技术比我预想得要好，其次他在防守端的表现也很不错，看得出来他是一名攻防兼备的球员，这可不是一朝一夕就能练成的。”现在来看他的表现说明他是一位值得培养的球员，特别是他适应比赛很快，不过更大的潜力和可能性还需要进一步观察。</p>
 <p><strong>问题：你觉得特里-罗齐尔这个赛季会有怎样的场均得分？是否能超过20分？</strong></p>
 <p>里克-邦内尔：其实我不是很关注罗齐尔会有多少场均得分，我觉得他给自己和队友创造得分机会的效率更重要一点。从以前的数据看罗齐尔的投篮命中率从没有到达过40%，这个赛季是他第一次作为稳定的首发球员出战。其次黄蜂队不像凯尔特人有很多有天赋的球员，因此他可能会在比赛里遭受更多的针对。如果他可以场均得到15分5助攻并且命中率有42%，那这会比他场均20分3助攻并且命中率只有38%要好很多。罗齐尔有实力像沃克那样打球，但是他用不着模仿沃克的打球方式去，其实他在防守端的表现要比沃克好很多，不过他的得分能力可能不如沃克那样稳定，球迷们不应该指望他能像沃克那样有很强的得分能力。</p>
 <p style="text-align: center;"><img src="http://tu.duoduocdn.com/uploads/day_191007/5d9ace1b68527.jpg" alt=""></p>
 <p><strong>问题：在季前赛里，是否有黄蜂球员已经有了一些比较大的进步？比如在精神层面或者技术方面。</strong></p>
 <p>里克-邦内尔：上个赛季快结束的时候，球队替补控卫德文特-格雷厄姆有更自信的表现，他已经发挥出了更强的实力，现在的他十分自信，他坚信自己属于NBA的舞台。并且他身上有一种作为后卫很重要的气质，这会让他的表现越来越好。然后他需要增强自己的三分球能力让自己在进攻端更有威胁，作为新秀4：1的助攻失误比说明他还需要很多地方改进。前段时间他在训练赛里连续进了三个三分球，这说明他有了很大的进步。格雷厄姆在前段时间说：“现在我的投篮能力比上个赛季更强，新赛季我会得到更多的上场时间，这会对我的表现有很大帮助，上个赛季我都不清楚什么时候会上场，其实这对球员的影响很大。”如果格雷厄姆在进入首发阵容后的表现不是很好，那他依然可以作为第二甚至是第三控卫给球队帮助，凭借他的能力可以在联盟里打10年左右。格雷厄姆是一个很聪明的球员，他的打法也比较成熟并且很少受伤，这点对于控卫很重要。</p>
 <p><strong>问题：黄蜂队里有一些合同将要到期的球员，他们会和球队续约吗？</strong></p>
 <p>里克-邦内尔：黄蜂队可能不会和马文-威廉姆斯、迈克尔-基德-吉尔克里斯特和俾斯麦-比永博这三位合同价值比较高的球员续约，黄蜂队管理层会考虑到让球队阵容更年轻，这也是重建很重要的一点。不过球队也会考虑到威廉姆斯有一定的导师和组织作用，他可能会和球队完成续约。不过现在还不清楚威廉姆斯打算什么时候退役，上个赛季他有和我说过他的孩子很需要他的陪伴，他自己也觉得没有尽到父亲的责任，这会是他最大的问题之一。威廉姆斯在15年的职业生涯里已经拿到了足够的薪水，他不会因为钱而继续打球。假如吉尔克里斯特和比永博主动和球队达成买断，他们会损失一部分钱但是有很多机会加入季后赛球队，这也是可能性比较大的。</p>
 <p><strong>问题：你觉得马利克-蒙克这个赛季会得到更多的上场时间吗？</strong></p>
 <p>里克-邦内尔：可能性不是很大，虽然球队在重建，但这并不意味着主教练博雷戈会允许球员在犯错之后得到更多的机会，他会让球员们承担自己的错误带来的后果。季前赛的时候，比永博代替埃尔南戈麦斯担任替补第一中锋，埃尔南戈麦斯的防守有很大的问题，他已经为自己的错误承担相应的责任。博雷戈在训练营开始前就告诉球员，他会给年轻球员多一些上场时间，但是他们的表现才是决定上场时间的主要因素，如果蒙克、培根和布里奇斯在场上的表现不好，那他们的上场时间依然会减少。</p>
 <p><strong>问题：华盛顿是否有可能被下放到发展联盟打球？</strong></p>
 <p>里克-邦内尔：这个可能性当然也是有的，毕竟一个赛季长达6个月的时间，球队里可能会发生很多事情，对于新秀来说应该做好心理准备，在揭幕战首发出场不意味着他不会被下放到发展联盟。培根在训练营开始前被记者问到上个赛季怎样在发展联盟的比赛里取得进步，他表示大多数球员觉得被下放到发展联盟是对他们的惩罚，其实这种想法是不对的。如果年轻球员一直坐在替补席打不上球，这是不好的现象，相反去发展联盟不仅仅意味着有出场时间，还说明了球队在考验你，你有机会向球队证明自己。</p>
 <p>原文：RICK BONNELL</p>
 <p>编译：晴天</p>
 <a href="//www.zhibo8.cc/topic/index.html?id=255" class="topic-link"> 
  <div class="topic-box"> 
   <div class="topic-thumb"></div> 
   <div class="topic-angular"></div> 
   <b>人物专访</b> 
  </div> </a> 
</div>`,
      navBarBackColor: '#1B1B30',
      navBarColor: '#FFFFFF',
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
  onLoad() {},
  methods: {},
  computed: {
    sportNameList() {
      return this.$_.map(this.faboriteData, item => {
        return item.name
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.body {
  height: 100%;
  width: 92vw;
  margin: 0 auto;
  color: yellow;
}
.home_container {
  height: 100vh;
  .scrollView {
    height: calc(84vh);
  }
}
</style>
