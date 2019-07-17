<template>
  <div>
    <spinner :visible="loading.FISK_ALL" :fixed="true" :text="loading.loaddingMsg"></spinner>
    <span class="levelTitle">融360</span>
    <blockquote class="quote"><span id="FISK_BLACKAGENT">机构黑名单</span>
      <div class="quote-op"><a href="javascript:;" @click="handleRefresh('FISK_BLACKAGENT')"><svg-icon icon-class="refresh" /></a> <span class="rptime">报告时间：{{fiskData['FISK_BLACKAGENT'].reportTime}}</span></div>
    </blockquote>
    <el-card class="box-card" shadow="never" :body-style="{ padding: '0px' }">
      <spinner :visible="loading.FISK_BLACKAGENT" :fixed="false" :text="loading.loaddingMsg"></spinner>
      <blackTag v-if="fiskData['FISK_BLACKAGENT']" :blackObj="fiskData['FISK_BLACKAGENT']" />
    </el-card>

    <blockquote class="quote"><span id="FISK_RONG360">天机小额模型分</span>
      <div class="quote-op"><a href="javascript:;" @click="handleRefresh('FISK_RONG360')"><svg-icon icon-class="refresh" /></a> <span class="rptime">报告时间：{{fiskData['FISK_RONG360'].reportTime}}</span></div>
    </blockquote>
    <el-card class="box-card" shadow="never" :body-style="{ padding: '0px' }">
      <spinner :visible="loading.FISK_RONG360" :fixed="false" :text="loading.loaddingMsg"></spinner>
      <rongTag :rongObj="fiskData['FISK_RONG360']" />
    </el-card>

    <span class="levelTitle">算话</span>
    <blockquote class="quote"><span id="FISK_SUANHUA">欺诈风险等级</span>
      <div class="quote-op"><a href="javascript:;" @click="handleRefresh('FISK_SUANHUA')"><svg-icon icon-class="refresh" /></a> <span class="rptime">报告时间：{{fiskData['FISK_SUANHUA'].reportTime}}</span></div>
    </blockquote>
    <el-card class="box-card" shadow="never" :body-style="{ padding: '0px' }">
      <spinner :visible="loading.FISK_SUANHUA" :fixed="false" :text="loading.loaddingMsg"></spinner>
      <suanhuaTag :suanhuaObj="fiskData['FISK_SUANHUA'].riskData" />
    </el-card>

    <span class="levelTitle">百融</span>
    <blockquote class="quote"><span id="FISK_BAIRONG">特殊名单</span>
      <div class="quote-op"><a href="javascript:;" @click="handleRefresh('FISK_BAIRONG')"><svg-icon icon-class="refresh" /></a> <span class="rptime">报告时间：{{fiskData['FISK_BAIRONG'].reportTime}}</span></div>
    </blockquote>
    <el-card class="box-card" shadow="never" :body-style="{ padding: '0px' }">
      <spinner :visible="loading.FISK_BAIRONG" :fixed="false" :text="loading.loaddingMsg"></spinner>
      <baiRongTag :fiskData="fiskData['FISK_BAIRONG']" />
    </el-card>

    <blockquote class="quote"><span id="FIST_BR_EQSL">设备特殊名单</span>
      <div class="quote-op"><a href="javascript:;" @click="handleRefresh('FIST_BR_EQSL')"><svg-icon icon-class="refresh" /></a> <span class="rptime">报告时间：{{fiskData['FIST_BR_EQSL'].reportTime}}</span></div>
    </blockquote>
    <el-card class="box-card" shadow="never" :body-style="{ padding: '0px' }">
      <spinner :visible="loading.FIST_BR_EQSL" :fixed="false" :text="loading.loaddingMsg"></spinner>
      <brTag :fiskData="fiskData['FIST_BR_EQSL']" />
    </el-card>

    <blockquote class="quote"><span id="FIST_BR_ENV">设备环境风险</span>
      <div class="quote-op"><a href="javascript:;" @click="handleRefresh('FIST_BR_ENV')"><svg-icon icon-class="refresh" /></a> <span class="rptime">报告时间：{{fiskData['FIST_BR_ENV'].reportTime}}</span></div>
    </blockquote>
    <el-card class="box-card" shadow="never" :body-style="{ padding: '0px' }">
      <spinner :visible="loading.FIST_BR_ENV" :fixed="false" :text="loading.loaddingMsg"></spinner>
      <brEnvTag :fiskData="fiskData['FIST_BR_ENV']" />
    </el-card>

    <blockquote class="quote"><span id="FIST_BR_EA">设备应用偏好</span>
      <div class="quote-op"><a href="javascript:;" @click="handleRefresh('FIST_BR_EA')"><svg-icon icon-class="refresh" /></a> <span class="rptime">报告时间：{{fiskData['FIST_BR_EA'].reportTime}}</span></div>
    </blockquote>
    <el-card class="box-card" shadow="never" :body-style="{ padding: '0px' }">
      <spinner :visible="loading.FIST_BR_EA" :fixed="false" :text="loading.loaddingMsg"></spinner>
      <brEaTag :fiskData="fiskData['FIST_BR_EA']" />
    </el-card>

    <blockquote class="quote"><span id="FIST_BR_ER">设备实名关联</span>
      <div class="quote-op"><a href="javascript:;" @click="handleRefresh('FIST_BR_ER')"><svg-icon icon-class="refresh" /></a> <span class="rptime">报告时间：{{fiskData['FIST_BR_ER'].reportTime}}</span></div>
    </blockquote>
    <el-card class="box-card" shadow="never" :body-style="{ padding: '0px' }">
      <spinner :visible="loading.FIST_BR_ER" :fixed="false" :text="loading.loaddingMsg"></spinner>
      <brErTag :fiskData="fiskData['FIST_BR_ER']"  />
    </el-card>

    <blockquote class="quote"><span id="FIST_BR_EG">设备群体欺诈</span>
      <div class="quote-op"><a href="javascript:;" @click="handleRefresh('FIST_BR_EG')"><svg-icon icon-class="refresh" /></a> <span class="rptime">报告时间：{{fiskData['FIST_BR_EG'].reportTime}}</span></div>
    </blockquote>
    <el-card class="box-card" shadow="never" :body-style="{ padding: '0px' }">
      <spinner :visible="loading.FIST_BR_EG" :fixed="false" :text="loading.loaddingMsg"></spinner>
      <brEgTag :fiskData="fiskData['FIST_BR_EG']" />
    </el-card>

    <blockquote class="quote"><span id="FIST_BR_EB">设备行为画像</span>
      <div class="quote-op"><a href="javascript:;" @click="handleRefresh('FIST_BR_EB')"><svg-icon icon-class="refresh" /></a> <span class="rptime">报告时间：{{fiskData['FIST_BR_EB'].reportTime}}</span></div>
    </blockquote>
    <el-card class="box-card" shadow="never" :body-style="{ padding: '0px' }">
      <spinner :visible="loading.FIST_BR_EB" :fixed="false" :text="loading.loaddingMsg"></spinner>
      <brEbTag :fiskData="fiskData['FIST_BR_EB']" />
    </el-card>
  </div>
