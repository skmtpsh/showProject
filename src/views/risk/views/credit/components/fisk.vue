<template>
  <div>
    <spinner :visible="loading.FISK_ALL" :fixed="true" :text="loading.loaddingMsg"></spinner>
    <RiskTag :riskObj="fiskData['RISK']" :filter='1' />
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick" tab-position="top" class="innerTab" >
      <el-tab-pane label="黑名单" name="blackTab">
        <BlackTag></BlackTag>
      </el-tab-pane>
      <el-tab-pane label="多头" name="multiTab">
        <keep-alive>
          <MultiTag v-if="activeName === 'multiTab'"></MultiTag>
        </keep-alive>
      </el-tab-pane>
      <el-tab-pane label="负债" name="leaseTab">
        <keep-alive>
          <LeaseTag v-if="activeName === 'leaseTab'"></LeaseTag>
        </keep-alive>
      </el-tab-pane>
    </el-tabs>
    <transition name="el-fade-in">
      <div class="circleNav" v-if="visible">
        <span type="primary" class="sector s3" @click="handleTab('blackTab')" :class="{'active': activeName === 'blackTab'}" circle>黑</span>
        <span type="primary" class="sector s2" @click="handleTab('multiTab')" :class="{'active': activeName === 'multiTab'}" circle>多</span>
        <span type="primary" class="sector" @click="handleTab('leaseTab')" :class="{'active': activeName === 'leaseTab'}" circle>负</span>
      </div>
    </transition>
  </div>
</template>
<script>
import Spinner from '@/components/spinner'
import keyApi from '@/api/keyinfo/index'
import scroll from '@/views/credit/mixin/scroll'
import axios from 'axios'
export default {
  mixins: [scroll],
  components: {
    Spinner,
    RiskTag: () => import('./key/riskinner.vue'),
    BlackTag: () => import('./tabs/tabs_black.vue'),
    MultiTag: () => import('./tabs/tabs_multi.vue'),
    LeaseTag: () => import('./tabs/tabs_lease.vue')
  },
  data () {
    return {
      activeName: 'blackTab',
      loading: {
        loaddingMsg: '',
        FISK_ALL: false
      },
      fiskData: {
        RISK: {
          afu: [],
          blacklist: [],
          bqsFraud: [],
          bqsMultipoint: [],
          tongdunFraud: [],
          zhengxin: []
        }
      }
    }
  },
  methods: {
    handleTab (type = 'blackTab') {
      this.activeName = type
    },
    handleClick (tab, event) {
    }
  },
  beforeMount () {
    let addAllRequest = [
      'RISK'
    ]
    // Loading
    // Define Params
    let querys = this.$route.query
    if (!querys) { // Object.keys(querys).length
      this.$message({
        message: '参数不正确',
        type: 'warning'
      })
    }
    this.params = querys
    let addReqArrFun = addAllRequest.map((item) => {
      return keyApi[item](this.params)
    })
    this.loading['FISK_ALL'] = true
    axios.all([...addReqArrFun])
      .then(axios.spread((...allResonse) => {
        this.loading['FISK_ALL'] = false
        // set data
        for (let [i, item] of new Map(allResonse.map((item, i) => [i, item]))) {
          if (item.data.code === 200 && item.data.datas) {
            this.$set(this.fiskData, 'RISK', item.data.datas)
          } else {
            // 没有返回数据
            console.log('interator:' + i + item.data.message)
          }
        }
      })).catch((error) => {
        this.loading['FISK_ALL'] = false
        console.log(error)
      })
  }
}
</script>
<style lang="scss">
.sector {
  border-radius: 50%;
  width: 40px;
  height: 40px;
  // background: #666;
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 0;
  top: 0;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #FFF;
  border: 1px solid #DCDFE6;
  color: #409eff;
  padding: 12px;
  &.active {
    background-color: #409eff;
    color: #fff;
  }
}
.sector.s2{
  left: -40px;
  top: -40px;
  // transform: rotate(120deg);
  // transform: rotate(-50deg) translate(-5%, 83%);
}
.sector.s3{
  left: 0px;
  top: -80px;
  // transform: rotate(240deg);
  // transform: rotate(-50deg) translate(-5%, 83%);
}
</style>
