import React, { Component } from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom'
// antd组件库
import { Layout, Menu, Button, message, Avatar, Dropdown, Select, Progress, Descriptions, Space, Divider, Modal, Spin, Alert, Form, Input, Checkbox, Upload, Table } from 'antd';
import 'antd/dist/antd.css';
import { UploadOutlined, PlayCircleOutlined, FileTextOutlined } from '@ant-design/icons';
import Icon, { UserOutlined } from '@ant-design/icons';
// 自定义icon
import { DictionaryIcon, TrainIcon,DataVisualIcon, LabelIcon, MenuLabelIcon, Logo, SaveIcon, importIcon } from './../Icon';
// redux
import { connect } from 'react-redux';
import { MainStoreType, StoreType, TableDataType, TextsDataType ,MenuStoreType, TextViewStoreType, MarkViewStoreType, InitMarkText, DictionaryViewStoreType} from '../../types/propsTypes';
import { identifyEntity,changeMenuSelect, setLoadingState, updateAllDictionaryData, updateAllTextsData, updateDictionaryData, updateLabelByShow, updateMarkTextData, updateTextsData, modifyLabelOfDictionaryData } from '../../action';
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
import { ColumnType } from 'antd/lib/table';

// 允许携带跨域信息
axios.defaults.withCredentials = true


interface DictControlProps extends MainStoreType,DictionaryViewStoreType{
  history:any,
  // updateAllTextsData: typeof updateAllTextsData,
  updateAllDictionaryData: typeof updateAllDictionaryData,
//   updateLabelByShow: typeof updateLabelByShow,
  updateDictionaryData: typeof updateDictionaryData,
  // updateTextsData: typeof updateTextsData,
}
interface DictControlState {
  labelList:Array<string>

}
class DictControl extends Component <DictControlProps, DictControlState>{
    public constructor(props : DictControlProps) {
        super(props)
        this.state = {
          // form:
          labelList:[]
        }
    }

    public render() : JSX.Element {
        const {dictionaryData} = this.props
        const {labelList} = this.state
        return (
            <ProCard
              // title="左右分栏带标题"
              // extra="2019年9月28日"
              split='vertical'
              bordered
              headerBordered
              style={{
                height:"100%",
                width:"100%"
              }}
            >
              <ProCard 
              // title="左侧详情" 

              colSpan="50%">
                <div
                  style={{
                    height:"50%",
                    width:"100%",
                    border:"1px solid black",
                    padding:"10px 10px 10px 10px"
                  }}
                >
                  <div
                    style={{
                      // margin:"10px 10px 10px 10px"
                    }}
                  >
                    <span
                    style={{
                      position:'relative',
                      top:"-24px",
                      zIndex:99,
                      backgroundColor:"white",
                      fontSize:"20px"
                    }}
                  >新增字典</span>
                  </div>
                  
                  <Form
                    name="basic"
                    // labelCol={{ span: 8 }}
                    wrapperCol={{ span: 8 }}
                    // initialValues={{ remember: true }}
                    // onFinish={onFinish}
                    // onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    style={{
                      // fontSize:"20px"
                    }}
                    onFinish={(value:any)=> {
                      console.log("dictFinish",value)
                      const fileByRead = value['dictFile'].fileList

                      // console.log("fileList",fileByRead[0])
                      
                      const reader = new FileReader(); 
                        // reader.readAsText(fileByRead[0].raw)
                        reader.readAsArrayBuffer(fileByRead[0].originFileObj); //读取文件的内容
                        reader.onload = () => {
                          // console.log(reader.result)
                          const { result } = reader;
                          // console.log("result",result)
                          const wb = XLSX.read(result)
                          /* Get first worksheet */
                          const wsname = wb.SheetNames[0];
                          const ws = wb.Sheets[wsname];
                          /* Convert array of arrays */
                          const data:Array<Array<string>> = XLSX.utils.sheet_to_json(ws, {header:1});
                          // console.log(data)
                          const dataByAdd:TableDataType = []
                          for(let i = data.length - 1; i > 0; i--) {//;
                            const d = {
                              name: data[i][1],
                              label: data[i][0],
                              key: Number(Math.random().toString().substr(3, 10) + Date.now()).toString(36),
                              abbreviations: [...data[i].slice(2)]
                            }
                            
                            dataByAdd.push(d)
                            
                            if(labelList.includes(data[i][0])) {
                              dictionaryData[data[i][0]].push(d)
                            } else {
                              labelList.push(data[i][0])
                              dictionaryData[data[i][0]] = [d]
                            }
                          }

                          console.log("dictionaryData",dataByAdd)

                          axios.post(`${PATH}/upload_dictionary`, dataByAdd, {withCredentials: true})
                            .then((res:AxiosResponse<any>) => {
                              if(res.data.status){
                                // this.setState({
                                //   isUpload:false
                                // })
                              }
                              // console.log(res.data)
                            })
                          // history.push('/index/dictionary')
                          message.success('您已成功上传的字典数据', 1)
                          updateAllDictionaryData(JSON.parse(JSON.stringify(dictionaryData)))
                          this.setState({ labelList })
                        }
                      
                    }}
                  >
                    <Form.Item
                      label="字典名称"
                      
                      name="dictName"
                      rules={[{ required: true }]}
                      
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      label="字典描述"
                      name="dictDescribe"
                      rules={[{ required: true }]}
                      wrapperCol={{span:20}}
                    >
                      <TextArea
                        style={{
                          height:"100px",
                          width:"400px"
                        }}
                        autoSize={false}
                      ></TextArea>
                      {/* <Input.Password /> */}
                    </Form.Item>

