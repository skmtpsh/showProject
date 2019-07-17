<template>
  <div>
    <dl class="cardinfo">
      <dt>致诚分</dt>
      <dd>
        <el-row :gutter="60">
          <el-col :span="6">
            <span class="tagbox">致诚信用分 <span v-if="afuObj">{{afuObj.riskZcCreditScore}}</span></span>
          </el-col>
          <el-col :span="6"><span class="tagbox">违约概率 <span>
            <template v-if="afuObj">
               <el-tag v-if="checkRate" size="small" :type="checkRate">{{afuObj.riskContractBreakRate}}</el-tag>
              <b v-else>{{afuObj.riskContractBreakRate}}</b>
            </template>
            </span> </span></el-col>
        </el-row>
      </dd>
    </dl>
    <dl class="cardinfo">
      <dt>多头查询记录</dt>
      <dd>
        <el-row :gutter="10">
          <el-col :span="6">
            <div class="tagbox">
              查询总次数
              <span v-if="afuObj.riskQueryStatistics">
                {{getTotalRecords}}
              </span>
              <div class="tagtxt">
                <p> 近一个月 <br/> <b>{{getTimes('month')}}</b> 次 </p>
                <p> 近三个月 <br/> <b>{{getTimes('month3')}}</b> 次 </p>
                <p> 近半年 <br/> <b>{{getTimes('month6')}}</b> 次 </p>
              </div>
            </div>
          </el-col>
          <el-col :span="5"><span class="tagbox">其它机构数 <span v-if="afuObj.riskQueryStatistics">{{afuObj.riskQueryStatistics.riskOtherOrgCount}}</span> 家</span></el-col>
          <el-col :span="5"><span class="tagbox">其它机构查询数 <span v-if="afuObj.riskQueryStatistics">{{afuObj.riskQueryStatistics.riskTimesByOtherOrg}}</span> 次</span></el-col>
          <el-col :span="5"><span class="tagbox">本机构查询数 <span v-if="afuObj.riskQueryStatistics">{{afuObj.riskQueryStatistics.riskTimesByCurrentOrg}}</span> 次</span></el-col>
        </el-row>
      </dd>
      <dd>
        <el-table
          header-row-class-name='headclass'
          :data="afuObj.riskQueryHistory"
          style="width: 100%">
          <el-table-column
            prop="riskOrgName"
            label="机构代码"
            width="180">
          </el-table-column>
          <el-table-column
            prop="riskOrgType"
            label="机构类型">
          </el-table-column>
          <el-table-column
            prop="riskQueryReason"
            label="查询原因">
            <template slot-scope="scope">
              <span>{{scope.row.riskQueryReason | FilterToFisk('riskQueryReasonCode')}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="riskTime"
            label="查询时间">
          </el-table-column>
        </el-table>
      </dd>
    </dl>
    <dl class="cardinfo">
      <dt>风险项记录</dt>
      <dd>
        <el-table
          header-row-class-name='headclass'
          :data="afuObj.riskResults"
          style="width: 100%">
          <el-table-column
            prop="riskOrgName"
            label="机构代码"
            width="180">
          </el-table-column>
          <el-table-column
            prop="riskItemTypeCode"
            label="命中项目码"
            width="180">
            <template slot-scope="scope">
              <span>{{scope.row.riskItemTypeCode | FilterToFisk('riskItemTypeCode')}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="riskItemValue"
            label="命中内容"
            width="180">
          </el-table-column>
          <el-table-column
            prop="riskTypeCode"
            label="风险类别码"
            width="180">
            <template slot-scope="scope">
              <span>{{scope.row.riskTypeCode | FilterToFisk('riskTypeCode')}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="riskDetail"
            label="风险明细">
          </el-table-column>
          <el-table-column
            prop="riskTime"
            label="风险最近时间">
          </el-table-column>
        </el-table>
      </dd>
    </dl>
    <dl class="cardinfo">
      <dt>借款记录</dt>
      <dd>
        <el-row :gutter="60">
          <el-col :span="6"><span class="tagbox">借款机构数 <span>{{getOrgName}}</span> 家</span></el-col>
          <el-col :span="6"><span class="tagbox">获批机构数 <span>{{getStatus202}}</span> 家</span></el-col>
          <el-col :span="6"><span class="tagbox">借款笔数 <span v-if="afuObj.riskLoanRecords">{{afuObj.riskLoanRecords.length}}</span> 笔</span></el-col>
          <el-col :span="6"><span class="tagbox">正常还款笔数 <span>{{getLoanStatus('301')}}</span> 笔</span></el-col>
        </el-row>
      </dd>
      <dd>
        <el-row :gutter="60">
          <el-col :span="6"><span class="tagbox">当前逾期笔数 <span class="red">{{getLoanStatus('302')}}</span> 笔</span></el-col>
          <el-col :span="6"><span class="tagbox">历史逾期笔数 <span class="red">{{getOverdueTotal}}</span> 笔</span></el-col>
          <el-col :span="6"><span class="tagbox">历史逾期M3+/M6+笔数 <span class="red">{{getOverdueM3M6}}</span> 笔</span></el-col>
          <el-col :span="6"><span class="tagbox">拒贷笔数 <span class="red">{{getApprovalStatus('203')}}</span> 笔</span></el-col>
        </el-row>
      </dd>
      <dd>
        <el-table
          header-row-class-name='headclass'
          :data="afuObj.riskLoanRecords"
          style="width: 100%">
          <el-table-column
            prop="riskOrgName"
            label="机构代码"
            width="100">
          </el-table-column>
          <el-table-column
            prop="riskName"
            label="姓名"
            width="120">
          </el-table-column>
          <el-table-column
            prop="riskLoanDate"
            sortable
            label="借款时间">
          </el-table-column>
          <el-table-column
            prop="riskLoanAmount"
            label="借款金额(元)">
          </el-table-column>
          <el-table-column
            prop="riskPeriods"
            label="期数">
          </el-table-column>
          <el-table-column
            prop="riskLoanTypeCode"
            label="借款类项">
            <template slot-scope="scope">
              <span>{{scope.row.riskLoanTypeCode | FilterToFisk('riskLoanTypeCode')}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="riskApprovalStatusCode"
            label="审批结果">
            <template slot-scope="scope">
              <span>{{scope.row.riskApprovalStatusCode | FilterToFisk('approvalStatusCode')}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="riskLoanStatusCode"
            label="还款状态">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.riskLoanStatusCode === '301'" size="small" type="warning">{{scope.row.riskLoanStatusCode | FilterToFisk('loanStatusCode')}}</el-tag>
              <el-tag v-else-if="scope.row.riskLoanStatusCode === '302'" size="small" type="danger">{{scope.row.riskLoanStatusCode | FilterToFisk('loanStatusCode')}}</el-tag>
              <span v-else>{{scope.row.riskLoanStatusCode | FilterToFisk('loanStatusCode')}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="riskOverdueAmount"
            label="逾期金额(元)">
          </el-table-column>
          <el-table-column
            prop="riskOverdueStatus"
            label="逾期情况">
          </el-table-column>
          <el-table-column
            prop="riskOverdueM3"
            label="M3+次数">
          </el-table-column>
          <el-table-column
            prop="riskOverdueM6"
            label="M6+次数">
          </el-table-column>
          <el-table-column
            prop="riskOverdueTotal"
            label="总逾期次数">
          </el-table-column>
        </el-table>
      </dd>
    </dl>
  </div>
</template>
<script>
import moment from 'moment'
export default {
  props: {
    afuObj: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    getLoanStatus (code) { // 获批机构数
      let riskLoanStatusCode = this.afuObj.riskLoanRecords.filter(item => {
        return item.riskLoanStatusCode === code
      })
      return riskLoanStatusCode.length
    },
    getApprovalStatus (code) { // 获批机构数
      let riskApprovalStatusCode = this.afuObj.riskLoanRecords.filter(item => {
        return item.riskApprovalStatusCode === code
      })
      return riskApprovalStatusCode.length
    },
    getTimes (time) {
      let end = ''
      if (time === 'month') {
        end = moment().subtract(1, 'months')
      } else if (time === 'month3') {
        end = moment().subtract(3, 'months')
      } else if (time === 'month6') {
        end = moment().subtract(6, 'months')
      }
      let riskData = this.afuObj.riskQueryHistory
      return riskData.reduce((prev, cur) => {
        return prev + (moment(cur.riskTime).isAfter(end.format('YYYY-MM-DD')) ? 1 : 0)
      }, 0)
    }
  },
  computed: {
    getTotalRecords () {
      let totalRecords = 0
      let otherTotal = this.afuObj.riskQueryStatistics.riskTimesByOtherOrg || 0
      let currentTotal = this.afuObj.riskQueryStatistics.riskTimesByCurrentOrg || 0
      totalRecords = (otherTotal + currentTotal)
      return totalRecords
    },
    getOverdueTotal () { // 获批机构数
      let riskOverdueTotal = this.afuObj.riskLoanRecords.filter(item => {
        return !!item.riskOverdueTotal
      })
      return riskOverdueTotal.length
    },
    getOverdueM3M6 () { // 获批机构数
      let M3M6 = this.afuObj.riskLoanRecords.reduce((pre, cur) => {
        if (typeof cur.riskOverdueM3 !== 'undefined') pre[0]++
        if (typeof cur.riskOverdueM6 !== 'undefined') pre[1]++
        return pre
      }, [0, 0])
      return M3M6.join('/')
    },
    getStatus202 () { // 获批机构数
      let count = this.afuObj.riskLoanRecords.reduce((pre, cur) => {
        if (cur.riskApprovalStatusCode === '202') {
          if (pre.indexOf(cur.riskOrgName) === -1) {
            pre.push(cur.riskOrgName)
          }
        }
        return pre
      }, [])
      return count.length
    },
    getOrgName () { // 借款机构数
      let riskOrgName = this.afuObj.riskLoanRecords.map(item => {
        return item.riskOrgName
      })
      let arrCode = Array.from(new Set(riskOrgName))
      return arrCode.length
    },
    checkRate () {
      let rate = this.afuObj.riskContractBreakRate
      if (rate) {
        let rateRed = '73.6%'
        let rateWarning = '51.88%'
        if (rate === rateRed) {
          return 'danger'
        }
        if (rate === rateWarning) {
          return 'warning'
        }
        return ''
      }
    }
  }
}
</script>
