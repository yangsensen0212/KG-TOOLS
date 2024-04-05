<template>
    <div class="container">
      <el-row type="flex" justify="center" align="middle" class="row-bg">
        <el-col :span="24">
          <div class="title">CAD文件等高线提取</div>
          <el-upload
            class="upload-cad"
            :on-preview="handleFilePreview"
            :on-remove="handleFileRemove"
            :before-upload="beforeFileUpload"
            :auto-upload="false"
            list-type="picture"
            multiple>
            <el-button size="large" type="primary" icon="el-icon-upload2">上传CAD文件</el-button>
          </el-upload>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="12">
          <el-tree
            class="layer-tree"
            :data="layerData"
            show-checkbox
            node-key="id"
            ref="layerTree"
            :props="{ label: 'name', children: 'layers' }">
          </el-tree>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="8">
          <el-button type="success" size="large" @click="startExtraction" icon="el-icon-check">开始提取</el-button>
          <el-button type="info" size="large" @click="showResultsTable" icon="el-icon-document">预览表格结果</el-button>
          <el-button type="warning" size="large" @click="showResultsChart" icon="el-icon-data-analysis">预览曲面图结果</el-button>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="24">
          <div :visible.sync="tableDialogVisible" title="表格预览" width="70%">
            <el-table :data="tableData" style="width: 100%">
              <el-table-column v-for="col in tableColumns" :key="col.prop" :prop="col.prop" :label="col.label"></el-table-column>
            </el-table>
          </div>
          <el-dialog :visible.sync="chartDialogVisible" title="曲面图预览" width="70%">
            <div ref="chartContainer" style="height: 400px;"></div>
          </el-dialog>
        </el-col>
      </el-row>
    </div>
  </template>
  
  <script>
  import * as echarts from 'echarts/core';
  import { Grid3DComponent } from 'echarts-gl/components';
  import { TooltipComponent, LegendComponent } from 'echarts/components';
  import { CanvasRenderer } from 'echarts/renderers';
  
  echarts.use([Grid3DComponent, TooltipComponent, LegendComponent, CanvasRenderer]);
  
  export default {
    data() {
      return {
        layerData: [
          // 示例图层数据
          { id: 1, name: '图层1', layers: [{ id: 2, name: '子图层1' }] },
          // ...其他图层数据
        ],
        selectedFile: null,
        tableData: [], // 表格数据
        tableColumns: [], // 表格列定义
        tableDialogVisible: false, // 表格预览对话框是否可见
        chartDialogVisible: false, // 曲面图预览对话框是否可见
      };
    },
    mounted() {
      // 初始化echarts实例
      this.chart = echarts.init(this.$refs.chartContainer);
    },
    methods: {
      handleFilePreview(file) {
        // 文件预览逻辑
        console.log('Preview file', file);
      },
      handleFileRemove(file, fileList) {
        // 文件移除逻辑
        console.log('Remove file', file);
      },
      beforeFileUpload(file) {
        // 文件上传前的钩子
        this.selectedFile = file;
        return true;
      },
      startExtraction() {
      const checkedNodes = this.$refs.layerTree.getCheckedNodes();
      const selectedLayers = checkedNodes.map(node => node.name);
      console.log('Selected layers:', selectedLayers);
      console.log('Selected file:', this.selectedFile);
      // 这里添加您自定义的提取算法逻辑
      // 假设这将填充tableData和tableColumns用于表格预览
      // 以及生成一个数据对象用于曲面图绘制
    },
    showResultsTable() {
      this.tableDialogVisible = true;
      // 填充tableData和tableColumns用于表格预览
      // 示例数据结构
      this.tableData = [{ /* ... */ }];
      this.tableColumns = [{ prop: 'col1', label: '列1' }, { prop: 'col2', label: '列2' }];
      // 实际中，应从提取算法的结果动态生成
    },
    showResultsChart() {
      this.chartDialogVisible = true;
      // 从提取算法的结果生成三维曲面图的数据
      // 假设我们有一个名为generateSurfaceData的方法
      const surfaceData = this.generateSurfaceData();
      // 使用ECharts GL绘制三维曲面图
      this.chart.setOption({
        tooltip: {},
        visualMap: {
          show: false,
          dimension: 2,
          min: -5,
          max: 5,
          inRange: {
            color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
          }
        },
        xAxis3D: {},
        yAxis3D: {},
        zAxis3D: {},
        grid3D: {},
        series: [{
          type: 'surface',
          wireframe: {
            // 是否显示网格线
          },
          data: surfaceData
        }]
      });
    },
    generateSurfaceData() {
      // 此处应根据您的算法生成用于曲面图的数据
      // 返回格式应该符合ECharts的数据格式要求
      // 下面是一个示例结构
      return [
        /* 
        [x, y, z], 
        [x, y, z], 
        ...
        */
      ];
    },
  }
};
</script>

<style scoped>
/* ...您之前的样式... */
.el-dialog__body {
  overflow: hidden; /* 防止内容溢出 */
}
</style>
