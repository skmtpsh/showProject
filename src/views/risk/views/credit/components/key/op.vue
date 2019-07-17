<template>
  <div :class="(filter === 1 || filter === 2) ? 'inner' : ''">
    <div v-if="(filter === 1 || filter === 0) && opObj && Object.keys(opObj).length >0 ">
    <blockquote class="quote" @click="filter === 1 ? show = !show : ''">
      <span v-if="(filter === 1)">关键信息 - </span>运营商(统计周期：
      <span v-if="opObj.portraitObj && opObj.portraitObj.silent_days">{{opObj.portraitObj.silent_days.start_day}}</span> 至
      <span v-if="opObj.portraitObj && opObj.portraitObj.silent_days">{{opObj.portraitObj.silent_days.end_day}}</span>)
      <span v-if="(filter === 1)"> <el-button size="mini" type="warning" :icon="show ? 'el-icon-arrow-down' : 'el-icon-arrow-right'" circle></el-button></span>
    </blockquote>
    <el-card class="box-card" shadow="never" :body-style="{ padding: '0px' }" v-if="show">
      <table class="table table-bordered">
        <tbody>
        <tr v-if="opObj.basicObj">
          <td width="150"><b>手机号</b></td>
          <td>
            <el-row :gutter="60">
              <el-col :span="8" v-if="opObj.basicObj">
                {{opObj.basicObj.phone}} | {{opObj.basicObj.phone_location}}
              </el-col>
              <el-col :span="8" v-if="opObj.basicObj">
                互联网标识:
                <el-tag v-if="checkPhoneInfo" type="warning" size="small">{{opObj.basicObj.phone_info}}</el-tag>
                <span v-else>{{opObj.basicObj.phone_info}}</span>
              </el-col>
              <el-col :span="8" v-if="opObj.basicObj">
                注册时间:
                <el-tag v-if="checkRegTime" :type="checkRegTime" size="small">{{opObj.basicObj.reg_time}}</el-tag>
                <span v-else>{{opObj.basicObj.reg_time}}</span>
              </el-col>
            </el-row>
          </td>
        </tr>
        <tr v-if="opObj.basicObj">
          <td><b>实名信息</b></td>
          <td>
            <el-row :gutter="60">
              <el-col :span="8">
                {{opObj.basicObj.operator_name}}
                <el-tag type="danger" v-if="opObj.basicObj.name_check && opObj.basicObj.name_check === 3" size="small">{{opObj.basicObj.name_check | FilterToFisk('riskCardPhoneCheck')}}</el-tag>
                <el-tag v-if="opObj.basicObj.name_check && opObj.basicObj.name_check !== 3" size="small">{{opObj.basicObj.name_check | FilterToFisk('riskCardPhoneCheck')}}</el-tag>
              </el-col>
              <el-col :span="8">
                {{opObj.basicObj.operator_id_card}}
                <el-tag type="danger" v-if="opObj.basicObj.id_card_check && opObj.basicObj.id_card_check === 3" size="small">{{opObj.basicObj.id_card_check | FilterToFisk('riskCardPhoneCheck')}}</el-tag>
                <el-tag v-if="opObj.basicObj.id_card_check && opObj.basicObj.id_card_check !== 3" size="small">{{opObj.basicObj.id_card_check | FilterToFisk('riskCardPhoneCheck')}}</el-tag>
              </el-col>
              <el-col :span="8">
                每月平均消费(元):
                <span>{{opObj.basicObj.monthly_avg_consumption}}</span>
              </el-col>
            </el-row>
          </td>
        </tr>
        <tr v-if="opObj.portraitObj">
          <td><b>用户常用行为监测</b></td>
          <td>
            <el-row :gutter="60">
              <el-col :span="8">
                朋友圈：<b v-if="opObj.portraitObj.contacts_distribution">{{opObj.portraitObj.contacts_distribution.area}}</b>
                <!-- | 与通话主要活动区域：<el-tag :type="checkArea('area') ?'':'danger'" size="small">{{checkArea('area') ?'一致':'不一致'}}</el-tag> -->
              </el-col>
              <el-col :span="8">
                最大静默天数 <b v-if="opObj.portraitObj.silent_days">{{opObj.portraitObj.silent_days.max_interval}}</b>
                ,月均静默天数
                <el-tag v-if="opObj.portraitObj.silent_days && checkDay(opObj.portraitObj.silent_days.monthly_avg_days)" :type="checkDay(opObj.portraitObj.silent_days.monthly_avg_days)" size="small">
                  {{opObj.portraitObj.silent_days.monthly_avg_days}}
                </el-tag>
              </el-col>
              <el-col :span="8">
                通话主要活动区域: <b v-if="opObj.areaAnalysisObj && opObj.areaAnalysisObj.length >0">{{opObj.areaAnalysisObj[0].area}}</b>
                <!-- | 与手机号归属地: <el-tag :type="checkArea('phone') ?'':'danger'" size="small">{{checkArea('phone') ?'一致':'不一致'}}</el-tag> -->
              </el-col>
            </el-row>
          </td>
        </tr>
        <tr v-if="opObj.specialCateObj && checkTotalCnt2(opObj.specialCateObj)">

          <td><b>特殊通话行为监测</b></td>
          <td>
            <el-row :gutter="60">
              <!-- <el-col :span="8" v-if="checkCat(item.cate)" v-for="(item, index) in opObj.specialCateObj" :key="index"> -->
              <el-col :span="8" v-for="(item, index) in opObj.specialCateObj" :key="index">
                <span v-if="item.talk_cnt > 0 && checkCat(item.cate)">
                  {{item.cate}}
                  <el-tag v-if="checkCat(item.cate)" :type="checkCnt(item.talk_cnt)" size="small">{{item.talk_cnt}} 次</el-tag>
                  <b v-else>{{item.talk_cnt}} 次</b>
                </span>
              </el-col>
            </el-row>
          </td>
        </tr>
        <tr v-if="opObj.riskAnalysisObj && (checkTotalCnt(opObj.riskAnalysisObj.single_overdue) || checkTotalCnt(opObj.riskAnalysisObj.contacts_overdue))">
          <td><b>风险监测</b></td>
          <td>
            <el-row :gutter="60">
              <el-col :span="8" v-for="(item, index) in opObj.riskAnalysisObj.single_overdue" :key="index+100">
                <span v-if="item.hit_cnt > 0">
                  {{
                    (item.no === 0) ? '本人号码命中逾期情况' : '紧急联系人' + item.no + '号码命中逾期情况'
                  }}
                  <el-tag v-if="item.hit_cnt" type="danger" size="small"> {{item.hit_cnt}} 次</el-tag>
                  <el-tag v-else type="success" size="small"> {{item.hit_cnt}} 次</el-tag>
                </span>
              </el-col>
              <el-col :span="8" v-for="(item, index) in opObj.riskAnalysisObj.contacts_overdue" :key="index+200">
                <span v-if="item.hit_cnt > 0">
                  {{
                    (item.type === 1) ? '主叫联系人号码命中逾期情况' :(item.type === 2) ? '被叫联系人号码命中逾期情况' :(item.type === 3) ? '互通联系人号码命中逾期情况' : ''
                  }}
                  <el-tag v-if="item.hit_cnt" type="danger" size="small"> 号码数量 {{item.hit_cnt}}, 通话次数 {{item.cnt}}, 通话时长(分) {{item.seconds | FilterToMinit}}</el-tag>
                  <el-tag v-else type="success" size="small"> {{item.hit_cnt}} 个</el-tag>
                </span>
              </el-col>
            </el-row>
          </td>
        </tr>
        </tbody>
      </table>
    </el-card>
    </div>
    <div v-if="(filter === 2 || filter === 0) && opObj.callLogObj" >
    <blockquote class="quote" @click="filter === 2 ? showCall = !showCall : ''">
      <span v-if="(filter === 2)">关键信息 - </span>常用联系电话TOP10（近6个月）(TOP10存在于通讯录的数量：<span>{{checkRecords.total}}</span>，通讯录：<span>{{checkRecords.has}}</span>)
      <span v-if="(filter === 2)"> <el-button size="mini" type="warning" :icon="showCall ? 'el-icon-arrow-down' : 'el-icon-arrow-right'" circle></el-button></span>
    </blockquote>
    <el-card class="box-card" shadow="never" :body-style="{ padding: '0px' }" v-if="showCall">
      <dl class="cardinfo">
        <dd>
          <el-table
            v-if="opObj.callLogObj"
            header-row-class-name='headclass'
            :data="opObj.callLogObj"
            stripe
            style="width: 100%">
            <el-table-column
              prop="phone"
              label="号码">
            </el-table-column>
            <el-table-column
              prop="callName"
              label="通讯录匹配">
              <template slot-scope="scope">
                <el-tag type="success" v-if="scope.row.callName !== ''" size="small"> {{scope.row.callName | FilterToCallName}} </el-tag>
                <el-tag v-if="checkName(scope.row.callName)" size="small" type="danger">{{scope.row.callName}}</el-tag>
                <span v-else>{{scope.row.callName}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="phone_info"
              label="互联网标识">
              <template slot-scope="scope">
                <el-tag v-if="checkName(scope.row.phone_info)" size="small" type="danger">{{scope.row.phone_info}}</el-tag>
                <span v-else>{{scope.row.phone_info}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="phone_location"
              label="号码归属">
            </el-table-column>
            <el-table-column
              prop="last_contact_date"
              label="最后联系"
              width="150">
            </el-table-column>
            <el-table-column
              prop="talk_cnt"
              label="通话次数"
              width="150">
              <template slot-scope="scope">
                <comp-show-cnt :check-data="scope" :current="currentPage" :firstData="firstData"></comp-show-cnt>
              </template>
            </el-table-column>
            <el-table-column
              label="主叫情况">
              <template slot-scope="scope">
                {{scope.row.call_cnt}} 次, {{scope.row.call_seconds | FilterToMinit}} 分
              </template>
            </el-table-column>
            <el-table-column
              label="被叫情况">
              <template slot-scope="scope">
                {{scope.row.called_cnt}} 次, {{scope.row.called_seconds | FilterToMinit}} 分
              </template>
            </el-table-column>
            <el-table-column
              prop="contact_1w"
              label="一周">
            </el-table-column>
            <el-table-column
              prop="contact_1m"
              label="一月">
            </el-table-column>
            <el-table-column
              prop="contact_3m"
              label="三月">
            </el-table-column>
          </el-table>
        </dd>
      </dl>
    </el-card>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
let compShowCnt = {
  render: function (h) {
    return (
      <span>
        {
          this.checkNum ? <el-tag size="small" disable-transitions type='warning'>{this.checkData.row.talk_cnt}</el-tag> : this.checkData.row.talk_cnt
        }
      </span>
    )
  },
  props: ['checkData', 'current', 'firstData'],
  computed: {
    checkNum () {
      let scop = this.checkData
      if (this.current === 1 && scop.$index <= 2 && this.firstData.length > 3) {
        if (this.firstData[2].talk_cnt) {
          if (this.firstData[2].talk_cnt === scop.row.talk_cnt && scop.row.talk_cnt <= 20) {
            return true
          } else {
            return false
          }
        }
        return false
      }
      return false
    }
  }
}

export default {
  components: {
    compShowCnt
  },
  props: ['opObj', 'filter'],
  data () {
    return {
      pagesize: 15,
      currentPage: 1,
      show: true,
      showCall: false
    }
  },
  created () {
    if (this.filter === 0) {
      this.show = true
    }
    if (this.filter === 0) {
      this.showCall = true
    }
  },
  filters: {
    FilterToCallName (value) {
      return value !== '' ? '是' : ''
    }
  },
  methods: {
    checkTotalCnt2 (arr) {
      if (arr && arr.length > 0) {
        for (let i = 0; i < arr.length; i++) {
          if (this.checkCat(arr[i].cate)) {
            if (arr[i].talk_cnt > 0) {
              return true
            }
          }
        }
      }
      return false
    },
    checkTotalCnt (arr) {
      if (arr && arr.length > 0) {
        let res = arr.reduce((total, item) => {
          return total + item.hit_cnt
        }, 0)
        if (res > 0) {
          return true
        }
      }
      return false
    },
    checkArea (type) {
      let friendArea = this.opObj.portraitObj.contacts_distribution ? this.opObj.portraitObj.contacts_distribution.area : ''
      let phoneArea = this.opObj.basicObj.phone_location
      let callArea = (this.opObj.areaAnalysisObj && this.opObj.areaAnalysisObj.length > 0) ? this.opObj.areaAnalysisObj[0].area : ''
      if (type === 'area') {
        if (callArea.indexOf(friendArea) === -1) {
          return false
        }
        return true
      }
      if (type === 'phone') {
        if (callArea.indexOf(phoneArea) === -1) {
          return false
        }
        return true
      }
    },
    checkDay (day) {
      if (day) {
        if (day > 20) {
          return 'danger'
        } else if (day <= 20 && day > 10) {
          return 'warning'
        } else if (day <= 10 && day > 0) {
          return 'success'
        }
      } else {
        if (day === 0) {
          return 'success'
        }
        return false
      }
      return false
    },
    checkCnt (val) {
      if (val) {
        if (val > 0) {
          return 'danger'
        }
      }
      return 'success'
    },
    checkCat (cat) {
      if (cat) {
        let arrTxt = ['贷款类', '互金公司', '金融类']
        return arrTxt.some((txt) => {
          let regtxt = new RegExp(txt, 'g')
          return regtxt.test(cat)
        })
      }
      return false
    },
    checkSum (val) {
      if (val) {
        if (val > 100) {
          return 'success'
        } else if (val <= 100 && val > 50) {
          return 'warning'
        } else if (val <= 50) {
          return 'danger'
        }
      }
      return ''
    },
    checkName (name) {
      if (name) {
        let arrTxt = ['金融中介', '律师', '新闻媒体']
        return arrTxt.some((txt) => {
          let regtxt = new RegExp(txt, 'g')
          return regtxt.test(name)
        })
      }
      return false
    }
  },
  computed: {
    firstData () {
      if (this.currentPage === 1) {
        return this.opObj.callLogObj.slice((this.currentPage - 1) * this.pagesize, this.currentPage * this.pagesize)
      }
      return []
    },
    checkRecords () {
      let tempObj = {
        total: 0,
        has: ''
      }
      if (this.opObj) {
        this.opObj.callLogObj.forEach((item) => {
          if (item.callName !== '') {
            tempObj.total++
          }
        })
        if (tempObj.total > 0) {
          tempObj.has = '有'
        } else {
          tempObj.has = '无'
        }
      }
      return tempObj
    },

    checkRegTime () {
      let time = this.opObj.basicObj.reg_time
      if (time) {
        let diffmonth = moment(moment()).diff(time, 'month')
        if (diffmonth < 3) {
          return 'danger'
        } else if (diffmonth >= 3 && diffmonth < 6) {
          return 'warning'
        }
        return false
      }
      return false
    },
    checkPhoneInfo () {
      let info = this.opObj.basicObj.phone_info
      if (info) {
        let arrTxt = ['中介', '套现']
        return arrTxt.some((txt) => {
          let regtxt = new RegExp(txt, 'g')
          return regtxt.test(info)
        })
      }
      return false
    }
  }
}
</script>
