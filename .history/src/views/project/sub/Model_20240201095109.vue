<template>
    <el-container>
      <el-header>模型创建</el-header>
      <el-main>
        <el-form label-position="right" label-width="100px">
          <el-form-item label="模型名称">
            <el-input v-model="modelName"></el-input>
          </el-form-item>
  
          <el-form-item label="模型类型">
            <el-radio-group v-model="modelType">
              <el-radio label="类型A">类型A</el-radio>
              <el-radio label="类型B">类型B</el-radio>
              <el-radio label="类型C">类型C</el-radio>
            </el-radio-group>
          </el-form-item>
  
          <el-form-item label="遍历次数">
            <el-input-number v-model="iterationCount" :min="1"></el-input-number>
          </el-form-item>
  
          <el-form-item label="学习率">
            <el-input-number v-model="learningRate" :min="0" :step="0.01" :max="1"></el-input-number>
          </el-form-item>
  
          <el-form-item>
            <el-button type="primary" @click="submitModel">创建模型</el-button>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
  </template>
  
  <script>
  export default {
    name: 'ModelCreation',
    data() {
      return {
        modelName: '',
        modelType: '',
        iterationCount: 1,
        learningRate: 0.01
      };
    },
    methods: {
      submitModel() {
        console.log("模型名称:", this.modelName);
        console.log("模型类型:", this.modelType);
        console.log("遍历次数:", this.iterationCount);
        console.log("学习率:", this.learningRate);
        // 在这里添加创建模型的逻辑
      }
    }
  };
  </script>
  
  <style scoped>
  .el-header {
    background-color: #b3c0d1;
    color: white;
    text-align: center;
    line-height: 60px;
  }
  </style>
  