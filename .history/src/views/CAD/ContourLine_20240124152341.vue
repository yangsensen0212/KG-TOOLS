<template>
    <div class="container">
      <!-- ...其他代码... -->
  
      <el-row type="flex" justify="center">
        <el-col :span="4">
          <el-button type="success" size="large" @click="startExtraction" icon="el-icon-check">开始提取</el-button>
          <el-button type="info" size="large" @click="showTablePreview" icon="el-icon-document">表格预览</el-button>
          <el-button type="warning" size="large" @click="showChartPreview" icon="el-icon-picture-outline-round">三维预览</el-button>
        </el-col>
      </el-row>
  
      <!-- 表格预览模态框 -->
      <el-dialog title="表格数据预览" :visible.sync="tablePreviewVisible">
        <el-table :data="tableData">
          <el-table-column prop="column1" label="列1"></el-table-column>
          <el-table-column prop="column2" label="列2"></el-table-column>
          <!-- ...其他列... -->
        </el-table>
        <span slot="footer" class="dialog-footer">
          <el-button @click="tablePreviewVisible = false">取 消</el-button>
          <el-button type="primary" @click="exportData">导出数据</el-button>
        </span>
      </el-dialog>
  
      <!-- 三维曲面图预览模态框 -->
      <el-dialog title="三维曲面图预览" :visible.sync="chartPreviewVisible" width="70%">
        <!-- ECharts 组件的容器 -->
        <div ref="echartsContainer" style="width: 100%;height: 400px;"></div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="chartPreviewVisible = false">取 消</el-button>
          <!-- 可以添加导出图表的按钮 -->
        </span>
      </el-dialog>
    </div>
  </template>
  
  <script>
  // 引入 ECharts 主模块
  import * as echarts from 'echarts/core';
  // 引入 ECharts 中的组件、图表和渲染器
  import {
    GridComponent,
    TooltipComponent,
    VisualMapComponent,
  } from 'echarts/components';
  import { SurfaceChart } from 'echarts/charts';
  import { CanvasRenderer } from 'echarts/renderers';
  
  // 注册必须的组件
  echarts.use([GridComponent, TooltipComponent, VisualMapComponent, SurfaceChart, CanvasRenderer]);
  
  export default {
    data() {
      return {
        // ...其他数据...
        tablePreviewVisible: false,
        chartPreviewVisible: false,
        tableData: [
          // 示例表格数据
          { column1: '数据1', column2: '数据2' },
          // ...其他数据...
        ],
        // ...其他数据...
      };
    },
    methods: {
      // ...其他方法...
      showTablePreview() {
        this.tablePreviewVisible = true;
      },
      showChartPreview() {
        this.chartPreviewVisible = true;
        this.$nextTick(() => {
          this.initECharts();
        });
      },
      initECharts() {
        // 初始化 ECharts 图表
        const chart = echarts.init(this.$refs.echartsContainer);
        const option = {
          // ECharts 配置选项
          // ...配置三维曲面图...
        };
        chart.setOption(option);
      },
      exportData() {
        // 导出数据逻辑
        console.log('Exporting data...');
        // 这里可以根据实际情况编写数据导出逻辑
      }
    }
  };
  </script>
  
  <style scoped>
  /* ...现有的样式... */
  .dialog-footer {
    text-align: right;
  }
  </style>
  