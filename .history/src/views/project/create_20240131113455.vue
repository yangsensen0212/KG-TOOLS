<template>
  <div>
    <Breadcrumb :links="links" />
    <el-steps :active="activeStep" finish-status="success">
      <el-step title="创建项目"></el-step>
      <el-step title="配置管理员"></el-step>
      <el-step title="定义实体"></el-step>
      <el-step title="定义关系"></el-step>
      <el-step title="完成"></el-step>
    </el-steps>
    <el-form ref="projectForm" :model="form" label-width="200px">
      <el-form-item label="项目名称：">
        <!-- 设置输入框长度 -->
        <el-input v-model="form.name" style="width: 400px;"></el-input>
      </el-form-item>
      <el-form-item label="项目管理员：">
        <!-- 设置选择器长度 -->
        <el-select v-model="form.managers" multiple placeholder="请选择" style="width: 400px;">
          <el-option v-for="item in managerOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="实体定义（逗号分隔）：">
        <el-input v-model="form.entityDefinition" type="textarea" style="width: 400px;"></el-input>
      </el-form-item>
      <el-form-item label="关系定义（逗号分隔）：">
        <el-input v-model="form.relationshipDefinition" type="textarea" style="width: 400px;"></el-input>
      </el-form-item>
      <el-form-item label="项目描述：">
        <!-- 增加项目描述的输入框高度 -->
        <el-input v-model="form.description" type="textarea" :rows="5" style="width: 400px;">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">确认</el-button>
        <el-button type="success" @click="goToNextStep">下一步</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
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
