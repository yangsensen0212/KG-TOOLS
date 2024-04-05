<template>
  <el-container>
    <el-header>
      <h1>Upload and Process CAD Files</h1>
    </el-header>

    <el-main>
      <el-upload
        class="upload-demo"
        action="//jsonplaceholder.typicode.com/posts/"
        multiple
        :on-change="handleFileChange">
        <el-button size="small" type="primary">Select CAD Files</el-button>
      </el-upload>
      <el-input 
        v-model="parameters" 
        placeholder="Enter Parameters"
        class="input-with-select">
        <el-button slot="append" icon="el-icon-search" @click="processFiles"></el-button>
      </el-input>
    </el-main>

    <el-footer>
      <el-button type="primary" @click="exportData">Export Data</el-button>
    </el-footer>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      selectedFiles: [],
      parameters: ''
    };
  },
  methods: {
    handleFileChange(file, fileList) {
      this.selectedFiles = fileList;
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
  text-align: center;
  padding: 20px;
}
</style>
