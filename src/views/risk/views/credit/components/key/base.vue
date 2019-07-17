<template>
  <div :class="filter === 1 ? 'inner' : ''">
    <blockquote class="quote" @click="filter === 1 ? show = !show : ''">
      <span v-if="filter === 1">关键信息</span> <span v-if="filter === 0">基本信息</span>
      <span v-if="(filter === 1)">
        <el-button size="mini" type="warning" :icon="show ? 'el-icon-arrow-down' : 'el-icon-arrow-right'" circle></el-button>
      </span>
    </blockquote>
    <el-card class="box-card" shadow="never" :body-style="{ padding: '0px' }" v-if="filter === 0 && !checkAppId() && baseObj.userInfo && Object.keys(baseObj.userInfo).length >0">
      <dl class="cardinfo">
        <dd>
          <el-row :gutter="60">
            <el-dialog
              title="身份证照片"
              width="90%"
              top='50px'
              @close="closeDialog"
              :fullscreen = false
              :visible.sync="dialogVisible"
              >
              <el-carousel :autoplay="false" :interval="interval" ref="customCarouse" :style="{'min-height': height + 'px'}" v-scroll="scrollFn">
                <el-carousel-item trigger="click"  v-for="(item,index) in idPhone" :key="index" :style="{height: height + 'px'}">
                  <img :src="item" class="image" style="max-width:100%; height: 100%" :autoplay="false">
                </el-carousel-item>
              </el-carousel>
            </el-dialog>
            <el-col :span="6" v-for="(item, index) in idPhone" :key="index">
              <img :src="item" class="image" style="max-width:100%;max-height:200px;" @click="setActive(index)">
            </el-col>
