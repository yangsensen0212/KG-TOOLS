<template>
  <el-container>
    <el-header>
      <h1>钻孔柱状图提取</h1>
    </el-header>

    <el-main>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>File Upload</span>
        </div>
        <el-upload
          class="upload-demo"
          action="//jsonplaceholder.typicode.com/posts/"
          multiple
          :on-change="handleFileChange">
          <el-button size="small" type="primary">Select CAD Files</el-button>
        </el-upload>
      </el-card>

      <el-card class="box-card" style="margin-top: 20px;">
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
    </el-main>

    <el-footer>
      <el-button type="primary" @click="processFiles">Process</el-button>
      <el-button type="success" @click="exportData">Export Data</el-button>
    </el-footer>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      selectedFiles: [],
      parameters: [{ value: '' }]
    };
  },
  methods: {
    handleFileChange(file, fileList) {
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
      console.log('Processing files:', this.selectedFiles, 'with parameters:', this.parameters);
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
