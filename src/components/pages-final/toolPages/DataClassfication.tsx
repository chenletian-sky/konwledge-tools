import React, {Component} from 'react';
import { Button, Select, Input, Slider, InputNumber, Row, Col, Table, message, Space } from 'antd';
import ClusteringPlot from '../../ClusteringPlot';
import WordsCloud from '../../WordCloud/yu';
import { Redirect, Route , Switch} from 'react-router-dom';
import DataVisual from './DCFRoutes/DataVisual';
import RawText from './DCFRoutes/RawText';
import AfterMatchText from './DCFRoutes/AfterMatchText';
import axios, { AxiosResponse } from 'axios';
import { PATH } from '../../../types/actionTypes';
import { InitMarkText, MarkTextsDataType, StoreType, TextsDataType } from '../../../types/propsTypes';
import { updateAllTextsData, updateMarkTextData } from '../../../action';
import { connect } from 'react-redux';
// import { Properties } from 'xlsx';

interface samplingData{
  [key:string]:
    Array<{
      class_id:number,
      index:string,
      position:[string],
      sentence:string
    }>
}

const { Option } = Select;
interface DataClassficationProps {
  history:any,
  updateMarkTextData: typeof updateMarkTextData,
  parentFunction?:any
}
interface DataClassficationState {
  inputValue:number,
  textData:TextsDataType,
  completeArray:Array<number>,
  markTextData:MarkTextsDataType,
  selectButton:string
}
class DataClassfication extends Component <DataClassficationProps, DataClassficationState>{
    public constructor(props : DataClassficationProps) {
        super(props)
        this.state = {
          inputValue:45,
          textData:[],
          completeArray:[],
          markTextData:[],
          selectButton:""
        }
    }

    onChange = (value: any) => {
      this.setState({
        inputValue: value,
      });
    };

    