                    <Form.Item
                      label="导入文件"
                      name="dictFile"
                      rules={[{ required: true  }]}
                    >
                      <Upload 
                      // {...props}
                      accept='application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                      beforeUpload = {(file)=>{
                        const isType = 
                          file.type === 'application/vnd.ms-excel' ||
                          file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                        if(!isType){
                          message.error("上传文件只支持xls,xlsx类型")
                        }
                        return isType
                      }}
                      >
                        <Button icon={<UploadOutlined />}>Click to Upload</Button>
                      </Upload>
                    </Form.Item>

                    

                    <Form.Item 
                      wrapperCol={{ offset: 8, span: 16 }}
                    >
                      <Space>
                        <Button type="primary" htmlType="submit">
                          文件校验
                        </Button>
                        <Button type="primary" htmlType="submit">
                          新增字典
                        </Button>
                      </Space>
                      
                    </Form.Item>

                    {/* <Form.Item 
                      // wrapperCol={{ offset: 8, span: 16 }}
                    >
                      
                    </Form.Item> */}
                  </Form>
                </div>
                
                <div
                  style={{
                    height:"50%",
                    width:"100%",
                    marginTop:"10px"
                    // backgroundColor:"red"
                  }}
                >
                  <Table 
                    style={{
                      // fontSize:"20px"
                    }}
                    // onHeaderRow = { 
                    //   { size: "20px" 
                    // }
                    // onHeaderRow ={(index,record)=>{
                    //   return <p></p>
                    // }}
                    columns={
                      [
                        {
                          title: '字典名称',
                          
                          dataIndex: 'name',
                          key: 'name',
                          width:"20%",
                          render: text => <a
                            style={{fontSize:"20px"}}
                          >{text}</a>,
                        },
                        {
                          title: '字典描述',
                          dataIndex: 'describe',
                          width:"30%",
                          key: 'age',
                          render:text => <a style={{fontSize:"20px"}}>{text}</a>
                        },
                        {
                          title: '包含语量',
                          dataIndex: 'size',
                          width:"10%",
                          key: 'address',
                        },
                        {
                          title: '字典容量',
                          key: 'capacity',
                          width:"10%",
                          dataIndex: 'capacity',
                          // render: tags => (
                          //   <React.Fragment>

                          //   </React.Fragment>
                          // ),
                        },
                        {
                          title: '操作',
                          key: 'action',
                          width:"30%",
                          align:"center",
                          render: (text, record) => (
                            <Space size="middle">
                              {/* <a>Invite {record.name}</a> */}
                              <a>更新</a>
                              <a>导出</a>
                              <a>查看</a>
                            </Space>
                          ),
                        },
                      ]
                    } 
                    dataSource={
                      [
                        {
                          key: '1',
                          name: 'dict_name',
                          describe: 'describe',
                          size: '10000',
                          capacity: '100k',
                        },
                        {
                          key: '2',
                          name: 'dict_name_2',
                          describe: 'describe_2',
                          size: '8000',
                          capacity: '80k',
                        },
                        {
                          key: '3',
                          name: 'dict_name_3',
                          describe: 'describe_3',
                          size: '6000',
                          capacity: '60k',
                        }
                      ]
                    } 
                  />

                </div>
              </ProCard>
              <ProCard 
              // title="查看详情"
              >
                <div 
                    style={{ 
                      height: "100%" 
                    }}
                  >
                    <div
                    style={{
                      height:"100%",
                      width:"100%",
                      border:"1px solid black",
                      padding:"10px 10px 10px 10px"
                    }}
                  >
                    <div
                      style={{
                        // margin:"10px 10px 10px 10px"
                        // height:"60%"
                      }}
                    >
                      <span
                        style={{
                          position:'relative',
                          top:"-24px",
                          zIndex:99,
                          backgroundColor:"white",
                          fontSize:"20px"
                      }}
                      >
                        查看详情
                      </span>
                    </div>
                      <DictionaryView/>
                    {/* <Switch>
                    <Route path="/index" component={DictionaryView} />
                    <Route path="/index/texts" component={TextView}/>
                    <Route path='/index/mark' component={MarkView} />
                    <Route path='/index/dataVisualization' component={DataVisualView} />


                    <Route path='/index/train' component={TrainView} />

                </Switch> */}

                  </div>
                  
                </div>
              </ProCard>
            </ProCard>
        )
    }

    componentDidMount(){
      // const {} = this.props
      const { labelList } = this.state;
      const { history, updateAllDictionaryData } = this.props;
      axios.get(`${PATH}/get_dictionary` )
        .then((res: AxiosResponse<any>) => {
          const { data: response } = res;
          if (response['status'] === 200 && response['message'] === '获取成功') {
            const dictionaryData:{
              [label: string]: TableDataType
            } = {}
            const { data } = response;
            // console.log(data)
            for(let i = data.length - 1; i > 0; i--) {
              if(labelList.includes(data[i]['label'])) {
                dictionaryData[data[i]['label']].push(data[i])
              } else {
                labelList.push(data[i]['label'])
                dictionaryData[data[i]['label']] = [data[i]]
              }
            }
            updateAllDictionaryData(dictionaryData)
          } else {
            message.error('请您先登录', 1.5, () => {
              this.props.history.push('/')
            })
          }
        })
    }
}

const mapStateToProps = (state: StoreType, ownProps?: any) => {
  const { DictionaryView ,Main} = state;
  // console.log(Header)
  return {
    ...ownProps,
    ...DictionaryView,
    ...Main
  };
};

const mapDispatchToProps = {
  updateDictionaryData,
  modifyLabelOfDictionaryData,
  updateAllDictionaryData
};




export default connect(mapStateToProps,mapDispatchToProps)(DictControl)