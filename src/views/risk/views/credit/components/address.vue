<template>
  <div>
    <spinner :visible="loading.CONTACTS" :fixed="true" :text="loading.loaddingMsg"></spinner>
    <blockquote class="quote" id="address">通讯录</blockquote>
    <el-form :inline="true" :model="formInline" ref="formInline" class="form-inline" size="mini">
      <el-form-item label="标签类型：" prop="contactsLabelCode">
        <el-select
          class="labelwrap"
          v-model="formInline.contactsLabelCode"
          filterable
          reserve-keyword
          placeholder="请输入标签类型"
          :loading="label.selLoading">
          <el-option key="全部" label="全部" value=""></el-option>
          <el-option
            v-for="label in label.options"
            :key="label.labelCode"
            :label="label.labelName"
            :value="label.labelCode">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="姓名：" prop="contactsName">
        <el-input v-model="formInline.contactsName" placeholder="姓名"></el-input>
      </el-form-item>
      <el-form-item label="手机号：" prop="contactsMobile">
        <el-input v-model="formInline.contactsMobile" placeholder="手机号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="info" icon="el-icon-circle-close-outline" @click.native="onReset">重置</el-button>
      </el-form-item>
    </el-form>
    <el-card class="box-card" shadow="never" :body-style="{ padding: '0px' }">
      <dl class="cardinfo">
        <dd>
          <el-table
            header-row-class-name='headclass'
            :data="fiskData['CONTACTS'].contactList.slice((currentPage-1)*pagesize,currentPage*pagesize)"
            stripe
            style="width: 100%">
            <el-table-column
              prop="name"
              label="姓名">
              <template slot-scope="scope">
                <el-tag size="small" v-if="scope.row.labelCode && scope.row.labelCode.indexOf('B1002') > -1 " type="danger">{{scope.row.name}}</el-tag>
                <el-tag size="small" v-else-if="scope.row.labelCode && scope.row.labelCode.indexOf('B1001') > -1 " type="warning">{{scope.row.name}}</el-tag>
                <span v-else>{{scope.row.name}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="mobile"
              label="联系电话">
              <template slot-scope="props">
                {{props.row.mobile | filterToTel(props.row)}}
              </template>
            </el-table-column>
            <el-table-column
              prop="lastUpdatedTimestamp"
              label="最后更新时间">
              <template slot-scope="props">
                {{props.row.lastUpdatedTimestamp | filterTime2}}
              </template>
            </el-table-column>
            <el-table-column
              prop="labelName"
              label="标签">
              <template slot-scope="props">
                <span v-if="props.row.labelName">{{props.row.labelName}}</span>
                <span v-else>——</span>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            background
            layout="slot, prev, pager, next"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            v-if="fiskData['CONTACTS'].contactListSize"
            :page-size="pagesize"
            :total="fiskData['CONTACTS'].contactListSize">
            <el-tag v-if="fiskData['CONTACTS'].contactListSize < 30" type="warning" size="small">共 {{fiskData['CONTACTS'].contactListSize}} 条</el-tag>
            <span class="el-pagination__total" v-else>共 {{fiskData['CONTACTS'].contactListSize}} 条</span>
          </el-pagination>
        </dd>
      </dl>
    </el-card>
  </div>
</template>
<script>
import moment from 'moment'
import Spinner from '@/components/spinner'
import baseApi from '@/api/credit/baseinfo'
import axios from 'axios'
export default {
  components: {
    Spinner
  },
  data () {
    return {
      label: {
        selLoading: false,
        options: []
      },
      formInline: {
        contactsLabelCode: '',
        contactsName: '',
        contactsMobile: ''
      },
      pagesize: 15,
      currentPage: 1,
      loading: {
        loaddingMsg: '',
        CONTACTS: false
      },
      fiskData: {
        CONTACTS: {
          contactList: []
        }
      }
    }
  },
  filters: {
    filterToTel (val, row) {
      return row.phone ? row.phone : row.mobile
    },
    filterTime2 (value, format = 'YYYY-MM-DD HH:mm:ss') {
      let momentObj = moment(parseInt(value))
      if (value && momentObj['_isValid']) {
        return momentObj.format(format)
      }
      return value
    }
  },
  methods: {
    onSubmit () {
      this.currentPage = 1
      this.getRefresh('CONTACTS')
    },
    // 重置
    onReset () {
      this.$refs['formInline'].resetFields()
      this.onSubmit()
    },
    checkName (name) {
      if (name) {
        let arrTxt = ['金融中介', '律师', '新闻媒体', '中介', '贷款']
        return arrTxt.some((txt) => {
          let regtxt = new RegExp(txt, 'g')
          return regtxt.test(name)
        })
      }
      return false
    },
    checkLabel () {

    },
    handleCurrentChange (currentPage) {
      this.currentPage = currentPage
    },
    getRefresh (type) {
      this.loading[type] = true
      baseApi[type](Object.assign({}, this.params, this.formInline))
        .then((response) => {
          this.loading[type] = false
          if (response.data.code === 200) {
            this.fiskData[type] = response.data.datas
          } else {
            console.log(response.data.message)
          }
        })
        .catch((error) => {
          this.loading[type] = false
          console.log(error)
        })
    },
    getLabelOption () {
      baseApi['ADDRESSLABELLIST'](this.$route.query).then(response => {
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
      'CONTACTS'
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
    // 备用方案二
    // allRequest.forEach((item) => {
    //   this.getRefresh(item)
    // })

    // 备用方案一
    // set function fisk.js request
    let reqArrFun = allRequest.map((item) => {
      return baseApi[item](this.params)
    })
    this.loading.CONTACTS = true
    axios.all(reqArrFun)
      .then(axios.spread((...allResonse) => {
        this.loading.CONTACTS = false
        // set data
        for (let [i, item] of new Map(allResonse.map((item, i) => [i, item]))) {
          if (item.data.code === 200) {
            this.$set(this.fiskData, allRequest[i], item.data.datas)
            if (!item.data.datas.contactList) { // 接口返回 {contactListSize: 0} 补一个数组
              this.fiskData.CONTACTS.contactList = []
            }
          } else {
            console.log('interator:' + allRequest[i] + ' msg:' + item.data.message)
          }
        }
      })).catch((error) => {
        this.loading.CONTACTS = false
        console.log(error)
      })
  },
  mounted () {
    this.getLabelOption()
  },
  created () {
    document.getElementsByTagName('body')[0].className = 'address'
  }
}
</script>
<style lang="scss">
.address .form-inline {
  margin: 20px 0 0px;
}
.address .el-scrollbar__wrap {
  overflow-x: scroll !important;
}
</style>
