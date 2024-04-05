<template>
  <div>
    <!-- 顶部导航栏 -->
    <el-row type="flex" justify="space-between">
      <el-col :span="4">
        <h1>数据处理应用</h1>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="showSettings = true">设置</el-button>
      </el-col>
    </el-row>

    <!-- 数据导入区域 -->
    <el-upload
      class="upload-demo"
      drag
      action="//jsonplaceholder.typicode.com/posts/"
      :on-success="handleSuccess"
      :before-upload="handleBeforeUpload"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">只支持xls/xlsx文件</div>
    </el-upload>

    <!-- 数据扩充操作选择 -->
    <el-switch
      v-model="enableDataEnrichment"
      active-text="启用数据扩充"
    ></el-switch>
    <div v-if="enableDataEnrichment">
      <el-checkbox v-model="wordReplacement">词汇替换</el-checkbox>
      <el-checkbox v-model="noiseInjection">噪声注入</el-checkbox>
    </div>

    <!-- 设置弹窗 -->
    <el-dialog
      title="设置"
      :visible.sync="showSettings"
      width="30%"
    >
      <div>这里可以放置一些设置选项。</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showSettings = false">取 消</el-button>
        <el-button type="primary" @click="showSettings = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showSettings: false,
      enableDataEnrichment: false,
      wordReplacement: false,
      noiseInjection: false,
    };
  },
  methods: {
    handleBeforeUpload(file) {
      // 这里可以添加文件类型检查
      return true;
    },
    handleSuccess(response, file, fileList) {
      // 文件上传成功后的回调
    },
    startProcessing() {
      // 开始处理数据的逻辑
      console.log("开始处理数据");
    },
  },
};
</script>

<style>
/* 在这里添加您的CSS样式 */
</style>
