<template>
  <div>
    <dl class="cardinfo">
      <dd>
        <el-row :gutter="60">
          <el-col :span="12"><span>场景行为分：</span><b>{{ldObj.riskXy110001}}</b></el-col>
          <el-col :span="12"><span @click="checkData" style="cursor: pointer; color:#409EFF">场景雷达报告详情</span><b></b></el-col>
        </el-row>
      </dd>
    </dl>
    <el-collapse-transition>
      <div v-show="show">
        <dl class="cardinfo">
          <dt>场景</dt>
          <dd>
            <el-row :gutter="60">
              <el-col :span="8"><span>小额分期场景行为分：</span><b>{{ldObj.riskXy110001 | FilterToText}}</b></el-col>
              <el-col :span="8"><span>本业务最大授信额度：</span><b>{{ldObj.riskXy110002 | FilterToText}}</b></el-col>
              <el-col :span="8"><span>本业务平均授信额度：</span><b>{{ldObj.riskXy110003 | FilterToText}}</b></el-col>
            </el-row>
          </dd>
          <dd>
            <el-row :gutter="60">
              <el-col :span="8"><span>本业务近1个月贷款笔数：</span><b>{{ldObj.riskXy110004 | FilterToText}}</b></el-col>
              <el-col :span="8"><span>本业务近3个月贷款笔数：</span><b>{{ldObj.riskXy110005 | FilterToText}}</b></el-col>
              <el-col :span="8"><span>本业务近6个月贷款笔数：</span><b>{{ldObj.riskXy110006 | FilterToText}}</b></el-col>
            </el-row>
          </dd>
          <dd>
            <el-row :gutter="60">
              <el-col :span="8"><span>本业务贷款总笔数：</span><b>{{ldObj.riskXy110007 | FilterToText}}</b></el-col>
              <el-col :span="8"><span>本业务贷款机构数：</span><b>{{ldObj.riskXy110008 | FilterToText}}</b></el-col>
              <el-col :span="8"><span>本业务最近一次贷款距今天数：</span><b>{{ldObj.riskXy110009 | FilterToText('day')}}</b></el-col>
            </el-row>
          </dd>
          <dd>
            <el-row :gutter="60">
              <el-col :span="8"><span>本业务贷款已结清笔数：</span><b>{{ldObj.riskXy110010 | FilterToText}}</b></el-col>
              <el-col :span="8"><span>本业务贷款逾期订单数（M0+）：</span><b>{{ldObj.riskXy110011 | FilterToText}}</b></el-col>
              <el-col :span="8"><span>本业务贷款逾期订单数（M1+）：</span><b>{{ldObj.riskXy110012 | FilterToText}}</b></el-col>
            </el-row>
          </dd>
        </dl>
        <dl class="cardinfo">
          <dt>多头</dt>
          <dd>
            <el-row :gutter="60">
              <el-col :span="8"><span>查询多头机构数：</span><b>{{ldObj.riskXy110013 | FilterToText}}</b></el-col>
              <el-col :span="8"><span>总查询次数：</span><b>{{ldObj.riskXy110014 | FilterToText}}</b></el-col>
              <el-col :span="8"><span>最近查询时间距今天数：</span><b>{{ldObj.riskXy110015 | FilterToText('day')}}</b></el-col>
            </el-row>
          </dd>
          <dd>
            <el-row :gutter="60">
              <el-col :span="8"><span>近1个月查询多头：</span><b>{{ldObj.riskXy110016 | FilterToText}}</b></el-col>
              <el-col :span="8"><span>近3个月查询多头：</span><b>{{ldObj.riskXy110017 | FilterToText}}</b></el-col>
              <el-col :span="8"><span>近6个月查询多头：</span><b>{{ldObj.riskXy110018 | FilterToText}}</b></el-col>
            </el-row>
          </dd>
          <dd>
            <el-row :gutter="60">
              <el-col :span="8"><span>贷款已结清笔数：</span><b>{{ldObj.riskXy110019 | FilterToText}}</b></el-col>
              <el-col :span="8"><span>贷款逾期订单数（M0+）：</span><b>{{ldObj.riskXy110020 | FilterToText}}</b></el-col>
              <el-col :span="8"><span>贷款逾期订单数（M1+）：</span><b>{{ldObj.riskXy110021 | FilterToText}}</b></el-col>
            </el-row>
          </dd>
        </dl>
        <dl class="cardinfo">
          <dt>模型</dt>
          <dd>
            <el-row :gutter="60">
              <el-col :span="12"><span>最近6个月全部时间短期现金贷在全部产品中借贷疑似逾期天数占比：</span><b>{{ldObj.riskXy110022 | FilterToText('percent')}}</b></el-col>
              <el-col :span="12"><span>最近12个月全部时间全部产品非逾期还款在总还款中订单数占比：</span><b>{{ldObj.riskXy110023 | FilterToText('percent')}}</b></el-col>
            </el-row>
          </dd>
          <dd>
            <el-row :gutter="60">
              <el-col :span="12"><span>最近一年新增平台全部时间全部产品最大还款疑似逾期天数：</span><b>{{ldObj.riskXy110026 | FilterToText('day')}}</b></el-col>
              <el-col :span="12"><span>最近一年新增平台全部时间短期现金贷累计非逾期还款金额：</span><b>{{ldObj.riskXy110029 | FilterToText}}</b></el-col>
            </el-row>
          </dd>
          <dd>
            <el-row :gutter="60">
              <el-col :span="12"><span>最近一年新增平台工作日短期现金贷累计还款金额：</span><b>{{ldObj.riskXy110030 | FilterToText}}</b></el-col>
              <el-col :span="12"><span>最近3次全部时间全部产品最大还款金额：</span><b>{{ldObj.riskXy110025 | FilterToText}}</b></el-col>
            </el-row>
          </dd>
          <dd>
            <el-row :gutter="60">
              <el-col :span="12"><span>最近3次工作日全部产品最大借贷疑似逾期天数：</span><b>{{ldObj.riskXy110024 | FilterToText('day')}}</b></el-col>
              <el-col :span="12"><span>最近5次全部时间全部产品最大还款疑似逾期天数：</span><b>{{ldObj.riskXy110031 | FilterToText('day')}}</b></el-col>
            </el-row>
          </dd>
          <dd>
            <el-row :gutter="60">
              <el-col :span="12"><span>最近10次全部时间全部产品累计还款疑似逾期天数：</span><b>{{ldObj.riskXy110027 | FilterToText('day')}}</b></el-col>
              <el-col :span="12"><span>最近20次全部时间全部产品平均还款金额：</span><b>{{ldObj.riskXy110028 | FilterToText}}</b></el-col>
            </el-row>
          </dd>
        </dl>
      </div>
    </el-collapse-transition>
  </div>
</template>
<script>
export default {
  props: {
    leidaObj: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    ldObj () {
      let tempobj = {}
      if (this.leidaObj && this.leidaObj.riskDataDetail) {
        tempobj = this.leidaObj.riskDataDetail
      }
      return tempobj
    }
  },
  methods: {
    checkData () {
      if (this.leidaObj && this.leidaObj.riskDataDetail) {
        this.show = !this.show
      } else {
        this.$message({
          message: '没有返回数据',
          type: 'warning'
        })
      }
    }
  },
  filters: {
    FilterToText (value, type) {
      let arrNum = ['-999976.0', '-999976', '-999977.0', '-999977', '-999978.0', '-999978', '-999979.0', '-999979', '-99998.0', '-99998']
      if (arrNum.includes(value)) {
        return '数据缺失'
      }
      if (type === 'day') {
        return parseInt(value)
      }
      if (type === 'percent') {
        return value + '%'
      }
      return value
    }
  },
  data () {
    return {
      show: false
    }
  }
}
</script>
