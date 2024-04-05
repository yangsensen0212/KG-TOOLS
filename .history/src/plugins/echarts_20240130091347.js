import * as echarts from "echarts/core";
import {
  TooltipComponent,
  LegendComponent
} from "echarts/components";
// import {
//   RadarChart,
//   BarChart,
//   LineChart,
//   GaugeChart,
//   ScatterChart,
//   PieChart,
//   EffectScatterChart,
//   HeatmapChart,
//   GraphChart
// } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";
import { Line3DChart, SurfaceChart } from "echarts-gl/charts";
import { Grid3DComponent } from "echarts-gl/components";


echarts.use([
  TooltipComponent,
  LegendComponent,
  CanvasRenderer,
  Line3DChart,
  SurfaceChart,
  Grid3DComponent
]);

export default echarts;
