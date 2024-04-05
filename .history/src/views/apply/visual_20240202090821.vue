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
        let data = [
            { id: '1', name: '实体1', draggable: true },
            { id: '2', name: '实体2', draggable: true },
            // 更多节点...
        ]
        let links = [
            { source: '1', target: '2', name: '关系1', label: { show: true, formatter: '{c}' } },
            // 更多边...
        ]
        data = graph.nodes.map(node => { id: node.id, name: node.name, draggable: true, category: node.category })
        this.chartOption = {
            tooltip: {},
            legend: [{
                // 提供一个图例，以便识别不同类型的节点
                data: ['类型1', '类型2'] // 根据实际类别调整
            }],
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
                    categories: [
                        { name: '类型1' },
                        { name: '类型2' }
                        // 根据需要添加更多类别
                    ],
                    data: [
                        { id: '1', name: '实体1', draggable: true, category: 0 },
                        { id: '2', name: '实体2', draggable: true, category: 1 },
                        // 更多节点...
                    ],
                    links: [
                        { source: '1', target: '2', name: '关系1', label: { show: true, formatter: '{c}' } },
                        // 更多边...
                    ],
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
  