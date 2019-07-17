<template>
  <div>
    <spinner :visible="loading.sms" :fixed="true" :text="loading.loaddingMsg"></spinner>
    <blockquote class="quote" id="dianshang">短信信息</blockquote>
    <el-form :inline="true" :model="formInline" ref="formInline" style="margin: 20px 0 0;" size="mini" >
      <el-form-item prop="smsLabelCodes">
        <el-checkbox-group v-model="formInline.smsLabelCodes">
          <el-checkbox v-for="item in label.options" :label="item.labelCode" :key="item.labelCode">{{item.labelName}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item style="margin-left: 20px;">
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="info" icon="el-icon-circle-close-outline" @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>
    <el-card class="box-card" shadow="never" :body-style="{ padding: '0px' }">
      <dl class="cardinfo">
        <dd>
          <el-table
            header-row-class-name='headclass'
            :data="fiskData['SMS'].slice((currentPage-1) * pagesize, currentPage * pagesize)"
            style="width: 100%">
            <el-table-column
              width="100"
              prop="smsName"
              label="对方姓名">
            </el-table-column>
            <el-table-column
              prop="smsNum"
              width="180"
              label="短信号码">
            </el-table-column>
            <el-table-column
              prop="labelName"
              width="160"
              label="标签类型">
              <template slot-scope="props">
                <labelName :labelData = "props.row.labelName"></labelName>
              </template>
            </el-table-column>
            <el-table-column
              prop="smsContent"
              label="短信内容">
            </el-table-column>
            <el-table-column
              width="180"
              prop="smsTime"
              label="收发时间">
            </el-table-column>
            <el-table-column
              width="90"
              prop="strType"
              label="收发类型">
            </el-table-column>
          </el-table>
          <el-pagination
            v-if="fiskData['SMS'].length > 0 && fiskData['SMS'].length > 0"
            background
            layout="total, prev, pager, next"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="pagesize"
            :total="fiskData['SMS'].length">
          </el-pagination>
        </dd>
      </dl>
    </el-card>
  </div>
</template>
<script>
import Spinner from '@/components/spinner'
import smsApi from '@/api/credit/sms'
import axios from 'axios'
let labelName = {
  render: function (h) {
    return (
      <span>
        {
          this.labelType.map(item => {
            return <el-tag style="margin: 0 1px;" size="small" disable-transitions type={item.type} >{item.label}</el-tag>
          })
        }
      </span>
    )
  },
  props: ['labelData'],
  computed: {
    labelType () {
      let labelArr = this.labelData.split(',')
      let labelName = '流水,消费,生活缴费'
      let labelArray = labelArr.map(item => {
        if (item.indexOf('同行业') > -1) {
          return {type: 'danger', label: item}
        }
        if (item.indexOf('营销') > -1) {
          return {type: 'warning', label: item}
        }
        // if (item.indexOf('流水') > -1 || item.indexOf('消费') > -1 || item.indexOf('生活缴费') > -1) {
        if (labelName.indexOf(item) > -1) {
          return {type: 'success', label: item}
        }
      })
      return labelArray
    }
  }
}
export default {
  components: {
    Spinner,
    labelName
  },
  data () {
    return {
      label: {
        selLoading: false,
        options: []
      },
      formInline: {
        smsLabelCodes: []
      },
      pagesize: 15,
      currentPage: 1,
      loading: {
        loaddingMsg: '',
        sms: false
      },
      fiskData: {
        SMS: []
      }
    }
  },
  methods: {
    handleCurrentChange (currentPage) {
      this.currentPage = currentPage
    },
    onSubmit () {
      this.currentPage = 1
      this.getRefresh('SMS')
    },
    // 重置
    onReset () {
      this.$refs['formInline'].resetFields()
      // this.formInline.smsLabelCodes = []
      this.onSubmit()
    },
    getRefresh (type) {
      this.loading[type] = true
      smsApi[type](Object.assign({}, this.params, { smsLabelCodes: this.formInline.smsLabelCodes.join(',') }))
        .then((response) => {
          this.loading[type] = false
          if (response.data.code === 200) {
            this.fiskData[type] = response.data.datas
          } else {
            console.log(response.data.message)
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    getLabelOption () {
      smsApi['SMSLABEL'](this.$route.query).then(response => {
        const result = response.data
        if (result.code === 200) {
          this.label.options = result.datas
        }
      }).catch(error => {
        console.log(error)
      })
    }
  },
  beforeMount () {
    let allRequest = [
      'SMS'
    ]
    // Loading
    // Define Params
    let querys = this.$route.query
    if (!querys) {
      this.$message({
        message: '参数不正确',
        type: 'warning'
      })
    }
    this.params = querys
    // 备用方案二
    // allRequest.forEach((item) => {
    //   this.getRefresh(item)
    // })

    // 备用方案一
    // let allRequestMap = allRequest.map((item) => item)
    // set function fisk.js request
    let reqArrFun = allRequest.map((item) => {
      return smsApi[item](this.params)
    })
    this.loading.sms = true
    axios.all(reqArrFun)
      .then(axios.spread((...allResonse) => {
        this.loading.sms = false
        // set data
        for (let [i, item] of new Map(allResonse.map((item, i) => [i, item]))) {
          if (item.data.code === 200 && item.data.datas) {
            this.$set(this.fiskData, allRequest[i], item.data.datas)
          } else {
            console.log('interator:' + allRequest[i] + ' msg:' + item.data.message)
          }
        }
      })).catch((error) => {
        this.loading.sms = false
        console.log(error)
      })
  },
  mounted () {
    this.getLabelOption()
  }
}
</script>
