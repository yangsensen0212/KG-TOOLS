<template>
    <div>
      <el-input
        v-model="cypherQuery"
        placeholder="输入Cypher查询"
        class="query-input"
      ></el-input>
      <el-button @click="executeQuery">查询</el-button>
      <div id="cy" style="width: 800px; height: 600px;"></div>
    </div>
  </template>
  
  <script>
  
  export default {
    data() {
      return {
      };
    },
    methods: {
    }
  };
  </script>
  
  <style scoped>
  .query-input {
    margin-bottom: 20px;
  }
  </style>
  