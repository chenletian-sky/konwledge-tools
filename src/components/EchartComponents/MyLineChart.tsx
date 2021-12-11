import React, {Component} from 'react';
import ReactEcharts from 'echarts-for-react';  //下载
import * as echarts from 'echarts';

import { Button } from 'antd'

type EChartsOptions = echarts.EChartOption;

interface MyLineChartProps {

}
interface MyLineChartState {
    series:Array<number>,
    iterations:Array<number>,
}
class MyLineChart extends Component <MyLineChartProps, MyLineChartState>{
    public constructor(props : MyLineChartProps) {
        super(props)
        this.state = {
          series: [0,10],  //数据接口  y
          iterations: [0,1],  //x的数据
        }
    }

    
    handelClick = ()=>{
      const { series,iterations } = this.state;
      const data_len = series.length;
      console.log(data_len);
      this.setState({
          series: [...series,data_len * 10,],
          iterations: [...iterations,data_len+1,],
      })
    }
    getOption = ()=>{
      const { series,iterations } = this.state;
      const option: EChartsOptions = {
          title: {
              text: '训练准确率变化',
              textStyle: {
                  fontSize: 15,
              }
              },
          xAxis: {
              type: 'category',
              boundaryGap: false,
              name:"迭代次数",
              nameLocation:"center",
              nameGap:22,
              data: iterations,
          },
          yAxis: {
              type: 'value',
              name:"准确率/%",
          },
          series: [
              {
              data: series,
              type: 'line'
              }
          ]
      }
      return option;
    }
    componentDidMount(){
    }
    componentDidUpdate(){
      
    }

    render() {
      console.log(this.state);
      return (
          <>
          
          <div id="line-chart" style={{width:"100%",height:"100%",outline:"1px solid",margin:"0 auto",marginTop:"50px"}}>
              <Button onClick={this.handelClick}>增加</Button>
              <ReactEcharts option={this.getOption()} theme="" notMerge={true} lazyUpdate={true} style={{ height: "100%"}} />
          </div>
          </>
      )
    }
}
export default MyLineChart;