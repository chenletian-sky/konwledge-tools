import React, {Component} from 'react';
import * as echarts from 'echarts/core';
import {
  TooltipComponent,
  TooltipComponentOption,
  LegendComponent,
  LegendComponentOption
} from 'echarts/components';
import { PieChart, PieSeriesOption } from 'echarts/charts';
import { LabelLayout } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([
  TooltipComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer,
  LabelLayout
]);

type EChartsOption = echarts.ComposeOption<
  TooltipComponentOption | LegendComponentOption | PieSeriesOption
>;

interface MyPieChartProps {
  height?:string,
  width?:string
  option?:EChartsOption
}
interface MyPieChartState {

}
class MyPieChart extends Component <MyPieChartProps, MyPieChartState>{
    public constructor(props : MyPieChartProps) {
        super(props)
    }

    public componentDidMount(){
      var chartDom = document.getElementById('mychart-canvas')!;
      var myChart = echarts.init(chartDom);
      var option: EChartsOption;

      option = {
          title:{
            text:"字典数据"
          },
          tooltip: {
            trigger: 'item'
          },
          legend: {
            // show:false,
            top: '10%',
            left: '0%',
            align:"left",
            orient:"vertical"
          },
          series: [
            {
              name: 'Access From',
              type: 'pie',
              radius: ['40%', '70%'],
              avoidLabelOverlap: false,
              itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2
              },
              label: {
                show: false,
                position: 'center'
              },
              emphasis: {
                label: {
                  show: false,
                  fontSize: '40',
                  fontWeight: 'bold'
                }
              },
              labelLine: {
                show: false
              },
              data: [
                { value: 1048, name: '类1' },
                { value: 735, name: '类2' },
                { value: 580, name: '类3' },
                // { value: 484, name: 'Union Ads' },
                // { value: 300, name: 'Video Ads' }
              ]
            }
          ]
        };

        myChart.setOption(option)
    }

    public render() : JSX.Element {
        return (
            <div id="mychart-canvas" 
              style={{height:this.props.height}}
            >

            </div>
        )
    }
}
export default MyPieChart;