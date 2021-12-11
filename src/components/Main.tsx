import React, { Component } from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom'
// antd组件库
import { Layout, Menu, Button, message, Avatar, Dropdown, Select, Progress, Descriptions, Space, Divider, Modal, Spin, Alert } from 'antd';
import 'antd/dist/antd.css';
import { UploadOutlined, PlayCircleOutlined, FileTextOutlined } from '@ant-design/icons';
import Icon, { UserOutlined } from '@ant-design/icons';
// 自定义icon
import { DictionaryIcon, TrainIcon,DataVisualIcon, LabelIcon, MenuLabelIcon, Logo, SaveIcon, importIcon } from './Icon';
// redux
import { connect } from 'react-redux';
import { MainStoreType, StoreType, TableDataType, TextsDataType ,MenuStoreType, TextViewStoreType, MarkViewStoreType, InitMarkText} from '../types/propsTypes';
import { identifyEntity,changeMenuSelect, setLoadingState, updateAllDictionaryData, updateAllTextsData, updateDictionaryData, updateLabelByShow, updateMarkTextData, updateTextsData } from '../action';
// 路由页面
import DictionaryView from './DictionaryView';
import TextView from './TextView';
import MarkView from './MarkView';
import DataVisualView from './DataVisualView';
// 工具库
import $ from 'jquery'
import XLSX from 'xlsx'
import axios, { AxiosResponse } from 'axios';
// 后端路径
import { PATH } from '../types/actionTypes';
import { type } from 'os';
import TrainView from './TrainView';
import MyPieChart from './EchartComponents/MyPieChart';
import BatteryCharge from './Animation/BatteryCharge';
import MyProcess from './Animation/MyProcess';
import ClusteringPlot from './ClusteringPlot/index';
import WordCloud from './WordCloud/yu/index';
import LoadingOutlined from '@ant-design/icons/lib/icons/LoadingOutlined';

// import { DictionaryIcon, TrainIcon } from './Icon'
// import { MainStoreType, StoreType, TextsDataType } from '../types/propsTypes';
// import { connect } from 'react-redux';
// import DictionaryWindow from './DictionaryWindow';
// import { identifyEntity, setLoadingState, updateAllDictionaryData, updateDictionaryData, updateLabelByShow, updateMarkTextData, updateTextsData } from '../action';
// import TextWindow from './TextWindow';
// import MarkView from './MarkView';
// import Loading from './Loading/index';
// import TrainView from './TrainView';

/**
 * 允许跨域携带cookie信息
 */
axios.defaults.withCredentials = true

interface MenuSelectKeyChangeType{
  [index:string]:string
}

const MenuSelectKeyChange:MenuSelectKeyChangeType ={
  "texts":"语料数据",
  'mark':"标注数据",
  'train':"训练数据",
  '':"知识图谱项目"
} 

interface MainProps extends MainStoreType , MenuStoreType,StoreType{
  history: any,
  // MainStoreData:MainStoreType
  TextViewData:TextViewStoreType,
  MarkViewData:MarkViewStoreType,
  TrainViewData:MarkViewStoreType,
  // MenuSelectKey:Array<string>,
  updateAllTextsData: typeof updateAllTextsData,
  updateAllDictionaryData: typeof updateAllDictionaryData,
//   updateLabelByShow: typeof updateLabelByShow,
  updateDictionaryData: typeof updateDictionaryData,
  updateTextsData: typeof updateTextsData,
//   setLoadingState: typeof setLoadingState,
//   identifyEntity: typeof identifyEntity,
  updateMarkTextData: typeof updateMarkTextData,
  changeMenuSelect: typeof changeMenuSelect
}
interface MainState {
  labelList: Array<string>,
  stringList: Array<string>,
  openKeys: Array<string>,
  selectedKeys: Array<string>,
  // menuSelectKeys:Array<string>,
  repositories: Array<{
    name: string,
    repositoryId: string,
  }>,
  isLoading:boolean,
  isUpload:boolean,
  isComplete:boolean
}
class Main extends Component<MainProps, MainState>{
  public constructor(props: MainProps) {
    super(props)
    this.state = {
      labelList: [],
      stringList: [
        // ['dsa', 'gds'], 
        // ['dsa', 'gds'], 
        // ['dsa', 'gds'], 

      ],
      openKeys: ['directory'],
      // menuSelectKeys:['texts'],
      selectedKeys: [],
      repositories: [{ name: '私有仓库', repositoryId: 'private' }],
      isLoading:false,
      isUpload:false,
      isComplete:false
    }
  }

