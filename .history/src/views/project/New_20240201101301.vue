<template>
  <div align="middle">
    <Breadcrumb :links="links" />
    <el-steps :active="activeStep" finish-status="success" style="width: 1000px;">
      <el-step title="创建项目"></el-step>
      <el-step title="数据中心"></el-step>
      <el-step title="模型中心"></el-step>
      <el-step title="训练"></el-step>
    </el-steps>
    <div align="middle">
      <Create style="width: 700px;" v-show="activeStep==0"></Create>
      <Augmentation v-show="activeStep==1"></Augmentation>
      <Model style="width: 700px;" v-show="activeStep==2"></Model>
      <Train v-show="activeStep==3"></Train>
      <el-button type="primary" v-show="activeStep!=0" @click="goToPreStep">上一步</el-button>
      <el-button type="success" v-show="activeStep!=3" @click="goToNextStep">下一步</el-button>
      <el-button type="success" v-show="activeStep==3" @click="goToNextStep">开始训练</el-button>
    </div>
  </div>
</template>

<script>
import Create from './sub/Create'
import Augmentation from './sub/Augmentation.vue';
import Model from './sub/Model.vue';
import Train from './sub/Train.vue';

export default {
  components: { Create, Augmentation, Model, Train },
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
      this.activeStep  = (this.activeStep + 1) % 4
    }
  },
  created() {
    this.fetchManagers();
  }
};
</script>
<style scoped>
</style>
