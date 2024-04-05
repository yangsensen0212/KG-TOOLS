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
    <el-row type="flex" justify="center">
      <el-col :span="10">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column v-for="col in tableColumns" :key="col.prop" :prop="col.prop" :label="col.label"></el-table-column>
        </el-table>
      </el-col>
      <el-col :span="14">
        <ChartView></ChartView>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ChartView from '@/components/ChartView';
export default {
  components: {
    ChartView
  },
  data() {
    return {
      selectedLayers: [],
      layerData:[{'id': 0, 'name': '0'}, {'id': 1, 'name': '井田边界拐点'}, {'id': 2, 'name': '地面塌陷积水区'}, {'id': 3, 'name': '地销煤路'}, {'id': 4, 'name': '巷道涌水点'}, {'id': 5, 'name': '回采工作面涌水点'}, {'id': 6, 'name': '溜煤眼'}, {'id': 7, 'name': '储煤仓'}, {'id': 8, 'name': '通风孔'}, {'id': 9, 'name': '无属性孔'}, {'id': 10, 'name': '电缆孔'}, {'id': 11, 'name': '致裂孔'}, {'id': 12, 'name': '溜煤眼标高'}, {'id': 13, 'name': '储煤仓标高'}, {'id': 14, 'name': '通风孔标高'}, {'id': 15, 'name': '电缆孔标高'}, {'id': 16, 'name': '钻孔'}, {'id': 17, 'name': '钻孔名称'}, {'id': 18, 'name': '钻孔注记'}, {'id': 19, 'name': '井下钻孔'}, {'id': 20, 'name': '地面启封孔'}, {'id': 21, 'name': '井下启封孔'}, {'id': 22, 'name': '两带孔'}, {'id': 23, 'name': '新补水文长观孔'}, {'id': 24, 'name': '3下钻孔注记'}, {'id': 25, 'name': '2煤钻孔注记'}, {'id': 26, 'name': '巷道变坡点'}, {'id': 27, 'name': '井筒'}, {'id': 28, 'name': '加固区域'}, {'id': 29, 'name': '2煤煤巷'}, {'id': 30, 'name': '2煤岩巷'}, {'id': 31, 'name': '煤巷'}, {'id': 32, 'name': '3下煤巷'}, {'id': 33, 'name': '岩巷'}, {'id': 34, 'name': '房屋'}, {'id': 35, 'name': '铁路'}, {'id': 36, 'name': '公路'}, {'id': 37, 'name': '河流'}, {'id': 38, 'name': '河堤'}, {'id': 39, 'name': '采区边界'}, {'id': 40, 'name': '工作面小柱状'}, {'id': 41, 'name': '断层注记'}, {'id': 42, 'name': '断层'}, {'id': 43, 'name': '2煤实见断层'}, {'id': 44, 'name': '3下煤实见断层'}, {'id': 45, 'name': '保安煤柱'}, {'id': 46, 'name': '等值线注记'}, {'id': 47, 'name': '等值线'}, {'id': 48, 'name': '岩巷名称'}, {'id': 49, 'name': '煤巷名称'}, {'id': 50, 'name': '工作面名称'}, {'id': 51, 'name': '巷道坡度上变点'}, {'id': 52, 'name': '巷道坡度下变点'}, {'id': 53, 'name': '工作面煤层倾角'}, {'id': 54, 'name': '工作面小注状'}, {'id': 55, 'name': '工作面停采日期'}, {'id': 56, 'name': '工作面回采年度'}, {'id': 57, 'name': '工作面回采记录'}, {'id': 58, 'name': '工作面停采线'}, {'id': 59, 'name': '报废巷道'}, {'id': 60, 'name': '泄水巷标志'}, {'id': 61, 'name': '兴隆积水区'}, {'id': 62, 'name': '兴隆巷道'}, {'id': 63, 'name': '兴隆煤巷'}, {'id': 64, 'name': '兴隆岩巷'}, {'id': 65, 'name': '兴隆断层'}, {'id': 66, 'name': '兴隆钻孔'}, {'id': 67, 'name': '兴隆等高线'}, {'id': 68, 'name': '边界煤柱'}, {'id': 69, 'name': '铁路煤柱'}, {'id': 70, 'name': '煤层露头线'}, {'id': 71, 'name': '快速大道'}, {'id': 72, 'name': '2煤底板标高'}, {'id': 73, 'name': '2煤岩巷底板标高'}, {'id': 74, 'name': '3上煤底板标高'}, {'id': 75, 'name': '3下煤底板标高'}, {'id': 76, 'name': '岩巷底板标高'}, {'id': 77, 'name': '密闭墙'}, {'id': 78, 'name': '井下积水区'}, {'id': 79, 'name': '购地边界'}, {'id': 80, 'name': '工作面煤量损失'}, {'id': 81, 'name': '二分层回采记录'}, {'id': 82, 'name': '二分层回采年度'}, {'id': 83, 'name': '工作面发火区'}, {'id': 84, 'name': '工作面采煤方法'}, {'id': 85, 'name': '鲍店3下煤巷道'}, {'id': 86, 'name': '鲍店钻孔'}, {'id': 87, 'name': '鲍店3煤露头'}, {'id': 88, 'name': '鲍店等值线'}, {'id': 89, 'name': '鲍店断层'}, {'id': 90, 'name': '鲍店巷道'}, {'id': 91, 'name': '鲍店岩巷'}, {'id': 92, 'name': '鲍店边界煤柱'}, {'id': 93, 'name': '工广房屋'}, {'id': 94, 'name': '矸石山'}, {'id': 95, 'name': '架空铁路'}, {'id': 96, 'name': '提升能力'}, {'id': 97, 'name': '高压线'}, {'id': 98, 'name': '煤层分叉线'}, {'id': 99, 'name': '3下煤巷道名称'}, {'id': 100, 'name': '村庄煤柱'}, {'id': 101, 'name': '新河堤'}, {'id': 102, 'name': '南屯钻孔'}, {'id': 103, 'name': '占地边界'}, {'id': 104, 'name': '南屯断层'}, {'id': 105, 'name': '南屯3上煤露头'}, {'id': 106, 'name': '南屯边界煤柱'}, {'id': 107, 'name': '南屯巷道'}, {'id': 108, 'name': '南屯岩巷'}, {'id': 109, 'name': '巷道充填区'}, {'id': 110, 'name': '星村井田边界'}, {'id': 111, 'name': '星村巷道'}, {'id': 112, 'name': '封闭井田边界'}, {'id': 113, 'name': '交换图图签'}, {'id': 114, 'name': '钻机硐室'}, {'id': 115, 'name': '下变点'}, {'id': 116, 'name': '溜煤暗通道'}, {'id': 117, 'name': '回采记录'}, {'id': 118, 'name': '巷道坡度'}, {'id': 119, 'name': '回采年度'}, {'id': 120, 'name': '小柱状'}, {'id': 121, 'name': '避难硐室'}, {'id': 122, 'name': '物探断层'}, {'id': 123, 'name': '物探断层注记'}, {'id': 124, 'name': '精细解释断层'}, {'id': 125, 'name': '精细解释断层注记'}, {'id': 126, 'name': '井田边界'}, {'id': 127, 'name': '陷落柱'}, {'id': 128, 'name': '南屯积水区'}, {'id': 129, 'name': '新外环路'}, {'id': 130, 'name': '3下煤巷名称'}, {'id': 131, 'name': '矸石山复垦区域'}, {'id': 132, 'name': '封闭不良钻孔煤柱'}, {'id': 133, 'name': '断层防水煤柱'}, {'id': 134, 'name': '蔬菜大棚'}, {'id': 135, 'name': '110KV高压线煤柱'}, {'id': 136, 'name': '油气管道'}, {'id': 137, 'name': '积水注记'}, {'id': 138, 'name': '探水线红'}, {'id': 139, 'name': '积水区蓝'}, {'id': 140, 'name': '积水区边界黑'}, {'id': 141, 'name': '警戒线蓝'}, {'id': 142, 'name': '南屯积水注记'}, {'id': 143, 'name': '南屯积水蓝'}, {'id': 144, 'name': '南屯探水红'}, {'id': 145, 'name': '兴隆积水蓝'}, {'id': 146, 'name': '鲍店积水注记'}, {'id': 147, 'name': '鲍店积水蓝'}, {'id': 148, 'name': '鲍店探水红'}, {'id': 149, 'name': '鲍店积水区'}, {'id': 150, 'name': '兴隆积水注记'}, {'id': 151, 'name': '兴隆探水红'}, {'id': 152, 'name': '勘探线'}, {'id': 153, 'name': '区域颜色'}, {'id': 154, 'name': '积水区煤柱'}, {'id': 155, 'name': '物探3上煤层露头'}, {'id': 156, 'name': '热力管道'}, {'id': 157, 'name': '经纬网'}, {'id': 158, 'name': '图形修饰'}, {'id': 159, 'name': '开拓方式剖面'}, {'id': 160, 'name': '图例'}, {'id': 161, 'name': '井田位置示意图'}, {'id': 162, 'name': '井田示意图村庄'}, {'id': 163, 'name': '图示'}, {'id': 164, 'name': '封闭不良钻孔颜色'}, {'id': 165, 'name': '3煤柱状图'}, {'id': 166, 'name': '南屯断层煤柱'}, {'id': 167, 'name': '地面注浆孔'}, {'id': 168, 'name': 'Defpoints'}],
      selectedFile: null,
      tableData: [{'x': 13651087.215395, 'y': -15783373.219008, 'z': -680.0, 'line_id': 0.0}, {'x': 13651089.038821, 'y': -15783372.935434, 'z': -680.0, 'line_id': 0.0}, {'x': 13651090.861856, 'y': -15783372.649125, 'z': -680.0, 'line_id': 0.0}, {'x': 13651092.68507, 'y': -15783372.364046, 'z': -680.0, 'line_id': 0.0}, {'x': 13651094.509058, 'y': -15783372.084326, 'z': -680.0, 'line_id': 0.0}, {'x': 13651105.650394, 'y': -15783370.522782, 'z': -680.0, 'line_id': 0.0}, {'x': 13651116.804952, 'y': -15783369.053234, 'z': -680.0, 'line_id': 0.0}, {'x': 13651127.965082, 'y': -15783367.623164, 'z': -680.0, 'line_id': 0.0}, {'x': 13651139.127112, 'y': -15783366.208474, 'z': -680.0, 'line_id': 0.0}, {'x': 13651139.9706, 'y': -15783366.10236, 'z': -680.0, 'line_id': 0.0}, {'x': 13651140.392334, 'y': -15783366.049246, 'z': -680.0, 'line_id': 0.0}, {'x': 13651140.814045, 'y': -15783365.995955, 'z': -680.0, 'line_id': 0.0}, {'x': 13651350.71022, 'y': -15779763.902043, 'z': -580.0, 'line_id': 1.0}, {'x': 13651347.981682, 'y': -15779760.616076, 'z': -580.0, 'line_id': 1.0}, {'x': 13651345.239483, 'y': -15779757.326449, 'z': -580.0, 'line_id': 1.0}, {'x': 13651339.765086, 'y': -15779750.764515, 'z': -580.0, 'line_id': 1.0}, {'x': 13651337.031548, 'y': -15779747.469888, 'z': -580.0, 'line_id': 1.0}, {'x': 13651334.30667, 'y': -15779744.170261, 'z': -580.0, 'line_id': 1.0}, {'x': 13651331.607773, 'y': -15779740.855633, 'z': -580.0, 'line_id': 1.0}, {'x': 13651329.681095, 'y': -15779738.455589, 'z': -580.0, 'line_id': 1.0}, {'x': "...", "y": '...', 'z': '...', "line_id": '...'}], // 这里应放入处理后的表格数据
      tableColumns: [{
          prop: "x",
          label: "x"
        },{
          prop: "y",
          label: "y"
        },{
          prop: "z",
          label: "z"
        },{
          prop: "line_id",
          label: "线段编号"
        }] // 这里定义表格的列
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
