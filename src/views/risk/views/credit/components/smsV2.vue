<template>
  <div id="sms">
    <spinner :visible="loading.show" :fixed="true" :text="loading.loaddingMsg"></spinner>
    <blockquote class="quote">运营商短信</blockquote>
    <el-card class="box-card" shadow="never" :body-style="{ padding: '0px' }">
      <dl class="cardinfo">
        <dt>短信详单</dt>
        <dd>
          <el-table
            header-row-class-name='headclass'
            :data="smsContactDetail"
            stripe
            style="width: 100%">
            <el-table-column
              width="60"
              label="序号">
              <template slot-scope="scope">
                {{scope.$index + 1}}
              </template>
            </el-table-column>
            <el-table-column
              prop="peer_num"
              label="对方号码">
            </el-table-column>
            <el-table-column
              prop="sms_cnt_1w"
              label="近1周短信次数">
            </el-table-column>
            <el-table-column
              prop="sms_cnt_1m"
              label="近1月短信次数">
            </el-table-column>
            <el-table-column
              prop="sms_cnt_3m"
              label="近3月短信次数">
            </el-table-column>
            <el-table-column
              prop="sms_cnt_6m"
              label="近6月短信次数">
            </el-table-column>
            <el-table-column
              prop="send_cnt_3m"
              label="近3月发送短信次数">
            </el-table-column>
            <el-table-column
              prop="send_cnt_6m"
              label="近6月发送短信次数">
            </el-table-column>
            <el-table-column
              prop="receive_cnt_3m"
              label="近3月接收短信次数">
            </el-table-column>
            <el-table-column
              prop="receive_cnt_6m"
              label="近6月接收短信次数">
            </el-table-column>
          </el-table>
        </dd>
      </dl>
    </el-card>
  </div>
</template>
<script>
import Spinner from '@/components/spinner'
import operatorApi from '@/api/operator'
import axios from 'axios'
export default {
  components: {
    Spinner
  },
  data () {
    return {
      loading: {
        loaddingMsg: '',
        show: false
      },
      fiskData: {
        sms_contact_detail: []
      }
    }
  },
  computed: {
    smsContactDetail () {
      return this.fiskData.sms_contact_detail
    }
  },
  methods: {
    getRefresh (type) {
      this.loading[type] = true
      operatorApi[type](this.params)
        .then((response) => {
          this.loading[type] = false
          if (response.data.code === 200 && response.data.datas) {
            this.fiskData[type] = response.data.datas
          } else {
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }
  },
  beforeMount () {
    let allRequest = [
      'MXOPERATOR'
    ]
    // Define Params
    let querys = this.$route.query
    if (!querys) {
      this.$message({
        message: '参数不正确',
        type: 'warning'
      })
    }
    this.params = querys

    let reqArrFun = allRequest.map((item) => {
      return operatorApi[item](this.params)
    })
    this.loading.show = true
    axios.all([...reqArrFun])
      .then(axios.spread((...allResonse) => {
        this.loading.show = false
        // set data
        for (let [i, item] of new Map(allResonse.map((item, i) => [i, item]))) {
          if (item.data.code === 200 && item.data.datas) {
            // this.$set(this.fiskData, 'operator', item.data.datas)
            this.fiskData = item.data.datas
          } else {
            console.log('interator:' + allRequest[i] + ' msg:' + item.data.message)
          }
        }
      })).catch((error) => {
        this.loading.OPERATOR = false
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