<!--
            <el-col :span="6" v-if="baseObj.userInfo.ocrPicture_1">
              <img :src="baseObj.userInfo.ocrPicture_1" class="image" style="max-width:100%;max-height:200px;" @click="setActive(0)">
            </el-col>
            <el-col :span="6" v-if="baseObj.userInfo.idPictureFront">
              <img :src="baseObj.userInfo.idPictureFront" class="image" style="max-width:100%;max-height:200px;" @click="setActive(1)">
            </el-col>
            <el-col :span="6" v-if="baseObj.userInfo.idPictureBack">
              <img :src="baseObj.userInfo.idPictureBack" class="image" style="max-width:100%;max-height:200px;" @click="setActive(2)">
            </el-col>
            <el-col :span="6" v-if="baseObj.userInfo.identity_certification_picture">
              <img :src="baseObj.userInfo.identity_certification_picture" class="image" style="max-width:100%;max-height:200px;" @click="setActive(3)">
            </el-col> -->
          </el-row>
        </dd>
      </dl>
    </el-card>
    <el-card class="box-card" shadow="never" :body-style="{ padding: '0px' }" v-if="show">
      <dl class="cardinfo">
        <dd v-if="!checkAppId()">
          <el-row :gutter="60">
            <el-col :span="5">
              <span>真实姓名：<b>{{baseObj.basicInfo.name}}</b></span>
            </el-col>
            <el-col :span="5">
              <span><b>{{baseObj.basicInfo.gender}}</b> |
                <el-tag type="danger" size="small" v-if="baseObj.basicInfo.age >= 40"><b>{{baseObj.basicInfo.age}}</b></el-tag>
                <b v-if="baseObj.basicInfo.age < 40">{{baseObj.basicInfo.age}}</b> |
                <template v-if="checkNation"><el-tag size="small" type="danger"><b>{{baseObj.basicInfo.nation}}</b></el-tag></template>
                <template v-else><b>{{baseObj.basicInfo.nation}}</b></template></span>
            </el-col>
            <el-col :span="7">
              <span>单位名称：<b>{{baseObj.userInfo.jobCompany}}</b></span>
            </el-col>
            <el-col :span="7">
              <span>算话分风险评分：<b>{{baseObj.userInfo.suanhuaFraudScore}}</b></span>
            </el-col>
          </el-row>
        </dd>
        <dd v-if="!checkAppId()">
          <el-row :gutter="60">
            <el-col :span="5">
              <span>身份证号：<b>{{baseObj.basicInfo.idCard}}</b></span>
            </el-col>
            <!-- <el-col :span="5">
              <span>身份证有效期：<b v-if="baseObj.validateInfo">{{baseObj.validateInfo.validateDate}}</b></span>
            </el-col> -->
            <el-col :span="5">
              <span>是否在有效期：
                <template v-if="baseObj.validateInfo && baseObj.validateInfo.isValidate === '否'">
                  <el-tag size="small" type="danger"><b>{{baseObj.validateInfo.isValidate}}</b></el-tag>
                </template>
                <template v-else><b v-if="baseObj.validateInfo">{{baseObj.validateInfo.isValidate}}</b></template>
              </span>
            </el-col>
            <el-col :span="7">
              <span>与身份证头像照对比相似度：
                <template v-if="baseObj.ocrInfo && baseObj.ocrInfo.cardVerifyScore">
                  <el-tag size="small" :type="checkNum(baseObj.ocrInfo.cardVerifyScore, 0.7) ? 'success' : 'danger'">
                    <b>{{baseObj.ocrInfo.cardVerifyScore | FilterTo2}}</b>
                  </el-tag>
                </template>
              </span>
              <span>hack分：
                <template v-if="baseObj.ocrInfo && baseObj.ocrInfo.cardHackScore">
                  <el-tag size="small" :type="checkNum(baseObj.ocrInfo.cardHackScore, 0.98) ? 'danger' : 'success'">
                    <b>{{baseObj.ocrInfo.cardHackScore | FilterTo2}}</b>
                  </el-tag>
                </template>
              </span>
            </el-col>
            <el-col :span="7">
              <span>与公安部底图对比相似度：
                <template v-if="baseObj.ocrInfo && baseObj.ocrInfo.securityVerifyScore">
                  <el-tag size="small" :type="checkNum(baseObj.ocrInfo.securityVerifyScore, 0.7) ? 'success' : 'danger'">
                    <b>{{baseObj.ocrInfo.securityVerifyScore | FilterTo2}}</b>
                  </el-tag>
                </template>
              </span>
              <span>hack分：
                <template v-if="baseObj.ocrInfo && baseObj.ocrInfo.securityHackScore">
                  <el-tag size="small" :type="checkNum(baseObj.ocrInfo.securityHackScore, 0.98) ? 'danger' : 'success'">
                    <b>{{baseObj.ocrInfo.securityHackScore | FilterTo2}}</b>
                  </el-tag>
                </template>
              </span>
            </el-col>
          </el-row>
        </dd>
        <dd>
          <el-row :gutter="60">
            <el-col :span="5" v-if="baseObj.basicInfo.mobile">
              <span>手机号：<b>{{baseObj.basicInfo.mobile}}</b></span>
            </el-col>
            <el-col :span="5" v-if="baseObj.orderInfo.yipurseCode">
              <span>翼钱包是否有过订单：
                <template v-if="baseObj.orderInfo.yipurseCode === '0'"><el-tag size="small" type="danger"><b>{{baseObj.orderInfo.yipurseCode === '1' ? "否" : "是"}}</b></el-tag></template>
                <template v-else-if="baseObj.orderInfo.yipurseCode === '1'"><b>{{baseObj.orderInfo.yipurseCode === '1' ? "否" : "是"}}</b></template>
              </span>
            </el-col>
            <el-col :span="7" v-if="baseObj.orderInfo.qiandadaCode">
              <span>钱达达是否有过订单：
                <template v-if="baseObj.orderInfo.qiandadaCode === '0'"><el-tag size="small" type="danger"><b>{{baseObj.orderInfo.qiandadaCode === '1' ? "否" : "是"}}</b></el-tag></template>
                <template v-else-if="baseObj.orderInfo.qiandadaCode === '1'"><b>{{baseObj.orderInfo.qiandadaCode === '1' ? "否" : "是"}}</b></template>
              </span>
            </el-col>
            <el-col :span="7" v-if="baseObj.orderInfo.bailianCode">
              <span>佰联钱包是否有过订单：
                <template v-if="baseObj.orderInfo.bailianCode === '0'"><el-tag size="small" type="danger"><b>{{baseObj.orderInfo.bailianCode === '1' ? "否" : "是"}}</b></el-tag></template>
                <template v-else-if="baseObj.orderInfo.bailianCode === '1'"><b>{{baseObj.orderInfo.bailianCode === '1' ? "否" : "是"}}</b></template>
              </span>
            </el-col>
          </el-row>
        </dd>
      </dl>
    </el-card>
  </div>
