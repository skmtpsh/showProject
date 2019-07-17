<template>
  <div>
    <dl class="cardinfo">
      <dt>
        <span>最终决策结果建议：</span><b>{{handleData.riskFinalDecision | filterToResult}}</b>
      </dt>
      <dt>命中规则详情</dt>
      <dd>
        <el-table
          :data="tableData"
          stripe
          style="width: 100%">
          <el-table-column
            prop="rules"
            label="规则">
          </el-table-column>
          <el-table-column
            prop="memo"
            label="风险描述" >
            <template slot-scope="scope">
              <comp-multi :check-data="scope.row"></comp-multi>
            </template>
          </el-table-column>
          <el-table-column
            prop="advance"
            label="决策建议"
            width="350">
            <template slot-scope="props">
              {{props.row.advance | filterToResult}}
            </template>
          </el-table-column>
        </el-table>
      </dd>
    </dl>
  </div>
</template>
<script>
let compMulti = {
  render: function (h) {
    return (
      <span>
        {
          this.checkNum ? <el-tag size="small" disable-transitions type={this.checkNum}>{this.checkData.memo}</el-tag> : <span>{this.checkData.memo}</span>
        }
      </span>
    )
  },
  props: ['checkData'],
  computed: {
    checkNum () {
      let scop = this.checkData
      let reg = /[0-9]+/g
      if (scop.rules && scop.memo) {
        let arr = scop.memo.split(',')
        if (scop.rules.indexOf('三天') > -1) {
          if (arr.length > 0 && reg.test(arr[0])) {
            if (parseFloat(arr[0].match(reg)[0]) > 0) {
              return 'danger'
            }
          }
        } else if (scop.rules.indexOf('七天') > -1) {
          if (arr.length > 0 && reg.test(arr[0])) {
            let num = parseFloat(arr[0].match(reg)[0])
            if (num >= 8) {
              return 'danger'
            } else if (num < 8) {
              return 'warning'
            } else {
              return false
            }
          }
        } else if (scop.rules.indexOf('一个月') > -1) {
          if (arr.length > 0 && reg.test(arr[0])) {
            let num = parseFloat(arr[0].match(reg)[0])
            if (num > 25) {
              return 'danger'
            } else if (num <= 25 && num >= 15) {
              return 'warning'
            } else {
              return false
            }
          }
        }
        // 新增
        if (scop.rules.indexOf('黑名单') > -1) {
          return 'danger'
        } else if (scop.rules.indexOf('灰名单') > -1) {
          return 'warning'
        }
        return false
      }
      return false
    }
  }
}
export default {
  props: ['dataObj'],
  components: {
    compMulti
  },
  data () {
    return {
    }
  },
  computed: {
    handleData () {
      return this.dataObj
    },
    tableData () {
      let tabledatas = []
      if (this.handleData.riskData) {
        this.handleData.riskData.forEach(ele => {
          let data = ele.riskHitRulesList.map(item => {
            return {
              rules: item.riskRuleName,
              memo: item.riskMemo,
              advance: item.riskDecision
            }
          })
          tabledatas.push(...data)
        })
      }
      return tabledatas
    }
  },
  filters: {
    filterToResult (val) {
      let txt = ''
      if (val === 'Accept') {
        txt = '通过，无风险'
      } else if (val === 'Reject') {
        txt = '拒绝，风险评估决策为高风险建议拒绝'
      } else if (val === 'Review') {
        txt = '审核，风险评估决策为低风险建议人工审核'
      }
      return txt
    }
  },
  mounted () {
    // this.$nextTick(() => {

    // })
  }
}
</script>
