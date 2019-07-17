<template>
  <div class="page" id="fisk" ref="fisk">
    <el-tabs type="border-card" :stretch="true" v-model="activeTab" @tab-click="handleClick">
      <el-tab-pane v-for="(tab, index) in tabShowList" :key="index" :label="tab.label" :name="tab.name">
        <keep-alive>
          <component :is="tab.component" v-if="activeTab === tab.name && tab.show"></component>
        </keep-alive>
      </el-tab-pane>
    </el-tabs>
    <div v-if="showError">
      <div class="error-box">
        <div class="error-body text-center">
          <div class="rainy"></div>
          <h1 class="error-title"> {{showMessage}}</h1>
          <!-- <h3>请联系管理员 !</h3> -->
        </div>
      </div>
    </div>
    <Backtop></Backtop>
  </div>
</template>
<script>
import Backtop from '@/components/backTop'
import { mapMutations, mapGetters } from 'vuex'
// import APPID from '@/metadata/appid'
import keyApi from '@/api/keyinfo/index'
const SHOWPAGES = ['keyInfo', 'fiskInfo'] // 显示的tab页
const SHOWPAGEDEFAULT = SHOWPAGES[0] // 默认的第一页
const menuDefault = [
  {
    label: '关键信息',
    name: 'keyInfo',
    show: false,
    component: 'KeyTag'
  },
  {
    label: '基本信息',
    name: 'baseInfo',
    show: false,
    component: 'BaseTag'
  },
  {
    label: '风控报告',
    // name: 'fiskInfo',
    name: 'fiskTabInfo',
    show: false,
    component: 'FiskTag'
  },
  {
    label: '运营商报告',
    name: 'operateInfo',
    show: false,
    // component: 'OperateTag'
    component: 'OperateV2Tag'
  },
  {
    label: '通讯录',
    name: 'addressInfo',
    show: false,
    component: 'AddressTag'
  },
  {
    // label: '短信',
    label: '运营商短信',
    name: 'smsInfoV2',
    show: false,
    component: 'SmsTagV2'
  },
  {
    label: '通话记录',
    name: 'callInfo',
    show: false,
    component: 'CallTag'
  },
  {
    label: '学信网',
    name: 'schoolInfo',
    show: false,
    component: 'SchoolTag'
  },
  {
    label: '社保',
    name: 'socialInfo',
    show: false,
    component: 'SocialTag'
  },
  {
    label: '短信',
    // label: '运营商短信',
    name: 'smsInfo',
    show: false,
    component: 'SmsTag'
  }
]
export default {
  components: {
    Backtop,
    KeyTag: () => import('./components/keyinfo.vue'),
    FiskTag: () => import('./components/fisk.vue'),
    BaseTag: () => import('./components/baseinfo.vue'),
    OperateTag: () => import('./components/operator.vue'),
    OperateV2Tag: () => import('./components/operatorV2.vue'),
    AddressTag: () => import('./components/address.vue'),
    CallTag: () => import('./components/callV2.vue'),
    SchoolTag: () => import('./components/school.vue'),
    SocialTag: () => import('./components/social.vue'),
    SmsTag: () => import('./components/sms.vue'),
    SmsTagV2: () => import('./components/smsV2.vue')
  },
  data () {
    return {
      showMessage: '',
      showError: false,
      showPage: [],
      activeTab: SHOWPAGEDEFAULT,
      tabList: menuDefault
    }
  },
  computed: {
    ...mapGetters([
      'tabhistory'
    ]),
    tabShowList () {
      return this.tabList.filter(item => {
        return item.show
      })
    }
  },
  methods: {
    ...mapMutations({
      setSidebarList: 'SET_SIDEBAR_LIST',
      setTabHistory: 'SET_TABHISTORY'
    }),
    checkTab (tab) {
      return SHOWPAGES.includes(tab)
    },
    handleClick (tab, event) {
      this.activeTab = tab.name
      this.setSidebarList(tab.name)
      // 设置请求完成
      // this.setTabHistory(tab.name)
      // console.log(this.tabhistory)
    },
    watchScroll (e) {
      console.log(e.target.scrollTop)
    },
    showDefaultTab () {
      // 根据appId 设置相关tab显示隐藏
      this.tabList.forEach(ele => {
        ele.show = true
        // if (SHOWPAGES.includes(ele.name)) {
        //   if (this.query.appId === APPID.YIPURSE) {
        //     ele.show = true
        //   }
        // }
        // if (this.query.appId === APPID.QIANDADA || this.query.appId === APPID.BAILIAN) { // || this.query.appId === APPID.YIPURSE
        //   ele.show = true
        // }
      })
      this.setSidebarList(SHOWPAGEDEFAULT)
    },
    showRoleTab () {
      keyApi['RIGHTMENU'](this.query)
        .then((response) => {
          if (response.data.code === 200 && response.data.datas) {
            // 根据appId 设置相关tab显示隐藏
            this.showPage = response.data.datas
            this.activeTab = this.showPage.length > 0 ? this.showPage[0] : ''

            this.tabList.forEach(ele => {
              // ele.show = true
              if (this.showPage.includes(ele.name)) {
                // if (this.query.appId === APPID.YIPURSE) {
                ele.show = true
                // }
              }
              // if (this.query.appId === APPID.QIANDADA || this.query.appId === APPID.BAILIAN) { // || this.query.appId === APPID.YIPURSE
              //   ele.show = true
              // }
            })
            this.setSidebarList(SHOWPAGEDEFAULT)
          } else {
            this.showError = true
            this.showMessage = response.data.message || 'NO RULE'
            // 显示全部
            // this.tabList = menuDefault
            // this.setSidebarList(SHOWPAGEDEFAULT)
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }
  },
  mounted () {
  },
  created () {
    // 设置基本信息菜单
    this.query = this.$route.query
    // 显示默认
    this.showDefaultTab()
    // 显示权限
    // this.showRoleTab()

    // this.show = this.sidebar
    // console.log(this.sidebar)
    // listen el-scroll
    // this.$nextTick(() => {
    //   let scrollDom = document.getElementsByClassName('el-scrollbar__wrap')[0]
    //   scrollDom.addEventListener('scroll', this.watchScroll, true)
    // })
  },
  destroyed () {
    // this.$refs.fisk.removeEventListener('scroll', this.watchScroll, true)
  }
}
</script>
<style lang="scss">
@import '@/styles/variables.scss';
#fisk {
  .rainy {
    -webkit-animation: rainy 5s ease-in-out infinite 1s;
    animation: rainy 5s ease-in-out infinite 1s;
    background: #ccc;
    border-radius: 50%;
    box-shadow: #ccc 65px -15px 0 -5px,#ccc 25px -25px,#ccc 30px 10px,#ccc 60px 15px 0 -10px,#ccc 85px 5px 0 -5px;
    display: block;
    height: 50px;
    width: 50px;
    margin: 0 auto;
  }
  .rainy:after {
    -webkit-animation: rainy_shadow 5s ease-in-out infinite 1s;
    animation: rainy_shadow 5s ease-in-out infinite 1s;
    background: #000;
    border-radius: 50%;
    content: '';
    height: 15px;
    width: 120px;
    opacity: .2;
    position: absolute;
    left: 5px;
    bottom: -60px;
    -webkit-transform: scale(.7);
    -ms-transform: scale(.7);
    transform: scale(.7)
  }
  .rainy:before {
    -webkit-animation: rainy_rain .7s infinite linear;
    animation: rainy_rain .7s infinite linear;
    content: '';
    background: #ccc;
    border-radius: 50%;
    display: block;
    height: 6px;
    width: 3px;
    opacity: .3;
    -webkit-transform: scale(.9);
    -ms-transform: scale(.9);
    transform: scale(.9)
  }
  @-webkit-keyframes rainy {
    50% {
      -webkit-transform: translateY(-20px);
      transform: translateY(-20px)
    }
  }
  @keyframes rainy {
    50% {
      -webkit-transform: translateY(-20px);
      transform: translateY(-20px)
    }
  }
  @-webkit-keyframes rainy_shadow {
    50% {
      -webkit-transform: translateY(20px) scale(1);
      transform: translateY(20px) scale(1);
      opacity: .05
    }
  }
  @keyframes rainy_shadow {
    50% {
      -webkit-transform: translateY(20px) scale(1);
      transform: translateY(20px) scale(1);
      opacity: .05
    }
  }
  @-webkit-keyframes rainy_rain {
    0% {
      box-shadow: transparent 30px 30px,transparent 40px 40px,#000 50px 75px,#000 55px 50px,#000 70px 100px,#000 80px 95px,#000 110px 45px,#000 90px 35px
    }
    25% {
      box-shadow: #000 30px 45px, #000 40px 60px, #000 50px 90px, #000 55px 65px, transparent 70px 120px, transparent 80px 120px, #000 110px 70px, #000 90px 60px
    }
    26% {
      box-shadow: #000 30px 45px,#000 40px 60px,#000 50px 90px,#000 55px 65px,transparent 70px 40px,transparent 80px 20px,#000 110px 70px,#000 90px 60px
    }
    50% {
      box-shadow: #000 30px 70px,#000 40px 80px,transparent 50px 100px,#000 55px 80px,#000 70px 60px,#000 80px 45px,#000 110px 95px,#000 90px 85px
    }
    51% {
      box-shadow: #000 30px 70px,#000 40px 80px,transparent 50px 45px,#000 55px 80px,#000 70px 60px,#000 80px 45px,#000 110px 95px,#000 90px 85px
    }
    75% {
      box-shadow: #000 30px 95px,#000 40px 100px,#000 50px 60px,transparent 55px 95px,#000 70px 80px,#000 80px 70px,transparent 110px 120px,transparent 90px 110px
    }
    76% {
      box-shadow: #000 30px 95px,#000 40px 100px,#000 50px 60px,transparent 55px 35px,#000 70px 80px,#000 80px 70px,transparent 110px 25px,transparent 90px 15px
    }
    100% {
      box-shadow: transparent 30px 120px,transparent 40px 120px,#000 50px 75px,#000 55px 50px,#000 70px 100px,#000 80px 95px,#000 110px 45px,#000 90px 35px
    }
  }
  @keyframes rainy_rain {
    0% {
      box-shadow: transparent 30px 30px,transparent 40px 40px,#000 50px 75px,#000 55px 50px,#000 70px 100px,#000 80px 95px,#000 110px 45px,#000 90px 35px
    }
    25% {
      box-shadow: #000 30px 45px,#000 40px 60px,#000 50px 90px,#000 55px 65px,transparent 70px 120px,transparent 80px 120px,#000 110px 70px,#000 90px 60px
    }
    26% {
      box-shadow: #000 30px 45px,#000 40px 60px,#000 50px 90px,#000 55px 65px,transparent 70px 40px,transparent 80px 20px,#000 110px 70px,#000 90px 60px
    }
    50% {
      box-shadow: #000 30px 70px,#000 40px 80px,transparent 50px 100px,#000 55px 80px,#000 70px 60px,#000 80px 45px,#000 110px 95px,#000 90px 85px
    }
    51% {
      box-shadow: #000 30px 70px,#000 40px 80px,transparent 50px 45px,#000 55px 80px,#000 70px 60px,#000 80px 45px,#000 110px 95px,#000 90px 85px
    }
    75% {
      box-shadow: #000 30px 95px,#000 40px 100px,#000 50px 60px,transparent 55px 95px,#000 70px 80px,#000 80px 70px,transparent 110px 120px,transparent 90px 110px
    }
    76% {
      box-shadow: #000 30px 95px,#000 40px 100px,#000 50px 60px,transparent 55px 35px,#000 70px 80px,#000 80px 70px,transparent 110px 25px,transparent 90px 15px
    }
    100% {
      box-shadow: transparent 30px 120px,transparent 40px 120px,#000 50px 75px,#000 55px 50px,#000 70px 100px,#000 80px 95px,#000 110px 45px,#000 90px 35px
    }
  }
  .error-box {
    width: 100%
  }
  .error-box .error-body {
    padding-top: 5%;
    padding-bottom: 5%;
    text-align: center;
    a {
      color: #ff7100;
      font-weight: bold;
    }
  }
  .error-box .error-title {
    font-size: 60px;
    font-weight: 900;
    text-shadow: 2px 2px 0 #fff,4px 4px 0 #343a40;
    line-height: 210px
  }
  .el-carousel__item img {
    margin: 0 auto;
    display: block;
  }
  .el-carousel__container {
    width: 100%;
    height: 100%;
    position: absolute !important;
  }
  .el-alert__title.is-bold {
    color: #232323
  }
  .boxtip {
    padding: 8px 16px;
    background-color: #ecf8ff;
    border-radius: 4px;
    border-left: 5px solid #50bfff;
    margin: 10px 0;
    font-size: 16px;
    font-weight: bold;
  }
  .el-pagination {
    text-align: right;
    margin: 10px 0;
  }
  .el-card {
    color: inherit;
  }
  .el-tag--danger {
    background-color: #d9534f;
    border-color: #d9534f;
    color: #fff;
  }
  .el-tag--success {
    background-color: #5cb85c;
    border-color: #5cb85c;
    color: #fff;
  }
  .el-tag--warning {
    background-color: #e6a23c;
    border-color: #e6a23c;
    color: #fff;
  }
  .el-tabs--border-card>.el-tabs__header {
    position: fixed;
    top: 60px;
    left: 0;
    // right: 200px;
    right: 0px;
    border-top: 1px solid #e4e7ed;
    // background-color: #000;
    z-index: 1500
  }
  .headclass th {
    background-color: #f7fafa;
  }
  .rowclass {
    font-size: 12px;
  }
  .table-zone {
    position: relative;
  }
  .levelTitle {
    display: inline-block;
    background-color: #409EFF;
    padding: 0px 40px;
    height: 32px;
    line-height: 32px;
    color: #fff;
    font-size: 16px;
    position: relative;
    margin-top: 10px;
    margin-bottom: 1px;
  }
  .levelTitle:after {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    border-width: 0 32px 32px;
    border-style: solid;
    border-color: transparent transparent #409EFF;/*透明 透明  黄*/
    top: 0px;
    right: -32px;
  }
  .quote {
    // margin: 10px 0 15px 0px;
    margin: 0px;
    padding: 10px 20px 10px 15px;
    // border-left: 5px solid $primary;
    background: #58aaff;
    color: #fff;
    font-size: 14px;
    line-height: 1;
    text-align: center;
    overflow: hidden;
    position: relative;
    // border-top: 1px solid #fff;
    .quote-op {
      position: absolute;
      height: 34px;
      line-height: 34px;
      top: 0px;
      right: 10px;
      font-size: 12px;
    }
  }
  .box-card {
    // margin-bottom: 10px;
    position: relative;
  }
  .tagbox {
    display: inline-block;
    color: #626161;
    font-weight: bold;
    padding: 5px 10px;
    font-size: 12px;
    border-radius: 4px;
    line-height: 1.8;
    box-sizing: border-box;
    background-color: rgba(5, 128, 255, 0.08);
    border: 1px solid rgba(100, 141, 182, 0.1);
    .tagtxt {
      p {
        float: left;
        width: 50px;
        margin-right: 15px;
        b {
          color: #2f81d7
        }
      }
    }
    span {
      font-weight: bold;
      font-size: 24px;
      color: #2f81d7;
      vertical-align: baseline;
      &.red {
        color: #ff0000
      }
    }
  }
  div.el-col{
    word-wrap: break-word;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.8;
    // overflow: hidden;
    // white-space: nowrap;
    // text-overflow: ellipsis;
  }
  .cardinfo{
    font-size: 14px;
    dt {
      background: #f7fafa;
      padding: 6px 10px;
      font-weight: bold;
      color: #333;
      border-left: 4px solid #409EFF;
      margin-top: 10px;
    }
    dd {
      padding: 10px 10px;
      border-bottom: 1px dotted #d8d8d8;
      &.ddheader{
        padding: 0 10px;
        background: #f7fafa;
      }
    }
    table {
      font-size: 12px;
    }
  }
  .el-card__header {
    padding: 0 10px;
    line-height: 38px;
    font-size: 12px;
    .card-op {
      float:right;
      line-height:38px;
    }
    .card-tit {
      float:left;
      font-weight: bold;
      color: #333;
      font-size: 16px;
    }
    .rptime {
      font-size: 12px;
    }
  }
  .el-col > span {
    // font-weight: bold
  }
  .table {
    width: 100%;
    max-width: 100%;
    margin-bottom: 20px;
    border-collapse: collapse;
    border-spacing: 0;
  }
  .table > thead > tr > th,
  .table > tbody > tr > th,
  .table > tfoot > tr > th,
  .table > thead > tr > td,
  .table > tbody > tr > td,
  .table > tfoot > tr > td {
    padding: 8px;
    line-height: 1.42857143;
    vertical-align: top;
    border-top: 1px solid #ddd;
  }
  .table > thead > tr > th {
    vertical-align: bottom;
    border-bottom: 2px solid #ddd;
    background: #f7fafa;
    text-align: left;
  }
  .table > caption + thead > tr:first-child > th,
  .table > colgroup + thead > tr:first-child > th,
  .table > thead:first-child > tr:first-child > th,
  .table > caption + thead > tr:first-child > td,
  .table > colgroup + thead > tr:first-child > td,
  .table > thead:first-child > tr:first-child > td {
    border-top: 0;
  }
  .table > tbody + tbody {
    border-top: 2px solid #ddd;
  }
  .table .table {
    background-color: #fff;
  }
  .table-bordered {
    border: 1px solid #ddd;
  }
  .table-bordered > thead > tr > th,
  .table-bordered > tbody > tr > th,
  .table-bordered > tfoot > tr > th,
  .table-bordered > thead > tr > td,
  .table-bordered > tbody > tr > td,
  .table-bordered > tfoot > tr > td {
    border: 1px solid #ddd;
  }
  .table-bordered > thead > tr > th,
  .table-bordered > thead > tr > td {
    border-bottom-width: 2px;
  }
  .table-striped > tbody > tr:nth-of-type(odd) {
    background-color: #f9f9f9;
  }
  .table-hover > tbody > tr:hover {
    background-color: #f5f5f5;
  }
  table col[class*="col-"] {
    position: static;
    float: none;
    display: table-column;
  }
  table td[class*="col-"],
  table th[class*="col-"] {
    position: static;
    float: none;
    display: table-cell;
  }
}
#operator {
  .el-collapse {
    border: 0 none;
  }
  .el-collapse-item__header, .el-collapse-item__arrow {
    height: 28px;
    line-height: 28px;
    border-bottom: 0 none;
  }
  .el-collapse-item__content {
    padding-bottom: 10px;
  }
}
</style>
