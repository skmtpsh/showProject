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
      <el-row :gutter="60" style=" padding: 20px 0;">
        <el-col :span="8" v-for="item in bairongDetailData.brArr" :key="item.rule" style="margin:5px 0; text-align: left;">
          <span style="height: 24px; display: inline-block; line-height: 24px;">
            {{item.rule}}：
            <el-tag size="small" v-if="item.key.indexOf('Envis') > -1" :type="item.value === '1' ? 'info' : 'primary'">{{item.value | FilterToBR(item.key)}}</el-tag>
            <b v-else >{{item.value}}</b>
            <span v-if="item.key.indexOf('duration') > -1"> 分钟</span>
            <span v-if="item.key.indexOf('livetime') > -1"> 秒</span>
          </span>
        </el-col>
      </el-row>
    </dd>
  </dl>
</template>
<script>
import brMeta from './meta/env'
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
        if ((/riskEnv(.*?)$/g).test(cur)) {
          if (brData[cur] === '2') {
            pre.brTotal.total2++
          }
          if (brData[cur] === '1') {
            pre.brTotal.total1++
          }
          if (brData[cur] === '0') {
            pre.brTotal.total0++
          }
          pre.brArr.push({key: cur, rule: brMeta[cur], value: brData[cur]})
        }
        return pre
      }, {brArr: [], brTotal: {total2: 0, total1: 0, total0: 0}})
      return brDetailData
    },
    bairongData () {
      let brData = this.fiskData
      let brTableData = Object.keys(brData).reduce((pre, cur) => {
        if ((/RuleNameREA(.*?)$/g).test(cur)) {
          let code = cur.match(/REA(.*?)$/g)
          pre.push({rule: brData[cur], value: brData['riskRuleWeight' + code]})
        }
        return pre
      }, [])
      return brTableData
    }
  },
  filters: {
    FilterToBR (value, key) {
      let tempStr = ''
      if (key.indexOf('Envis') > -1) {
        tempStr = value === '1' ? '是' : '否'
      } else {
        tempStr = value
      }
      return tempStr
    }
  }
}
</script>