  public render(): JSX.Element {
    const { Header, Sider, Content } = Layout;
    const { SubMenu } = Menu;
    const { Option } = Select;
    const {TextViewData,MarkViewData,TrainViewData} = this.props
    const { labelList, stringList, openKeys, selectedKeys, repositories } = this.state;
    const { history, textsData, dictionaryData ,MenuSelectKey} = this.props;
    const { updateAllTextsData, changeMenuSelect,updateTextsData, updateAllDictionaryData, updateDictionaryData} = this.props;
    
    console.log("MainMenuSelectKeys",MenuSelectKey,dictionaryData)
    // console.log(dictionaryData)
    return (
      <Layout 
      style={{
        height: '100%'
      }}>
        <Sider trigger={null} theme="light">
          <div className="logo" style={{
            width: '100%',
            height: '60px',
            // marginLeft: '2%',
            lineHeight: '60px',
            textAlign: 'center',
            fontSize: '20px',
            fontWeight: 'bold',
            color: 'rgb(13,110,253)',
            userSelect: 'none'
          }} onClick={
            () => {
              history.push('/')
            }
          }>
            <Icon 
            // style={{height:'20px',width:"20px"}} 
            component={Logo}></Icon>
            &nbsp;
            实体抽取工具
          </div>
          <Menu 
            theme="light"
            mode="inline"
            openKeys={openKeys}
            style={{
              fontSize:"20px"
            }}
            selectedKeys={MenuSelectKey} 
            // selectedKeys={this.props.}

            // defaultSelectedKeys={['texts']}
          >
            <SubMenu 
            style={{fontSize:'20px'}}
              key="dictionary" title="字典数据" icon={<Icon component={DictionaryIcon} />} onTitleClick={
              (e) => {
                // console.log(e);
                this.setState({ openKeys: openKeys[0] === e.key ? [] : [e.key] })
              }
            }>
              {
                labelList.map((value: string, index: number) => (
                  <Menu.Item key={value} onClick={
                    () => {
                      // this.props.updateLabelByShow(value)
                      updateDictionaryData(dictionaryData[value])
                      this.setState({ selectedKeys: [value] })
                      history.push('/index/dictionary')
                      
                    }
                  }>
                    {value}
                  </Menu.Item>
                ))
              }
            </SubMenu>
            {/* <SubMenu key="text" title="语料数据" icon={<FileTextOutlined />} onTitleClick={
              (e) => {
                this.setState({ openKeys: openKeys[0] === e.key ? [] : [e.key] })
              }
            }>
              {
                stringList.map((value: string, index: number) => (
                  <Menu.Item key={'text' + index} onClick={
                    () => {
                      history.push('/index/texts')
                      updateTextsData(textsData[index])
                      this.setState({ selectedKeys: ['text' + index] })
                    }
                  }>
                    {value}
                  </Menu.Item>
                ))
              }
            </SubMenu> */}
            <Menu.Item 
              style={{fontSize:'20px'}}
              key={'texts'} icon={<FileTextOutlined />} onClick={
              () => {
                changeMenuSelect(['texts'])
                history.push('/index/texts')
                // updateTextsData(textsData[index])
                // this.setState({ selectedKeys: ['text' + index] })
              }
            }>
              语料数据
            </Menu.Item>

            <Menu.Item 
              style={{fontSize:'20px'}}
              key={'mark'} icon={<Icon component={MenuLabelIcon}/>} onClick={
              () => {
                changeMenuSelect(['mark'])
                history.push('/index/mark')
              }
            }>
              标注数据
            </Menu.Item>

            <Menu.Item 
              style={{fontSize:'20px'}}
              key={'train'} icon={<Icon component={TrainIcon}/>} onClick={
              () => {
                changeMenuSelect(['train'])
                history.push('/index/train')
              }
            }>
              训练数据
            </Menu.Item>
            
            
            <SubMenu
              key='uploadData'
              title="上传数据"
              icon={<Icon component={importIcon}/>}
              style={{
                fontSize:"20px"
              }}
              onTitleClick={(e)=>{
                this.setState({ openKeys: openKeys[0] === e.key ? [] : [e.key] })
              }}
            >
              <Menu.Item
                onClick={()=>{
                  this.setState({
                    isUpload:true
                  })
                  $('input#dict-files').click()
                  this.setState({ openKeys: ['dictionary'] })
                }}
              >
                上传字典
              </Menu.Item>
              <Menu.Item
                onClick={()=>{
                  
                  $('input#text-files').click()
                  // const path: string = ipcRenderer.sendSync(UPLOAD_TEXTS_DATA)
                  // if (path === '') {
                  //   message.success('您已取消上传', 1);
                  //   return;
                  // }
                  // stringList.push([path.split('\\')[path.split('\\').length - 1], path])
                  let index = stringList.length;
                  // for (let i = 0; i < stringList.length - 1; i++) {
                  //   if (stringList[i][0] === path.split('\\').pop() && stringList[i][1] === path) {
                  //     stringList.pop()
                  //     index = i
                  //     break;
                  //   }
                  // }
                  // this.setState({
                  //   isLoading:true
                  // })
                  
                  this.setState({ openKeys: ['text'], selectedKeys: ['text' + index] })
                  // this.readTxtFile(path)
                }}
              >
                上传语料
              </Menu.Item>
            </SubMenu>

            <Menu.Item
              icon={<DataVisualIcon/>}
              onClick={()=>{
                this.setState({
                  isLoading:true
                })
                axios.post(`${PATH}/api/init_vec`,{withCredentials: true}).then((res:AxiosResponse<any,any>) => {
                  if(res.data.status === 200 ){
                    this.setState({
                      isLoading:false,
                      // isComplete:true
                    })

                    
                  }
                })
              }}
            >
              &nbsp;数据分类
            </Menu.Item>
            <Menu.Item
              // icon={<Icon component={LabelIcon} />}
              icon={<TrainIcon/>}
              onClick={()=>{
                axios.post(`${PATH}/api/initTextsWithDic`,{withCredentials:true}).then((res:any)=>{
                  if(res.data.status === 400){
                    message.error('初始化失败',1)
                  }else if(res.data.status == 200){
                    message.success('初始化成功',1)
                    
                    axios.get(`${PATH}/get_xferStation` )
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
                                
                                // console.log(after)
                                
                                
                                updateTextsData(after)
                                updateMarkTextData(after)

                                axios.get(`${PATH}/delete_xferStation`,{withCredentials:true}).then((res:AxiosResponse<any>) =>{
                                  if(res.data.status === 200){
                                    // console.l
                                    message.success("初始化中转站成功！")
                                  }
                                })

                                axios.post(`${PATH}/update_texts`,after,{withCredentials:true}).then((res:AxiosResponse<any>) => {
                                  // console.log(res.data)
                                  if(res.data.status === 200){
                                    message.success("语料更新成功！")

                                    this.props.history.push('/index/mark')
                                    changeMenuSelect(['mark'])
                                  }else{
                                    message.error("语料更新失败！")
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
              &nbsp;匹配字典
            </Menu.Item>

            <SubMenu
              key={"exportData"}
              title="导出数据"
              icon={<UploadOutlined/>}
              style={{
                fontSize:"20px"
              }}
              onTitleClick={(e)=>{
                this.setState({ openKeys: openKeys[0] === e.key ? [] : [e.key] })
              }}
            >
              <Menu.Item>导出excel</Menu.Item>
              <Menu.Item>导出json</Menu.Item>
              <Menu.Item>导出txt</Menu.Item>
              {/* <Menu.Item></Menu.Item> */}
            </SubMenu>
            
            {/* <Menu.Item 
              style={{fontSize:'20px'}}
              key="dataVisualization" icon={<DataVisualIcon/>} onClick={
              () => {
                history.push('/index/dataVisualization')
                // updateTextsData(textsData[index])
                // this.setState({ selectedKeys: ['text' + index] })
              }
            }>
              &nbsp;数据可视化
            </Menu.Item> */}
           
          </Menu>
        </Sider>
        {
          
            // <Spin
            //   size="large"
            //   indicator={<LoadingOutlined spin />}
            //   style={{
            //     height:"100%",
            //     width:"100%",
            //     position:'relative',
            //     top:"400px"
            //   }}
            // >
            // </Spin>
            
          <Layout className="site-layout"  style={{height:'100%'}}>
          <Header className="site-layout-background" style={{ padding: 0, backgroundColor: 'rgb(22,21,204)' }}>
            {/* <Menu mode="horizontal" style={{ fontSize: '1.5em', width: '100%', color: 'white', backgroundColor: 'rgb(22,21,204)' }}>
              <Menu.Item key={'create'} 
              // icon={<Icon component={CreateIcon}></Icon>}
                onClick={
                () => {

                }
              }>
                创建仓库
              </Menu.Item>
              <SubMenu key="personalRes" 
              // icon={<Icon component={PersonIcon}></Icon>}
                title="个人仓库">
                <Menu.Item>仓库1</Menu.Item>
                <Menu.Item>仓库2</Menu.Item>
              </SubMenu>
            </Menu> */}
            <Avatar size='default' icon={<UserOutlined />} style={{
              float: 'right',
              // marginTop: '15px',
              // marginRight: '15px'
              marginTop: '-47px',
              marginRight: '15px'
            }}/>
          </Header>
          <Layout style={{height:'100%',width:'100%'}}>
            <Content className="site-layout-background"
              style={{
                height:'100%',
                // width:'75%'
                // margin: '24px 16px',
                // padding: 24,
                // minHeight: 600,
              }}
            >

              {/* <Loading /> */}
            <div style={{ width: '60%', height: '96%', marginTop: '1%', marginLeft: '1%', background: 'white', float: 'left' }}>
              <Menu mode="horizontal" style={{ fontSize: '1em', width: '100%', color: 'white', backgroundColor: 'rgb(120,166,234)' }}>
              <div style={{ fontSize: '1.2em', paddingLeft: '1%' }}>
              {
                this.props.MenuSelectKey[0] ? MenuSelectKeyChange[this.props.MenuSelectKey[0]] :
                "知识图谱项目"
              }</div>
                <div style={{ paddingLeft: "59%" }}>
                  <input type="file"  id="dict-files" accept='application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
                    style={{ display: 'none' }} onChange={
                      (event: React.ChangeEvent<HTMLInputElement>) => {
                        const fileByRead:FileList = event.currentTarget.files as FileList
                        console.log("fileByRead",fileByRead[0])
                        const reader = new FileReader(); 
                        reader.readAsArrayBuffer(fileByRead[0]); //读取文件的内容
                        reader.onload = () => {
                          // console.log(reader.result)
                          const { result } = reader;
                          console.log("result",result)
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
                          // axios.post(`${PATH}/upload_dictionary`, dataByAdd, {withCredentials: true})
                          //   .then((res:AxiosResponse<any>) => {
                          //     if(res.data.status){
                          //       // this.setState({
                          //       //   isUpload:false
                          //       // })
                          //     }
                          //     // console.log(res.data)
                          //   })
                          history.push('/index/dictionary')
                          message.success('您已成功上传的字典数据', 1)
                          updateAllDictionaryData(JSON.parse(JSON.stringify(dictionaryData)))
                          this.setState({ labelList })
                        }
                      }
                    }
                  />
                  {/* <Button icon={<UploadOutlined />} onClick={
                    () => {
                      $('input#dict-files').click()
                      this.setState({ openKeys: ['dictionary'] })
                    }
                  }>
                    上传字典
                  </Button> */}
                  <input type="file" id="text-files" placeholder='a.txt' accept='text/plain' style={{
                    display: 'none'
                  }} onChange={
                    (event: React.ChangeEvent<HTMLInputElement>) => {
                      const fileByRead:FileList = event.currentTarget.files as FileList
                      const name:string = fileByRead[0].name
                      const reader = new FileReader(); 
                      reader.readAsText(fileByRead[0]); //读取文件的内容
                      reader.onload = () => {
                        // console.log(this.result)
                        const { result } = reader;
                        const data:Array<string> = (result as string).split('\r\n').filter((value: string) => value !== '')
                        // console.log(data)
                        const textsData:TextsDataType = data.map((value: string) => ({
                          key: Number(Math.random().toString().substr(3, 10) + Date.now()).toString(36),
                          text: value,
                          label: [],
                          // textArr: []
                          textArr: value.split('').map((font:string, index:number) => ({
                            start: index,
                            end: index,
                            text: font,
                            label: 'none',
                            color: 'blue'
                          }))
                        }))
                        updateTextsData(textsData)
                        // console.log("textData",textsData)
                        // axios.post(`/upload_texts`, textsData, {withCredentials: true})
                        
                        // this.setState({
                        //   isUpload:true
                        // })

                        axios.post(`${PATH}/upload_texts`, textsData, {withCredentials: true})
                            .then((res:AxiosResponse<any>) => {
                              if(res.data.status === 200){
                                this.setState({
                                  // isLoading:true
                                })

                                
                                
                              }
                              // console.log(res)
                            }).finally(()=>{
                              console.log('finally')
                              
                            })
                        

                        history.push('/index/texts')
                        changeMenuSelect(['texts'])
                        message.success('您已成功上传的语料数据', 1)
                        // this.setState({
                        //   isComplete:true
                        // })
                        // updateAllTextsData(textsData)
                        
                        // stringList.push(name)
                        // this.setState({ stringList })
                      }
                    }
                  } />
                  {/* <Button icon={<UploadOutlined />} onClick={
                    () => {
                      $('input#text-files').click()
                      // const path: string = ipcRenderer.sendSync(UPLOAD_TEXTS_DATA)
                      // if (path === '') {
                      //   message.success('您已取消上传', 1);
                      //   return;
                      // }
                      // stringList.push([path.split('\\')[path.split('\\').length - 1], path])
                      let index = stringList.length;
                      // for (let i = 0; i < stringList.length - 1; i++) {
                      //   if (stringList[i][0] === path.split('\\').pop() && stringList[i][1] === path) {
                      //     stringList.pop()
                      //     index = i
                      //     break;
                      //   }
                      // }
                      this.setState({ openKeys: ['text'], selectedKeys: ['text' + index] })
                      // this.readTxtFile(path)
                    }
                  }>
                    上传语料
                  </Button> */}
                  {/* <Button icon={<PlayCircleOutlined />} onClick={
                    () => {
                      // setLoadingState(true)
                      // identifyEntity()
                      // ipcRenderer.send(OPEN_MODEL_CONFIG_WINDOW)
                      axios.post(`${PATH}/api/jiaguTrain`,{withCredentials:true}).then((res:any)=>{
                        if(res.data.status === 400){
                          message.error("调用失败")
                        }else{
                          
                          message.success("调用成功")
                        }
                      })
                    }
                  }>
                    实体标注
                  </Button> */}
                </div>
                
              </Menu>
                  
                <Switch>
                  <Route path="/index/dictionary" component={DictionaryView} />
                  <Route path="/index/texts" component={TextView}/>
                  <Route path='/index/mark' component={MarkView} />
                  <Route path='/index/dataVisualization' component={DataVisualView} />
                  {/* <Route path='/index/' component={} /> */}

                  <Route path='/index/train' component={TrainView} />
                  
                  {/* <Route path="/force-directed" component={ForceDirectedView} exact/> */}
                </Switch>
              </div>

              <div style={{ width: '38%', height: '100%', marginLeft: '1%', background: 'white', float: 'left' }}>
                
                <div
                  id='ClusteringPlot'
                  style={{
                    height:'50%',
                    width:"100%"
                  }}
                >
                  {
                    this.state.isLoading ? (<Spin></Spin>) :(<ClusteringPlot history={this.props.history}/>)
                  }
                </div>

                  <div
                    style={{
                      height:'1%',
                      width:"100%",
                      backgroundColor:"rgb(241, 241, 241)"

                    }}
                  >

                  </div>
                {/* <Divider
                  style={{
                    height:"0px"
                  }}
                ></Divider> */}

                <div
                  id='WordCloud'
                  style={{
                    height:'49%',
                    width:"100%"
                  }}
                >
                  {
                    this.state.isLoading ? (<Spin></Spin>) :(<WordCloud 
                      wordCloudClass = {this.props.classId}
                      isComplete={this.state.isComplete}
                    />)
                  }
                  
                </div>

                {/* <div style={{ marginTop: '10%' ,height:"200px"}}>
                  <MyPieChart height={'100%'} width={''} />
                </div>

                <div style={{ marginTop: '10%' }}>
                  <h1 style={{ marginLeft: '5%' ,fontSize:"20px",fontWeight:"bold"}}>当前个人完成进度：</h1>
                  

                  <div className="my-process"
                    style={{
                      backgroundColor: "rgb(106, 179, 248)",
                      // border: 4px solid var(--border-color),
                      // color: var(--border-color);
                      borderRadius: "40px 40px 40px 40px",
                      height: "150px",
                      width: "330px",
                      margin: "30px 30px",
                      display: "flex",
                      flexDirection: "row",
                      overflow: "hidden"
                    }}
                  >
                    {
                      TextViewData.data.length === 0 ? '' : (
                        <>
                          <div className="complete" id="complete"
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              justifyContent: "center",
                              textAlign: "center",
                              flex: "1",
                              transition: "0.3s ease",
                              // fontWeight: "bold",
                              // fontSize: "30px",
                            }}
                          >
                            {
                              Math.round( (TrainViewData.data.length / MarkViewData.data.length)*100) < 1 ? "" : (
                                <>
                                <span id="liters">已完成</span>
                                <small 
                                  style={{
                                    fontWeight: "bold",
                                    fontSize: "30px",
                                  }}
                                >{Math.round( (TrainViewData.data.length / MarkViewData.data.length)*100)}</small>
                                </>
                              )
                            }
                          </div>

                          <div className="undone" id="undone"
                            style={{
                              backgroundColor: "rgb(255, 116, 109)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              // fontWeight: "bold",
                              // fontSize: "30px",
                              width:`${100 - Math.round( (TrainViewData.data.length / MarkViewData.data.length)*100)}%`,
                              // height: "0",
                              transition: "0.3s ease"
                            }}
                              
                          >
                            <div className="undone-text" 
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                textAlign: "center",
                                flex: "1",
                                transition: "0.3s ease",
                                // fontWeight: "bold",
                                // fontSize: "30px",
                              }}
                            >
                              {
                                Math.round( 100 - (TrainViewData.data.length / MarkViewData.data.length)*100) < 1 ? "" : (
                                  <>
                                    <span id="undone-percent"
                                        style={{
                                          // fontWeight: "bold",
                                          // fontSize: "30px",
                                        }}
                                      >未完成</span>
                                      <small 
                                        style={{
                                          fontWeight: "bold",
                                          fontSize: "30px",
                                        }}
                                      >
                                        {Math.round(100 -  (TrainViewData.data.length / MarkViewData.data.length)*100)}
                                      </small>
                                  </>
                                )
                              }
                              
                            
                            </div>
                          </div>
                        </>
                      )
                    }

                    

                  </div>

                </div>
                
                <div style={{ marginTop: '0%' }}>
                  <h1 style={{ marginLeft: '5%' ,fontSize:"20px",fontWeight:"bold"}}>当前项目完成进度：</h1>
                  <BatteryCharge/>

                </div> */}
              
              </div>
              
            </Content>
            
          </Layout>
        </Layout>
        }
        
      </Layout>
    )
  }

  public componentDidMount(): void {
    const { labelList } = this.state;
    const { history, updateAllDictionaryData, updateTextsData, updateMarkTextData } = this.props;
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
    axios.get(`${PATH}/get_texts` )
      .then((res: AxiosResponse<any>) => {
        const { data: response } = res;
        if (response['status'] === 200 && response['message'] === '获取成功') {
          updateTextsData(response.data)
          updateMarkTextData(response.data)
        } else {
          message.error('请您先登录', 1.5, () => {
            this.props.history.push('/')
          })
        }
      })
    
    axios.get(`${PATH}/get_wordCloudData`,{withCredentials:true}).then((res:AxiosResponse<any,any>) => {
      // console.log('wordCloudData',res.data)
      if(res.data.data === {}){
        this.setState({
          isComplete:true
        })
      }
    })

  }



}


const mapStateToProps = (state: StoreType, ownProps?: any) => {
  const { Main,MenuView ,TextView,MarkView,TrainView} = state
  // console.log()
  return {
    ...ownProps,
    ...Main,
    ...MenuView,
    TextViewData:TextView,
    MarkViewData:MarkView,
    TrainViewData:TrainView
  }
}

const mapDispatchToProps = {
  updateAllDictionaryData,
  updateLabelByShow,
  updateDictionaryData,
  updateAllTextsData,
  updateTextsData,
  setLoadingState,
  identifyEntity,
  updateMarkTextData,
  changeMenuSelect
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);