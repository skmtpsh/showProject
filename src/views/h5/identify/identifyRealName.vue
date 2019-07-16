<template>
 <div class='realName'>
  <div class="dangercenter">
   必须使用本人身份证，身份证将联网公安部门认证
  </div>
  <div class='firstSpace'></div>
  <section class='uploadUnit' v-if='picFront'>
    <div class='uploadPic'>
     <takePhoto :data='frontImg' @getImg='getImg'></takePhoto>
    </div>
    <div class='picText'>
      <span class='picTextTitle'>身份证人像面</span>
      <p class='picTextContent'>拍摄时请确保字体清晰亮度均匀，边框完整。</p>
    </div>
  </section>
    <section class='uploadUnit' v-if='picBack'>
    <div class='uploadPic'>
     <takePhoto :data='backImg' @getImg='getImg'></takePhoto>
    </div>
    <div class='picText'>
      <span class='picTextTitle'>身份证国徽面</span>
      <p class='picTextContent'>拍摄时请确保字体清晰亮度均匀，边框完整。</p>
    </div>
  </section>
      <section class='uploadUnit' v-if='picHand'>
    <div class='uploadPic'>
     <takePhoto :data='handImg' @getImg='getImg'></takePhoto>
    </div>
    <div class='picText'>
      <span class='picTextTitle'>手持身份证</span>
      <p class='picTextContent'>拍摄时请确保字体清晰亮度均匀，边框完整。</p>
    </div>
  </section>
  <group class='group'>
   <x-input v-if='inputName' title="真实姓名" placeholder="请输入姓名" v-model="userName" :show-clear="false" text-align="left" @on-blur='testReg("name")' @on-focus='inputFocus' @on-enter='testReg'></x-input>
   <x-input v-if='inputIdentify' title="身份证号" placeholder="请输入身份证号码" :max='18' type="text" v-model="userCard" :show-clear="false" text-align="left" @on-blur='testReg("idCard")' @on-focus='inputFocus' @on-enter='testReg("name")'></x-input>
  </group>
  <box class="marg">
   <!-- <x-button type="primary" @click.native="submit" class='group' :disabled ='buttonIfShow'>提交</x-button> -->
      <x-button type="primary" @click.native="submit" class='group' >提交</x-button>
  </box>
  <footer class='infoMessage'>
   <i class='blueicon'></i><span>信息仅用于身份验证</span>
  </footer>
 </div>
</template>

