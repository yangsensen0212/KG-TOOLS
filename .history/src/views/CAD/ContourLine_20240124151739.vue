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
        <el-col :span="4">
          <el-button type="success" size="large" @click="startExtraction" icon="el-icon-check">开始提取</el-button>
        </el-col>
      </el-row>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        layerData: [
          // 示例图层数据
          { id: 1, name: '图层1', layers: [{ id: 2, name: '子图层1' }] },
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
  .layer-tree {
    background-color: #fff;
    border-radius: 5px;
    padding: 10px;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
  }
  </style>
  