import axios from 'axios';
import React, {Component} from 'react';

import * as echarts from 'echarts';

import ecStat from 'echarts-stat';

type EChartsOption = echarts.EChartsOption;


interface ClusteringPlotProps {
  // chartOption:EChartsOption
}
interface ClusteringPlotState {
  scatterData:any
}
class ClusteringPlot extends Component <ClusteringPlotProps,ClusteringPlotState>{
    public constructor(props :ClusteringPlotProps) {
        super(props)
        
        this.state = {
          scatterData:[]
        }
    }

    public componentDidMount(){
      axios.get('/public/data/300class_scatter_data.json').then((response)=>{
        let data = response.data
        let afterdata = []
        data = data['0']
        data = data['nodes']
        for(let i=0;i<data.length;i++){
          afterdata.push([data[i]['position'][0],data[i]['position'][1]])
        }

        this.setState({
          scatterData:afterdata
        })
        console.log("scatter",afterdata)
        // console.log("response",response)
      },error=>{
        console.log("error",error)
      }).then((result)=>{

        
        var chartDom = document.getElementById('ClusteringPlot');
        var myChart = echarts.init(chartDom as HTMLElement);
        var option:EChartsOption;
        // echarts.registerTransform((((ecStat.transform)as any).clustering)as any);
        var CLUSTER_COUNT = 100;
        var DIENSIION_CLUSTER_INDEX = 2;
        var COLOR_ALL = [
          '#37A2DA',
          '#e06343',
          '#37a354',
          '#b55dba',
          '#b5bd48',
          '#8378EA',
          '#96BFFF',
          // "white",
          // "red"
        ];
        var pieces = [];
        for (var i = 0; i < CLUSTER_COUNT; i++) {
          pieces.push({
            value: i,
            label: 'cluster ' + i,
            color: COLOR_ALL[i%6]
          });
        }
        option = {
          dataset: [
            {
              source:this.state.scatterData
              // source:data
              // source: this.state.scatterData !== undefined ? this.state.scatterData : []
            },
            {
              transform: {
                type: 'ecStat:clustering',
                print: true,
                config: {
                  clusterCount: CLUSTER_COUNT,
                  outputType: 'single',
                  outputClusterIndexDimension: DIENSIION_CLUSTER_INDEX
                }
              }
            }
          ],
          tooltip: {
            position: 'top',
            // show:false
          },
          visualMap: {
            type: 'piecewise',
            top: 'middle',
            min: 0,
            max: CLUSTER_COUNT,
            left: 10,
            splitNumber: CLUSTER_COUNT,
            dimension: DIENSIION_CLUSTER_INDEX,
            pieces: pieces
          },
          grid: {
            left: 120
          },
          xAxis: {},
          yAxis: {},
          series: {
            type: 'scatter',
            encode: { tooltip: [0, 1] },
            symbolSize: 10,
            itemStyle: {
              borderColor: '#555'
            },
            datasetIndex: 1
          }
        };

        // myChart.setOption(option)
        // myChart.setOption(option)
      })

      

      
    }

    public render() : JSX.Element {
        return (
            <div id="ClusteringPlot" style={{height:"100%"}}>

            </div>
        )
    }
}
export default ClusteringPlot;