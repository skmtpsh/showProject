<template>
  <div>
    <spinner :visible="loading.FISK_ALL" :fixed="true" :text="loading.loaddingMsg"></spinner>
    <span class="levelTitle">白骑士</span>
    <blockquote class="quote"><span id="FIST_BQS_LOAN">贷款事件</span>
      <div class="quote-op"><a href="javascript:;" @click="handleRefresh('FIST_BQS_LOAN')"><svg-icon icon-class="refresh" /></a> <span class="rptime">报告时间：{{fiskData['FIST_BQS_LOAN'].reportTime}}</span></div>
    </blockquote>
    <el-card class="box-card" shadow="never" :body-style="{ padding: '0px' }">
      <spinner :visible="loading.FIST_BQS_LOAN" :fixed="false" :text="loading.loaddingMsg"></spinner>
      <bqsTag :dataObj="fiskData['FIST_BQS_LOAN']"></bqsTag>
    </el-card>

    <blockquote class="quote"><span id="FIST_BQS_BLACK">风险名单对比</span>
      <div class="quote-op"><a href="javascript:;" @click="handleRefresh('FIST_BQS_BLACK')"><svg-icon icon-class="refresh" /></a> <span class="rptime">报告时间：{{fiskData['FIST_BQS_BLACK'].reportTime}}</span></div>
    </blockquote>
    <el-card class="box-card" shadow="never" :body-style="{ padding: '0px' }">
      <spinner :visible="loading.FIST_BQS_BLACK" :fixed="false" :text="loading.loaddingMsg"></spinner>
      <bqsTag :dataObj="fiskData['FIST_BQS_BLACK']"></bqsTag>
    </el-card>

    <blockquote class="quote"><span id="FIST_BQS_REGISTER">注册事件</span>
      <div class="quote-op"><a href="javascript:;" @click="handleRefresh('FIST_BQS_REGISTER')"><svg-icon icon-class="refresh" /></a> <span class="rptime">报告时间：{{fiskData['FIST_BQS_REGISTER'].reportTime}}</span></div>
    </blockquote>
    <el-card class="box-card" shadow="never" :body-style="{ padding: '0px' }">
      <spinner :visible="loading.FIST_BQS_REGISTER" :fixed="false" :text="loading.loaddingMsg"></spinner>
      <bqsTag :dataObj="fiskData['FIST_BQS_REGISTER']"></bqsTag>
    </el-card>

    <blockquote class="quote"><span id="FIST_BQS_LOGIN">登录事件</span>
      <div class="quote-op"><a href="javascript:;" @click="handleRefresh('FIST_BQS_LOGIN')"><svg-icon icon-class="refresh" /></a> <span class="rptime">报告时间：{{fiskData['FIST_BQS_LOGIN'].reportTime}}</span></div>
    </blockquote>
    <el-card class="box-card" shadow="never" :body-style="{ padding: '0px' }">
      <spinner :visible="loading.FIST_BQS_LOGIN" :fixed="false" :text="loading.loaddingMsg"></spinner>
      <bqsTag :dataObj="fiskData['FIST_BQS_LOGIN']"></bqsTag>
    </el-card>

    <blockquote class="quote"><span id="FIST_BQS_BIND">绑卡事件</span>
      <div class="quote-op"><a href="javascript:;" @click="handleRefresh('FIST_BQS_BIND')"><svg-icon icon-class="refresh" /></a> <span class="rptime">报告时间：{{fiskData['FIST_BQS_BIND'].reportTime}}</span></div>
    </blockquote>
    <el-card class="box-card" shadow="never" :body-style="{ padding: '0px' }">
      <spinner :visible="loading.FIST_BQS_BIND" :fixed="false" :text="loading.loaddingMsg"></spinner>
      <bqsTag :dataObj="fiskData['FIST_BQS_BIND']"></bqsTag>
    </el-card>

    <blockquote class="quote"><span id="FIST_BQS_DYNAMIC">动码事件</span>
      <div class="quote-op"><a href="javascript:;" @click="handleRefresh('FIST_BQS_DYNAMIC')"><svg-icon icon-class="refresh" /></a> <span class="rptime">报告时间：{{fiskData['FIST_BQS_DYNAMIC'].reportTime}}</span></div>
    </blockquote>
    <el-card class="box-card" shadow="never" :body-style="{ padding: '0px' }">
      <spinner :visible="loading.FIST_BQS_DYNAMIC" :fixed="false" :text="loading.loaddingMsg"></spinner>
      <bqsTag :dataObj="fiskData['FIST_BQS_DYNAMIC']"></bqsTag>
    </el-card>

    <blockquote class="quote"><span id="FIST_BQS_MODIFY">修改事件</span>
      <div class="quote-op"><a href="javascript:;" @click="handleRefresh('FIST_BQS_MODIFY')"><svg-icon icon-class="refresh" /></a> <span class="rptime">报告时间：{{fiskData['FIST_BQS_MODIFY'].reportTime}}</span></div>
    </blockquote>
    <el-card class="box-card" shadow="never" :body-style="{ padding: '0px' }">
      <spinner :visible="loading.FIST_BQS_MODIFY" :fixed="false" :text="loading.loaddingMsg"></spinner>
      <bqsTag :dataObj="fiskData['FIST_BQS_MODIFY']"></bqsTag>
    </el-card>

    <blockquote class="quote"><span id="FIST_BQS_WITHDRAW">提现事件</span>
      <div class="quote-op"><a href="javascript:;" @click="handleRefresh('FIST_BQS_WITHDRAW')"><svg-icon icon-class="refresh" /></a> <span class="rptime">报告时间：{{fiskData['FIST_BQS_WITHDRAW'].reportTime}}</span></div>
    </blockquote>
    <el-card class="box-card" shadow="never" :body-style="{ padding: '0px' }">
      <spinner :visible="loading.FIST_BQS_WITHDRAW" :fixed="false" :text="loading.loaddingMsg"></spinner>
      <bqsTag :dataObj="fiskData['FIST_BQS_WITHDRAW']"></bqsTag>
    </el-card>

    <blockquote class="quote"><span id="FIST_BQS_REPAYMENT">还款事件</span>
      <div class="quote-op"><a href="javascript:;" @click="handleRefresh('FIST_BQS_REPAYMENT')"><svg-icon icon-class="refresh" /></a> <span class="rptime">报告时间：{{fiskData['FIST_BQS_REPAYMENT'].reportTime}}</span></div>
    </blockquote>
    <el-card class="box-card" shadow="never" :body-style="{ padding: '0px' }">
      <spinner :visible="loading.FIST_BQS_REPAYMENT" :fixed="false" :text="loading.loaddingMsg"></spinner>
      <bqsTag :dataObj="fiskData['FIST_BQS_REPAYMENT']"></bqsTag>
    </el-card>

    <span class="levelTitle">同盾</span>
    <blockquote class="quote"><span id="FISK_TONGDUN">借款事件</span>
      <div class="quote-op"><a href="javascript:;" @click="handleRefresh('FISK_TONGDUN')"><svg-icon icon-class="refresh" /></a> <span class="rptime">报告时间：{{fiskData['FISK_TONGDUN'].reportTime}}</span></div>
    </blockquote>
    <el-card class="box-card" shadow="never" :body-style="{ padding: '0px' }">
      <spinner :visible="loading.FISK_TONGDUN" :fixed="false" :text="loading.loaddingMsg"></spinner>
      <tongdunTag :tongdunObj="fiskData['FISK_TONGDUN'].riskData" />
    </el-card>
  </div>
