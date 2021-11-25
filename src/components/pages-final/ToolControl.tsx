import React, { Component } from 'react';
import {
  Redirect,
  Route,
  Switch,
} from 'react-router-dom'
// antd组件库
import { Layout, Menu, Button, message, Avatar, Dropdown, Select, Progress, Descriptions, Space, Divider, Modal, Spin, Alert, Form, Input, Checkbox, Upload, Table, Empty } from 'antd';
import 'antd/dist/antd.css';
import { UploadOutlined, PlayCircleOutlined, FileTextOutlined } from '@ant-design/icons';
import Icon, { UserOutlined } from '@ant-design/icons';
// 自定义icon
import { DictionaryIcon, TrainIcon,DataVisualIcon, LabelIcon, MenuLabelIcon, Logo, SaveIcon, importIcon } from './../Icon';
// redux
import { connect } from 'react-redux';
import { MainStoreType, StoreType, TableDataType, TextsDataType ,MenuStoreType, TextViewStoreType, MarkViewStoreType, InitMarkText} from '../../types/propsTypes';
import { identifyEntity,changeMenuSelect, setLoadingState, updateAllDictionaryData, updateAllTextsData, updateDictionaryData, updateLabelByShow, updateMarkTextData, updateTextsData } from '../../action';
// 路由页面
import DictionaryView from './../DictionaryView';
import TextView from './../TextView';
import MarkView from './../MarkView';
import DataVisualView from './../DataVisualView';
// 工具库
import $ from 'jquery'
import XLSX from 'xlsx'
import axios, { AxiosResponse } from 'axios';
// 后端路径
import { PATH } from '../../types/actionTypes';
import { type } from 'os';
import TrainView from './../TrainView';
import MyPieChart from './../EchartComponents/MyPieChart';
import BatteryCharge from './../Animation/BatteryCharge';
import MyProcess from './../Animation/MyProcess';
import ClusteringPlot from './../ClusteringPlot/index';
import WordCloud from './../WordCloud/yu/index';
import LoadingOutlined from '@ant-design/icons/lib/icons/LoadingOutlined';

import {  Result, Statistic } from 'antd';
import { LikeOutlined,  } from '@ant-design/icons';

import type { BasicLayoutProps, ProSettings } from '@ant-design/pro-layout';
import ProLayout, { PageContainer, SettingDrawer } from '@ant-design/pro-layout';
import defaultProps from './../_defaultProps';
import ProCard from '@ant-design/pro-card';
import TextArea from 'antd/lib/input/TextArea';
import ExportData from './toolPages/ExportData';
import DictMatchConfig from './toolPages/DictMatchConfig';
import TextRecongnitionConfig from './toolPages/TextRecognitionConfig';
import DataLabelConfig from './toolPages/DataLabelConfig';

import './ToolControl.css'
import DataClassfication from './toolPages/DataClassfication';
import HandleLabel from './toolPages/HandleLabel'
import TextIdentify from './toolPages/TextIdentify';
import TrainText from './toolPages/TrainText';
import LoadingData from './LoadingData';


interface ToolControlProps {
  history:any
}
interface ToolControlState {

}


class ToolControl extends Component <ToolControlProps, ToolControlState>{
    public constructor(props : ToolControlProps) {
        super(props)
    }

