<template>
  <div>
    <spinner :visible="loading.FISK_ALL" :fixed="true" :text="loading.loaddingMsg"></spinner>
    <span class="levelTitle">致诚阿福</span>
    <blockquote class="quote"><span id="FISK_AFU">借贷历史记录</span>
      <div class="quote-op"><a href="javascript:;" @click="handleRefresh('FISK_AFU')"><svg-icon icon-class="refresh" /></a> <span class="rptime">报告时间：{{fiskData['FISK_AFU'].reportTime}}</span></div>
    </blockquote>
    <el-card class="box-card" shadow="never" :body-style="{ padding: '0px' }">
      <spinner :visible="loading.FISK_AFU" :fixed="false" :text="loading.loaddingMsg"></spinner>
      <afuTag :afuObj="fiskData['FISK_AFU'].riskData.riskDataDetail" />
    </el-card>

    <span class="levelTitle">91征信</span>
    <blockquote class="quote"><span id="FISK_ZHENGXIN">借贷历史记录</span>
      <div class="quote-op"><a href="javascript:;" @click="handleRefresh('FISK_ZHENGXIN')"><svg-icon icon-class="refresh" /></a> <span class="rptime">报告时间：{{fiskData['FISK_ZHENGXIN'].reportTime}}</span></div>
    </blockquote>
    <el-card class="box-card" shadow="never" :body-style="{ padding: '0px' }">
      <spinner :visible="loading.FISK_ZHENGXIN" :fixed="false" :text="loading.loaddingMsg"></spinner>
      <zhengxinTag :zhengxinObj="fiskData['FISK_ZHENGXIN'].riskData" :zhengxinStatic="zhengxinStatic" />
    </el-card>

    <span class="levelTitle">电商数据</span>
    <blockquote class="quote"><span id="FISK_BAIQISHI_TAOBAO">淘宝</span>
      <div class="quote-op"><a href="javascript:;" @click="handleRefresh('FISK_BAIQISHI_TAOBAO')"><svg-icon icon-class="refresh" /></a> <span class="rptime">报告时间：{{fiskData['FISK_BAIQISHI_TAOBAO'].reportTime}}</span></div>
    </blockquote>
    <el-card class="box-card" shadow="never" :body-style="{ padding: '0px' }">
      <spinner :visible="loading.FISK_BAIQISHI_TAOBAO" :fixed="false" :text="loading.loaddingMsg"></spinner>
      <taobaoTag v-if="fiskData['FISK_BAIQISHI_TAOBAO'].riskData.riskDetailInfo.riskType" :taobaoObj="fiskData['FISK_BAIQISHI_TAOBAO'].riskData" />
      <dl class="cardinfo" v-else>
        <dd><p>未认证</p></dd>
      </dl>
    </el-card>
  </div>
</template>
<script>
import pageMixin from './minx'
let addAllRequest = [
  'FISK_AFU',
  'FISK_ZHENGXIN',
  'FISK_BAIQISHI_TAOBAO'
]
export default {
  mixins: [pageMixin],
  components: {
    afuTag: () => import('./../fisk/afu.vue'),
    zhengxinTag: () => import('./../fisk/zhengxin.vue'),
    taobaoTag: () => import('./../fisk/taobao.vue')
  },
  data () {
    return {
      zhengxinStatic: {
        judai: 0,
        pikuan: 0,
        daifang: 0,
        jiekuan: 0,
        count: 0
      },
      loading: {
        loaddingMsg: '',
        FISK_AFU: false,
        FISK_ZHENGXIN: false,
        FISK_BAIQISHI_TAOBAO: false
      },
      fiskData: {
        FISK_AFU: {
          riskData: {
            riskDataDetail: {
              riskLoanRecords: [],
              riskQueryHistory: [],
              riskQueryStatistics: {},
              riskResults: []
            }
          }
        },
        FISK_ZHENGXIN: {
          riskData: {
            riskLoanInfos: []
          }
        },
        FISK_BAIQISHI_TAOBAO: {
          riskData: {
            riskDetailInfo: {
              riskType: '',
              riskReceiveAddresses: [],
              riskZhifubaoInfo: {},
              riskOrderDetails: [],
              riskPersonalInfo: {}
            }
          }
        }
      }
    }
  },
  methods: {
    staticZx () {
      console.log('zhengxin')
      if (this.fiskData['FISK_ZHENGXIN'].riskData.riskLoanInfos) {
        // 1.拒贷 2.批贷已放款 4.借款人放弃申请 5.审核中 6.待放款（3同6意义相同）
        this.zhengxinStatic = {
          judai: 0,
          pikuan: 0,
          daifang: 0,
          jiekuan: 0,
          count: 0
        }
        this.fiskData['FISK_ZHENGXIN'].riskData.riskLoanInfos.forEach((item) => {
          if (item.riskBorrowState === 1) {
            this.zhengxinStatic.judai++
          }
          if (item.riskBorrowState === 2) {
            this.zhengxinStatic.pikuan++
          }
          if (item.riskBorrowState === 3 || item.riskBorrowState === 6 || item.riskBorrowState === 5) {
            this.zhengxinStatic.daifang++
          }
          if (item.riskBorrowState === 4) {
            this.zhengxinStatic.jiekuan++
          }
          this.zhengxinStatic.count++
        })
      }
    }
  },
  beforeMount () {
    this.initRequest(addAllRequest)
  }
}
</script>
