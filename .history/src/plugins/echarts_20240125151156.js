import * as echarts from "echarts/core";
import {
  LegendComponent
} from "echarts/components";
import {
  RadarChart,
  BarChart,
  LineChart,
  GaugeChart,
  ScatterChart,
  PieChart,
  EffectScatterChart,
  HeatmapChart,
  GraphChart
} from "echarts/charts";
import { UniversalTransition,LabelLayout } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";
import { Bar3DChart, Line3DChart, Scatter3DChart,SurfaceChart } from "echarts-gl/charts";
import { Grid3DComponent } from "echarts-gl/components";


echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  RadarChart,
  BarChart,
  LineChart,
  CanvasRenderer,
  UniversalTransition,
  GaugeChart,
  ScatterChart,
  PieChart,
  VisualMapComponent,
  GeoComponent,
  EffectScatterChart,
  HeatmapChart,
  Bar3DChart,
  Line3DChart,
  Grid3DComponent,
  DataZoomComponent,
  ToolboxComponent,
  Scatter3DChart,
  MarkAreaComponent,
  SurfaceChart,
  PolarComponent,
  GraphicComponent,
  GraphChart,TooltipComponent, LegendComponent,LabelLayout
]);

export default echarts;
