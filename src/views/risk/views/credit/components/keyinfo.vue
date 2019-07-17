<template>
  <div>
    <spinner :visible="loading.show" :fixed="true" :text="loading.loaddingMsg"></spinner>
    <RuleTag :ruleObj="fiskData['RULE']" :loading="loading.show" />
    <BaseTag :baseObj="fiskData['BASE']" :filter='0' />
    <OpTag :opObj="fiskData['OP']" :filter='0'  />
    <RiskTag :riskObj="fiskData['RISK']" :filter='0' />
  </div>
</template>
<script>
import Spinner from '@/components/spinner'
import axios from 'axios'
import keyApi from '@/api/keyinfo/index'
export default {
  components: {
    Spinner,
    OpTag: () => import('./key/op.vue'),
    RiskTag: () => import('./key/risk.vue'),
    BaseTag: () => import('./key/base.vue'),
    RuleTag: () => import('./key/rule.vue')
  },
  data () {
    return {
      loading: {
        loaddingMsg: '',
        show: false
      },
      fiskData: {
        RULE: {
          fstTrial: {},
          sndTrial: {},
          sndTrial7: {},
          sndTrial14: {},
          sndTrial30: {},
          sndTrialPass: {},
          sndTrialRefuse: {}
        },
        BASE: {
          basicInfo: {},
          ocrInfo: {},
          orderInfo: {},
          userInfo: {},
          validateInfo: {}
        },
        OP: {
          areaAnalysisObj: [],
          basicObj: {},
          callLogObj: [],
          portraitObj: {},
          specialCateObj: [],
          riskAnalysisObj: {}
        },
        RISK: {
          afu: [],
          blacklist: [],
          bqsFraud: [],
          bqsMultipoint: [],
          tongdunFraud: [],
          zhengxin: []
        }
      }
    }
  },
  beforeMount () {
    let allRequest = [
      'BASE',
      'OP',
      'RISK',
      'RULE'
    ]
    let querys = this.$route.query
    if (!querys) { // Object.keys(querys).length
      this.$message({
        message: '参数不正确',
        type: 'warning'
      })
    }
    // Loading
    // Define Params
    this.params = querys
    let reqArrFun = allRequest.map((item) => {
      return keyApi[item](this.params)
    })
    this.loading.show = true
    axios.all(reqArrFun)
      .then(axios.spread((...allResonse) => {
        this.loading.show = false
        // set data
        for (let [i, item] of new Map(allResonse.map((item, i) => [i, item]))) {
          if (item.data.code === 200 && item.data.datas) {
            this.$set(this.fiskData, allRequest[i], item.data.datas)
          } else {
            console.log('interator:' + allRequest[i] + ' msg:' + item.data.message)
          }
        }
      })).catch((error) => {
        this.loading.show = false
        console.log(error)
      })
  }
}
</script>
