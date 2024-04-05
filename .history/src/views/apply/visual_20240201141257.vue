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
      ></el-input>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        terminalOutput: '',
        currentCommand: '',
      };
    },
    methods: {
      executeCommand() {
        // 在这里添加命令执行的逻辑
        // 示例：简单地将命令回显到终端输出
        this.terminalOutput += `\n> ${this.currentCommand}\n`;
        // 处理命令
        this.processCommand(this.currentCommand);
        // 清空当前命令
        this.currentCommand = '';
      },
      processCommand(command) {
        // 基于输入命令执行相应操作
        // 示例：简单的响应
        switch (command.toLowerCase()) {
          case 'hello':
            this.terminalOutput += "Hello! What can I do for you?\n";
            break;
          default:
            this.terminalOutput += "Unknown command. Try 'hello'.\n";
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .terminal {
    margin-top: 20px;
  }
  .terminal-output {
    margin-bottom: 10px;
    background-color: #000;
    color: #fff;
  }
  .command-input {
    width: 100%;
  }
  </style>
  