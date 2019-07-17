<template>
    <div v-transfer-dom>
        <x-dialog :show.sync="show" class="custom_info_tip">
            <div class="content">
                <span class='body'>{{getTip}}</span>
                <x-button class='custom_tip_button' @click.native="goOtherPage" v-if='data.jump'>确定</x-button>
                <x-button class='custom_tip_button' @click.native="tipClear" v-else >确定</x-button>
            </div>
            <!-- <div @click="show=false" class='close_custom_info_tip'>
                <span class="vux-close"></span>
            </div> -->
        </x-dialog>
    </div>
</template>

<script>
import { XDialog, XButton, TransferDomDirective as TransferDom } from 'vux'
export default {
  props: ['data'],
  directives: { TransferDom },
  components: {
    XDialog,
    XButton
  },
  computed: {
    getTip () {
      if (this.data.tip === undefined || this.data.tip === '') {
        this.show = false
      } else {
        this.show = true
      }
      return this.data.tip
    }
  },
  methods: {
    goOtherPage () { // 父组件传入boolean为true的时候，进行跳页，目前跳页只会跳转到集合页
      this.$router.push({path: '/authentication/status', query: this.$route.query ? this.$route.query : ''})
      this.show = false
      this.$emit('close', '')
    },
    tipClear () { // 点击确定关闭提示框，并向父组件emit关闭事件
      this.show = false
      this.$emit('close', '')
    }
  },
  data () {
    return {
      show: false
    }
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/close';
  .custom_info_tip {
    font-family: MicrosoftYaHei;
    .weui-dialog {
      border-radius: 15px!important;
      // overflow: visible;
      box-sizing: border-box;
    .content {
      font-size: 28px;
      letter-spacing: 2px;
      font-family: Arial, Microsoft YaHei, -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif;
      padding: 70px 51px;
      line-height: 46px;
      text-align: left;
      font-weight: 500;
      position: relative;
      .custom_tip_button {
        background: #1d7ffe;
        color: #fff;
        height: 80px;
        margin-top: 70px;
        font-size: 30px;
        // box-shadow: 0 6px 24px 0 #4aaef3;
      }
        span {
        display: block;
                }
    }
    .close_custom_info_tip {
      position: absolute;
      width: 50px;
      background: #fff;
      left: 0;
      right: 0;
      margin: auto;
      line-height: 50px;
      text-align: center;
      border-radius: 50%;
      height: 50px;
      bottom: -160px;
      z-index: inherit;
      span {
        font-size: 30px;
      }
    }
    }
    .dialog-title {
      line-height: 30px;
      color: #666;
    }
    .vux-close {
      margin-top: 8px;
      margin-bottom: 8px;
    }
    }
</style>