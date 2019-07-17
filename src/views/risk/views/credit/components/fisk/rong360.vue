<template>
  <dl class="cardinfo">
    <dd>
      <el-row :gutter="60">
        <el-col :span="8"><span>天机小额模型分数：</span><b v-if="rongObj.riskData">{{rongObj.riskData.riskScore}}</b></el-col>
      </el-row>
    </dd>
  </dl>
</template>
<script>
export default {
  props: {
    rongObj: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {}
  }
}
</script>
