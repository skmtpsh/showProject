import getURLApi from '@/api/mixin'
var commonMixin = {
  methods: {
    gotoURL: function (verifyType, verifyStatusLive = 0, verifyStatus = 0) {
      console.log('gotourl', verifyType, verifyStatusLive, verifyStatus)
      const STATUS_SUCESS = '20'
      const STATUS_FAIL = '10'
      const STATUS_REJECT = '21'
      // const STATUS_DOING = '11'
      const STATUS_UNABLE = '12'
      // let gotoURL = ''
      switch (verifyType) {
        case '20':
          this.$router.push({path: '/authentication/status', query: this.$route.query ? this.$route.query : ''})
          break
        case 'statusIdentity': // 身份认证
          let state = '0'
          if (verifyStatus === STATUS_FAIL || verifyStatus === STATUS_REJECT) {
            state = '0'
          }
          if ((verifyStatusLive === STATUS_FAIL && verifyStatus === STATUS_SUCESS) || (verifyStatusLive === STATUS_REJECT && verifyStatus === STATUS_SUCESS)) {
            state = '1'
          }
          if (verifyStatusLive === STATUS_UNABLE && verifyStatus === STATUS_SUCESS) {
            state = '1'
          }
          if (state === '0') {
            this.$route.query.ocrType = 2
            this.$route.query.verifyStatusLive = verifyStatusLive
            this.$router.push({path: '/authentication/identify/setPhoto', query: this.$route.query})
          } else if (state === '1') {
            this.$router.push({path: `/authentication/identify/faceRecognition`, query: this.$route.query ? this.$route.query : ''})
          }
          break
        case 'faceRecognition':
          if (verifyStatusLive === STATUS_SUCESS) {
            this.$router.push({path: '/authentication/status', query: this.$route.query ? this.$route.query : ''})
          } else {
            this.$router.push({path: `/authentication/identify/faceRecognition`, query: this.$route.query ? this.$route.query : ''})
          }
          break
        case 'statusContacts': // 紧急联系人
          this.$router.push({path: '/authentication/emergency', query: this.$route.query})
          break
        case 'statusBasic': // 基本信息
          this.$router.push({path: '/authentication/baseinfo', query: this.$route.query})
          break
        case 'statusBasicOther': // 证件照片
          this.$router.push({path: '/authentication/upload', query: this.$route.query})
          break
        case 'statusCertification': // 实名认证
          this.$router.push({path: '/authentication/identify', query: this.$route.query})
          break
        case 'statusIdentityCertification': // 身份实名认证
          this.$router.push({path: '/authentication/identify/identifyRealName', query: this.$route.query})
          break
        default:
          // this.$vux.loading.show({
          //   text: '数据加载..'
          // })
          getURLApi[verifyType]()
          .then((response) => {
            let res = response.data
            if (res.code === 200) {
              try {
                if (this.$route.query.platform === 'ios') {
                  window.webkit.messageHandlers.setTitle.postMessage(res.datas.verifyName)
                } else {
                  window.javaObj.setTitle(res.datas.verifyName)
                }
              } catch (error) {
                console.log(error)
              }
              window.location.href = res.datas.verifyUrl
            } else {
              this.$vux.toast.text(res.message, 'middle')
            }
          })
          .catch((error) => {
            // this.$vux.loading.hide()
            this.$vux.toast.text(error, 'middle')
          })
          break
      }
    }
  }
}

export default commonMixin
