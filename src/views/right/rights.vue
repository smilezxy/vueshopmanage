<template>
  <div class="rights">
    <el-row>
      <el-col :span="24">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>用户管理</el-breadcrumb-item>
          <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
      <el-table v-loading="loading" :data="rightList" style="width: 100%" class="margin-20">
        <el-table-column  type="index"  width="50">
        </el-table-column>
        <el-table-column prop="email" label="权限名称" width="180">
        </el-table-column>
        <el-table-column prop="mobile" label="路径">
        </el-table-column>
        <el-table-column prop="mobile" label="层级">
        </el-table-column>
      </el-table>
  </div>
</template>
<script>
export default {
  data () {
    return {
      loading: true,
      rightList: []
    }
  }
}
</script>
<style lang="sass" scoped>
</style>
