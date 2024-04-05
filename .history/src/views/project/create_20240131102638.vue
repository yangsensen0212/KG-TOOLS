<template>
  <el-form ref="projectForm" :model="form" label-width="200px">
    <el-form-item label="项目名称：">
      <!-- 设置输入框长度 -->
      <el-input v-model="form.name" style="width: 400px;"></el-input>
    </el-form-item>
    <el-form-item label="项目管理员：">
      <!-- 设置选择器长度 -->
      <el-select v-model="form.managers" multiple placeholder="请选择" style="width: 400px;">
        <el-option
          v-for="item in managerOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
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
      <el-input 
        v-model="form.description" 
        type="textarea" 
        :rows="5"
        style="width: 400px;">
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm">确认</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
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
      this.managerOptions = [{ value: '1', label: '超级管理员' }, { value: '1', label: '管理员A' }, { value: '2', label: '管理员B' }];
    },
    submitForm() {
      // 表单提交逻辑
      alert('表单已提交，查看控制台输出');
      console.log(this.form);
    }
  },
  created() {
    this.fetchManagers();
  }
};
</script>
