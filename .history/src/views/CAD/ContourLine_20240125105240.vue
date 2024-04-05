<template>
  <div class="container">
    <el-row type="flex" justify="center" align="middle" class="row-bg">
      <el-col :span="12">
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
      <div class="checkbox-container">
        <el-checkbox-group v-model="selectedLayers">
          <el-checkbox
            v-for="item in layerData"
            :label="item.name"
            :key="item.id">
          </el-checkbox>
        </el-checkbox-group>
      </div>
      <!-- <el-scrollbar style="height: 200px; width: 800px; border: 1px solid #ccc;">
        <el-checkbox-group v-model="selectedLayers">
          <el-checkbox
            v-for="item in layerData"
            :label="item.name"
            :key="item.id">
            {{ item.name }}
          </el-checkbox>
        </el-checkbox-group>
      </el-scrollbar> -->
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :span="12">
        <el-button type="success" size="large" @click="startExtraction" icon="el-icon-check">开始提取</el-button>
        <el-button type="info" size="large" @click="showResultsTable" icon="el-icon-document">预览表格结果</el-button>
        <el-button type="warning" size="large" @click="showResultsChart" icon="el-icon-data-analysis">预览曲面图结果</el-button>
        <el-button type="primary" icon="el-icon-download">导出数据</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedLayers: [],
      layerData: [
        // 示例图层数据
        { id: 1, name: '图层1'},
        { id: 2, name: '图层2'},
        // ...其他图层数据
      ],
      selectedFile: null,
    };
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
    }
  }
};
</script>

<style scoped>
.container {
  padding: 20px;
}
.title {
  font-size: 24px;
  color: #333;
  padding-bottom: 20px;
  text-align: center;
}
.row-bg {
  background-color: #f0f2f5;
  padding: 20px 0;
  border-radius: 10px;
  margin-bottom: 20px;
}
.upload-cad {
  text-align: center;
}
.checkbox-container {
  max-height: 200px; /* 设置最大高度 */
  overflow-y: auto; /* 启用垂直滚动条 */
  border: 1px solid #ccc; /* 可选，为了更好的视觉效果 */
  padding: 10px; /* 可选，内边距 */
}
</style>