</template>
<script>
import pageMixin from './minx'
let addAllRequest = [
  'FISK_TONGDUN',
  'FIST_BQS_LOAN',
  'FIST_BQS_BLACK',
  'FIST_BQS_REGISTER',
  'FIST_BQS_LOGIN',
  'FIST_BQS_BIND',
  'FIST_BQS_DYNAMIC',
  'FIST_BQS_MODIFY',
  'FIST_BQS_WITHDRAW',
  'FIST_BQS_REPAYMENT'
]
export default {
  mixins: [pageMixin],
  components: {
    bqsTag: () => import('./../fisk/bqs.vue'),
    tongdunTag: () => import('./../fisk/tongdun.vue')
  },
  data () {
    return {
      loading: {
        loaddingMsg: '',
        FISK_TONGDUN: false,
        FIST_BQS_LOAN: false,
        FIST_BQS_LOGIN: false,
        FIST_BQS_BLACK: false,
        FIST_BQS_REGISTER: false,
        FIST_BQS_BIND: false,
        FIST_BQS_DYNAMIC: false,
        FIST_BQS_MODIFY: false,
        FIST_BQS_WITHDRAW: false,
        FIST_BQS_REPAYMENT: false
      },
      fiskData: {
        FISK_TONGDUN: {
          riskData: {
            riskAntifraud: {}
          }
        },
        // 新增
        FIST_BQS_LOAN: {},
        FIST_BQS_BLACK: {},
        FIST_BQS_REGISTER: {},
        FIST_BQS_LOGIN: {},
        FIST_BQS_BIND: {},
        FIST_BQS_DYNAMIC: {},
        FIST_BQS_MODIFY: {},
        FIST_BQS_WITHDRAW: {},
        FIST_BQS_REPAYMENT: {}
      }
    }
  },
  beforeMount () {
    this.initRequest(addAllRequest)
  }
}
</script>