<script>
import {Group, XButton, Box} from 'vux'
import takePhoto from '@/views/identify/realTakePhote.vue'
import indexApi from '@/api/index'
import myMixin from '@/views/mixin'
export default {
  mixins: [myMixin],
  data () {
    return {
      frontPicUrl: '',
      backPicUrl: '',
      handPicUrl: '',
      userName: '',
      userCard: '',
      frontGet: false,
      backGet: false,
      handGet: false,
      picFront: false,
      picBack: false,
      picHand: false,
      inputName: false,
      inputIdentify: false,
      frontImg: {
        src: require(`@/asset/realName_front.png`),
        type: 'front'
      },
      backImg: {
        src: require(`@/asset/realName_back.png`),
        type: 'back'
      },
      handImg: {
        src: require(`@/asset/realName_hand.png`),
        type: 'hand'
      }
    }
  },
  // computed: {
  //   buttonIfShow () {
  //     if (this.userName === '') {
  //       return true
  //     } else if (this.userCard === '') {
  //       return true
  //     } else if (this.frontGet === false) {
  //       return true
  //     } else if (this.backGet === false) {
  //       return true
  //     } else if (this.handGet === false) {
  //       return true
  //     }
  //     return false
  //   }
  // },
  mounted () {
    this.picFront = this.$route.query.picFront ? this.$route.query.picFront : false
    this.picBack = this.$route.query.picBack ? this.$route.query.picBack : false
    this.picHand = this.$route.query.picHand ? this.$route.query.picHand : false
    this.inputName = this.$route.query.inputName ? this.$route.query.inputName : false
    this.inputIdentify = this.$route.query.inputIdentify ? this.$route.query.inputIdentify : false
  },
  methods: {
    getImg (res, type) {
      if (type === 'front') {
        this.frontPicUrl = res
        this.frontGet = true
      } else if (type === 'back') {
        this.backPicUrl = res
        this.backGet = true
      } else if (type === 'hand') {
        this.handPicUrl = res
        this.handGet = true
      }
    },
    inputFocus () {
      if (this.$route.query.platform === 'ios' && this.interval) {
        clearInterval(this.interval)
      }
    },
    testReg (type) {
      if (this.$route.query.platform === 'ios') {
        this.interval = setTimeout(() => {
          this.scrollToEnd()
        }, 500)
      }
      let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
      let regcard = /^[\u4E00-\u9FA5]+$/
      if (type === 'name') {
        if (!regcard.test(this.userName)) {
          this.$vux.toast.text('填写正确姓名格式', 'middle')
          return false
        }
      } else if (type === 'idCard') {
        if (!reg.test(this.userCard)) {
          this.$vux.toast.text('填写正确身份证号格式', 'middle')
          return false
        }
      }
    },
    scrollToEnd () {
      document.body.scrollTop = document.body.scrollHeight
    },
    submit () {
      if (this.frontGet === false && this.picFront === true) {
        this.$vux.toast.text('请拍摄身份证人面像', 'middle')
        return false
      }
      if (this.backGet === false && this.picBack === true) {
        this.$vux.toast.text('请拍摄身份证国徽像', 'middle')
        return false
      }
      if (this.handGet === false && this.picHand === true) {
        this.$vux.toast.text('请拍摄手持身份证照片', 'middle')
        return false
      }
      let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
      let regcard = /^[\u4E00-\u9FA5]+$/
      if (this.userName === '' && this.inputName === true) {
        this.$vux.toast.text('姓名不能为空', 'middle')
        return false
      }
      if (this.userCard === '' && this.inputIdentify === true) {
        this.$vux.toast.text('身份证号不能为空', 'middle')
        return false
      }
      if (this.inputName === true && !regcard.test(this.userName)) {
        this.$vux.toast.text('填写正确姓名格式', 'middle')
        return false
      }
      if (this.inputIdentify === true && !reg.test(this.userCard)) {
        this.$vux.toast.text('填写正确身份证号格式', 'middle')
        return false
      }
      this.$vux.loading.show({
        text: '数据加载..'
      })
      indexApi.verifyIdentityCertification({
        name: this.userName,
        number: this.userCard,
        idcardPicture1: this.frontPicUrl,
        idcardPicture2: this.backPicUrl,
        idcardPicture3: this.handPicUrl
      }).then((response) => {
        this.$vux.loading.hide()
        let res = response.data
        if (res.code === 200) {
          this.gotoURL(res.datas.verifyTypeName, res.datas.verifyStatusLive, res.datas.verifyStatus)
          // this.gotoURL('faceRecognition', this.$route.query.verifyStatusLive, '20')
          // this.$router.push({ path: `/authentication/identify/faceRecognition`, query: this.$route.query ? this.$route.query : ''})
        } else {
          if (res.code === 400126) {
            window.validateErrorConfrim(res.message, true)
          } else {
            window.validateErrorConfrim(res.message, false)
          }
        }
      }).catch((error) => {
        console.log(error)
        this.$vux.loading.hide()
        this.$vux.toast.text(error, 'middle')
      })
    }
  },
  watch: {

  },
  beforeCreate () {
    document.getElementsByTagName('body')[0].className = 'card'
  },
  components: {
    Group,
    XButton,
    Box,
    takePhoto
  }
}
</script>

<style lang='less'>
@import url('../../style/variable');
.realName {
 background:#fff;
//  padding:0 32px 0 32px;
.firstSpace{
    margin-top:21px!important;
}
.uploadUnit{
height:299px;
width:742px;
margin:-10px auto 0;
// background:url('../../asset/real_unit.png');
background:url('../../asset/real_border.png');
background-size:742px 299px;
background-repeat:no-repeat;
position:relative;
 .uploadPic{
position:absolute;
left:381px;
top:47px;

 }
 .picText{
  .picTextTitle{
  position:absolute;
  top:60px;
  left:54px;
  font-size:32px;
  color:#333;
  letter-spacing: 0px;
  }
  .picTextContent{
  width:245px;
  position:absolute;
  top:130px;
  left:54px;
  font-size:24px;
  color:#999;
  letter-spacing: 0px;
  }
 }
}

.infoMessage {
  .font-dpr(22px);
  position: relative;
  text-align: center;
  font-weight: 500;
  color: rgba(153, 153, 153, 1);
  padding: 91px 0 0 0;
  vertical-align: middle;
  span {
    display: inlie-block;
    margin-left: 9px;
  }
}
 .weui-cell {
  padding: 0.4rem 0.4rem !important;
   .font-dpr(30px);
  font-family: PingFang-SC-Medium;
  line-height: 36px;
  letter-spacing: 10;
 }
 .weui-label {
  letter-spacing: 10;
 }
.weui-cells:before{
  border-top: none!important;
}
.weui-cell{
  height:105px;
   padding:0px!important;
   border-bottom:1px solid #e1e4eb;/*no*/
    .font-dpr(30px);
}
.weui-cell:before{
  border-top:none!important;
}
.weui-input{
   .font-dpr(30px);
   	color: #333;
}
 input::-webkit-input-placeholder {
    color:  #adadad;      
    .font-dpr(30px);
      line-height: 36px;
    // text-align: right;
    }
.group{
// margin:20px auto;
margin:auto;
width:603px;
}
.marg{
  margin-top:64px;
}
}
</style>