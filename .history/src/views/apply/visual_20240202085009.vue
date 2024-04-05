<template>
    <div>
        <div class="terminal">
            <el-input type="textarea" v-model="terminalOutput" :rows="8" readonly class="terminal-output"></el-input>
            <el-input v-model="currentCommand" placeholder="输入命令..." @keyup.native.enter="executeCommand"
                class="command-input" autofocus>
                <template slot="prepend">$:</template>
            </el-input>
        </div>
        <div style="height: 600px; width: 100%;">
            <ChartView :option="chartOption"></ChartView>
        </div>
    </div>
</template>
  
<script>
import ChartView from '@/components/ChartView';
import graph from './data/接口数据.json'

export default {
    components: {
        ChartView
    },
    data() {
        return {
            terminalOutput: '',
            currentCommand: '',
            chartOption: {}
        };
    },
    created() {
        letdata = [
            { name: '实体1', draggable: true },
            { name: '实体2', draggable: true },
            // 添加更多实体
        ]
        links = [
            {
                source: '实体1', target: '实体2', name: '关系1', label: {
                    show: true,
                    formatter: '{c}' // 这里的 '{c}' 会被替换为边的 'name' 属性
                }
            },
            // 添加更多关系
        ]
        this.chartOption = {
            tooltip: {},
            animationDurationUpdate: 1500,
            animationEasingUpdate: 'quinticInOut',
            series: [
                {
                    type: 'graph',
                    layout: 'force',
                    symbolSize: 50,
                    roam: true,
                    edgeSymbol: ['circle', 'arrow'],
                    edgeSymbolSize: [4, 10],
                    edgeLabel: {
                        fontSize: 20
                    },
                    force: {
                        repulsion: 2500,
                        edgeLength: [10, 500]
                    },
                    draggable: true,
                    data: data,
                    links: links,
                    label: {
                        show: true,
                        formatter: '{b}'
                    },
                    lineStyle: {
                        opacity: 0.9,
                        width: 2,
                        curveness: 0
                    }
                }
            ]
        }
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
            console.log(graph)
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
  