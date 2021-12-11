import React, {Component} from 'react';
import { Button, Select, Input, Slider, InputNumber, Row, Col, Table, Space, message } from 'antd';
import 'antd/dist/antd.css';
import TrainView from '../../TrainView';
import axios, { AxiosResponse } from 'axios';
import { PATH } from '../../../types/actionTypes';
import { InitMarkText, StoreType } from '../../../types/propsTypes';
import { updateMarkTextData } from '../../../action';
import { connect } from 'react-redux';

const { Option } = Select;

interface TextIdentifyProps {
  history:any,
  parentFunction:any,
  getTrainTextData?:any,
  updateMarkTextData:typeof updateMarkTextData
}
interface TextIdentifyState {

}
class TextIdentify extends Component <TextIdentifyProps, TextIdentifyState>{
    public constructor(props : TextIdentifyProps) {
        super(props)
    }

    

    public render() : JSX.Element {
          const { updateMarkTextData , getTrainTextData} = this.props

          const boxStyle = { height: '30%', width: '100%', marginTop: '2%', marginLeft: '2%', float: 'left' }
          const titleStyle = { width: '10%', float: 'left', marginTop: '0.5%' }
          const buttonStyle = { borderRadius: '5px', width: '80px', backgroundColor: '#066094', border: '1px solid #066094', color: 'white', marginLeft: '3%' }
          return <div style={{ width: '100%', height: '100%' }}>
            <div style={{ width: '100%', height: '20%' }}>
              <div style={boxStyle as React.CSSProperties}>
                <div style={titleStyle as React.CSSProperties}>模型名称</div>
                <Input defaultValue="BiLSTM+CRF" style={{ width: '15%' }}></Input>
              </div>
              <div style={boxStyle as React.CSSProperties}>
                <div style={titleStyle as React.CSSProperties}>权重路径</div>
                <Select defaultValue="doc2vec" style={{ width: '50%', marginTop: '0%', float: 'left' }}>
                  <Option value="doc2vec">doc2vec</Option>
                </Select>
              </div>
              <div style={boxStyle as React.CSSProperties}>
                <div style={titleStyle as React.CSSProperties}>语料数据</div>
                <Input style={{ 
                  position:"relative",
                  left:"-850px",
                  width: '15%' 
                  }}></Input>
                {/* <div style={{ fontSize: '1em', fontWeight: 'bold', float: 'left' }}>
                  <h1>厂语料数据</h1>
                </div> */}
                <div style={{ 
                  marginLeft: '20%', 
                  float: 'left', 
                  width: '50%', 
                  // marginTop: '1%' 
                }}>
                  <Space>
                    <Button 
                      // style={buttonStyle}
                      style={{
                        backgroundColor:"#066094",
                        borderRadius: '5px',
                        color:"white"
                      }}
                      onClick = { (value) => {
                        console.log("button-Value",value)
                        this.props.history.push('/index/tool/dataClassfication/dataVisual')
                        this.props.parentFunction(null,'flow-btn-2')
                      }}
                    >导入语料数据</Button>
                    <Button 
                      style={buttonStyle}
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
                      >识别</Button>
                    <Button style={buttonStyle}>导出</Button>
                  </Space>
                  
                </div>
              </div>
            </div>
            <div style={{width:"100%",height:"80%"}}>
              <TrainView getTrainTextData = {this.props.getTrainTextData}></TrainView>
            </div>
          </div>
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


export default connect(mapStateToProps,mapDispatchToProps)( TextIdentify);