</template>
<script>
// import APPID from '@/metadata/appid'
const MAXHEIGHT = document.documentElement.clientHeight || document.body.clientHeight
const MINHEIGHT = 600
export default {
  props: ['baseObj', 'filter'],
  data () {
    return {
      show: true,
      isMax: false,
      isMin: false,
      height: MINHEIGHT,
      interval: 100,
      dialogVisible: false
    }
  },
  computed: {
    checkNation () {
      if (this.baseObj.basicInfo.nation) {
        let temp = this.baseObj.basicInfo.nation + ''
        if (temp.indexOf('维吾尔') > -1 || temp.indexOf('内蒙') > -1 || temp.indexOf('藏') > -1) {
          return true
        }
      }
      return false
    },
    idPhone () {
      if (this.baseObj.userInfo !== undefined) {
        let picArr = [
          this.baseObj.userInfo.ocrPicture_1,
          this.baseObj.userInfo.idPictureFront,
          this.baseObj.userInfo.idPictureBack,
          this.baseObj.userInfo.identityCertificationPicture
        ]
        return picArr.filter(item => {
          return !!item
        })
      }
      return []
    }
  },
  filters: {
    FilterTo2 (value) {
      if (!isNaN(value)) {
        if (parseInt(value) === value) {
          return value
        }
        let n1len
        try {
          n1len = (value + '').split('.')[0].length
        } catch (f) {
          n1len = 0
        }
        return (value + '').substring(0, n1len + 3)
      }
      return ''
    }
  },
  methods: {
    setActive: function (index) {
      this.dialogVisible = true
      setTimeout(() => {
        this.$refs.customCarouse.setActiveItem(index)
      }, 30)
    },
    scrollFn (direction) {
      if (direction) {
        if (this.height >= MAXHEIGHT) {
          if (!this.isMax) {
            this.isMax = true
            this.$message({
              message: '已经是最大值',
              type: 'warning'
            })
          }
          this.height = MAXHEIGHT
        } else {
          this.height = this.height + 100
          this.isMin = false
        }
        // this.height = this.height + 100
      } else {
        if (this.height <= MINHEIGHT) {
          if (!this.isMin) {
            this.isMin = true
            this.$message({
              message: '已经是最小值',
              type: 'warning'
            })
          }
          this.height = MINHEIGHT
        } else {
          this.height = this.height - 100
          this.isMax = false
        }
      }
    },
    checkAppId () { // 先放开限制
      // if (this.$route.query.appId === APPID.YIPURSE) {
      //   return true
      // }
      return false
    },
    checkNum (value, std) {
      if (!isNaN(value)) {
        if (parseInt(value) === value) {
          if (value - std > 0) {
            return true
          } else {
            return false
          }
        }
        let n1len
        try {
          n1len = (value + '').split('.')[0].length
        } catch (f) {
          n1len = 0
        }
        if (parseFloat((value + '').substring(0, n1len + 3)) - std >= 0) {
          return true
        } else {
          return false
        }
      }
      return false
    },
    closeDialog () {
      this.height = MINHEIGHT
    }
  }
}
</script>
