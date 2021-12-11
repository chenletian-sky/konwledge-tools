import DownOutlined from '@ant-design/icons/lib/icons/DownOutlined';
import ProCard from '@ant-design/pro-card';
import { Button, Col, Dropdown, Menu, message, Row, Select, Space, Table } from 'antd';
import axios, { AxiosResponse } from 'axios';
import { hierarchy } from 'd3-hierarchy';
import { connect } from 'react-redux';
import { relative } from 'path';
import React, {Component} from 'react';
import { updateMarkTextData } from '../../../action';
import { PATH } from '../../../types/actionTypes';
import { InitMarkText, StoreType } from '../../../types/propsTypes';
import MyLineChart from '../../EchartComponents/MyLineChart';
// import ShowMarkText from '../../OtherView/ShowMarkText';
import ShowTrainText from '../../OtherView/ShowTrainText';
// import TextView from '../../TextView';
import './DictMatchConfig.css'

const {Option} = Select

interface DictMatchConfigProps {
  trainTextData?:any,
  history:any,
  getTrainTextData:any,
  updateMarkTextData:typeof updateMarkTextData

}
interface DictMatchConfigState {

}
class DictMatchConfig extends Component <DictMatchConfigProps, DictMatchConfigState>{
    public constructor(props : DictMatchConfigProps) {
        super(props)
    }

    componentDidMount(){
      false  && (axios.get(`${PATH}/get_xferStation` )
      .then((res: AxiosResponse<any>) => {
        const { data: response } = res;
        if (response['status'] === 200 && response['message'] === '获取成功') {
          
          // console.log("before",response.data)
          
          const fileData = response.data
          
          const after =  fileData.map((value:InitMarkText, i: string)=>{
            let returnValue = {
                text: value['text'],
                key: Number(Math.random().toString().substr(3, 10) + Date.now()).toString(36),
                textArr: value['text'].split('').map((v: any, index: any) => ({
                    text: v,
                    start: index,
                    end: index,
                    label: 'none',
                    color: '',
                }))
            }
            
            for(let i = value['labels'].length - 1; i >= 0; i--) {
                const { start, end, label } = value['labels'][i]
                // console.log("each",start,end,label)
                returnValue['textArr'].splice(start, end - start)
                returnValue['textArr'].splice(start, 0, {
                    text: value['text'].slice(start, end),
                    start,
                    end: end - 1,
                    label,
                    color:'#d1c7b7'
                })
            }

            return returnValue
          })
          
          // console.log("afterData",after)
          
          

          // updateTrainData(after)
          // updateMarkTextData(after)

          axios.get(`${PATH}/delete_xferStation`,{withCredentials:true}).then((res:AxiosResponse<any>) =>{
                      if(res.data.status === 200){
                        // console.l
                        message.success("初始化中转站成功！")
                      }
                    })
          
          axios.post(`${PATH}/update_texts`,after,{withCredentials:true}).then((res:AxiosResponse<any>) => {
            // console.log(res.data)
            if(res.data.status === 200){
              message.success("语料数据更新成功！")
              // this.props.history.push('/index/mark')
              // changeMenuSelect(['mark'])
            }else{
              message.error("语料数据更新失败！")
            }
          })
        } 
      }))
      
    }

