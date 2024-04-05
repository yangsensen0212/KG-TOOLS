<template>
    <el-form ref="projectForm" :model="form" label-width="120px">
      <el-form-item label="项目名称：">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="项目管理员：">
        <el-select v-model="form.managers" multiple placeholder="请选择">
          <el-option
            v-for="item in managerOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="实体定义：">
        <el-input v-model="form.entityDefinition" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="关系定义：">
        <el-input v-model="form.relationshipDefinition" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="项目描述：">
        <el-input v-model="form.description" type="textarea"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">确认</el-button>
      </el-form-item>
    </el-form>
  </template>
  
  <script>
  // 若使用vue-quill-editor，请确保先进行安装：npm install vue-quill-editor
  import { QuillEditor } from 'vue-quill-editor'
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  
  export default {
    components: {
      QuillEditor,
    },
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
      submitForm() {
        console.log('项目数据：', this.form);
        // 在这里可以进行表单提交的操作，例如使用axios发送数据到后端API
      }
    },
    created() {
      // 假设fetchManagers是一个获取项目管理员列表的方法
      this.fetchManagers();
    },
    methods: {
      fetchManagers() {
        // 这里是伪代码，用于展示如何从API获取数据
        // 假设我们从API获取到的数据格式为 [{value: '1', label: '管理员A'}, {value: '2', label: '管理员B'}]
        this.managerOptions = [{ value: '1', label: '管理员A' }, { value: '2', label: '管理员B' }];
      },
      submitForm() {
        // 在这里实现表单提交逻辑
        alert('表单已提交，查看控制台输出');
        console.log(this.form);
      }
    }
  };
  </script>
  