    public render() : JSX.Element {
          const { inputValue } = this.state;
          const topStyle = { width: '100%', height: '45%', fontSize: '16px', fontWeight: 'bold', float: 'left' }
          const titleStyle = { width: '12%', float: 'left' }

          const pmethodstyle = { width: '100%', height: '10%', marginTop: '3%', marginLeft: '5%', float: 'left' }
          const cmethodstyle = { width: '100%', height: '10%', marginLeft: '5%', float: 'left' }
          const sampleStyle = { width: '100%', height: '10%', marginLeft: '5%', float: 'left' }

          const boxStyle = { width: '24%', height: '50%', float: 'left' }
          const smalltitleStyle = { float: 'left', width: '30%', marginLeft: '1%' }
          const InputStyle = { width: '40%', marginLeft: '2%' }
          const buttonStyle = { borderRadius: '5px', width: '80px', backgroundColor: '#066094', border: '1px solid #066094' }

          let textData =  this.state.textData ? this.state.textData : []
          let markTextData = this.state.markTextData ? this.state.markTextData : []

          const {updateMarkTextData} = this.props

          const dataSource = [
            {
              key: '1',
              name: '同义词字典',
              description: '电力领域同义词词典',
              words: '1000',
              dicts: '100Kb',
            },
            {
              key: '2',
              name: '设备字典',
              description: '发电设备字典',
              words: '800',
              dicts: '80Kb',
            },
          ];

          const columns = [
            {
              title: '字典名称',
              dataIndex: 'name',
              key: 'name',
            },
            {
              title: '字典描述',
              dataIndex: 'description',
              key: 'description',
            },
            {
              title: '包含词量',
              dataIndex: 'words',
              key: 'words',
            },
            {
              title: '字典容量',
              dataIndex: 'dicts',
              key: 'dicts',
            },
            {
              title: '操作',
              titleStyle:{
                // fontSize:"20px",
                // textAlign:'center'
              },
              textAlign:"center",
              dataIndex: 'action',
              key: 'action',
              
              render: (number: any,r: any,index: any) => {
                return<Space>
                  <a
                    onClick={()=>{
                      // console.log("dataclass",this.props.parentFunction(null,'flow-btn-4'))
                      // this.props.parentFunction(null,'flow-btn-4')
                    }}
                  >查看</a>
                  <a>导出</a>
                  <a
                    onClick = { (value) => {
                      // console.log("dict",value.currentTarget,r)
                      // axios.get(`${PATH}/api/initTextsWithDic`)
                      axios.post(`${PATH}/api/initTempTextsWithDic`,{withCredentials:true}).then((res:any)=>{
                        if(res.data.status === 400){
                          message.error('初始化失败',1)
                        }else if(res.data.status == 200){
                          message.success('初始化成功',1)
                          
                          axios.get(`${PATH}/get_xferStation` )
                                  .then((res: AxiosResponse<any>) => {
                                    const { data: response } = res;
                                    if (response['status'] === 200 && response['message'] === '获取成功') {
                                      // console.log("before",response.data)
                                      
                                      let fileData = response.data
    
                                      
    
                                      // const fileData = xxdata[0]
                                      // console.log("file",fileData)
                                      
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
                                      
                                      // console.log(after)
                                      
                                      
                                      // updateTextsData(after)
                                      updateMarkTextData(after)
                                      this.setState({
                                        markTextData:after
                                      })
    
                                      axios.get(`${PATH}/delete_xferStation`,{withCredentials:true}).then((res:AxiosResponse<any>) =>{
                                        if(res.data.status === 200){
                                          // console.l
                                          message.success("初始化中转站成功！")
                                        }
                                      })
    
                                      axios.post(`${PATH}/api/update_tempTexts`,after,{withCredentials:true}).then((res:AxiosResponse<any>) => {
                                        // console.log(res.data)
                                        if(res.data.status === 200){
                                          message.success("tempTexts更新成功！")
                                          this.props.history.push('/index/tool/dataClassfication/afterMatchText')
                                          this.setState({
                                            selectButton:"dictRec"
                                          })
                                          // this.props.history.push('/index/mark')
                                          // changeMenuSelect(['mark'])
                                        }else{
                                          message.error("tempTexts更新失败！")
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
                  >匹配</a>
                </Space>
              }
            },
          ];

          return <div
              style={{
                height: "97.6%",
                width: "100%",
                border: "1px solid black",
                // margin:"10px 10px 10px 10px",
                padding: "10px 10px 10px 10px"
              }}
            >

              <span
                style={{
                  position: 'relative',
                  top: "-22px",
                  zIndex: 99,
                  backgroundColor: "white",
                  // fontSize: "20px"
                }}
              >数据预处理</span>
              <div style={{
                marginTop: '-1%',
                marginLeft: '2%',
                width: '100%',
                height: '1%',
                float: 'left',
              }}>
                <div style={{ float: 'left', width: '12%', marginTop: '0.5%' }}>向量化方法</div>
                <Select defaultValue="doc2vec" style={{ width: '12%', float: 'left' }}>
                  <Option value="doc2vec">doc2vec</Option>
                  <Option value="2017">2017</Option>
                </Select>
                <div style={{ float: 'left', width: '8%', marginLeft: '5%', marginTop: '0.5%' }}>向量化参数</div>
                <div style={{ float: 'left', width: '8%', marginLeft: '2%', marginTop: '0.5%' }}>min_count</div>
                <Input style={{ width: '10%', float: 'left' }}></Input>
                <div style={{ float: 'left', width: '8%', marginLeft: '2%', marginTop: '0.5%' }}>size</div>
                <Input style={{ width: '10%', float: 'left' }}></Input>
                <Button style={{ marginLeft: '5%', borderRadius: '5px', width: '80px', backgroundColor: 'rgb(0,68,107)', border: 'rgb(0,68,107)', color: 'white' }}>向量化</Button>
              </div>

              <div style={{
                marginTop: '2%',
                marginLeft: '2%',
                width: '100%',
                height: '1%',
                float: 'left',

              }}>
                <div style={{ float: 'left', width: '12%', marginTop: '0.5%' }}>聚类方法</div>
                <Select defaultValue="doc2vec" style={{ width: '12%', float: 'left' }}>
                  <Option value="doc2vec">Kmeans</Option>
                  <Option value="2017">2017</Option>
                </Select>
                <div style={{ float: 'left', width: '8%', marginLeft: '5%', marginTop: '0.5%' }}>聚类参数</div>
                <div style={{ float: 'left', width: '8%', marginLeft: '2%', marginTop: '0.5%' }}>n_sample</div>
                <Input style={{ width: '10%', float: 'left' }}></Input>
                <div style={{ float: 'left', width: '8%', marginLeft: '2%', marginTop: '0.5%' }}>n_feature</div>
                <Input style={{ width: '10%', float: 'left' }}></Input>
                <Button style={{ marginLeft: '5%', borderRadius: '5px', width: '80px', backgroundColor: 'rgb(0,68,107)', border: 'rgb(0,68,107)', color: 'white' }}>聚类</Button>
              </div>

              <div style={{
                marginTop: '2.5%',
                marginLeft: '2%',
                width: '100%',
                height: '1%',
                float: 'left',

              }}>
                <div style={{ float: 'left', width: '12%', marginTop: '0.5%' }}>采样频率</div>
                <Slider
                  min={1}
                  max={100}
                  onChange={this.onChange}
                  value={typeof inputValue === 'number' ? inputValue : 0} style={{ width: '50%', float: 'left' }} />
                <InputNumber
                  min={"1"}
                  max={"100"}
                  style={{ margin: '0 48px', width: '10%', marginRight: '0%' }}
                  value={inputValue + '%'}
                  onChange={this.onChange}
                />

                <Button style={{ marginLeft: '5%', borderRadius: '5px', width: '80px', backgroundColor: 'rgb(0,68,107)', border: 'rgb(0,68,107)', color: 'white' }}
                  onClick={()=>{
                    // axios.post(`${PATH}/api/init_vec`,{withCredentials:true}).then((res:AxiosResponse<any,any>) =>{
                    //   if(res.data.status === 200 ){
                    //     message.success('初始化成功')
                    //   }
                    // })

                    // console.log(this.state.inputValue)
                    axios.get(`${PATH}/get_scatterData`,{withCredentials:true}).then((res:AxiosResponse<any,any>) => {
                      if(res.data.status === 200 ){
                        let { data:scatterData} = res.data
                        let frequency = this.state.inputValue*0.01
                        let result:samplingData = {}
                        console.log("before",scatterData)
                        for(let i=0;i<10;i++){
                          let temp = scatterData[i]['nodes']
                          result[i] = []
                          // console.log("data",temp)
                          let count = 0
                          result[i] = temp.filter((obj: any,index: any) => {
                            if( this.state.completeArray.includes(parseInt( obj.index )) ){
                              return false
                            }
                            if(count > frequency*temp.length){
                              return false
                            }
                            count ++
                            this.state.completeArray.push( parseInt( obj.index ) )  
                            return true
                            // return this.state.completeArray.includes(parseInt( obj.index )) &&   
                            //  frequency*temp.length
                          })
                          
                        }

                        console.log("beforeFrequency",result)

                        axios.get(`${PATH}/get_texts`,{withCredentials:true}).then((res:AxiosResponse<any,any>) => {
                          if(res.data.status === 200 ){
                            let textsData = res.data.data
                            let afterTextData:TextsDataType = []
                            for(let i=0;i<10;i++){
                              let temp = result[i]
                              for(let j=0;j<temp.length;j++){
                                let index = parseInt( temp[j]['index'] )
                                afterTextData.push(textsData[index])
                              }
                            }
                            this.setState({
                              textData:afterTextData
                            })
                            console.log("textData",afterTextData)

                            axios.post(`${PATH}/api/update_tempTexts`,afterTextData,{withCredentials:true}).then((res:AxiosResponse<any,any>) => {
                              if(res.data.status === 200 ){
                                console.log("成功更新临时数据")
                                this.props.history.push('/index/tool/dataClassfication/rawText')
                                this.setState({
                                  selectButton:"dataResult"
                                })
                              }
                            })
                          }
                        })
                        
                      }
                    })
                  }}
                >采样</Button>
              </div>
              <div style={{ width: '12%', float: 'left', marginLeft: '2%', marginTop: '2.5%' }}>已加载字典</div>
              
              <Table 
                dataSource={dataSource} 
                columns={columns} 
                style={{ marginLeft: '5%', marginRight: '5%', marginTop: '2%', 
                  // textAlign:'center'
              }} 
                pagination={false} 
              />
              
              <Button 
                id="button-dataVisual"
                type={`${this.state.selectButton==='dataVisual' ? "primary" : "default"}` as "link" | "text" | "ghost" | "default" | "primary" | "dashed" | undefined}
                style={{ width: '120px', borderRadius: '5px', marginLeft: '1%' }}
                onClick={() => {
                  this.props.history.push('/index/tool/dataClassfication/dataVisual')
                  this.setState({
                    selectButton:"dataVisual"
                  })
                }}
              >可视化</Button>
              <Button 
                id="button-dataResult"
                type={`${this.state.selectButton==='dataResult' ? "primary" : "default"}` as "link" | "text" | "ghost" | "default" | "primary" | "dashed" | undefined}

                style={{ width: '120px', borderRadius: '5px' }}
                onClick={() => {
                  this.props.history.push('/index/tool/dataClassfication/rawText')
                  this.setState({
                    selectButton:"dataResult"
                  })
                }}
              >数据结果</Button>
              <Button 
              id="button-dictRec"
                // type="primary"
              type={`${this.state.selectButton==='dictRec' ? "primary" : "default"}` as "link" | "text" | "ghost" | "default" | "primary" | "dashed" | undefined}

              style={{ width: '120px', borderRadius: '5px', marginTop: '1%',
                // backgroundColor:"blue"
            }}
                onClick={() => {
                  this.props.history.push('/index/tool/dataClassfication/afterMatchText')
                  this.setState({
                    selectButton:"dictRec"
                  })
                }}
              >字典匹配</Button>
              <Switch>
                <Route path='/index/tool/dataClassfication/dataVisual' component={DataVisual}></Route>
                <Route path='/index/tool/dataClassfication/rawText' 
                  render = {(props) => {
                    return <RawText inheritedData={textData} {...props}  />
                  }}
                ></Route>
                <Route path='/index/tool/dataClassfication/afterMatchText' 
                  render = {(props) => {
                    return <AfterMatchText 
                      parentFunction={this.props.parentFunction}
                      inheritedData={markTextData} 
                      {...props} />
                  }}
                // component={AfterMatchText}
                ></Route>
                <Redirect to='/index/tool/dataClassfication/dataVisual'></Redirect>
              </Switch>
            </div >
    }
}

const mapStateToProps = (state: StoreType, ownProps?: any) => {
  const { DictionaryView } = state;
  // console.log(Header)
  return {
    ...ownProps,
    ...DictionaryView
  };
};

const mapDispatchToProps = {
  updateMarkTextData
  
};


export default connect(mapStateToProps,mapDispatchToProps)(DataClassfication)