<template>
  <div id="operator">
    <spinner :visible="loading.OPERATOR" :fixed="true" :text="loading.loaddingMsg"></spinner>
    <blockquote class="quote">个人基本信息</blockquote>
    <el-card class="box-card" shadow="never" :body-style="{ padding: '0px' }">
      <!-- <div slot="header" class="clearfix box-card-tit">
        <div class="card-tit"><svg-icon icon-class="play_fill" /> <b>活体检测结果</b></div>
      </div>       -->
      <dl class="cardinfo">
        <dt>报告基础信息项</dt>
        <dd>
          <el-row :gutter="60">
            <el-col :span="8">报告类型：{{report.data_type}}</el-col>
            <el-col :span="8">数据来源（英文）：{{report.source_name}}</el-col>
            <el-col :span="8">数据来源（中文）：{{report.source_name_zh}}</el-col>
          </el-row>
        </dd>
        <dd>
          <el-row :gutter="60">
            <el-col :span="8">数据获取时间：{{report.data_gain_time}}</el-col>
            <el-col :span="8">报告ID：{{report.task_id}}</el-col>
            <el-col :span="8">报告生成时间：{{report.update_time}}</el-col>
          </el-row>
        </dd>
        <dd>
          <el-row :gutter="60">
            <el-col :span="8">报告版本：{{report.version}}</el-col>
          </el-row>
        </dd>
      </dl>
      <dl class="cardinfo">
        <dt>用户基本信息</dt>
        <dd>
          <el-row :gutter="60">
            <el-col :span="8">姓名：<el-tag size="small" :type="userBasic.isNameMatch ? 'success' : 'danger'">{{userBasic.name}}</el-tag></el-col>
            <el-col :span="8">身份证号码：<el-tag size="small"  :type="userBasic.isIdCardMatch ? 'success' : 'danger'">{{userBasic.id_card}}</el-tag></el-col>
            <el-col :span="8">性别：{{userBasic.gender}}</el-col>
          </el-row>
        </dd>
        <dd>
          <el-row :gutter="60">
            <el-col :span="8">年龄：{{userBasic.age}}</el-col>
            <el-col :span="8">星座：{{userBasic.constellation}}</el-col>
            <el-col :span="8">所属省：<el-tag size="small"  :type="userBasic.isProvinceMatch ? 'success' : 'danger'">{{userBasic.province}}</el-tag></el-col>
          </el-row>
        </dd>
        <dd>
          <el-row :gutter="60">
            <el-col :span="8">所属市：<el-tag size="small"  :type="userBasic.isCityMatch ? 'success' : 'danger'">{{userBasic.city}}</el-tag></el-col>
            <el-col :span="8">所属县：{{userBasic.region}}</el-col>
            <el-col :span="8">籍贯：<el-tag size="small"  :type="userBasic.isNativePlace ? 'success' : 'danger'">{{userBasic.native_place}}</el-tag></el-col>
          </el-row>
        </dd>
      </dl>
      <dl class="cardinfo">
        <dt>手机号基本信息</dt>
        <dd>
          <el-row :gutter="60">
            <el-col :span="8">手机号：{{cellPhone.mobile}}</el-col>
            <el-col :span="8">用户姓名：{{cellPhone.carrier_name}}</el-col>
            <el-col :span="8">用户身份证号码：{{cellPhone.carrier_idcard}}</el-col>
          </el-row>
        </dd>
        <dd>
          <el-row :gutter="60">
            <el-col :span="8">开户时间：{{cellPhone.reg_time}}</el-col>
            <el-col :span="8">开户时长：<el-tag size="small"  :type="cellPhone.in_time > 6 ? 'success' : 'danger'">{{cellPhone.in_time}}</el-tag></el-col>
            <el-col :span="8">用户邮箱：{{cellPhone.email}}</el-col>
          </el-row>
        </dd>
        <dd>
          <el-row :gutter="60">
            <el-col :span="8">地址：{{cellPhone.address}}</el-col>
            <el-col :span="8">是否实名：<el-tag size="small"  :type="cellPhone.reliability === '实名认证' ? 'success' : 'danger'">{{cellPhone.reliability}}</el-tag></el-col>
            <el-col :span="8">手机号码归属地：{{cellPhone.phone_attribution}}</el-col>
          </el-row>
        </dd>
        <dd>
          <el-row :gutter="60">
            <el-col :span="8">居住地址：{{cellPhone.live_address}}</el-col>
            <el-col :span="8">余额：<el-tag size="small"  :type="cellPhone.available_balance >= 0 ? 'success' : 'danger'">{{cellPhone.available_balance}}</el-tag></el-col>
            <el-col :span="8">套餐：{{cellPhone.package_name}}</el-col>
          </el-row>
        </dd>
        <dd>
          <el-row :gutter="60">
            <el-col :span="8">账单认证日期：{{cellPhone.bill_certification_day}}</el-col>
          </el-row>
        </dd>
      </dl>
      <dl class="cardinfo">
        <dt>基本信息校验项</dt>
        <dd>
          <el-table
            header-row-class-name='headclass'
            :data="basicCheck"
            stripe
            style="width: 100%">
            <el-table-column
              prop="order"
              width="60"
              label="序号">
            </el-table-column>
            <el-table-column
              prop="checkItem"
              width="500"
              label="分析点">
            </el-table-column>
            <el-table-column
              prop="result"
              width=""
              label="分析结果">
              <template slot-scope="scope">
                <el-tag v-if="filterResult(scope.row.result) === 'success' " size="small" type="success">{{scope.row.result}}</el-tag>
                <el-tag v-else-if="filterResult(scope.row.result) === 'danger'" size="small" type="danger">{{scope.row.result}}</el-tag>
                <el-tag v-else-if="filterResult(scope.row.result) === 'warning'" size="small" type="warning">{{scope.row.result}}</el-tag>
                <span v-else>{{scope.row.result}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="comment"
              width=""
              label="结果说明">
            </el-table-column>
          </el-table>
        </dd>
      </dl>
    </el-card>
    <blockquote class="quote" ref="riskID" id="riskID">风险监测</blockquote>
    <el-card class="box-card" shadow="never" :body-style="{ padding: '0px' }">
      <dl class="cardinfo">
        <dt>行为监测（近180天）</dt>
        <dd>
          <el-table
            header-row-class-name='headclass'
            :data="behaviorCheck"
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
              prop="check_point_cn"
              width="300"
              label="分析点">
            </el-table-column>
            <el-table-column
              prop="result"
              width="300"
              label="结果">
              <template slot-scope="props">
                <el-tag v-if="props.row.check_point === 'regular_circle'" :type="(props.row.check_point === 'regular_circle' && props.row.score === 2) ? 'danger' : 'success'">{{props.row.result}}</el-tag>
                <el-tag v-else-if="(props.row.check_point === 'contact_110' && props.row.check_point.indexOf('多次通话') > -1)" type="danger">{{props.row.result}}</el-tag>
                <el-tag v-else-if="(props.row.check_point === 'contact_120' && props.row.check_point.indexOf('多次通话') > -1)" type="danger">{{props.row.result}}</el-tag>
                <el-tag v-else-if="(props.row.check_point === 'contact_lawyer' && props.row.check_point.indexOf('多次通话') > -1)" type="danger">{{props.row.result}}</el-tag>
                <el-tag v-else-if="(props.row.check_point === 'contact_loan' && props.row.check_point.indexOf('经常被联系') > -1)" type="danger">{{props.row.result}}</el-tag>
                <el-tag v-else-if="(props.row.check_point === 'contact_bank' && props.row.check_point.indexOf('经常被联系') > -1)" type="danger">{{props.row.result}}</el-tag>
                <el-tag v-else-if="(props.row.check_point === 'contact_night' && props.row.check_point.indexOf('频繁夜间活动') > -1)" type="danger">{{props.row.result}}</el-tag>
                <el-tag v-else-if="(props.row.check_point === 'phone_call' && props.row.check_point.indexOf('数量稀少') > -1)" type="danger">{{props.row.result}}</el-tag>
                <span v-else>{{props.row.result}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="evidence"
              label="证据">
            </el-table-column>
            <el-table-column
              prop="score"
              label="标记">
            </el-table-column>
          </el-table>
        </dd>
      </dl>
      <dl class="cardinfo">
        <dt>用户查询信息</dt>
        <dd>
          <el-table
            header-row-class-name='headclass'
            :data="userInfoCheckBlank"
            stripe
            style="width: 100%">
            <el-table-column
              prop="name"
              label="查询项">
            </el-table-column>
            <el-table-column
              prop="value"
              label="查询结果">
            <template slot-scope="props">
                <el-tag type="danger" v-if="props.row.value && props.row.value.length > 0 && props.row.key === 'searched_org_type'">
                  {{props.row.value}}
                </el-tag>
                <el-tag type="danger" v-else-if="props.row.value && props.row.key === 'searched_org_cnt'">
                  {{props.row.value}}
                </el-tag>
                <el-tag type="danger" v-else-if="props.row.value && props.row.key === 'register_org_type'">
                  {{props.row.value}}
                </el-tag>
                <span v-else>{{props.row.value}}</span>
              </template>
            </el-table-column>
          </el-table>
        </dd>
        <dd>
          <el-table
            header-row-class-name='headclass'
            :data="userInfoCheckSearch"
            stripe
            style="width: 100%">
            <el-table-column
              prop="name"
              label="查询项">
            </el-table-column>
            <el-table-column
              prop="value"
              label="查询结果">
            </el-table-column>
          </el-table>
        </dd>
      </dl>
      <dl class="cardinfo">
        <dt>通话风险分析项</dt>
        <dd>
         <el-table
            header-row-class-name='headclass'
            :data="callRiskAnalysis"
            stripe
            style="width: 100%">
            <el-table-column
              prop="analysis_intro"
              label="风险项(描述)">
            </el-table-column>
            <el-table-column
              prop="call_cnt_1m"
              label="近一月通话次数">
            </el-table-column>
            <el-table-column
              prop="call_cnt_3m"
              label="近三月通话次数">
            </el-table-column>
            <el-table-column
              prop="call_cnt_6m"
              label="近六月通话次数">
            </el-table-column>
            <el-table-column
              prop="avg_call_cnt_3m"
              label="近三个月平均通话次数">
            </el-table-column>
            <el-table-column
              prop="avg_call_cnt_6m"
              label="近六个月平均通话次数">
            </el-table-column>
            <el-table-column
              prop="call_time_1m"
              label="近一月通话时长">
            </el-table-column>
            <el-table-column
              prop="call_time_3m"
              label="近三月通话时长">
            </el-table-column>
            <el-table-column
              prop="call_time_6m"
              label="近六月通话时长">
            </el-table-column>
            <el-table-column
              prop="avg_call_time_3m"
              label="近三个月平均通话时长">
            </el-table-column>
            <el-table-column
              prop="avg_call_time_6m"
              label="近六个月平均通话时长">
            </el-table-column>
          </el-table>
        </dd>
      </dl>
    </el-card>
    <blockquote class="quote" id="userID" ref="userID">用户画像</blockquote>
    <el-card class="box-card" shadow="never" :body-style="{ padding: '0px' }">
      <dl class="cardinfo">
        <dt>朋友圈联系人数量</dt>
        <dd>
          <el-row :gutter="60">
            <el-col :span="8">近3月朋友联系数量：{{friendCircle.summary.friend_num_3m}}</el-col>
            <el-col :span="8">近3月好朋友联系数量（联系10次以上）：{{friendCircle.summary.good_friend_num_3m}}</el-col>
            <el-col :span="8">近3月朋友圈中心城市：{{friendCircle.summary.friend_city_center_3m}}</el-col>
          </el-row>
        </dd>
        <dd>
          <el-row :gutter="60">
            <el-col :span="8">近3月朋友圈中心地是否与手机归属地一致：{{friendCircle.summary.is_city_match_friend_city_center_3m}}</el-col>
            <el-col :span="8">近3月互通电话号码数目：{{friendCircle.summary.inter_peer_num_3m}}</el-col>
            <el-col :span="8">近6月朋友联系数量：{{friendCircle.summary.friend_num_6m}}</el-col>
          </el-row>
        </dd>
        <dd>
          <el-row :gutter="60">
            <el-col :span="8">近6月好朋友联系数量（联系10次以上）：{{friendCircle.summary.good_friend_num_6m}}</el-col>
            <el-col :span="8">近6月朋友圈中心城市：{{friendCircle.summary.friend_city_center_6m}}</el-col>
            <el-col :span="8">近6月朋友圈中心地是否与手机归属地一致：{{friendCircle.summary.is_city_match_friend_city_center_6m}}</el-col>
          </el-row>
        </dd>
        <dd>
          <el-row :gutter="60">
            <el-col :span="8">近6月互通电话号码数目：{{friendCircle.summary.inter_peer_num_6m}}</el-col>
          </el-row>
        </dd>
      </dl>
      <dl class="cardinfo">
        <dt>用户行为分析（按月汇总）</dt>
        <dd v-for="(item, index) in cellBehavior" :key="index">
          <el-tag style="margin-bottom: 10px;">联系人号码：{{item.phone_num}}</el-tag>
          <el-table
            header-row-class-name='headclass'
            :data="item.behavior"
            stripe
            style="width: 100%">
            <el-table-column
              prop="sms_cnt"
              width="80"
              label="短信次数">
            </el-table-column>
            <el-table-column
              prop="cell_phone_num"
              label="手机号码">
            </el-table-column>
            <el-table-column
              prop="net_flow"
              label="流量使用">
            </el-table-column>
            <el-table-column
              prop="total_amount"
              label="消费金额">
            </el-table-column>
            <el-table-column
              prop="cell_mth"
              label="月份">
            </el-table-column>
            <el-table-column
              prop="cell_loc"
              label="归属地">
            </el-table-column>

            <el-table-column
              prop="cell_operator_zh"
              label="运营商（中文）">
            </el-table-column>
            <el-table-column
              prop="cell_operator"
              label="运营商">
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
              label="主叫时长（秒）">
            </el-table-column>

            <el-table-column
              prop="dialed_cnt"
              label="被叫次数">
            </el-table-column>
            <el-table-column
              prop="dialed_time"
              label="被叫时长（秒）">
            </el-table-column>
            <el-table-column
              prop="rechange_cnt"
              label="充值次数">
            </el-table-column>

            <el-table-column
              prop="rechange_amount"
              label="充值总额（分）">
            </el-table-column>

          </el-table>
        </dd>
      </dl>
      <dl class="cardinfo">
        <dt>活跃程度分析</dt>
        <dd>
          <el-table
            header-row-class-name='headclass'
            :data="activeDegree"
            stripe
            style="width: 100%">
            <el-table-column
              prop="app_point_zh"
              width="300"
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
        <dt>常用服务详单</dt>
        <dd v-for="(item, index) in mainService" :key="index">
          <div style="text-align: center;"><b>企业名称（服务号、服务企业）：</b><el-tag style="margin-bottom: 10px;">{{item.group_name}}（{{item.company_name}}）</el-tag></div>
          <el-table
            header-row-class-name='headclass'
            :data="item.service_details"
            stripe
            style="width: 100%">
            <el-table-column
              prop="interact_mth"
              width="100"
              label="月份">
            </el-table-column>
            <el-table-column
              prop="interact_cnt"
              label="通话次数">
            </el-table-column>
            <el-table-column
              prop="interact_time"
              label="通话时长">
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
              label="主叫时长（秒）">
            </el-table-column>
            <el-table-column
              prop="dialed_time"
              label="被叫时长（秒）">
            </el-table-column>
          </el-table>
        </dd>
      </dl>
      <dl class="cardinfo">
        <dt>通话服务分析</dt>
        <dd>
         <el-table
            header-row-class-name='headclass'
            :data="callServiceAnalysis"
            stripe
            style="width: 100%">
             <el-table-column
              prop="analysis_intro"
              label="风险项(描述)">
            </el-table-column>
            <el-table-column
              prop="call_cnt_1m"
              label="近一月通话次数">
            </el-table-column>
            <el-table-column
              prop="call_cnt_3m"
              label="近三月通话次数">
            </el-table-column>
            <el-table-column
              prop="call_cnt_6m"
              label="近六月通话次数">
            </el-table-column>
            <el-table-column
              prop="avg_call_cnt_3m"
              label="近三个月平均通话次数">
            </el-table-column>
            <el-table-column
              prop="avg_call_cnt_6m"
              label="近六个月平均通话次数">
            </el-table-column>
            <el-table-column
              prop="call_time_1m"
              label="近一月通话时长">
            </el-table-column>
            <el-table-column
              prop="call_time_3m"
              label="近三月通话时长">
            </el-table-column>
            <el-table-column
              prop="call_time_6m"
              label="近六月通话时长">
            </el-table-column>
            <el-table-column
              prop="avg_call_time_3m"
              label="近三个月平均通话时长">
            </el-table-column>
            <el-table-column
              prop="avg_call_time_6m"
              label="近六个月平均通话时长">
            </el-table-column>
          </el-table>
        </dd>
      </dl>
    </el-card>
    <blockquote class="quote" id="contactID" ref="contactID">联系人所在地区</blockquote>
    <el-card class="box-card" shadow="never" :body-style="{ padding: '0px' }">
      <dl class="cardinfo">
        <dt>通话地top</dt>
        <dd v-for="(table, index) in friendCircle.location_top_list" :key="index">
          <div style="text-align: center;"><el-tag style="margin-bottom: 10px;">{{table.key === 'location_top3_3m' ? '通话地top3(近三月)' : '通话地top3(近六月)'}}</el-tag></div>
          <el-table
            header-row-class-name='headclass'
            :data="table.top_item"
            stripe
            style="width: 100%">
            <el-table-column
              prop="location"
              label="通话地">
            </el-table-column>
            <el-table-column
              prop="peer_number_cnt"
              label="通话号码数">
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
      <dl class="cardinfo">
        <dt>联系人手机号码归属地通话详情</dt>
        <dd v-for="(table, index) in contactRegion" :key="index">
          <div style="text-align: center;"><el-tag style="margin-bottom: 10px;">{{table.desc}}</el-tag></div>
          <el-table
            header-row-class-name='headclass'
            :data="table.region_list"
            stripe
            style="width: 100%">
            <el-table-column
              prop="region_loc"
              label="地区名称">
            </el-table-column>
            <el-table-column
              prop="region_uniq_num_cnt"
              label="通话号码数">
            </el-table-column>
            <el-table-column
              prop="region_call_cnt"
              label="通话次数">
            </el-table-column>
            <el-table-column
              prop="region_call_time"
              label="通话时长（秒）">
            </el-table-column>
            <el-table-column
              prop="region_dial_cnt"
              label="主叫次数">
            </el-table-column>

            <el-table-column
              prop="region_dial_time"
              label="主叫时长(秒)">
            </el-table-column>

            <el-table-column
              prop="region_dialed_cnt"
              label="被叫次数">
            </el-table-column>

            <el-table-column
              prop="region_dialed_time"
              label="被叫时长（秒）">
            </el-table-column>

            <el-table-column
              prop="region_avg_dial_time"
              label="主叫平均时长（秒）">
            </el-table-column>
            <el-table-column
              prop="region_avg_dialed_time"
              label="被叫平均时长（秒）">
            </el-table-column>

            <el-table-column
              prop="region_dial_cnt_pct"
              label="主叫次数占比">
            </el-table-column>
            <el-table-column
              prop="region_dial_time_pct"
              label="主叫时长占比">
            </el-table-column>

            <el-table-column
              prop="region_dialed_cnt_pct"
              label="被叫次数占比">
            </el-table-column>
            <el-table-column
              prop="region_dialed_time_pct"
              label="被叫时长占比">
            </el-table-column>
          </el-table>
        </dd>
      </dl>
    </el-card>
    <blockquote class="quote">运营商月消费</blockquote>
    <el-card class="box-card" shadow="never" :body-style="{ padding: '0px' }">
      <dl class="cardinfo">
        <dt>消费情况分析</dt>
        <dd>
          <el-table
            header-row-class-name='headclass'
            :data="consumptionDetail"
            stripe
            style="width: 100%">
            <el-table-column
              prop="app_point_zh"
              label="分析项（中文）">
            </el-table-column>
            <el-table-column
              prop="item_1m"
              label="近一月数量">
            </el-table-column>
            <el-table-column
              prop="item_6m"
              label="近三月数量">
            </el-table-column>
            <el-table-column
              prop="item_6m"
              label="近六月数量">
            </el-table-column>
            <el-table-column
              prop="item_3m"
              label="近三月平均数量">
            </el-table-column>
            <el-table-column
              prop="avg_item_6m"
              label="近六月平均数量">
            </el-table-column>
          </el-table>
        </dd>
      </dl>
    </el-card>
    <blockquote class="quote">漫游分析</blockquote>
    <el-card class="box-card" shadow="never" :body-style="{ padding: '0px' }">
      <dl class="cardinfo">
        <dt>漫游地分析</dt>
        <dd>
          <el-table
            header-row-class-name='headclass'
            :data="roamAnalysis"
            stripe
            style="width: 100%">
            <el-table-column
              prop="roam_location"
              width="100"
              label="漫游地">
            </el-table-column>
            <el-table-column
              prop="roam_day_cnt_3m"
              label="近3月漫游天数">
            </el-table-column>
            <el-table-column
              prop="roam_day_cnt_6m"
              label="近6月漫游天数">
            </el-table-column>
            <el-table-column
              prop="continue_roam_cnt_3m"
              label="近3月连续漫游次数">
            </el-table-column>
            <el-table-column
              prop="continue_roam_cnt_6m"
              label="近6月连续漫游次数">
            </el-table-column>
            <el-table-column
              prop="max_roam_day_cnt_3m"
              label="近3月漫游地最大连续漫游天数">
            </el-table-column>
            <el-table-column
              prop="max_roam_day_cnt_6m"
              label="近6月漫游地最大连续漫游天数">
            </el-table-column>
          </el-table>
        </dd>
      </dl>
      <dl class="cardinfo">
        <dt>漫游详单</dt>
        <dd>
          <el-table
            header-row-class-name='headclass'
            :data="roamDetail"
            stripe
            style="width: 100%">
            <el-table-column
              prop="roam_day"
              label="漫游日期">
            </el-table-column>
            <el-table-column
              prop="roam_location"
              label="漫游地">
            </el-table-column>
          </el-table>
        </dd>
      </dl>
    </el-card>
    <transition name="el-fade-in">
      <div class="circleNav" v-if="visible">
        <span type="primary" class="sector s3" @click="handleTab('riskID')" circle>风</span>
        <span type="primary" class="sector s2" @click="handleTab('userID')" circle>画</span>
        <span type="primary" class="sector" @click="handleTab('contactID')" circle>联</span>
      </div>
    </transition>
  </div>
</template>
<script>
// import moment from 'moment'
import Spinner from '@/components/spinner'
import operatorApi from '@/api/operator'
import axios from 'axios'
import scroll from '@/views/credit/mixin/scroll'
import opMeta from './operator/meta'
export default {
  mixins: [scroll],
  components: {
    Spinner
  },
  data () {
    return {
      loading: {
        loaddingMsg: '',
        OPERATOR: false
      },
      fiskData: {
        basic_check_items: [],
        cell_phone: {},
        report: {},
        user_basic: {},
        behavior_check: [],
        call_risk_analysis: [],
        friend_circle: {
          location_top_list: [],
          peer_num_top_list: [],
          summary: {}
        },
        cell_behavior: [],
        active_degree: [],
        main_service: [],
        call_service_analysis: [],
        consumption_detail: [],
        contact_region: [],
        roam_analysis: [],
        roam_detail: [],
        user_info_check: []
      }
    }
  },
  computed: {
    report () {
      return this.fiskData.report
    },
    basicCheck () {
      return this.fiskData.basic_check_items.map((item, index) => {
        return {
          order: index + 1,
          checkItem: opMeta.baskCheckItem[item.check_item],
          result: item.result,
          comment: item.comment
        }
      })
    },
    cellPhone () {
      return this.fiskData.cell_phone
    },
    userBasic () {
      return this.fiskData.user_basic
    },
    behaviorCheck () {
      return this.fiskData.behavior_check
    },
    callRiskAnalysis () {
      return this.fiskData.call_risk_analysis.map(item => {
        return {
          analysis_intro: item.analysis_item + `(${item.analysis_desc})`,
          ...item.analysis_point
        }
      })
    },
    friendCircle () {
      return this.fiskData.friend_circle
    },
    cellBehavior () {
      return this.fiskData.cell_behavior
    },
    activeDegree () {
      return this.fiskData.active_degree.map(item => {
        return {
          app_point_zh: item.app_point_zh,
          ...item.item
        }
      })
    },
    mainService () {
      return this.fiskData.main_service
    },
    callServiceAnalysis () {
      return this.fiskData.call_service_analysis.map(item => {
        return {
          analysis_intro: item.analysis_item + `(${item.analysis_desc})`,
          ...item.analysis_point
        }
      })
    },
    consumptionDetail () {
      return this.fiskData.consumption_detail.map(item => {
        return {
          app_point_zh: item.app_point_zh,
          ...item.item
        }
      })
    },
    contactRegion () {
      return this.fiskData.contact_region
    },
    roamAnalysis () {
      return this.fiskData.roam_analysis
    },
    roamDetail () {
      return this.fiskData.roam_detail
    },
    userInfoCheck () {
      return this.fiskData.user_info_check
    },
    userInfoCheckBlank () {
      let tempArr = []
      if (this.fiskData.user_info_check.length > 0) {
        tempArr = Object.keys(opMeta.checkBlackInfo).map(item => {
          return {
            key: item,
            name: opMeta.checkBlackInfo[item],
            value: this.fiskData.user_info_check[0].check_black_info[item]
          }
        })
      } else {
        tempArr = []
      }
      return tempArr
    },
    userInfoCheckSearch () {
      let tempArr = []
      if (this.fiskData.user_info_check.length > 0) {
        tempArr = Object.keys(opMeta.checkSearchInfo).map(item => {
          return {
            key: item,
            name: opMeta.checkSearchInfo[item],
            value: this.fiskData.user_info_check[0].check_search_info[item]
          }
        })
      } else {
        tempArr = []
      }
      return tempArr
    }
  },
  methods: {
    filterResult (val) {
      let type = val
      if (val === '匹配成功' || val === '否') {
        type = 'success'
      }
      if (val === '匹配失败' || val === '是') {
        type = 'danger'
      }
      if (val.indexOf('运营商未') > -1) {
        type = 'warning'
      }
      return type
    },
    // isMonthLrt () {
    //   this.$nextTick(() => {
    //     console.log(moment().diff(this.cellPhone.reg_time, 'months'))
    //   })
    // },
    handleTab (type) {
      this.$nextTick(() => {
        let keyDOm = document.getElementById(type)
        this.scrollDom.scrollTop = keyDOm.offsetTop
      })
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
    this.loading.OPERATOR = true
    axios.all([...reqArrFun])
      .then(axios.spread((...allResonse) => {
        this.loading.OPERATOR = false
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
