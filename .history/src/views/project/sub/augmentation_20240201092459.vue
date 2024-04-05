<template>
    <el-container>
      <el-header>数据处理界面</el-header>
      <el-main>
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-success="handleUploadSuccess"
          :on-error="handleUploadError"
        >
          <el-button slot="trigger" size="small" type="primary">选择文件</el-button>
          <div slot="tip" class="el-upload__tip">只能上传.csv或.xlsx文件</div>
        </el-upload>
        
        <el-form label-position="right" label-width="100px">
          <el-form-item label="数据扩充">
            <el-switch v-model="isDataAugmentation"></el-switch>
          </el-form-item>
          <el-form-item label="扩充选项" v-if="isDataAugmentation">
            <el-checkbox-group v-model="augmentationOptions">
              <el-checkbox label="词汇替换" name="augmentationOption">词汇替换</el-checkbox>
              <el-checkbox label="噪声注入" name="augmentationOption">噪声注入</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-setting" @click="openSettings"/>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
  </template>
  
  <script>
  export default {
    name: 'DataProcessing',
    data() {
      return {
        isDataAugmentation: false,
        augmentationOptions: []
      };
    },
    methods: {
      handleUploadSuccess(response, file, fileList) {
        console.log("Upload success", response);
      },
      handleUploadError(err, file, fileList) {
        console.error("Upload error", err);
      },
      openSettings() {
        this.$alert('这里可以放入设置对话框的内容', '设置', {
          confirmButtonText: '确定'
        });
      }
    }
  };
  </script>
  
  <style scoped>
  .el-header {
    background-color: #b3c0d1;
    color: white;
    text-align: center;
    line-height: 60px;
  }
  
  .upload-demo .el-upload__tip {
    font-size: 14px;
    color: #999;
  }
  </style>
  