import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as echarts from 'echarts';

import 'echarts-wordcloud'

import { WordCloudDataType } from '../../types/propsTypes';
import axios, { AxiosResponse } from 'axios';
import { PATH } from '../../types/actionTypes';

var myCharts: echarts.EChartsType

interface WordCloudProps {
  now_class_id:string
}
interface WordCloudState {
  words_cloud_data:WordCloudDataType
}
class WordCloud extends Component <WordCloudProps, WordCloudState>{
    public constructor(props : WordCloudProps) {
        super(props)
        this.state = {
          words_cloud_data:{}
        }
    }

    static defaultProps = {
      now_class_id: "0",
    }
    

    // createWordCloud = ()=>{
    //   const {words_cloud_data} = this.state
    //   myCharts = echarts.init(document.querySelector(".WordsCloud") as HTMLElement);
    //   //用来存储数据
    //   const { now_class_id } = this.props
    //   var jsonList = words_cloud_data[now_class_id];
    //   const my_image = "data:image/jpeg;base64,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"

    //   var maskResource = new Image()
      
    //   maskResource.onload = function(){
    //     myCharts.setOption(option)
    //   };
    //   // maskResource.onload()  
    //   maskResource.src=my_image;
    //   var option ={
    //       //设置标题，居中显示
    //       title:{
    //           text: "第" + now_class_id + "类的情况",
    //           left:'center',
    //           fill: "red",
    //       },
    //       //数据可以点击
    //       tooltip:{
    //       },
    //       series:[
    //           {
    //               maskImage:maskResource,
    //               //词的类型
    //               type: 'wordCloud',
    //               //设置字符大小范围
    //               shape: 'circle',
    //               // maskImage: maskImage,
    //               // maskImage:maskResource,
    //               sizeRange:[6,78],
    //               rotationRange:[-45,90],
    //               width: '100%',
    //               height: '100%',
    //               textStyle: {             //设置随机的字体颜色
    //                   fontFamily: 'sans-serif',
    //                   fontWeight: 'bold',
    //                   color: function () {
    //                       // Random color
    //                       return 'rgb(' + [
    //                           Math.round(Math.random() * 160),
    //                           Math.round(Math.random() * 160),
    //                           Math.round(Math.random() * 160)
    //                       ].join(',') + ')';
    //                   }
    //               },
    //               emphasis: {
    //                   focus: 'self',
    //                   textStyle: {
    //                       shadowBlur: 10,
    //                       shadowColor: '#333'
    //                   }
    //               },
    //               //不要忘记调用数据
    //               data:jsonList
    //           }
    //       ]
    //   };

    //   //加载图像，将数据放在图像中
      
    //   // 

      
      
    //   // maskResource.onload()  
    // }

    componentDidMount(){
      axios.get(`${PATH}/get_wordCloudData`,{withCredentials:true}).then((res:AxiosResponse<any, any>) => {
        const {data:respose} = res
        // console.log("resData",data)
        if(respose.status === 200){
          this.setState({
            words_cloud_data:respose.data
          })
        }
      })
      // this.createWordCloud()
    }

    public render() : JSX.Element {
        return (
            <div className="WordsCloud">
              {/* <svg className="words_cloud_svg">

              </svg> */}
            </div>
        )
    }
}
export default WordCloud;