    create_line = ()=>{
      const elem = document.querySelector(".flow-div") as HTMLElement
      const out_div = document.querySelector(".Outer") as HTMLElement
      const b2 = document.querySelectorAll(".flow-div")[1] as HTMLElement
      const b3 = document.querySelectorAll(".flow-div")[2] as HTMLElement
      const b5 = document.querySelectorAll(".flow-div")[4] as HTMLElement
      const flow_svg = document.querySelector(".flow-svg")
      if(elem && out_div && b2 && b5) {
          console.dir(b2);
          const height_cha = 47;
          const width_cha = 27;
          const y_cha = 47;
          const line_x = elem.offsetLeft + 30;
          const line_width = out_div.scrollWidth * 0.2 ;
          const {offsetWidth:b2_offsetLeft,offsetTop:b2_offsetHeight,scrollWidth} = b2
          const {offsetWidth:b5_offsetLeft,offsetTop:b5_offsetHeight} = b5
          const {offsetWidth:b3_offsetLeft,offsetTop:b3_offsetHeight} = b3
          if(flow_svg)
              flow_svg.innerHTML = `<path d="M${line_x},26 L ${line_x},535"  stroke="black" strokeWidth="1px" fill="none"></path>
              <path d="M${b2_offsetLeft + width_cha},${b2_offsetHeight - height_cha} L ${b2_offsetLeft- line_width+ width_cha},${b2_offsetHeight- height_cha} L ${b2_offsetLeft- line_width+ width_cha},${b5_offsetHeight- y_cha} L ${b5_offsetLeft+ width_cha},${b5_offsetHeight- y_cha} "  stroke="black" strokeWidth="1px" fill="none"></path>
              <path d="M${b3_offsetLeft + scrollWidth + width_cha},${b3_offsetHeight - height_cha} L ${b3_offsetLeft + scrollWidth + line_width+ width_cha},${b3_offsetHeight- height_cha} L ${b3_offsetLeft + scrollWidth + line_width+ width_cha},${b5_offsetHeight- y_cha} L ${b5_offsetLeft+ width_cha},${b5_offsetHeight- y_cha} "  stroke="black" strokeWidth="1px" fill="none"></path>`
      }
    }

    handelClick = (e: any) =>{
      const target_id = e.target.id
      // console.log("onclick",target_id)
      const list_id = ["flow-btn-1","flow-btn-2","flow-btn-3","flow-btn-4" ,"flow-btn-5","flow-btn-6"]
      
      const elem = document.getElementById(target_id)
      console.log('onclick',)
      switch(target_id){
        case "flow-btn-1":
          this.props.history.push('/index/tool/loadingData')
          break
        case "flow-btn-2":
          this.props.history.push('/index/tool/dataClassfication')
          break
        case "flow-btn-3":
          this.props.history.push('/index/tool/handleLabel')
          break
        case "flow-btn-4":
          this.props.history.push('/index/tool/dictMatch')
          break
        case "flow-btn-5":
          this.props.history.push('/index/tool/textRec')
          break
        case "flow-btn-6":
          this.props.history.push('/index/tool/export')
          break

      }
      if(elem)
          elem.style.backgroundColor = `rgb(100,157,212)`
      for(let i=0;i<list_id.length;i++){
          if(list_id[i]!==target_id){
              let other_item = document.getElementById(list_id[i])
              if(other_item){
                  other_item.style.backgroundColor = `rgb(204,204,204)`
              }
          }
      }
    }

    componentDidMount(){
      console.log('history',this.props.history)
      this.create_line()
    }

