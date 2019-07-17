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
        <el-col :span="6" v-for="item in bairongDetailData.brArr" :key="item.rule" style="margin:5px 0; text-align: left;">
          <span style="height: 24px; display: inline-block; line-height: 24px;" v-if="!item.showType">
            {{item.value}}：
            <b v-if="item.isMeta">
              <!-- {{item.metaValue === '1' ? '是' : '否'}} -->
              <el-tag size="mini" :type="item.metaValue === '1' ? 'info' : 'primary'">{{item.metaValue === '1' ? '是' : '否'}}</el-tag>
            </b>
            <b v-else>{{item.metaValue}}</b>
          </span>
        </el-col>
      </el-row>
    </dd>
  </dl>
  <el-row :gutter="60" >
    <el-col :span="12">
      <dl class="cardinfo">
        <dt>用户手机通话记录分析（近180天内）</dt>
        <dd>
          <el-table
            header-row-class-name='headclass'
            v-if="bairongApp"
            :data="bairongApp"
            style="width: 100%">
              <el-table-column
                prop="detail"
                label="详细分析"
                >
              </el-table-column>
              <el-table-column
                prop="day7"
                label="7天"
                >
              </el-table-column>
              <el-table-column
                prop="day30"
                label="30天"
                >
              </el-table-column>
              <el-table-column
                prop="day90"
                label="90天"
                >
              </el-table-column>
              <el-table-column
                prop="day180"
                label="180天"
                >
              </el-table-column>
            </el-table>
            <span v-else>无数据</span>
        </dd>
      </dl>
    </el-col>
    <el-col :span="12">
      <dl class="cardinfo">
        <dt>用户手机通话记录分析（近180天内）</dt>
        <dd>
          <el-table
            header-row-class-name='headclass'
            v-if="bairongTopApp"
            :data="bairongTopApp"
            style="width: 100%">
              <el-table-column
                prop="detail"
                label="详细分析"
                >
              </el-table-column>
              <el-table-column
                prop="top1"
                label="TOP1"
                >
                <template slot-scope="props">
                  <el-tag size="mini" v-if="props.row.ismeta" :type="props.row.top1 === '1' ? 'info' : 'primary'">{{props.row.top1 === '1' ? '是' : '否'}}</el-tag>
                  <span v-else>{{props.row.top1}}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="top2"
                label="TOP2"
                >
                <template slot-scope="props">
                  <el-tag size="mini" v-if="props.row.ismeta" :type="props.row.top2 === '1' ? 'info' : 'primary'">{{props.row.top2 === '1' ? '是' : '否'}}</el-tag>
                  <span v-else>{{props.row.top2}}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="top3"
                label="TOP3"
                >
                <template slot-scope="props">
                  <el-tag size="mini" v-if="props.row.ismeta" :type="props.row.top3 === '1' ? 'info' : 'primary'">{{props.row.top3 === '1' ? '是' : '否'}}</el-tag>
                  <span v-else>{{props.row.top3}}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="top4"
                label="TOP4"
                >
                <template slot-scope="props">
                  <el-tag size="mini" v-if="props.row.ismeta" :type="props.row.top4 === '1' ? 'info' : 'primary'">{{props.row.top4 === '1' ? '是' : '否'}}</el-tag>
                  <span v-else>{{props.row.top4}}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="top5"
                label="TOP5"
                >
                <template slot-scope="props">
                  <el-tag size="mini" v-if="props.row.ismeta" :type="props.row.top5 === '1' ? 'info' : 'primary'">{{props.row.top5 === '1' ? '是' : '否'}}</el-tag>
                  <span v-else>{{props.row.top5}}</span>
                </template>
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
import brMeta from './meta/er'
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
      // let brDetailData = Object.keys(brData).reduce((pre, cur) => {
      //   console.log(cur)
      //   if ((/riskEr(.*?)$/g).test(cur)) {
      //     pre.brArr.push({key: cur, rule: brMeta[cur], value: brData[cur]})
      //   }
      //   return pre
      // }, {brArr: []})
      let brDetailData = brMeta.erMetaArr.reduce((pre, cur, i) => {
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
        if ((/RuleNameREC(.*?)$/g).test(cur)) {
          let code = cur.match(/REC(.*?)$/g)
          pre.push({rule: brData[cur], value: brData['riskRuleWeight' + code]})
        }
        return pre
      }, [])
      return brTableData
    },
    bairongApp () {
      let brData = this.fiskData
      let days = [7, 30, 90, 180]
      let tempArrDay = []
      brMeta.erMetaTabArr.forEach(item => {
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
      let days = [1, 2, 3, 4, 5]
      let tempArrDay = []
      brMeta.erMetaTabTopArr.forEach(item => {
        // console.log(item, brData[item.key])
        if (brData[item.key]) {
          let tempDay = brData[item.key] && brData[item.key].split(',').reduce((pre, cur, i) => {
            pre['top' + days[i]] = cur
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
    }
  }
}
</script>