</template>
<script>
import pageMixin from './minx'
let addAllRequest = [
  'FISK_BLACKAGENT',
  'FISK_RONG360',
  'FISK_SUANHUA',
  'FISK_BAIRONG',
  'FIST_BR_EQSL',
  'FIST_BR_ENV',
  'FIST_BR_EA',
  'FIST_BR_ER',
  'FIST_BR_EG',
  'FIST_BR_EB'
]
export default {
  mixins: [pageMixin],
  components: {
    blackTag: () => import('./../fisk/blackagent.vue'),
    rongTag: () => import('./../fisk/rong360.vue'),
    suanhuaTag: () => import('./../fisk/suanhua.vue'),
    baiRongTag: () => import('./../fisk/bairong.vue'),
    brTag: () => import('./../fisk/br.vue'),
    brEnvTag: () => import('./../fisk/br_env.vue'),
    brEaTag: () => import('./../fisk/br_ea.vue'),
    brErTag: () => import('./../fisk/br_er.vue'),
    brEgTag: () => import('./../fisk/br_eg.vue'),
    brEbTag: () => import('./../fisk/br_eb.vue')
  },
  data () {
    return {
      loading: {
        loaddingMsg: '',
        FISK_BLACKAGENT: false,
        FISK_SUANHUA: false,
        FISK_RONG360: false,
        FISK_BAIRONG: false,
        FIST_BR_EQSL: false,
        FIST_BR_ENV: false,
        FIST_BR_EA: false,
        FIST_BR_ER: false,
        FIST_BR_EG: false,
        FIST_BR_EB: false
      },
      fiskData: {
        FISK_BLACKAGENT: '',
        FISK_RONG360: {
          riskData: {
          }
        },
        FISK_SUANHUA: {
          riskData: {
            riskG1: {}
          }
        },
        FISK_BAIRONG: {},
        // 新增
        FIST_BR_EQSL: {},
        FIST_BR_ENV: {},
        FIST_BR_EA: {},
        FIST_BR_ER: {},
        FIST_BR_EG: {},
        FIST_BR_EB: {}
      }
    }
  },
  beforeMount () {
    this.initRequest(addAllRequest)
  }
}
</script>
