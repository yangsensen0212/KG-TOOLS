<template>
    <div class="container">
      <el-row type="flex" justify="center" align="middle" class="row-bg">
        <el-col :span="24">
          <div class="title">CAD文件等高线提取</div>
          <el-upload
            class="upload-cad"
            action="your-upload-handler" <!-- 替换为您的文件上传处理URL -->
            :on-preview="handleFilePreview"
            :on-remove="handleFileRemove"
            :before-upload="beforeFileUpload"
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
          <el-dialog :visible.sync="tableDialogVisible" title="表格预览" width="70%">
            <el-table :data="tableData" style="width: 100%">
              <el-table-column v-for="col in tableColumns" :key="col.prop" :prop="col.prop" :label="col.label"></el-table-column>
            </el-table>
          </el-dialog>
          <el-dialog :visible.sync="chartDialogVisible" title="曲面图预览" width="70%">
            <div ref="chartContainer" style="height: 400px;"></div>
          </el-dialog>
        </el-col>
      </el-row>
    </div>
  </template>
  
  <script>
  import * as echarts from 'echarts/core';
  import { Grid3DComponent, SurfaceSeries } from 'echarts-gl';
  import { TooltipComponent, LegendComponent } from 'echarts/components';
  import { CanvasRenderer } from 'echarts/renderers';
  
  echarts.use([Grid3DComponent, SurfaceSeries, TooltipComponent, LegendComponent, CanvasRenderer]);
  
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
        const checkedNodes
  