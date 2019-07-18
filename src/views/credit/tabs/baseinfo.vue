<template>
  <div>
    <spinner :visible="loading.BASEINFO" :fixed="true" :text="loading.loaddingMsg"></spinner>
    <blockquote class="quote">身份证照片</blockquote>
    <el-card class="box-card" shadow="never" :body-style="{ padding: '0px' }">
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
              <el-carousel :autoplay="false" :interval="interval" ref="customCarouse" :style="{'min-height': height + 'px'}" v-creditScroll="scrollFn">
                <el-carousel-item trigger="click"  v-for="(item,index) in idPhone" :key="index" :style="{height: height + 'px'}">
                  <img :src="item" class="image" style="max-width:100%; height: 100%" :autoplay="false">
                </el-carousel-item>
              </el-carousel>
            </el-dialog>
            <el-col :span="6" v-for="(item, index) in idPhone" :key="index">
              <img :src="item" class="image" style="max-width:100%;max-height:200px;" @click="setActive(index)">
            </el-col>
          </el-row>
        </dd>
      </dl>
    </el-card>
    <el-card class="box-card" shadow="never" :body-style="{ padding: '0px' }">
      <div slot="header" class="clearfix box-card-tit">
        <div class="card-tit"><svg-icon icon-class="play_fill" /> <b>活体检测结果</b></div>
      </div>
      <dl class="cardinfo">
        <dd>
         <el-row :gutter="60">
            <el-col :span="7">
              <span>与身份证头像照对比相似度：
                <template>
                  <el-tag size="small" type="success">
                    <b>0.91</b>
                  </el-tag>
                </template>
              </span>
            </el-col>
            <el-col :span="5">
              <span>是否为hack行为：
                <template>
                  <el-tag size="small" type="success">
                    <b>0.97</b>
                  </el-tag>
                </template>
              </span>
            </el-col>
            <el-col :span="7">
              <span>与公安部底图对比相似度：
                <template>
                  <el-tag size="small" type="success">
                    <b>0.93</b>
                  </el-tag>
                </template>
              </span>
            </el-col>
            <el-col :span="5">
              <span>是否为hack行为：
                <template>
                  <el-tag size="small" type="success">
                    <b>0.94</b>
                  </el-tag>
                </template>
              </span>
            </el-col>
          </el-row>
        </dd>
      </dl>
    </el-card>
    <blockquote class="quote">基本信息</blockquote>
    <el-card class="box-card" shadow="never" :body-style="{ padding: '0px' }" >
      <dl class="cardinfo">
        <dd>
          <el-row :gutter="60">
            <el-col :span="6">
              <span>真实姓名：<b>宫XX</b></span>
            </el-col>
            <el-col :span="6">
              <span>性别：<b>男</b></span>
            </el-col>
            <el-col :span="6">
              <span>年龄：
                <b>28</b>
              </span>
            </el-col>
            <el-col :span="6">
              <span>身份证号码：<b>3702821992322342X</b></span>
            </el-col>
          </el-row>
        </dd>
        <dd>
          <el-row :gutter="60">
            <el-col :span="6">
              <span>民族： <b>汉</b>
              </span>
            </el-col>
            <el-col :span="6">
              <span>注册手机号：<b>158612341231</b></span>
            </el-col>
            <el-col :span="6">
              <span>认证时间：<b>2019-06-27</b></span>
            </el-col>
            <el-col :span="6">
              <span>QQ邮箱：<b>123456789@qq.com</b></span>
            </el-col>
          </el-row>
        </dd>
      </dl>
    </el-card>
    <blockquote class="quote">协议</blockquote>
    <el-card class="box-card" shadow="never" :body-style="{ padding: '0px' }" >
      <dl class="cardinfo">
        <dd style="line-height: 1.8;">
