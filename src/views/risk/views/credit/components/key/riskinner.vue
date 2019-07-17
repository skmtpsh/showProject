<template>
  <div :class="filter === 1 ? 'inner' : ''">
    <blockquote id="RISKKEYINFO" class="quote" @click="show = !show">关键信息
      <el-button size="mini" type="warning" :icon="show ? 'el-icon-arrow-down' : 'el-icon-arrow-right'" circle></el-button>
    </blockquote>
    <template v-if="show">
      <el-card class="box-card" shadow="never" id="RISK_KEY" :body-style="{ padding: '0px' }" v-if="!checkDataNull()">
        <div style="text-align:center; padding:20px; font-weight:bold;">未命中</div>
      </el-card>
      <el-card class="box-card" shadow="never" :body-style="{ padding: '0px' }"
         v-if="(riskObj.tongdunFraud && riskObj.tongdunFraud.length > 0) || (riskObj.bqsFraud && riskObj.bqsFraud.length >0)"
        >
        <div slot="header" class="clearfix box-card-tit">
          <div class="card-tit" id="RISK_QIZHA"><svg-icon icon-class="play_fill" /> <span>欺诈情况</span></div>
        </div>
        <dl class="cardinfo" v-if="riskObj.tongdunFraud && riskObj.tongdunFraud.length >0">
          <dt>同盾</dt>
          <dd>
            <el-row :gutter="60">
              <el-col :span="6" v-for="(item, index) in riskObj.tongdunFraud" :key="index">
                {{item.ruleName}} <b v-if="item.ruleValue > 1">: {{item.ruleValue }}</b>
              </el-col>
            </el-row>
          </dd>
        </dl>
        <dl class="cardinfo" v-if="riskObj.bqsFraud && riskObj.bqsFraud.length >0">
          <dt>白骑士</dt>
          <dd>
            <el-row :gutter="60">
              <el-col :span="6" v-for="(item, index) in riskObj.bqsFraud" :key="index">
                {{item.ruleName}} <b v-if="item.ruleValue > 1">: {{item.ruleValue }}</b>
              </el-col>
            </el-row>
          </dd>
        </dl>
      </el-card>
      <el-card class="box-card" shadow="never" :body-style="{ padding: '0px' }"  v-if="riskObj.blacklist && riskObj.blacklist.length > 0">
        <div slot="header" class="clearfix box-card-tit">
          <div class="card-tit" id="RISK_HEIMINGDAN"><svg-icon icon-class="play_fill" /> <span>黑名单</span></div>
        </div>
        <dl class="cardinfo">
          <dd>
            <el-row :gutter="60">
              <el-col :span="6" v-for="(item, index) in riskObj.blacklist" :key="index">
                {{item.ruleName}} <b v-if="item.ruleValue > 1">: {{item.ruleValue }}</b>
              </el-col>
            </el-row>
          </dd>
        </dl>
      </el-card>
      <el-card class="box-card" shadow="never" :body-style="{ padding: '0px' }" v-if="(riskObj.zhengxin && riskObj.zhengxin.length > 0) || (riskObj.afu && riskObj.afu.length >0)">
        <div slot="header" class="clearfix box-card-tit">
          <div class="card-tit" id="RISK_YUQI"><svg-icon icon-class="play_fill" /> <span>逾期/负债情况</span></div>
        </div>
        <dl class="cardinfo" v-if="riskObj.zhengxin && riskObj.zhengxin.length >0">
          <dt>91征信</dt>
          <dd>
            <el-row :gutter="60">
              <el-col :span="6" v-for="(item, index) in riskObj.zhengxin" :key="index">
                {{item.ruleName}} <b>: {{item.ruleValue }}</b>
              </el-col>
            </el-row>
          </dd>
        </dl>
        <dl class="cardinfo" v-if="riskObj.afu && riskObj.afu.length >0">
          <dt>阿福</dt>
          <dd>
            <el-row :gutter="60">
              <el-col :span="6" v-for="(item, index) in riskObj.afu" :key="index">
                {{item.ruleName}} <b>: {{item.ruleValue }}</b>
              </el-col>
            </el-row>
          </dd>
        </dl>
      </el-card>
      <el-card class="box-card" shadow="never" :body-style="{ padding: '0px' }" v-if="riskObj.bqsMultipoint && riskObj.bqsMultipoint.length">
        <div slot="header" class="clearfix box-card-tit">
          <div class="card-tit" id="RISK_DUOTOU"><svg-icon icon-class="play_fill" /> <span>多头情况</span></div>
        </div>
        <dl class="cardinfo" v-if="riskObj.bqsMultipoint && riskObj.bqsMultipoint.length >0">
          <dt>白骑士</dt>
          <dd>
            <el-row :gutter="60">
              <el-col :span="6" v-for="(item, index) in riskObj.bqsMultipoint" :key="index">
                {{item.ruleName}} <b v-if="item.ruleValue > 1">: {{item.ruleValue }}</b>
              </el-col>
            </el-row>
          </dd>
        </dl>
      </el-card>
    </template>
  </div>
</template>
<script>
export default {
  props: ['riskObj', 'filter'],
  data () {
    return {
      show: true
    }
  },
  methods: {
    checkDataNull () {
      let afu = this.riskObj.afu && this.riskObj.afu.length > 0
      let blacklist = this.riskObj.blacklist && this.riskObj.blacklist.length > 0
      let bqsFraud = this.riskObj.bqsFraud && this.riskObj.bqsFraud.length > 0
      let bqsMultipoint = this.riskObj.bqsMultipoint && this.riskObj.bqsMultipoint.length > 0
      let tongdunFraud = this.riskObj.tongdunFraud && this.riskObj.tongdunFraud.length > 0
      let zhengxin = this.riskObj.zhengxin && this.riskObj.zhengxin.length > 0

      if (!afu && !blacklist && !bqsFraud && !bqsMultipoint && !tongdunFraud && !zhengxin) {
        return false
      }
      return true
    }
  }
}
</script>
