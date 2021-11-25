import React, { Component, Key } from 'react';
import { Input, Modal, Table, Tag, Popover, Button, message } from 'antd';
import 'antd/dist/antd.css';
import Icon, { PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
// import $ from 'jquery'
import { ColorResult, SketchPicker } from 'react-color';
import { SettingIcon } from './Icon';
import { connect } from 'react-redux';
import { FontObject, InitMarkText, MarkTextsDataType, MarkViewStoreType, MenuStoreType, StoreType } from '../types/propsTypes';
import { updateMarkTextData, updateTrainData, updateTrainTextTablePage ,updateTrainDataByDelete, changeMenuSelect} from '../action';
import { updateTextsData } from '../action';
import axios, { AxiosResponse } from 'axios';
import { PATH } from '../types/actionTypes';


interface TrainViewProps  {
  history: any,
  data:MarkTextsDataType,
  current:number,
	TrainView:MarkViewStoreType,
  MenuView:MenuStoreType
  // updateTextTablePage: typeof updateTextTablePage,
	updateMarkTextData: typeof updateMarkTextData,
	updateTextsData: typeof updateTextsData,
	updateTrainData: typeof updateTrainData,
  updateTrainTextTablePage: typeof updateTrainTextTablePage,
  updateTrainDataByDelete: typeof updateTrainDataByDelete,
  changeMenuSelect : typeof changeMenuSelect
}
interface TrainViewState {
  editKey: string,
	labels: Array<{
		color: string,
		name: string,
		key: string
	}>,
	inputVisible: boolean,
	labelSettingConfig: {
		label: string,
		color: string,
		key: string
	},
	popoverVisibleName: string,
	selectedRowKeys: Array<Key>,
	selectedRows: MarkTextsDataType,
}
class TrainView extends Component <TrainViewProps, TrainViewState>{
    private startIndex: number
    private endIndex: number
    private columns: any
    private input: any
    public constructor(props : TrainViewProps) {
        super(props)
        this.startIndex = -1
        this.endIndex = -1
        this.state = {
          editKey: '',
          inputVisible: false,
          popoverVisibleName: '',
          selectedRowKeys: [],
          selectedRows: [],
          labelSettingConfig: {
            label: '',
            color: '',
            key: '',
          },
          labels: [
            {
              color: '#516b91',
              name: '人名',
              key: 'p'
            }, {
              color: '#59c4e6',
              name: '地名',
              key: 'd'
            }, {
              color: '#edafda',
              name: '时间',
              key: 't'
            }, {
              color: '#d1c7b7',
              name: '设备',
              key: 'e'
            }
          ],
        }

        this.columns = [
          {
            title: <div style={{
              width: '100%',
              textAlign: 'center'
            }}>
              文本
            </div>,
            dataIndex: 'textArr',
            key: 'text',
            align: 'left',
            render: (text: Array<FontObject>, record: unknown, index: number) => {
              const { data, current, updateMarkTextData, updateTextsData } = this.props
              return (
                <div 
                // onMouseUp={
                //   () => {
                //     let start = Math.min(this.startIndex, this.endIndex)
                //     let end = Math.max(this.startIndex, this.endIndex)
                //     if (text.slice(start, end + 1).map((font: FontObject) => font['text']).join('').includes(getSelection()?.toString() as string) && getSelection()?.toString()) {
                //       const textBySelect: string = getSelection()?.toString() as string;
                //       start = start + text.slice(start, end + 1).map((font: FontObject) => font['text']).join('').indexOf(textBySelect);
                //       end = start + textBySelect.length - 1;
                //       let startIndex = data[current * 10 - 10 + index]['textArr'][start]['start']
                //       data[current * 10 - 10 + index]['textArr'].splice(start, end + 1 - start)
                //       data[current * 10 - 10 + index]['textArr'].splice(start, 0, {
                //         text: textBySelect,
                //         start: startIndex,
                //         end: startIndex + textBySelect.length - 1,
                //         label: 'uncertain',
                //         color: 'blue',
                //         _id: Number(Math.random().toString().substr(3, 10) + Date.now()).toString(36)
                //       })
                //       updateMarkTextData([...data])
                //       updateTextsData([...data])
                //       // labelRecord[current * 10 - 10 + index].push({
                //       // 	start: startIndex,
                //       // 	end: endIndex,
                //       // 	label: 'none',
                //       //   text: textBySelect,
                //       //   color: 'blue'
                //       // })
                //       // updateMarkRecord([...labelRecord])
                //     }
                //     getSelection()?.removeAllRanges()
                //     this.startIndex = this.endIndex = -1
                //   }
                // }
                >
                  {
                    text.map((value: FontObject, i: number) => {
                      // console.log('r', labelRecord)
                      // const recordIndex = labelRecord[current * 10 - 10 + index].findIndex((r: { start: number; end: number; label: string; text: string; color: string }) => r['text'] === value )
                      if (!value['text']) return '';
                      if (value['text'].length <= 1 && value['label'] === 'none') {
                        return (
                          <div key={i} style={{
                            display: 'inline-block',
                          }} onMouseDown={
                            () => {
                              this.startIndex = i
                            }
                          } onMouseOver={
                            () => {
                              this.endIndex = i
                            }
                          } onMouseUp={
                            () => {
                              this.endIndex = i
                            }
                          }>
                            {value['text']}
                          </div>
                        )
                      } else {
                        return (
                          <Tag key={i} color={value['color']} 
                          // closable
                            icon={<Icon component={SettingIcon} onClick={
                              () => {
                                
                              }
                            } />}
                            style={{
                              marginLeft: '5px'
                            }} 
                            // onClose={
                            //   () => {
                            //     // const { data, current, updateMarkTextData } = this.props
                            //     const arr: Array<FontObject> = value['text'].split('').map((str: string, index: number) => ({
                            //       text: str,
                            //       start: value['start'] + index,
                            //       end: value['start'] + index,
                            //       label: 'none',
                            //       color: 'blue'
                            //     }))
                            //     data[current * 10 - 10 + index]['textArr'].splice(i, 1)
                            //     // console.log(v, v.split(''));
                            //     data[current * 10 - 10 + index]['textArr'].splice(i, 0, ...arr)
                            //     // delete nameToColor[value]
                            //     // labelRecord[current * 10 - 10 + index] = labelRecord[current * 10 - 10 + index].filter((value: { start: number; end: number; label: string; text: string; color: string }) => (
                            //     //   value['text'] !== v
                            //     // ))
                            //     // console.log('.....', labelRecord)
                            //     // labelRecord[current * 10 - 10 + index].splice(j, 1)
                            //     // updateMarkRecord(labelRecord)
                            //     updateMarkTextData([...data])
                            //     updateTextsData([...data])
                            //     // this.setState({  })
                            //   }
                            // }
                            >
                            {value['text']}
                          </Tag>
                        )
                      }
                    })
                  }
                </div>
              )
    
            }
          }
        ]
    }

    public render() : JSX.Element {
        const { labels, inputVisible, labelSettingConfig, popoverVisibleName, selectedRowKeys, selectedRows } = this.state
        const { history, current, data, updateTextsData, updateTrainData,updateTrainDataByDelete, updateMarkTextData,updateTrainTextTablePage ,changeMenuSelect} = this.props
        // if ()
        // console.log(data[0]);
        return (
          <div style={{
            width: '100%',
            height: '450px',
            // backgroundColor: 'red'
            // borderBottom: '1px solid black'
          }}>
            
            <div style={{
              width: '100%',
              height: '50px',
              padding: '10px',//rgb(255, 255, 255)
              // backgroundColor: 'red'
              // position: 'absolute'
            }}>
              {
                labels.map((value: { color: string; name: string; key: string; }, index: number) => (
                  <Popover title='标签设置' visible={popoverVisibleName === value['name']} key={'label' + index}
                    placement='bottomLeft'
                    // content={
                    //   <div style={{
                    //     width: '100%',
                    //     height: '100px',
                    //     lineHeight: '30px',
                    //     // backgroundColor: 'red',
                    //   }}>
                    //     <div style={{
                    //       height: '30px'
                    //     }}>
                    //       标签名：<Input value={labelSettingConfig.label} size='small' onChange={
                    //         (e) => {
                    //           labelSettingConfig.label = e.target.value
                    //           this.setState({ labelSettingConfig: { ...labelSettingConfig } })
                    //         }
                    //       } style={{
                    //         width: '100px'
                    //       }} />
                    //     </div>
                    //     <div style={{
                    //       height: '30px'
                    //     }}>
                    //       快捷键：
                    //       <div style={{
                    //         display: 'inline-block',
                    //         // backgroundColor: 'blue',
                    //         height: '30px'
                    //       }}>
                    //         Ctrl + &nbsp;
                    //       </div>
                    //       <Input maxLength={1} value={labelSettingConfig.key} size='small' onChange={
                    //         (e) => {
                    //           labelSettingConfig.key = e.target.value
                    //           this.setState({ labelSettingConfig: { ...labelSettingConfig } })
                    //         }
                    //       } style={{
                    //         width: '30px'
                    //       }} />
                    //     </div>
                    //     <div style={{
                    //       height: '30px',
                    //       // po
                    //     }}>
                    //       颜色：
                    //       <Popover title='拾色器' placement='left' trigger='click'
                    //         content={
                    //           <SketchPicker color={labelSettingConfig.color}
                    //             onChange={
                    //               (color: ColorResult) => {
                    //                 labelSettingConfig.color = color.hex
                    //                 this.setState({ labelSettingConfig })

                    //               }
                    //             }
                    //           />
                    //         }
                    //       >
                    //         <div style={{
                    //           width: '20px',
                    //           height: '20px',
                    //           transform: 'translate(15px, 5px)',
                    //           display: 'inline-block',
                    //           backgroundColor: labelSettingConfig.color
                    //         }}></div>
                    //       </Popover>
                    //       <Button type='primary' size='small' style={{
                    //         float: 'right',
                    //         transform: 'translate(-5px, 2.5px)',
                    //       }} onClick={
                    //         () => {
                    //           // for(let i = labelRecord.length - 1; i >= 0; i--) {
                    //           // 	for(let j = labelRecord[i].length - 1; j >=0; j--) {
                    //           // 		if(labelRecord[i][j]['label'] === labels[index]['name']) {
                    //           // 			labelRecord[i][j]['label'] = labelSettingConfig.label
                    //           // 			labelRecord[i][j]['color'] = labelSettingConfig.color
                    //           // 		}
                    //           // 	}
                    //           // }
                    //           // labels[index] = {
                    //           // 	name: labelSettingConfig.label,
                    //           // 	key: labelSettingConfig.key,
                    //           // 	color: labelSettingConfig.color
                    //           // }
                    //           // this.setState({ labels, popoverVisibleName: '' })
                    //           // updateMarkRecord(labelRecord)
                    //         }
                    //       }>
                    //         确定
                    //       </Button>
                    //     </div>
                    //   </div>
                    // }
                  >
                    <Tag  color={value['color']} key={'name' + index}
                      icon={<Icon component={SettingIcon} 
                      // onClick={
                      //   () => {
                      //     const labelSettingConfig = {
                      //       label: value['name'],
                      //       color: value['color'],
                      //       key: value['key']
                      //     }
                      //     const name = popoverVisibleName === value['name'] ? '' : value['name']
                      //     this.setState({ labelSettingConfig, popoverVisibleName: name })
                      //   }
                      // } 
                      />}
                      style={{
                        userSelect: 'none'
                      }}
                      // onClose={
                      //   (e) => {
                      //     e.preventDefault()
                      //     Modal.confirm({
                      //       title: '警告',
                      //       icon: <ExclamationCircleOutlined />,
                      //       content: '请确认是否要删除标签：' + value['name'],
                      //       okText: '确认',
                      //       cancelText: '取消',
                      //       onOk: () => {
                      //         labels.splice(index, 1)
                      //         this.setState({ labels })
                      //       }
                      //     });
                      //   }
                      // }
                      >
                      {/* {value['name'] + ' [' + value['key'] + ']'} */}
                      {value['name']}
                    </Tag>
                    
                  </Popover>
                ))
              }
              {/* {
                inputVisible && (
                  <Input
                    ref={
                      (input) => {
                        this.input = input
                      }
                    }
                    type="text"
                    size="small"
                    style={{ width: 78 }}
                    onBlur={
                      (e) => {
                        this.setState({ inputVisible: false })
                        if (!e.target.value) return;
                        labels.push({
                          name: e.target.value,
                          color: `#${Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6, '0')}`,
                          key: 'q'
                        })
                        this.setState({ labels })
                      }
                    }
                    onPressEnter={
                      (e) => {
                        this.setState({ inputVisible: false })
                        if (!(e.target as any).value) return;
                        labels.push({
                          name: (e.target as any).value,
                          color: `#${Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6, '0')}`,
                          key: 'q'
                        })
                        this.setState({ labels })
                      }
                    }
                  />
                )
              }
              {
                !inputVisible &&
                <Tag className="site-tag-plus" onClick={
                  () => {
                    this.setState({ inputVisible: true }, () => {
                      (this.input as any).focus();
                    })
                  }
                }>
                  <PlusOutlined /> 添加标签
                </Tag>
              } */}
              
            </div>
            <Table columns={this.columns} dataSource={data} size='small' 
              // scroll={{ y: 400 }}
              pagination={{
                pageSize: 10,
                current,
                simple: true,
                position: ['bottomRight'],
                // showSizeChanger: true,
                onChange: (page: number) => {

                  updateTrainTextTablePage(page)
                  // console.log("trainDataPage",page)
                  // updateTextTablePage(page)
                  // this.setState({ pageSize: (pageSize as number) })
                }
              }}
              rowSelection={{
                selectedRowKeys,
                onChange: (selectedRowKeys, selectedRows) => {
                  // console.log("rowChange",selectedRowKeys,selectedRows)
                  this.setState({ selectedRowKeys, selectedRows})
                  // console.log(selectedRowKeys, selectedRows)
                }
              }}
            />
            <Button type='primary' style={{
              // float: 'left'
              transform: 'translate(10px, -40px)'
            }} onClick={
              () => { 
                // console.log("selectRow",selectedRows,data,selectedRowKeys)
                // console.log("afterFilter",data.filter((value)=>(!selectedRowKeys.includes(value['key'] as string))))
                
                updateTrainDataByDelete(data.filter((value)=>(!selectedRowKeys.includes(value['key'] as string))))
                selectedRows.map((obj)=>{
                  // console.log(obj._id,obj.key)
                  
                  // axios.delete(`${PATH}/delete_trainTexts?_id=${obj._id}&key=${obj.key}`,{withCredentials:true})
                  // axios.delete(`${PATH}/delete_dictionary?&key=${obj.key}`,{withCredentials:true})        
                  axios.delete(`${PATH}/delete_trainTexts?key=${obj.key}`,{withCredentials:true})
                  .then((res:AxiosResponse<any>) => {
                            console.log(res.data)
                            // message.success('删除成功', 1);
                          })
                })
                this.setState({ selectedRowKeys: [], selectedRows: [] })

                // 更新训练集数据
                // updateTrainData(selectedRows)
                // console.log(selectedRowKeys)
                // 过滤被选中的数据 从标注数据中删除
                // updateMarkTextData(data.filter((value: { key?: string | undefined; text: string; label: { start: number; end: number; label: string; }[]; textArr: FontObject[]; }) => !selectedRowKeys.includes(value['key'] as string)))
                // console.log("data",data)
              }
            }>删除</Button>
            <Button type='primary' style={{
              // float: 'left'
              transform: 'translate(20px, -40px)'
            }} onClick={
              () => { 
                // console.log("selectRow",data)
                const {data:originalData} = this.props
                  
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
                                  
                                  let fileData = response.data

                                  fileData = fileData[1]
                                  
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
                                      message.success("语料数据更新成功！")
                                      // this.props.history.push('/index/mark')
                                      changeMenuSelect(['mark'])
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

                  
                
            }}>训练数据</Button>
            <Button type='primary' style={{
              // float: 'left'
              transform: 'translate(30px, -40px)'
            }} onClick={
              () => { 


                updateTrainDataByDelete([])

                axios.delete(`${PATH}/delete_trainTexts_all`,{withCredentials:true}).then((res)=>{
                  if(res.data.status === 200){
                    message.success("训练数据清空成功！")
                  }
                })
              }
            }>清空</Button>
            {/* <Button /> */}
          </div>
        )
          }
}



const mapStateToProps = (state:StoreType, ownProps?: any) => {
	const { TrainView , MenuView} = state
	// console.log(Header)
	return {
			...ownProps,
			...TrainView,
      ...MenuView
	}
}

const mapDispatchToProps = {
  // updateTextTablePage,
	updateMarkTextData,
	updateTextsData,
	updateTrainData,
  updateTrainTextTablePage,
  updateTrainDataByDelete,
  changeMenuSelect
}


export default connect(mapStateToProps, mapDispatchToProps)(TrainView);