<template>
  <transition name="el-fade-in">
    <el-button icon="el-icon-top" type="primary" circle
      v-if="visible"
      @click.stop="handleClick"
      :style="{
        'right': styleRight,
        'bottom': styleBottom
      }"
      class="backTop">
    </el-button>
  </transition>
</template>
<script>
import scroll from '@/views/credit/mixin/scroll'
export default {
  name: 'Backtop',
  mixins: [scroll],
  props: {
    visibilityHeight: {
      type: Number,
      default: 200
    },
    activeTab: [String],
    target: [String],
    right: {
      type: Number,
      default: 0
    },
    bottom: {
      type: Number,
      default: 80
    }
  },
  data () {
    return {
      container: null,
      visible: false
    }
  },
  computed: {
    styleBottom () {
      return `${this.bottom}px`
    },
    styleRight () {
      return `${this.right}px`
    }
  },
  methods: {
    handleClick (e) {
      this.scrollToTop()
      this.$emit('click', e)
    }
  }
}
</script>
