<template>
  <el-container>
    <el-header>参数确认，无误后开始训练</el-header>
    <el-main>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-card>
            <div slot="header" class="clearfix">
              <span>项目基本信息</span>
            </div>
            <div><b>项目名称：</b>{{ projectDetails.name }}</div>
            <div><b>项目管理员：</b>{{ projectDetails.admin }}</div>
            <div><b>项目描述：</b>{{ projectDetails.description }}</div>
          </el-card>
        </el-col>

        <el-col :span="12">
          <el-card>
            <div slot="header" class="clearfix">
              <span>实体与关系</span>
            </div>
            <div><b>实体：</b>{{ projectDetails.entities }}</div>
            <div><b>实体关系：</b>{{ projectDetails.relationships }}</div>
          </el-card>
        </el-col>

        <el-col :span="24">
          <el-card>
            <div slot="header" class="clearfix">
              <span>模型信息</span>
            </div>
            <div><b>模型名称：</b>{{ projectDetails.modelName }}</div>
            <div><b>模型类型：</b>{{ projectDetails.modelType }}</div>
            <div><b>遍历次数：</b>{{ projectDetails.iterationCount }}</div>
            <div><b>学习率：</b>{{ projectDetails.learningRate }}</div>
          </el-card>
        </el-col>

        <el-col :span="24">
          <el-card>
            <div slot="header" class="clearfix">
              <span>数据集</span>
            </div>
            <div><b>数据集名称：</b>{{ projectDetails.dataset }}</div>
          </el-card>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>
  
<script>
export default {
  name: 'ProjectDisplay',
  data() {
    return {
      projectDetails: {
        name: 'ALBERT-BiLSTM-Att-CRF的矿山实体关系抽取',
        admin: '超级管理员',
        description: '基于ALBERT-BiLSTM-Att-CRF的矿山实体关系抽取方法研究 ...',
        entities: ['事故', '时间', '矿山', '位置', '城市', '伤亡'],
        relationships: {
          '发生时间': ['事故', '时间'], '矿山城市': ['矿山', '城市'], '事故位置': ['事故', '位置'],
          '事故伤亡': ['事故', '伤亡'], '事故矿山': ['事故', '矿山'], '位于': ['位置', '伤亡']
        },
        dataset: '数据集名称',
        modelName: '模型名称',
        modelType: '模型类型',
        iterationCount: 10,
        learningRate: 0.01
      }
    };
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
</style>
  