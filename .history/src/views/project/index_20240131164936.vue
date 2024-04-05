<template>
  <div>
    <Breadcrumb :links="links" />
    <el-steps :active="activeStep" finish-status="success">
      <el-step title="创建项目"></el-step>
      <el-step title="数据扩充"></el-step>
      <el-step title="模型定义"></el-step>
      <el-step title="训练"></el-step>
      <el-step title="完成"></el-step>
    </el-steps>
    <div align="middle">
      <Create style="width: 700px;"></Create>
      <el-button type="primary" v-show="activeStep!=0 & activeStep!=4" @click="goToPreStep">上一步</el-button>
      <el-button type="success" v-show="activeStep!=4" @click="goToNextStep">下一步</el-button>
    </div>
  </div>
</template>

<script>
import Create from './sub/Create'

export default {
  components: { Create },
  data() {
    return {
      activeStep: 0,
      links: [
        { path: '/', name: '首页' },
        { path: this.$route.path, name: this.$route.meta.name },
      ],
      form: {
        name: '',
        managers: [],
        entityDefinition: '',
        relationshipDefinition: '',
        description: ''
      },
      managerOptions: [] // 假设这个数组是从API获取的管理员列表
    }
  },
  methods: {
    fetchManagers() {
      this.managerOptions = [{ value: '0', label: '超级管理员' }, { value: '1', label: '管理员A' }, { value: '2', label: '管理员B' }];
    },
    goToPreStep() {
      this.activeStep  = this.activeStep - 1
    },
    goToNextStep() {
      this.activeStep  = (this.activeStep + 1) % 5
    }
  },
  created() {
    this.fetchManagers();
  }
};
</script>
<style scoped>
</style>
