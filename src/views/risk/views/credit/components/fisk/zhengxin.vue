<template>
  <dl class="cardinfo">
    <dd>
      <el-row :gutter="60">
        <el-col :span="6"><span class="tagbox">借款机构数 <span>{{getOrgName}}</span> 家</span></el-col>
        <el-col :span="6"><span class="tagbox">获批机构数 <span>{{getStatus2}}</span> 家</span></el-col>
        <el-col :span="6"><span class="tagbox">借款笔数 <span v-if="zhengxinObj.riskLoanInfos">{{zhengxinObj.riskLoanInfos.length}}</span> 笔</span></el-col>
        <el-col :span="6"><span class="tagbox">正常还款笔数 <span>{{getRepayStatus(1)}}</span> 笔</span></el-col>
      </el-row>
    </dd>
    <dd>
      <el-row :gutter="60">
        <el-col :span="6"><span class="tagbox">逾期笔数 <span class="red">{{getRepayStatus('M')}}</span> 笔</span></el-col>
        <el-col :span="6"><span class="tagbox">待放款笔数 <span class="red">{{getBorrowStatus(3)}}</span> 笔</span></el-col>
        <el-col :span="6"><span class="tagbox">历史逾期M3+/M6+笔数 <span class="red">{{getBorrowM3M6}}</span> 笔</span></el-col>
        <el-col :span="6"><span class="tagbox">拒贷笔数 <span class="red">{{getBorrowStatus(1)}}</span> 笔</span></el-col>
      </el-row>
    </dd>
    <!-- <dd>
      <el-row :gutter="60">
        <el-col :span="5">拒贷次数：{{zhengxinStatic.judai}}</el-col>
        <el-col :span="5">批款已放款次数：{{zhengxinStatic.pikuan}}</el-col>
        <el-col :span="5">待放款次数：{{zhengxinStatic.daifang}}</el-col>
        <el-col :span="5">借款人放弃申请次数：{{zhengxinStatic.jiekuan}}</el-col>
        <el-col :span="4">总申请次数：{{zhengxinStatic.count}}</el-col>
      </el-row>
    </dd> -->
    <dd>
      <el-table
        header-row-class-name='headclass'
        :data="zhengxinObj.riskLoanInfos"
        style="width: 100%">
        <el-table-column
          prop="riskCompanyCode"
          label="机构代码"
          sortable
          width="180">
        </el-table-column>
        <el-table-column
          prop="riskBorrowType"
          label="借款类型"
          width="180">
          <template slot-scope="scope">
            <span>{{scope.row.riskBorrowType | FilterToFisk('loanTypeCode')}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="riskBorrowState"
          label="借款状态">
          <template slot-scope="scope">
            <span>{{scope.row.riskBorrowState | FilterToFisk('loanStateCode')}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="riskBorrowAmount"
          label="借款金额(万元)">
          <template slot-scope="scope">
            <span>{{scope.row.riskBorrowAmount | FilterToAmount}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="riskLoanPeriod"
          label="借款期数">
        </el-table-column>
        <el-table-column
          prop="riskContractDate"
          sortable
          label="借款时间">
          <template slot-scope="scope">
            <span>{{scope.row.riskContractDate | FilterTime}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="riskRepayState"
          label="还款状态">
          <template slot-scope="scope">
            <el-tag v-if="checkNum(scope.row.riskRepayState)" :type="checkNum(scope.row.riskRepayState)" size="small">{{scope.row.riskRepayState | FilterToFisk('riskRepayState')}}</el-tag>
            <span v-else>{{scope.row.riskRepayState | FilterToFisk('riskRepayState')}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="riskArrearsAmount"
          label="未还金额(元)">
          <template slot-scope="scope">
            <span>{{scope.row.riskArrearsAmount/100000}}</span>
          </template>
        </el-table-column>
      </el-table>
    </dd>
  </dl>
</template>
<script>
export default {
  props: {
    zhengxinObj: {
      type: Object,
      default: () => {}
    },
    zhengxinStatic: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    checkNum (val) {
      if (val) {
        if (/^[1-8]$/.test(val)) {
          if (/^[2-8]$/.test(val)) {
            return 'danger'
          } else if (val === 1) {
            return 'warning'
          }
        } else {
          return false
        }
      }
      return false
    },
    getRepayStatus (code) { // 逾期笔数 或 正常还款笔数
      let riskRepayState = []
      if (typeof code === 'number') {
        riskRepayState = this.zhengxinObj.riskLoanInfos.filter(item => {
          return item.riskRepayState === code
        })
      } else {
        riskRepayState = this.zhengxinObj.riskLoanInfos.filter(item => {
          return item.riskRepayState <= 8 && item.riskRepayState >= 2
        })
      }
      return riskRepayState.length
    },
    getApprovalStatus (code) { // 获批机构数
      let riskApprovalStatusCode = this.zhengxinObj.riskLoanInfos.filter(item => {
        return item.riskApprovalStatusCode === code
      })
      return riskApprovalStatusCode.length
    },
    getBorrowStatus (code) { // 借款状态
      let riskBorrowState = this.zhengxinObj.riskLoanInfos.filter(item => {
        return item.riskBorrowState === code
      })
      return riskBorrowState.length
    }
  },
  computed: {
    getOverdueTotal () { // 获批机构数
      let riskOverdueTotal = this.zhengxinObj.riskLoanInfos.filter(item => {
        return !!item.riskOverdueTotal
      })
      return riskOverdueTotal.length
    },
    getBorrowM3M6 () { // 获批机构数
      let M3M6 = this.zhengxinObj.riskLoanInfos.reduce((pre, cur) => {
        if (cur.riskRepayState > 4 && cur.riskRepayState <= 8) pre[0]++
        if (cur.riskRepayState === 8) pre[1]++
        return pre
      }, [0, 0])
      return M3M6.join('/')
    },
    getStatus2 () { // 获批机构数
      let count = this.zhengxinObj.riskLoanInfos.reduce((pre, cur) => {
        if (cur.riskBorrowState === 2) {
          if (pre.indexOf(cur.riskCompanyCode) === -1) {
            pre.push(cur.riskCompanyCode)
          }
        }
        return pre
      }, [])
      // let riskOrgName = this.zhengxinObj.riskLoanInfos.filter(item => {
      //   return item.riskBorrowState === 2
      // })
      // let riskCompanyCode = riskOrgName.map(item => {
      //   return item.riskCompanyCode
      // })
      // let arrCode = Array.from(new Set(riskCompanyCode))
      // console.log(arrCode)
      // return arrCode.length
      return count.length
    },
    getOrgName () { // 借款机构数
      let riskOrgName = this.zhengxinObj.riskLoanInfos.map(item => {
        return item.riskCompanyCode
      })
      let arrCode = Array.from(new Set(riskOrgName))
      return arrCode.length
    }
  },
  filters: {
    FilterToAmount (value) {
      if (typeof value === 'number') {
        let amountMap = new Map([
          ['-7', '[0,0.1)'],
          ['-6', '[0.1,0.2)'],
          ['-5', '[0.2,0.3)'],
          ['-4', '[0.3,0.4)'],
          ['-3', '[0.4,0.6)'],
          ['-2', '[0.6,0.8)'],
          ['-1', '[0.8,1)'],
          ['0', '未知'],
          ['1', '[1,2)']
        ])
        for (let [key, val] of amountMap) {
          if (key === String(value)) {
            return val
          }
        }
        if (value >= 2) {
          return '[' + (2 * value - 2) + ', ' + (value * 2) + ')'
        }
        return value
      }
      return ''
    }
  }
}
</script>
