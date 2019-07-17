<template>
  <div :class="filter === 1 ? 'inner' : ''">
    <template v-if="(riskObj.tongdunFraud && riskObj.tongdunFraud.length > 0) || (riskObj.bqsFraud && riskObj.bqsFraud.length >0)">
      <blockquote class="quote">欺诈情况</blockquote>
      <el-card class="box-card" shadow="never" :body-style="{ padding: '0px' }" >
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
    </template>
    <template v-if="riskObj.blacklist && riskObj.blacklist.length > 0">
      <blockquote class="quote">黑名单</blockquote>
      <el-card class="box-card" shadow="never" :body-style="{ padding: '0px' }">
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
    </template>
    <template v-if="(riskObj.zhengxin && riskObj.zhengxin.length > 0) || (riskObj.afu && riskObj.afu.length >0)">
      <blockquote class="quote">逾期/负债情况</blockquote>
      <el-card class="box-card" shadow="never" :body-style="{ padding: '0px' }">
        <dl class="cardinfo" v-if="riskObj.zhengxin && riskObj.zhengxin.length > 0">
          <dt>91征信</dt>
          <dd>
            <el-row :gutter="60">
              <el-col :span="8" v-for="(item, index) in riskObj.zhengxin" :key="index">
                {{item.ruleName}} <b>: {{item.ruleValue }}</b>
              </el-col>
            </el-row>
          </dd>
        </dl>
        <dl class="cardinfo" v-if="riskObj.afu && riskObj.afu.length >0">
          <dt>阿福</dt>
          <dd>
            <el-row :gutter="60">
              <el-col :span="8" v-for="(item, index) in riskObj.afu" :key="index">
                {{item.ruleName}} <b>: {{item.ruleValue }}</b>
              </el-col>
            </el-row>
          </dd>
        </dl>
      </el-card>
    </template>
    <template v-if="riskObj.bqsMultipoint && riskObj.bqsMultipoint.length > 0">
      <blockquote class="quote">多头情况</blockquote>
      <el-card class="box-card" shadow="never" :body-style="{ padding: '0px' }">
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
    return {}
  }
}
</script>
