<template>
    <div style="width: 1000px;" align="middle">
        <el-container>
            <Breadcrumb :links="links" />
            <el-header>实体识别</el-header>
            <el-main>
                <el-form label-position="top">
                    <el-form-item label="输入文本">
                        <el-input type="textarea" v-model="inputText" placeholder="请输入一段文本..." :rows="5"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="identifyEntities">识别实体</el-button>
                    </el-form-item>
                </el-form>
                <el-divider></el-divider>
                <el-row>
                    <el-col :span="12">
                        <div class="results-section">
                            <h3>实体列表</h3>
                            <el-list border v-for="entity in entities" :key="entity.name">
                                <el-list-item>{{ entity.name }}</el-list-item>
                            </el-list>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="results-section">
                            <h3>实体关系</h3>
                            <el-table :data="relationships" style="width: 100%">
                                <el-table-column prop="source" label="源实体"></el-table-column>
                                <el-table-column prop="relation" label="关系"></el-table-column>
                                <el-table-column prop="target" label="目标实体"></el-table-column>
                                <el-table-column prop="target" label="操作"></el-table-column>
                            </el-table>
                        </div>
                    </el-col>
                </el-row>
            </el-main>
        </el-container>
    </div>
</template>
  
<script>
export default {
    name: 'EntityRecognition',
    data() {
        return {
            links: [
                { path: '/', name: '首页' },
                { path: this.$route.path, name: this.$route.name },
            ],
            inputText: '',
            entities: [],
            relationships: []
        };
    },
    methods: {
        async identifyEntities() {
            // 假设存在一个API端点'/api/recognize'来处理文本并返回实体和关系
            // 以下代码是伪代码，需要替换为实际的API调用
            const response = await this.$http.post('/api/recognize', { text: this.inputText });
            this.entities = response.data.entities;
            this.relationships = response.data.relationships;
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

.results-section {
    margin-top: 20px;
}
</style>
  