百度提醒您：在使用百度搜索引擎（以下简称百度）前，请您务必仔细阅读并透彻理解本声明。您可以选择不使用百度，但如果您使用百度，您的使用行为将被视为对本声明全部内容的认可。
<br />
鉴于百度以非人工检索方式、根据您键入的关键字自动生成到第三方网页的链接，除百度注明之服务条款外，其他一切因使用百度而可能遭致的意外、疏忽、侵权及其造成的损失（包括因下载被搜索链接到的第三方网站内容而感染电脑病毒），百度对其概不负责，亦不承担任何法律责任。<br />
任何通过使用百度而搜索链接到的第三方网页均系他人制作或提供，您可能从该第三方网页上获得资讯及享用服务，百度对其合法性概不负责，亦不承担任何法律责任。<br />
百度搜索结果根据您键入的关键字自动搜索获得并生成，不代表百度赞成被搜索链接到的第三方网页上的内容或立场。<br />
您应该对使用搜索引擎的结果自行承担风险。百度不做任何形式的保证：不保证搜索结果满足您的要求，不保证搜索服务不中断，不保证搜索结果的安全性、正确性、及时性、合法性。因网络状况、通讯线路、第三方网站等任何原因而导致您不能正常使用百度，百度不承担任何法律责任。<br />
百度尊重并保护所有使用百度用户的个人隐私权，您注册的用户名、电子邮件地址等个人资料，非经您亲自许可或根据相关法律、法规的强制性规定，百度不会主动地泄露给第三方。百度提醒您：您在使用搜索引擎时输入的关键字将不被认为是您的个人隐私资料。<br />
任何网站如果不想被百度收录（即不被搜索到），应该及时向百度反映，或者在其网站页面中根据拒绝蜘蛛协议（Robots Exclusion Protocol）加注拒绝收录的标记，否则，百度将依照惯例视其为可收录网站。<br />
任何单位或个人认为通过百度搜索链接到的第三方网页内容可能涉嫌侵犯其信息网络传播权，应该及时向百度提出书面权利通知，并提供身份证明、权属证明及详细侵权情况证明。百度在收到上述法律文件后，将会依法尽快断开相关链接内容。详情参见特定频道的著作权保护声明。
        </dd>
      </dl>
    </el-card>
  </div>
</template>
<script>
import Spinner from '@/components/spinner'
const MAXHEIGHT = document.documentElement.clientHeight || document.body.clientHeight
const MINHEIGHT = 600
export default {
  components: {
    Spinner
  },
  data () {
    return {
      isMax: false,
      isMin: false,
      height: MINHEIGHT,
      interval: 100,
      dialogVisible: false,
      dialogVisiblePic: false,
      customIndex: 0,
      loading: {
        loaddingMsg: '',
        BASEINFO: false
      }
    }
  },
  filters: {
  },
  computed: {
    idPhone () {
      let picArr = [
        'http://yd-test1.oss-cn-qingdao.aliyuncs.com/yd_user/2019/0409/1554800287733.jpg?Expires=1870160287&OSSAccessKeyId=LTAIEpRneGRu1tKy&Signature=Nlv8VLPNWEcyKUzbx%2FbfJ%2BkRoLY%3D',
        'http://yd-test1.oss-cn-qingdao.aliyuncs.com/yd_user/2019/0708/1562556422593.jpg?Expires=1877916423&OSSAccessKeyId=LTAIEpRneGRu1tKy&Signature=X6i6hLs8JBqGV8NOyaM1QMpBWq4%3D',
        'http://yd-test1.oss-cn-qingdao.aliyuncs.com/yd_user/2019/0628/1561687600095.jpg?Expires=1877047600&OSSAccessKeyId=LTAIEpRneGRu1tKy&Signature=j1%2Bpg3Aka1ngici49AE%2BXoiOTc4%3D'
      ]
      return picArr
    }
  },
  methods: {
    setActive: function (index) {
      this.dialogVisible = true
      // this.customIndex = index
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
    closeDialog () {
      this.height = MINHEIGHT
    }
  },
  beforeMount () {
  }
}
</script>