    public render() : JSX.Element {
        const  { updateMarkTextData , getTrainTextData} = this.props
        return (
              <div
                style={{
                  height:"100%",
                  width:"100%",
                  border:"1px solid black",
                  // margin:"10px 10px 10px 10px",
                  padding:"10px 10px 10px 10px"
                }}
              >
                
                  <span
                  style={{
                    position:'relative',
                    top:"-20px",
                    zIndex:99,
                    backgroundColor:"white"
                  }}
                >训练模型配置</span>

                <ProCard
                  split='horizontal'
                  bordered
                  headerBordered
                  style={{
                    // height:"100%",
                    width:"100%"
                  }}
                >
                  <ProCard
                    // title="已加载数据"
                  >
                    {/* <div className='ModelDisposition-control'>
                        <span>模型</span>
                        <select className="ModelDisposition-select" defaultValue="BiLSTM" style={{ width: '25%',marginLeft:"7%" }} onChange={function handleChange(value) {console.log(`selected ${value}`);}}>
                            <option value="CNN">BiLSTM</option>
                            <option value="BERT">BERT</option>
                        </select>
                        <button className="ModelDisposition-button"  style={{ marginLeft:'30px',backgroundColor:'rgb(25,121,182)',width:'15%',height:'28px'}}>训练</button>
                    </div>
                        <div className="ModelDisposition-fig">
                            <span id="ModelDisposition-little-title2" style={{float: 'left',marginLeft:"4%"}}>模型评价指标</span>
                        </div> */}
                    {/* <div>
                      
                      
                    </div> */}
                    <div className="ModelDisposition-select-content">
                        <Row >
                          <Col span={3}>
                            <p>模型</p>
                          </Col>

                          <Col span={4} >
                          <Select defaultValue="BiLSTM" style={{ width: 120 }} 
                            // onChange={handleChange}
                            // size="small"
                            dropdownStyle={{
                              width:"100px"
                            }}
                          >
                            <Option value="BiLSTM">BiLSTM</Option>
                            <Option value="BERT">BERT</Option>
                            
                          </Select>
                          </Col>

                          <Col
                            // span={4}
                          >
                            <Button
                              type="primary"
                              size="small"
                              style={{
                                position:"relative",
                                top:"5px"
                              }}

                              onClick = {() => {
                                axios.post(`${PATH}/api/jiaguTrain`,{withCredentials:true}).then((res:any)=>{
                                  if(res.data.status === 400){
                                    message.error('初始化失败',1)
                                  }else if(res.data.status == 200){
                                    message.success('初始化成功',1)
                                    
                                    axios.get(`${PATH}/get_xferStation` )
                                            .then((res: AxiosResponse<any>) => {
                                              const { data: response } = res;
                                              if (response['status'] === 200 && response['message'] === '获取成功') {
                                                
                                                // console.log("before",response.data)
                                                // 数据类型改变为 [ [] , []] 之前的，之后的
                                                let fileData = response.data[0]['now']
                                                
                                                getTrainTextData(response.data[0])
                                                
                                                // console.log("fileData", fileData)
                                                // fileData = fileData[1]
                                                
                                                const after =  fileData.map((value:InitMarkText, i: string)=>{
                                                  let returnValue = {
                                                      text: value['text'],
                                                      key: Number(Math.random().toString().substr(3, 10) + Date.now()).toString(36),
                                                      textArr: value['text'].split('').map((v: any, index: any) => ({
                                                          text: v,
                                                          start: index,
                                                          end: index,
                                                          label: 'none',
                                                          color: '',
                                                      }))
                                                  }
                                                  
                                                  for(let i = value['labels'].length - 1; i >= 0; i--) {
                                                      const { start, end, label } = value['labels'][i]
                                                      // console.log("each",start,end,label)
                                                      returnValue['textArr'].splice(start, end - start)
                                                      returnValue['textArr'].splice(start, 0, {
                                                          text: value['text'].slice(start, end),
                                                          start,
                                                          end: end - 1,
                                                          label,
                                                          color:'#d1c7b7'
                                                      })
                                                  }
              
                                                  return returnValue
                                                })
                                                
                                                console.log("afterData",after)
                                                
                                                
              
                                                 // updateTrainData(after)
              
                                                updateMarkTextData(after)
              
                                                axios.get(`${PATH}/delete_xferStation`,{withCredentials:true}).then((res:AxiosResponse<any>) =>{
                                                            if(res.data.status === 200){
                                                              // console.l
                                                              message.success("初始化中转站成功！")
                                                            }
                                                          })
                                                
                                                axios.post(`${PATH}/update_texts`,after,{withCredentials:true}).then((res:AxiosResponse<any>) => {
                                                  // console.log(res.data)
                                                  if(res.data.status === 200)
                                                  {
                                                    message.success("语料数据更新成功！")
                                                    // this.props.history.push('/index/mark')
                                                    // changeMenuSelect(['mark'])
                                                  }else{
                                                    message.error("语料数据更新失败！")
                                                  }
                                                })
              
                                              } else {
                                                message.error('请您先登录', 1.5, () => {
                                                  this.props.history.push('/')
                                                })
                                              }
                                            })
                                  }
                                })
                              }}
                            >
                              训练
                            </Button>
                          </Col>
                         
                          {/* <select name="" id=""></select> */}
                          
                        </Row>
                        <Row justify="start">
                            <Col span={3}><span id="ModelDisposition-little-title1">模型参数</span></Col>
                            <Col span={4}><span>迭代次数</span></Col>
                            <Col span={6}><input className="ModelDisposition-input" type="text"></input></Col>
                            <Col span={5}><span>权重保存路径</span></Col>
                            <Col span={6}><input className="ModelDisposition-input" type="text"></input></Col>
                        </Row>
                        <Row justify="start" className="ModelDisposition-Row">
                            <Col span={3}></Col>
                            <Col span={4}><span>输入维度</span></Col>
                            <Col span={6}><input className="ModelDisposition-input" type="text"></input></Col>
                            <Col span={5}><span>网络层数</span></Col>
                            <Col span={6}><input className="ModelDisposition-input" type="text"></input></Col>
                        </Row>
                        <Row justify="start" className="ModelDisposition-Row">
                            <Col span={3}></Col>
                            <Col span={4}><span>隐含层维度</span></Col>
                            <Col span={6}><input className="ModelDisposition-input" type="text"></input></Col>
                            <Col span={5}><span>输出维度</span></Col>
                            <Col span={6}><input className="ModelDisposition-input" type="text"></input></Col>
                        </Row>
                    </div>
                    <div 
                      className="lineChart-display"
                      style={{
                        position:"absolute",
                        zIndex:99,
                        top:"-30px",
                        left:"840px",
                        height:"200px",
                        width:"300px"
                      }}
                    >
                      <MyLineChart></MyLineChart>

                    </div>
                    
                  </ProCard>

                  <ProCard
                    // title="匹配查看"
                    split="vertical"
                    bordered
                    headerBordered
                    style={{
                      // height:"10%",
                      // width:"100%"
                    }}
                  >
                    <ProCard
                      colSpan="50%"
                    >
                      <ShowTrainText 
                        // data={}
                        trainTextData = {this.props.trainTextData['pre']}
                        pageSize = {4}
                      ></ShowTrainText>
                       {/* <TextView></TextView> */}
                    </ProCard>
                    <ProCard>
                      <ShowTrainText
                        trainTextData = {this.props.trainTextData['now']}
                        pageSize = {4}
                      ></ShowTrainText>
                      {/* <ShowMarkText></ShowMarkText> */}
                       {/* <TextView></TextView> */}
                    </ProCard>
                   
                    
                  </ProCard>

                </ProCard>
                  
                
              </div>
        )
    }
}

