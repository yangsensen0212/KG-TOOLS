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
      <Create style="width: 500px;"></Create>
      <el-button type="primary" @click="submitForm">上一步</el-button>
      <el-button type="success" @click="goToNextStep">下一步</el-button>
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
      // 这里是获取项目管理员列表的示例逻辑
      this.managerOptions = [{ value: '0', label: '超级管理员' }, { value: '1', label: '管理员A' }, { value: '2', label: '管理员B' }];
    },
    submitForm() {
      // 表单提交逻辑
      alert('表单已提交，查看控制台输出');
      console.log(this.form);
    },
    goToNextStep() {
      // 在这里实现“下一步”的逻辑
      console.log('执行下一步操作');
      // 例如保存当前表单状态，然后导航到另一个视图或步骤
    }
  },
  created() {
    this.fetchManagers();
  }
};
</script>
<style scoped>
</style>
