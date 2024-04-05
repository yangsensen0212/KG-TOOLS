<template>
  <div class="chart-view" :style="getChartStyle" ref="view" />
</template>

<script>
import echarts from '@/plugins/echarts';
export default {
  name: 'ChartView',
  props: {
    width: {
      type: String,
      default: '100%',
    },
    height: {
      type: String,
      default: '100%',
    },
    option: {
      type: Object,
      default: () => {},
    },
    type: Number,
  },
  data() {
    return {
      myChart: null,
    };
  },
  computed: {
    getChartStyle() {
      return {
        '--width': this.width,
        '--height': this.height,
      };
    },
  },
  watch: {
    option: {
      handler() {
        // this.myChart && this.myChart.dispose();
        this.drawChart();
      },
      deep: true,
    },
  },
  mounted() {
    const chartDom = this.$refs.view;
    this.myChart = echarts.init(chartDom, 'dark');
    this.$nextTick(this.drawChart);
    window.addEventListener('resize', this.resizeCharts);
  },
  methods: {
    drawChart() {
      this.myChart.resize();
      this.option && this.myChart.setOption(this.option, true);
      // 绑定事件点击
      this.myChart.on('click', (params) => {
        this.$emit('chartClick', params);
      });
    },
    resizeCharts() {
      this.myChart && this.myChart.resize();
    },
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resizeCharts);
    this.myChart && this.myChart.dispose();
  },
};
</script>

<style scoped>
/* .chart-view {
  width: var(--width);
  height: var(--height);
} */
</style>
