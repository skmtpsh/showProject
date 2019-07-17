<template>
  <div id="call">
    <spinner :visible="loading.show" :fixed="true" :text="loading.loaddingMsg"></spinner>
    <blockquote class="quote">联系人分析</blockquote>
    <el-card class="box-card" shadow="never" :body-style="{ padding: '0px' }">
      <dl class="cardinfo">
        <dt>信息核对指定申请项校验</dt>
        <dd>
          <el-table
            header-row-class-name='headclass'
            :data="applicationCheck"
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
              prop="app_point"
              label="申请要素">
            </el-table-column>
            <el-table-column
              prop="relationship"
              label="关系">
            </el-table-column>
            <el-table-column
              prop="key_value"
              label="指定号码">
            </el-table-column>
            <el-table-column
              prop="contact_name"
              label="联系人姓名">
            </el-table-column>
            <el-table-column
              prop="check_mobile"
              label="与该联系人通话记录">
            </el-table-column>
            <el-table-column
              prop="check_xiaohao"
              label="联系号码是否为小号">
              <template slot-scope="props">
                <el-tag v-if="props.row.check_xiaohao === '该联系人号码是临时小号'">{{props.row.check_xiaohao}}</el-tag>
                <span v-else>{{props.row.check_xiaohao}}</span>
              </template>
            </el-table-column>
          </el-table>
        </dd>
      </dl>
      <dl class="cardinfo">
        <dt>指定联系人</dt>
        <dd>
         <el-table
            header-row-class-name='headclass'
            :data="collectionContact"
            stripe
            style="width: 100%">
            <el-table-column
              prop="phone_num"
              label="联系人号码">
            </el-table-column>
            <el-table-column
              prop="contact_name"
              label="联系人名字">
            </el-table-column>
            <el-table-column
              prop="relationship"
              label="关系">
            </el-table-column>
            <el-table-column
              prop="phone_num_loc"
              label="联系号码归属地">
            </el-table-column>
            <el-table-column
              prop="call_cnt"
              label="通话次数">
            </el-table-column>
            <el-table-column
              prop="call_time"
              label="通话时长（秒）">
            </el-table-column>
            <el-table-column
              prop="dial_cnt"
              label="主叫次数">
            </el-table-column>
            <el-table-column
              prop="dial_time"
              label="主叫时长">
            </el-table-column>
            <el-table-column
              prop="dialed_cnt"
              label="被叫次数">
            </el-table-column>
            <el-table-column
              prop="dialed_time"
              label="被叫时长">
            </el-table-column>
            <el-table-column
              prop="trans_start"
              label="第一次通话具体时间">
            </el-table-column>
            <el-table-column
              prop="trans_end"
              label="最后一次通话具体时间">
            </el-table-column>
            <el-table-column
              prop="sms_cnt"
              label="短信次数">
            </el-table-column>
          </el-table>
        </dd>
      </dl>
      <dl class="cardinfo">
        <dt>联系人top</dt>
        <dd v-for="(table, index) in friendCircle.peer_num_top_list" :key="index+2000">
          <div style="text-align: center;"><el-tag style="margin-bottom: 10px;">{{table.key === 'peer_num_top3_3m' ? '联系人top3(近三月)' : '联系人top3(近六月)'}}</el-tag></div>
          <el-table
            header-row-class-name='headclass'
            :data="table.top_item"
            stripe
            style="width: 100%">
            <el-table-column
              prop="peer_number"
              label="对方号码">
            </el-table-column>
            <el-table-column
              prop="peer_num_loc"
              label="通话地">
            </el-table-column>
            <el-table-column
              prop="group_name"
              label="号码类型">
            </el-table-column>
            <el-table-column
              prop="company_name"
              label="号码标识">
              <template slot-scope="props">
                <el-tag type="danger" v-if="props.row.company_name !== '' && props.row.company_name !== '未知'">{{props.row.company_name}}</el-tag>
                <span v-else>{{props.row.company_name}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="call_cnt"
              label="通话次数">
            </el-table-column>
            <el-table-column
              prop="call_time"
              label="通话时长(秒)">
            </el-table-column>
            <el-table-column
              prop="dial_cnt"
              label="主叫次数">
            </el-table-column>
            <el-table-column
              prop="dialed_cnt"
              label="被叫次数">
            </el-table-column>
            <el-table-column
              prop="dial_time"
              label="主叫时长(秒)">
            </el-table-column>
            <el-table-column
              prop="dialed_time"
              label="被叫时长（秒）">
            </el-table-column>
          </el-table>
        </dd>
      </dl>
    </el-card>
    <blockquote class="quote">通话记录</blockquote>
    <el-card class="box-card" shadow="never" :body-style="{ padding: '0px' }">
      <dl class="cardinfo">
        <dt>亲情号通话详单</dt>
        <dd>
         <el-table
            header-row-class-name='headclass'
            :data="callFamilyDetail"
            stripe
            style="width: 100%">
            <el-table-column
              prop="app_point_zh"
              label="分析项（中文）">
            </el-table-column>
            <el-table-column
              prop="item_1m"
              label="近1月数量">
            </el-table-column>
            <el-table-column
              prop="item_3m"
              label="近3月数量">
            </el-table-column>
            <el-table-column
              prop="item_6m"
              label="近6月数量">
            </el-table-column>
            <el-table-column
              prop="avg_item_3m"
              label="近3月平均数量">
            </el-table-column>
            <el-table-column
              prop="avg_item_6m"
              label="近6月平均数量">
            </el-table-column>
          </el-table>
        </dd>
      </dl>
      <dl class="cardinfo">
        <dt>通话时长详单</dt>
        <dd>
         <el-table
            header-row-class-name='headclass'
            :data="callTimeDetail"
            stripe
            style="width: 100%">
            <el-table-column
              prop="app_point_zh"
              label="分析项（中文）">
            </el-table-column>
            <el-table-column
              prop="item_1m"
              label="近1月数量">
            </el-table-column>
            <el-table-column
              prop="item_3m"
              label="近3月数量">
            </el-table-column>
            <el-table-column
              prop="item_6m"
              label="近6月数量">
            </el-table-column>
            <el-table-column
              prop="avg_item_3m"
              label="近3月平均数量">
            </el-table-column>
            <el-table-column
              prop="avg_item_6m"
              label="近6月平均数量">
            </el-table-column>
          </el-table>
        </dd>
      </dl>
      <dl class="cardinfo">
        <dt>通话时段分析</dt>
        <dd v-for="(table, index) in callDurationDetail" :key="index+1000">
          <div style="text-align: center;"><el-tag style="margin-bottom: 10px;">{{table.desc}}</el-tag></div>
          <el-table
            header-row-class-name='headclass'
            :data="table.list"
            stripe
            style="width: 100%">

            <el-table-column
              prop="time_step_zh"
              label="时间点">
            </el-table-column>
            <el-table-column
              prop="total_cnt"
              label="通话次数">
            </el-table-column>
            <el-table-column
              prop="uniq_num_cnt"
              label="通话号码数">
            </el-table-column>
            <el-table-column
              prop="total_time"
              label="通话时长（秒）">
            </el-table-column>
            <el-table-column
              prop="dial_cnt"
              label="主叫次数">
            </el-table-column>
            <el-table-column
              prop="dialed_cnt"
              label="被叫次数">
            </el-table-column>
            <el-table-column
              prop="dial_time"
              label="主叫时长">
            </el-table-column>
            <el-table-column
              prop="dialed_time"
              label="被叫时长">
            </el-table-column>
            <el-table-column
              prop="latest_call_time"
              label="最后一次通话时间">
            </el-table-column>
            <el-table-column
              prop="farthest_call_time"
              label="第一次通话时间">
            </el-table-column>
          </el-table>
        </dd>
      </dl>
      <dl class="cardinfo">
        <dt>通话详单</dt>
        <dd>
          <el-table
            header-row-class-name='headclass'
            :data="callContactDetail.slice((currentPage-1)*pagesize,currentPage*pagesize)"
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
              prop="city"
              label="通话地">
            </el-table-column>
            <el-table-column
              prop="p_relation"
              label="与联系人关系">
            </el-table-column>
            <el-table-column
              prop="peer_num"
              label="联系人号码">
            </el-table-column>
            <el-table-column
              prop="group_name"
              label="号码类型">
            </el-table-column>
            <el-table-column
              prop="company_name"
              label="号码标识">
              <template slot-scope="props">
                <el-tag type="danger" v-if="props.row.company_name !== '' && props.row.company_name !== '未知'">{{props.row.company_name}}</el-tag>
                <span v-else>{{props.row.company_name}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="call_cnt_1w"
              label="近1周（最近7天）通话次数">
            </el-table-column>
            <el-table-column
              prop="call_cnt_1m"
              label="近1月（最近30天）通话次数">
            </el-table-column>
            <el-table-column
              prop="call_cnt_3m"
              label="近3月（最近0-90天）通话次数">
            </el-table-column>
            <el-table-column
              prop="call_cnt_6m"
              label="近6月（最近0-180天）通话次数">
            </el-table-column>
            <el-table-column
              prop="call_time_3m"
              label="近3月通话时长">
            </el-table-column>
            <el-table-column
              prop="call_time_6m"
              label="近6月通话时长">
            </el-table-column>

            <el-table-column
              prop="dial_cnt_3m"
              label="近3月主叫次数">
            </el-table-column>
            <el-table-column
              prop="dial_cnt_6m"
              label="近6月主叫次数">
            </el-table-column>
            <el-table-column
              prop="dial_time_3m"
              label="近3月主叫时长">
            </el-table-column>
            <el-table-column
              prop="dial_time_6m"
              label="近6月主叫时长">
            </el-table-column>

            <el-table-column
              prop="dialed_cnt_3m"
              label="近3月被叫次数">
            </el-table-column>

            <el-table-column
              prop="dialed_cnt_6m"
              label="近6月被叫次数">
            </el-table-column>
            <el-table-column
              prop="dialed_time_3m"
              label="近3月被叫时长">
            </el-table-column>
            <el-table-column
              prop="dialed_time_6m"
              label="近6月被叫时长">
            </el-table-column>
          </el-table>
          <el-pagination
            v-if="callContactDetail.length > 0 && callContactDetail.length > 0"
            background
            layout="sizes, total, prev, pager, next"
            :page-sizes="[15, 20, 30, 50]"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-size="pagesize"
            :total="callContactDetail.length">
          </el-pagination>
        </dd>
      </dl>
    </el-card>
  </div>
</template>
<script>
import Spinner from '@/components/spinner'
import operatorApi from '@/api/operator'
import axios from 'axios'
import scroll from '@/views/credit/mixin/scroll'
export default {
  mixins: [scroll],
  components: {
    Spinner
  },
  data () {
    return {
      pagesize: 15,
      currentPage: 1,
      loading: {
        loaddingMsg: '',
        show: false
      },
      fiskData: {
        application_check: [],
        collection_contact: [],
        friend_circle: {
          peer_num_top_list: []
        },
        call_family_detail: [],
        call_time_detail: [],
        call_duration_detail: [],
        call_contact_detail: []
      }
    }
  },
  computed: {
    applicationCheck () {
      return this.fiskData.application_check && this.fiskData.application_check.map(item => {
        return {
          app_point: item.app_point,
          ...item.check_points
        }
      })
    },
    collectionContact () {
      return this.fiskData.collection_contact
    },
    friendCircle () {
      return this.fiskData.friend_circle
    },
    callFamilyDetail () {
      return this.fiskData.call_family_detail && this.fiskData.call_family_detail.map(item => {
        return {
          app_point_zh: item.app_point_zh,
          ...item.item
        }
      })
    },
    callTimeDetail () {
      return this.fiskData.call_time_detail && this.fiskData.call_time_detail.map(item => {
        return {
          app_point_zh: item.app_point_zh,
          ...item.item
        }
      })
    },
    callDurationDetail () {
      return this.fiskData.call_duration_detail && this.fiskData.call_duration_detail.map(item => {
        let list = item.duration_list.map(list => {
          return {
            time_step_zh: list.time_step_zh,
            ...list.item
          }
        })
        return {
          desc: item.desc,
          list
        }
      })
    },
    callContactDetail () {
      return this.fiskData.call_contact_detail
    }
  },
  methods: {
    handleTab (type) {
      this.$nextTick(() => {
        let keyDOm = document.getElementById(type)
        this.scrollDom.scrollTop = keyDOm.offsetTop
      })
    },
    handleSizeChange (val) {
      this.pagesize = val
    },
    handleCurrentChange (currentPage) {
      this.currentPage = currentPage
    },
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
    this.scrollDom = document.getElementsByClassName('el-scrollbar__wrap')[0]
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
