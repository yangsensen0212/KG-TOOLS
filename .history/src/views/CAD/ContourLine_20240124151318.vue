<template>
    <div class="upload-extraction-container">
      <el-upload
        class="upload-cad"
        action="your-upload-handler"  <!-- You need to replace this with your actual upload URL -->
        :on-preview="handleFilePreview"
        :on-remove="handleFileRemove"
        :before-upload="beforeFileUpload"
        multiple>
        <el-button size="small" type="primary">上传CAD文件</el-button>
      </el-upload>
  
      <el-tree
        class="layer-selection"
        :data="layerData"
        show-checkbox
        node-key="id"
        ref="layerTree"
        :props="{ label: 'name', children: 'layers' }">
      </el-tree>
  
      <el-button type="primary" @click="startExtraction">开始提取</el-button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        layerData: [
          // 示例数据结构
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
        // 文件上传前的钩子，可以用来校验文件类型等
        this.selectedFile = file;
        return true;
      },
      startExtraction() {
        const checkedNodes = this.$refs.layerTree.getCheckedNodes();
        const selectedLayers = checkedNodes.map(node => node.name);
        console.log('Selected layers:', selectedLayers);
        console.log('Selected file:', this.selectedFile);
        // 在这里调用您的提取算法逻辑，并处理selectedFile和selectedLayers
      }
    }
  };
  </script>
  
  <style>
  .upload-extraction-container {
    margin: 30px;
    text-align: center;
  }
  
  .upload-cad {
    margin-bottom: 20px;
  }
  
  .layer-selection {
    margin-bottom: 20px;
    text-align: left;
  }
  </style>
  