    public render() : JSX.Element {
        return (
              <ProCard
                // title="左右分栏带标题"
                // extra="2019年9月28日"
                // split='vertical'
                // bordered={false}
                // headerBordered
                // gutter={64}
                style={{
                  height:"100%",
                  width:"100%",
                  position:"relative",
                  // top:"-20px"
                }}
              >
                <ProCard 
                // title="左侧详情" 
                style={{
                  height:"73.2%",
                  // marginBottom:"500px"
                  position:"relative",
                  top:"-24px"
                }}
                colSpan="20%"
                >
                  <div
                    style={{
                      height:"100%",
                      width:"100%",
                      // border:"1px solid black",
                      // padding:"10px 10px 10px 10px"
                    }}
                  >
                    
                      {/* <span
                      style={{
                        position:'relative',
                        top:"-20px",
                        zIndex:99,
                        backgroundColor:"white"
                      }}
                      >
                        工作流
                      </span> */}
                      

                      <div
                        style={{
                          height:"100%",
                          width:"100%",
                          position:"relative",
                          left:"-340px",
                          top:"40px",
                          // fontSize:"100px"
                          // border:"1px solid black",
                          // padding:"10px 10px 10px 10px"
                        }}
                      >
                        <div className="Dialog" 
                          style={{
                            height:"100%",
                            width:"100%",
                            position:"relative",
                            left:"280px",
                            top:"-58px"

                            // fontSize:"100px"
                            // border:"1px solid black",
                            // padding:"10px 10px 10px 10px"
                          }}
                        >
                            <div className="Outer"
                              style={{
                                // height:"100%",
                                // width:"100%",
                                // border:"1px solid black",
                                // padding:"10px 10px 10px 10px"
                              }}
                            >
                                <span className="flow-title"
                                  style={{
                                    // fontSize:"10px"
                                  }}
                                >工作流</span>
                                <svg className="flow-svg">
                                </svg>
                                <div className="flow-div"><button id="flow-btn-1" className="flow-btn" onClick={(e)=>{this.handelClick(e)}}>加载数据字典</button></div>
                                <div className="flow-div"><button id="flow-btn-2" className="flow-btn" onClick={(e)=>{this.handelClick(e)}}>数据预处理</button></div>
                                <div className="flow-div"><button id="flow-btn-3" className="flow-btn" onClick={(e)=>{this.handelClick(e)}}>手工标注</button></div>
                                <div className="flow-div"><button id="flow-btn-4" className="flow-btn" onClick={(e)=>{this.handelClick(e)}}>训练模型</button></div>
                                <div className="flow-div"><button id="flow-btn-5" className="flow-btn" onClick={(e)=>{this.handelClick(e)}}>语料识别</button></div>
                                <div className="flow-div"><button id="flow-btn-6" className="flow-btn" onClick={(e)=>{this.handelClick(e)}}>导出数据</button></div>
                            </div>
                        </div>
                      </div>
                      {/* <div>
                        <Space>
                        <Button
                          type="primary"
                          size="small"
                          onClick={()=>{
                            this.props.history.push('/index/tool/export')
                          }}
                        >
                          export
                        </Button>

                        <Button
                          type="primary"
                          size="small"
                          onClick={()=>{
                            this.props.history.push('/index/tool/dictMatch')
                          }}
                        >
                          dictMatch
                        </Button>

                        <Button
                          type="primary"
                          size="small"
                          onClick={()=>{
                            this.props.history.push('/index/tool/textRec')
                          }}
                        >
                          textRec
                        </Button>

                        <Button
                          type="primary"
                          size="small"
                          onClick={()=>{
                            this.props.history.push('/index/tool/dataLabel')
                          }}
                        >
                          dataLabel
                        </Button>

                        <Button
                          type="primary"
                          size="small"

                        >
                          test5
                        </Button>
                        </Space>
                        
                      </div> */}
                      
                    
                  </div>
                  
                  
                </ProCard>
                <ProCard 
                // title="查看详情"
                colSpan="76%"
                style={{
                  height:"100%",
                  // float:'right'
                  position:"relative",
                  
                  top:"-24px",
                  left:"100px"
                }}
                >
                  <div 
                      style={{ 
                        height: "72%" ,
                        // marginBottom:"100px"
                      }}
                    >
                      
                      

                      
                      <Switch>
                        <Route path="/index/tool/loadingData" component={LoadingData}></Route>
                        <Route path="/index/tool/dataClassfication" component={DataClassfication} />
                        <Route path="/index/tool/handleLabel" component={DataLabelConfig}></Route>
                        <Route path='/index/tool/dictMatch' component={DictMatchConfig}></Route>
                        <Route path='/index/tool/textRec' component={TextIdentify}></Route>
                        <Route path="/index/tool/export" component={ExportData} />
                        <Redirect to='/index/tool/'></Redirect>
                        
                        {/* <Route path="/index/tool/trainText" component={TrainText}></Route> */}

                        
                        
                        
                        {/* <Route path="/index/tool/dataLabel" component={DataLabelConfig}></Route> */}
                        {/* <Route path="/index/texts" component={TextView} />
                        <Route path='/index/mark' component={MarkView} />
                        <Route path='/index/dataVisualization' component={DataVisualView} />
                        <Route path='/index/train' component={TrainView} /> */}
                        
                      </Switch>
                    </div>
                </ProCard>
              </ProCard>
        )
    }
}
export default ToolControl;