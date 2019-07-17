import Spinner from '@/components/spinner'
import fiskApi from '@/api/credit/fisk'
import axios from 'axios'
export default {
  components: {
    Spinner
  },
  data () {
    return {
      loading: {
        loaddingMsg: '',
        FISK_ALL: false
      }
    }
  },
  methods: {
    getRefresh (type) {
      this.loading[type] = true
      fiskApi[type](this.singleParams || this.params)
        .then((response) => {
          this.loading[type] = false
          if (response.data.code === 200 && response.data.datas) {
            this.fiskData[type] = response.data.datas
          }
          if (type === 'FISK_ZHENGXIN') {
            // 统计征信次数
            this.staticZx()
          }
        })
        .catch((error) => {
          this.loading[type] = false
          console.log(error)
        })
    },
    handleRefresh (type) {
      // this.params.isForce = true
      this.singleParams = Object.assign({}, this.params)
      this.singleParams.isForce = true
      this.getRefresh(type)
    },
    initRequest (addAllRequest = []) {
      // Loading
      // Define Params
      let querys = this.$route.query
      if (!querys) { // Object.keys(querys).length
        this.$message({
          message: '参数不正确',
          type: 'warning'
        })
      }
      this.params = querys
      let addReqArrFun = addAllRequest.map((item) => {
        return fiskApi[item](this.params)
      })
      this.loading['FISK_ALL'] = true
      axios.all([...addReqArrFun])
        .then(axios.spread((...allResonse) => {
          this.loading['FISK_ALL'] = false
          // set data
          for (let [i, item] of new Map(allResonse.map((item, i) => [i, item]))) {
            if (item.data.code === 200 && item.data.datas) {
              this.$set(this.fiskData, addAllRequest[i], item.data.datas)
            } else {
              console.log('interator:' + addAllRequest[i] + ' msg:' + item.data.message)
            }
          }
          // 统计征信次数
          this.staticZx && this.staticZx()
        })).catch((error) => {
          this.loading['FISK_ALL'] = false
          console.log(error)
        })
    }
  }
}
