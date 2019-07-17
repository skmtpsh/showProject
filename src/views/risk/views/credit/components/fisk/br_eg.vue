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
        <el-col :span="8" v-for="item in bairongDetailData.brArr" :key="item.rule" style="margin:5px 0; text-align: left;">
          <span style="height: 24px; display: inline-block; line-height: 24px;" v-if="!item.showType">
            {{item.value}}：
            <el-tag size="small" v-if="item.key.indexOf('EgGroupctrl') > -1" :type="item.metaValue === '1' ? 'info' : 'primary'">{{item.metaValue | FilterToBR(item.key)}}</el-tag>
            <b v-else >{{item.metaValue}}</b>
          </span>
        </el-col>
      </el-row>
    </dd>
  </dl>
  <el-row :gutter="60" >
    <el-col :span="10">
      <dl class="cardinfo">
        <dt>设备群体分析（近7天内）</dt>
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
                prop="day1"
                label="24小时"
                >
              </el-table-column>
              <el-table-column
                prop="day7"
                label="7天"
                >
              </el-table-column>
            </el-table>
            <span v-else>无数据</span>
        </dd>
      </dl>
    </el-col>
    <el-col :span="14">
      <dl class="cardinfo">
        <dt>用户设备群体申请次数分析（近6个月内）</dt>
        <dd>
            <el-table
            header-row-class-name='headclass'
            v-if="bairongTopApp"
            :data="bairongTopApp"
            style="width: 100%">
              <el-table-column
                prop="detail"
                width="160"
                label="详细分析"
                >
              </el-table-column>
              <el-table-column
                prop="mon1"
                label="第1个月"
                >
              </el-table-column>
              <el-table-column
                prop="mon2"
                label="第2个月"
                >
              </el-table-column>
              <el-table-column
                prop="mon3"
                label="第3个月"
                >
              </el-table-column>
              <el-table-column
                prop="mon4"
                label="第4个月"
                >
              </el-table-column>
              <el-table-column
                prop="mon5"
                label="第5个月"
                >
              </el-table-column>
              <el-table-column
                prop="mon6"
                label="第6个月"
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
import brMeta from './meta/eg'
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
      let brDetailData = brMeta.egMetaArr.reduce((pre, cur, i) => {
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
        if ((/RuleNameREE(.*?)$/g).test(cur)) {
          let code = cur.match(/REE(.*?)$/g)
          pre.push({rule: brData[cur], value: brData['riskRuleWeight' + code]})
        }
        return pre
      }, [])
      return brTableData
    },
    bairongApp () {
      let brData = this.fiskData
      let days = [1, 7]
      let tempArrDay = []
      brMeta.egMetaTabArr.forEach(item => {
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
      let days = [1, 2, 3, 4, 5, 6]
      let tempArrDay = []
      brMeta.egMetaTabTopArr.forEach(item => {
        // console.log(item, brData[item.key])
        if (brData[item.key]) {
          let tempDay = brData[item.key] && brData[item.key].split(',').reduce((pre, cur, i) => {
            pre['mon' + days[i]] = cur
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
      if (key.indexOf('riskEgGroupctrl') > -1) {
        tempStr = value === '1' ? '是' : '否'
      } else {
        tempStr = value
      }
      return tempStr
    }
  }
}
</script>
