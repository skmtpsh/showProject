<template>
  <div v-if="ruleResult && ruleResult.length > 0 & !loading">
    <blockquote class="quote">
      <span>机审规则</span>
    </blockquote>
    <el-card class="box-card" shadow="never" :body-style="{ padding: '0px' }">
      <template  v-for="(item, index) in ruleResult">
        <dl class="cardinfo" :key="index" v-if="Object.keys(item.obj) && item.obj">
          <dt>{{item.key | FilterToKey}}</dt>
          <dd>
            <el-row :gutter="60">
              <el-col :span="6">
                <span>是否命中：{{item.obj.isHit ? '是' : '否'}}</span>
              </el-col>
              <el-col :span="9" v-if="item.obj.formularName">
                <span v-if="item.obj.formularName">规则名称：{{ item.obj.formularName }}</span>
                <!-- <span>规则名称：</span><comPlists :lists="item.obj.formularName"></comPlists> -->
              </el-col>
              <el-col :span="9" v-if="item.obj.value">
                <span v-if="item.obj.value">规则编码：{{ item.obj.value }}</span>
                <!-- <span>规则编码：</span><comPlists :lists="item.obj.value"></comPlists> -->
              </el-col>
            </el-row>
          </dd>
        </dl>
      </template>
      <!-- <dl v-if="ruleResult.length === 0">
        <dd>
          <el-row :gutter="60">
            <el-col :span="6">
              <span>没有命中项</span>
            </el-col>
          </el-row>
        </dd>
      </dl> -->
    </el-card>
  </div>
</template>
<script>
let comPlists = {
  render: function (h) {
    let listsArr = this.lists.split(',')
    return (
      <span>
        { listsArr.map((item) => <div><el-tag style="margin: 0 5px; " size="small">{item}</el-tag> </div>) }
      </span>
    )
  },
  props: ['lists']
}
export default {
  components: {
    comPlists
  },
  props: ['ruleObj', 'loading'],
  computed: {
    ruleResult () {
      let ruleObj = this.ruleObj
      let tempRuleObj = []
      Object.keys(ruleObj).forEach(item => {
        if (ruleObj[item]) {
          tempRuleObj.push({
            key: item,
            obj: ruleObj[item]
          })
        }
      })
      return tempRuleObj
    }
  },
  filters: {
    FilterToKey (val) {
      let ruleName = ''
      switch (val) {
        case 'fstTrial':
          ruleName = '初审结果'
          break
        case 'sndTrial':
          ruleName = '复审结果'
          break
        case 'sndTrial7':
          ruleName = '首借复审7天'
          break
        case 'sndTrial14':
          ruleName = '首借复审14天'
          break
        case 'sndTrial30':
          ruleName = '首借复审30天'
          break
        case 'sndTrialRefuse':
          ruleName = '复借复审拒绝'
          break
        case 'sndTrialPass':
          ruleName = '复借复审通过'
          break
        default:
          break
      }
      return ruleName
    }
  }
}
</script>
