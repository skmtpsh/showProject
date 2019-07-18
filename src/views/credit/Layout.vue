<template>
  <div class="appLayout">
    <Subhead />
    <div class="mainWrapper">
      <el-scrollbar class="page-component" id="pagescoll">
        <!-- <Sidebar /> -->
        <MainApp />
      </el-scrollbar>
    </div>
  </div>
</template>
<script>
import MainApp from './components/MainApp'
import Subhead from './components/Subhead'
export default {
  name: 'Layout',
  components: {
    MainApp,
    Subhead
  }
}
</script>
<style lang="scss">
  @import '@/styles/credit/index.scss';
</style>
