<template>
  <dl class="cardinfo">
    <dt>设备命中详情</dt>
    <dd>
      <el-table
        header-row-class-name='headclass'
        :data="bairongData"
        style="width: 100%">
        <el-table-column
          prop="rule"
          label="规则"
          width="500"
          >
        </el-table-column>
        <el-table-column
          prop="value"
          label="权重">
        </el-table-column>
      </el-table>
    </dd>
    <dt>设备信息详情</dt>
    <dd>
      <el-row :gutter="60" style="border-bottom: 1px dashed #ccc; padding: 20px 0;">
        <el-col :span="8"><span>一度关系命中 <b>{{bairongDetailData.eqslTotal.total1}}</b> 次</span></el-col>
        <el-col :span="8"><span>二度关系命中 <b>{{bairongDetailData.eqslTotal.total2}}</b> 次</span></el-col>
      </el-row>
      <el-row :gutter="60" style=" padding: 20px 0;">
        <el-col :span="8" v-for="item in bairongDetailData.eqslArr" :key="item.rule" style="margin:5px 0; text-align: right;">
          {{item.rule}}：
          <el-tag size="small" :type="item.value === '1' ? 'warning' : ''">{{item.value | FilterToBR}}</el-tag>
        </el-col>
      </el-row>
    </dd>
  </dl>
</template>
<script>
import brMeta from './meta/eqsl'
export default {
  props: {
    fiskData: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    bairongDetailData () {
      let brData = this.fiskData
      let brDetailData = Object.keys(brData).reduce((pre, cur) => {
        if ((/riskEqsl(.*?)$/g).test(cur)) {
          if (brData[cur] === '2') {
            pre.eqslTotal.total2++
          }
          if (brData[cur] === '1') {
            pre.eqslTotal.total1++
          }
          if (brData[cur] === '0') {
            pre.eqslTotal.total0++
          }
          pre.eqslArr.push({rule: brMeta[cur], value: brData[cur]})
        }
        return pre
      }, {eqslArr: [], eqslTotal: {total2: 0, total1: 0, total0: 0}})
      return brDetailData
    },
    bairongData () {
      let brData = this.fiskData
      let brTableData = Object.keys(brData).reduce((pre, cur) => {
        if ((/RuleNameQES(.*?)$/g).test(cur)) {
          let code = cur.match(/QES(.*?)$/g)
          pre.push({rule: brData[cur], value: brData['riskRuleWeight' + code]})
        }
        return pre
      }, [])
      return brTableData
    }
  },
  filters: {
    FilterToBR (value) {
      let tempStr = ''
      if (value === '2') {
        tempStr = '二度关系命中'
      }
      if (value === '1') {
        tempStr = '一度关系命中'
      }
      if (value === '0') {
        tempStr = '本人直接命中'
      }
      return tempStr
    }
  }
}
</script>
