<template>
  <el-container>
    <el-header>
      钻孔柱状图提取
    </el-header>

    <el-main>
      <el-row>
        <el-col :span="12">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>文件上传</span>
            </div>
            <el-upload
              class="upload-demo"
              action="//jsonplaceholder.typicode.com/posts/"
              multiple
              :auto-upload="false"
              :on-change="handleFileChange">
              <el-button size="small" type="primary">选择CAD文件</el-button>
            </el-upload>
          </el-card>
        </el-col>

        <el-col :span="12">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>待抽取列</span>
            </div>
            <el-form>
              <el-form-item v-for="(param, index) in parameters" :key="index">
                <el-input v-model="param.value" placeholder="Enter Parameter"></el-input>
                <el-button type="danger" icon="el-icon-delete" @click="removeParameter(index)"></el-button>
                <el-button type="success" icon="el-icon-plus" @click="addParameter"></el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-button type="primary" @click="processFiles">处理</el-button>
          <el-button type="success" @click="exportData">导出数据</el-button>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>处理结果</span>
            </div>
            <el-table :data="processingResults" style="width: 100%">
              <el-table-column prop="fileName" label="文件名"></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button size="mini" @click="previewResult(scope.row)">预览</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </el-col>
      </el-row>
    </el-main>

    <!-- 预览弹窗 -->
    <el-dialog :visible.sync="previewVisible" width="70%">
      <div v-if="currentPreviewData">
        <h3>原坐标</h3>
        <p>{{ currentPreviewData.coordinatesBefore }}</p>
        <h3>转换后坐标</h3>
        <p>{{ currentPreviewData.coordinatesAfter }}</p>
      </div>
      <el-table :data="currentPreviewData.tableData" style="width: 100%" v-if="currentPreviewData">
        <el-table-column
          v-for="column in currentPreviewData.tableColumns"
          :key="column.prop"
          :prop="column.prop"
          :label="column.label">
        </el-table-column>
      </el-table>
    </el-dialog>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      selectedFiles: [],
      parameters: [{ value: '' }],
      processingResults: [],
      previewVisible: false,
      currentPreviewData: null
    };
  },
  methods: {
    handleFileChange(file, fileList) {
      debugger
      this.selectedFiles = fileList;
    },
    addParameter() {
      this.parameters.push({ value: '' });
    },
    removeParameter(index) {
      if (this.parameters.length > 1) {
        this.parameters.splice(index, 1);
      }
    },
    processFiles() {
      // 模拟处理结果
      this.processingResults = this.selectedFiles.map(file => ({
        fileName: file.name,
        tableData: [
          ["表土",'6.45'],
          ["流砂",8.7],
          ["砂质粘土",12.7],
          ["粘土",17.5],
          ["砂质粘土第四系底界",125],
          ["细粒砂岩",597.9],
          ["泥岩",602.9],
          ["粉砂岩",616.08],
          ["砂泥岩互层",628.13],
          ["...", '...']
          // ["粉砂岩",630.78],
          // ["泥岩",632.73],
          // ["砂泥岩互层",637.14],
          // ["砾岩上侏罗统底界",639.4],
          // "粉砂岩",642.06,
          // "3煤",642.46,
          // "中粒砂岩",645.42,
          // "无芯",651.45,
          // "3下煤",653.9,
          // "粉砂岩山西组底界",665.19,
          // "泥岩",689.3,
          // "石灰岩",697.4,
          // "泥岩",732,
          // "10下煤",733,
          // "泥岩",752.95,
          // "石灰岩",755.56,
          // "无芯",766.5,
          // "15上煤",767.5,
          // "粘土岩",785.22,
          // "石灰岩",787.2,
          // "粉砂岩",803,
          // "石灰岩",808,
          // "16上煤",808.8,
          // "泥岩",821.3,
          // "17煤",822,
          // "粉砂岩",826.8,
          // "18上2煤",827.5,
          // "细粒砂岩",829.1,
          // "泥岩",830.7,
          // "粉细砂岩互层",833.35,
          // "粉细砂岩互层",838.7,
          // "细粒砂岩",841.5
        ], // 这里应放入处理后的表格数据
        tableColumns: [
          {
            prop: "1",
            label: "岩石名称及岩性描述"
          },
          {
            prop: "1",
            label: "累深"
          }
        ], // 这里定义表格的列
        coordinatesBefore: '3920743.83,20489215.77,48.00', // 转换前坐标
        coordinatesAfter: '3216146.1153820716,13639905.770300709,48.0' // 转换后坐标
      }));
      console.log('Processing files:', this.selectedFiles, 'with parameters:', this.parameters);
    },
    previewResult(row) {
      this.currentPreviewData = row;
      this.previewVisible = true;
    },
    exportData() {
      console.log('Exporting data');
    }
  }
};
</script>

<style>
.el-header, .el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-main {
  background-color: white;
  padding: 20px;
}

.box-card {
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
}
</style>
