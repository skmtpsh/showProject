<template>
<div>
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
      <el-row :gutter="5" style=" padding: 20px 0;">
        <el-col :span="12" v-for="item in bairongDetailData.brArr" :key="item.rule" style="margin:5px 0; text-align: left;">
          <span v-if="!item.showType">
            {{item.value}}： <span>{{item.metaValue | FilterToTrans(item)}}</span>
          </span>
        </el-col>
      </el-row>
    </dd>
  </dl>
  <el-row :gutter="60" >
    <el-col :span="24">
      <dl class="cardinfo">
        <dt>设备最近10次操作间隔分析</dt>
        <dd>
         <el-table
          header-row-class-name='headclass'
          v-if="bairongTopApp"
          :data="bairongTopApp"
          style="width: 100%">
            <el-table-column
              prop="detail"
              width="280"
              label="详细分析"
              >
            </el-table-column>
            <el-table-column
              prop="day1"
              label="1"
              >
            </el-table-column>
            <el-table-column
              prop="day2"
              label="2"
              >
            </el-table-column>
            <el-table-column
              prop="day3"
              label="3"
              >
            </el-table-column>
            <el-table-column
              prop="day4"
              label="4"
              >
            </el-table-column>
            <el-table-column
              prop="day5"
              label="5"
              >
            </el-table-column>
            <el-table-column
              prop="day6"
              label="6"
              >
            </el-table-column>
            <el-table-column
              prop="day7"
              label="7"
              >
            </el-table-column>
            <el-table-column
              prop="day8"
              label="8"
              >
            </el-table-column>
            <el-table-column
              prop="day9"
              label="9"
              >
            </el-table-column>
            <el-table-column
              prop="day10"
              label="10"
              >
            </el-table-column>
          </el-table>
          <span v-else>无数据</span>
        </dd>
      </dl>

      <dl class="cardinfo">
        <dt>用户设备行为分析（近180天内）</dt>
        <dd>
          <el-table
            header-row-class-name='headclass'
            v-if="bairongApp"
            :data="bairongApp"
            style="width: 100%">
              <el-table-column
                prop="detail"
                width="280"
                label="详细分析"
                >
              </el-table-column>
              <el-table-column
                prop="day0"
                label="1小时内"
                >
              </el-table-column>
              <el-table-column
                prop="day1"
                label="24小时内"
                >
              </el-table-column>
              <el-table-column
                prop="day7"
                label="7天内"
                >
              </el-table-column>
              <el-table-column
                prop="day30"
                label="30天内"
                >
              </el-table-column>
              <el-table-column
                prop="day90"
                label="90天内"
                >
              </el-table-column>
              <el-table-column
                prop="day180"
                label="180天内"
                >
              </el-table-column>
            </el-table>
            <span v-else>无数据</span>
        </dd>
      </dl>
    </el-col>
  </el-row>
</div>
</template>
<script>
import moment from 'moment'
import brMeta from './meta/eb'
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
      let brDetailData = brMeta.ebMetaArr.reduce((pre, cur, i) => {
        if (brData[cur.key]) {
          pre.brArr.push(Object.assign({}, cur, {metaValue: brData[cur.key]}))
        }
        return pre
      }, {brArr: []})
      return brDetailData
    },
    bairongData () {
      let brData = this.fiskData
      let brTableData = Object.keys(brData).reduce((pre, cur) => {
        if ((/RuleNameREB(.*?)$/g).test(cur)) {
          let code = cur.match(/REB(.*?)$/g)
          pre.push({rule: brData[cur], value: brData['riskRuleWeight' + code]})
        }
        return pre
      }, [])
      return brTableData
    },
    bairongApp () {
      let brData = this.fiskData
      let days = [0, 1, 7, 30, 90, 180]
      let tempArrDay = []
      brMeta.ebMetaTabArr.forEach(item => {
        // console.log(item, brData[item.key])
        if (brData[item.key]) {
          let tempDay = brData[item.key] && brData[item.key].split(',').reduce((pre, cur, i) => {
            pre['day' + days[i]] = cur
            pre.detail = item.value
            return pre
          }, {})
          tempArrDay.push(tempDay)
        }
      })
      return tempArrDay
    },
    bairongTopApp () {
      let brData = this.fiskData
      let days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
      let tempArrDay = []
      brMeta.ebMetaTabTopArr.forEach(item => {
        // console.log(item, brData[item.key])
        if (brData[item.key]) {
          let tempDay = brData[item.key] && brData[item.key].split(',').reduce((pre, cur, i) => {
            pre['day' + days[i]] = cur
            pre.detail = item.value
            pre.ismeta = item.isMeta
            return pre
          }, {})
          tempArrDay.push(tempDay)
        }
      })
      return tempArrDay
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
    },
    FilterToTrans (value, item) {
      if (item.isTranslate && item.metaValue) {
        let metaObj = {
          lend: '借款',
          register: '注册',
          login: '登录',
          cash: '体现'
        }
        let arrMeta = item.metaValue.split(',')
        return moment(parseInt(arrMeta[0])).format('YYYY-MM-DD') + ', ' + metaObj[arrMeta[1]]
      }
      return item.metaValue
    }
  }
}
</script>
