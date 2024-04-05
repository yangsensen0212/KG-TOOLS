<template>
    <div class="terminal">
      <el-input
        type="textarea"
        v-model="terminalOutput"
        :rows="10"
        readonly
        class="terminal-output"
      ></el-input>
      <el-input
        v-model="currentCommand"
        placeholder="输入命令..."
        @keyup.enter="executeCommand"
        class="command-input"
        autofocus
      >
        <template slot="prepend">$:</template>
      </el-input>
    </div>
  </template>
  
  <script>
  // ... 之前的脚本 ...
  </script>
  
  <style scoped>
  /* ... 之前的样式 ... */
  .command-input .el-input-group__prepend {
    background-color: transparent;
    color: #fff;
  }
  </style>
  