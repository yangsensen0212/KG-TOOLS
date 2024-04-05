<template>
    <div class="terminal">
        <el-input type="textarea" v-model="terminalOutput" :rows="8" readonly class="terminal-output"></el-input>
        <el-input v-model="currentCommand" placeholder="输入命令..." @keyup.native.enter="executeCommand" class="command-input"
            autofocus>
            <template slot="prepend">$:</template>
        </el-input>
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
            // 将输入的命令添加到终端输出
            this.terminalOutput += `$: ${this.currentCommand}\n`;

            // 处理命令
            this.processCommand(this.currentCommand);

            // 清空当前命令输入
            this.currentCommand = '';
        },
        processCommand(command) {
            // 基于输入的命令执行相应操作
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

.command-input .el-input-group__prepend {
    background-color: transparent;
    color: #fff;
}
</style>
  