const mapStateToProps = (state:StoreType, ownProps?: any) => {
	const { TrainView , MenuView} = state
	// console.log(Header)
	return {
			...ownProps,
			// ...TrainView,
      // ...MenuView
	}
}

const mapDispatchToProps = {
  // getTrainTextData,
  updateMarkTextData
}


export default connect(mapStateToProps,mapDispatchToProps)( DictMatchConfig);



{/* <Table 
                      columns={
                        [
                          {
                            title: '字典名称',
                            dataIndex: 'name',
                            key: 'name',
                            width:"20%",
                            render: text => <a>{text}</a>,
                          },
                          {
                            title: '字典描述',
                            dataIndex: 'describe',
                            width:"30%",
                            key: 'age',
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
                                
                                <a>查看</a>
                                <a>导出</a>
                                
                              </Space>
                            ),
                          },
                        ]
                      } 
                      dataSource={
                        [
                          {
                            key: '1',
                            name: 'text_name',
                            describe: 'describe',
                            size: '10000',
                            capacity: '100k',
                          },
                          {
                            key: '2',
                            name: 'text_name_2',
                            describe: 'describe_2',
                            size: '8000',
                            capacity: '80k',
                          },
                          // {
                          //   key: '3',
                          //   name: 'text_name_3',
                          //   describe: 'describe_3',
                          //   size: '6000',
                          //   capacity: '60k',
                          // }
                        ]
                      } 
                    /> */}