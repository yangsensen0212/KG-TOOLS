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
                                <el-list-item>{{ entity.type + ":" + entity.name }}</el-list-item><br>
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
                                <el-table-column label="操作">
                                    <template slot-scope="scope">
                                        <el-button size="mini" @click="editRelationship(scope.row)">编辑</el-button>
                                        <el-button size="mini" type="danger"
                                            @click="deleteRelationship(scope.row)">删除</el-button>
                                        <el-button size="mini" type="success"
                                            @click="storeRelationship(scope.row)">入库</el-button>
                                    </template>
                                </el-table-column>
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
            inputText: '10月20日23时许，位于山东郓城的龙郓煤业有限公司发生冲击地压事故，造成22人被困。事故发生后，当地政府立即启动应急预案，山东省内多支矿山救护队、消防救援队伍共170余人赶到现场，全力救援。山东省委省政府主要负责人抵达救援现场',
            entities: [{
                name: "10月20日23",
                type: "时间"
            }, {
                name: "山东郓城",
                type: '城市'
            }, {
                name: "龙郓煤业",
                type: '矿山'
            }, {
                name: "冲击地压事故",
                type: '事故'
            }],
            relationships: [{

            }]
        };
    },
    methods: {
        async identifyEntities() {
            // 假设存在一个API端点'/api/recognize'来处理文本并返回实体和关系
            // 以下代码是伪代码，需要替换为实际的API调用
            const response = await this.$http.post('/api/recognize', { text: this.inputText });
            this.entities = response.data.entities;
            this.relationships = response.data.relationships;
        },
        editRelationship(row) {
            console.log("编辑关系", row);
            // 在这里添加编辑逻辑
        },
        deleteRelationship(row) {
            console.log("删除关系", row);
            // 在这里添加删除逻辑
        },
        storeRelationship(row) {
            console.log("入库", row);
            // 在这里添加入库逻辑
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
  