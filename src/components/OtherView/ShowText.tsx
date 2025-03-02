import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Button, Modal, Table, Input, message, Space, TableColumnsType } from 'antd';
import { ExclamationCircleOutlined, DeleteOutlined ,SearchOutlined} from '@ant-design/icons';
import Icon from '@ant-design/icons';
import { saveAs } from 'file-saver';

import { AddIcon, CircleIcon, LabelIcon, SaveIcon, UpdateIcon } from './../Icon';
import { connect } from 'react-redux';
import { FontObject, InitMarkText, MenuStoreType, StoreType, TextsDataType, TextViewStoreType } from '../../types/propsTypes';
import { changeMenuSelect, updateIsSave, updateMarkTextData, updateTextsData, updateTextTablePage } from '../../action';
import axios, { AxiosResponse } from 'axios';
import { PATH } from '../../types/actionTypes';
import Highlighter from 'react-highlight-words';

interface ShowTextProps extends TextViewStoreType , MenuStoreType{
  history: any,
  updateTextsData: typeof updateTextsData,
  updateIsSave: typeof updateIsSave,
  updateTextTablePage: typeof updateTextTablePage,
  updateMarkTextData: typeof updateMarkTextData,
  changeMenuSelect :typeof changeMenuSelect,
  inheritedData:TextsDataType
}
interface ShowTextState {
  editKey: string,
  pageSize: number,
  searchedColumn:string,
  searchText:string,
  selectedRowKeys:Array<any>,
  selectedRows:Array<any>,
  buttonStateIsEdit:boolean,
  currentPage:number
}


class ShowText extends Component<ShowTextProps, ShowTextState>{
  private columns: any
  public constructor(props: ShowTextProps) {
    super(props)
    this.state = {
      editKey: '',
      pageSize: 4,
      searchText:'',
      searchedColumn:'',
      selectedRowKeys: [],
			selectedRows: [],
      buttonStateIsEdit:false,
      currentPage:1
    }
    
  }

  handleSearch = (selectedKeys:any, confirm:any, dataIndex:any) => {
    confirm();    
    // console.log("handleSearch",selectedKeys)
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex
    });
  };

  handleReset = (clearFilters:any) => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  public render(): JSX.Element {
    const { pageSize ,selectedRowKeys,selectedRows,currentPage:current} = this.state
    const {TextArea} = Input
    const {  isSave, history, updateTextsData,changeMenuSelect, updateTextTablePage, updateMarkTextData } = this.props
    const { inheritedData:data} = this.props
    const _this = this
    // data.forEach((value: { key?: string; text: string; label: any; }, index: number,) => {
    //   value['key'] = '' + index
    // })
    // console.log(data);
    const columns = [
      {
        title: <div style={{
          width: '100%',
          textAlign: 'center',
          
        }}>
          文本
        </div>,
        dataIndex: 'text',
        key: 'text',
        width: '100%',
        // ellipsis: true,
        
        align: 'left',
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters,dataIndex}: any ) => {
            // console.log("typeof",typeof setSelectedKeys,typeof selectedKeys,typeof confirm,typeof clearFilters)
            // console.log("typeof", setSelectedKeys, selectedKeys, confirm, clearFilters)
            
            return (<div style={{ padding: 8 }}>
              <Input
                // ref={node => {
                //   this.searchInput = node;
                // }}
                placeholder={`请输入关键字`}
                value={selectedKeys[0]}
                onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                style={{ marginBottom: 8, display: 'block' }}
              />
              <Space>
                <Button
                  type="primary"
                  onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                  icon={<SearchOutlined />}
                  size="small"
                  style={{ width: 90 }}
                >
                  搜索
                </Button>
                <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                  重置
                </Button>
                <Button
                  type="link"
                  size="small"
                  onClick={() => {
                    // console.log("filterClick",selectedKeys)
                    confirm({ closeDropdown: false });
                    this.setState({
                      searchText: selectedKeys[0],
                      searchedColumn: dataIndex,
                    });
                  }}
                >
                  过滤
                </Button>
              </Space>
            </div>)
            
        },
        filterIcon: (filtered:any) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value: string, record: { [x: string]: { toString: () => string; }; }) =>
          record["text"]
            ? record["text"].toString().toLowerCase().includes(value.toLowerCase())
            : '',
        // onFilterDropdownVisibleChange: visible => {
        //   if (visible) {
        //     setTimeout(() => this.searchInput.select(), 10000);
        //   }
        // },
        render: (text: string, record: { key?: string, text: string, label: any }, index: number) => {
          const { TextArea } = Input
          const { editKey } = this.state
          return (editKey !== record['key'] ?
            
            (
                <div
                  style={{
                    fontSize:'20px'
                  }}
                >
                  {text}
                  {/* <Highlighter
                  highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                  searchWords={[this.state.searchText]}
                  autoEscape
                  textToHighlight={text ? text.toString() : ''}
                  
                /> */}
                </div>
                
              )  :
            <TextArea
              value={text}
              
              onChange={
                (e) => {
                  const newText = e.target.value
                  const { data: originalData, updateTextsData, updateIsSave } = this.props
                  const data = originalData.map((value: { key?: string; text: string; label: any; }) => {
                    if (value['key'] !== record['key']) return value;
                    return {
                      ...value,
                      text: newText
                    }
                  })
                  updateTextsData(data)
                  updateIsSave(false)
                }
              }
              autoSize
            />)
        }
      }, 
      // {
      //   title: '操作',
      //   dataIndex: 'kind',
      //   render: (label: string, record: { key: string, text: string, label: any, _id:string }, index: number) => (
      //     <React.Fragment>
      //       <Button size='small' type='primary' onClick={
      //         () => {
      //           const editKey: string = this.state.editKey === record['key'] ? '' : record['key']
      //           this.setState({ editKey })
      //         }
      //       } style={{
      //         // float: 'right',
      //         marginRight: '10px'
      //       }}>
      //         {this.state.editKey === record['key'] ? '保存' : '编辑'}
      //       </Button>
      
      //       <Button size='small' type='primary' onClick={
      //         () => {
      //           const { data, updateTextsData } = this.props
      //           Modal.confirm({
      //             title: '警告',
      //             icon: <ExclamationCircleOutlined />,
      //             content: '请确认是否要删除改文本',
      //             okText: '确认',
      //             cancelText: '取消',
      //             onOk: () => {
      //               // console.log("record",record['_id'],record['key'])
      //               this.deleteText(record['_id'], record['key']);
      //               updateTextsData(data.filter((value: any, i: number) => value['key'] !== record['key']))

      //               // console.log('object');
      //               // updateIsSave(false)
      //             }
      //           });
      //         }
      //       } icon={<DeleteOutlined />} >
      //         删除
      //       </Button>
      //     </React.Fragment>

      //   ),
      //   width: '0%',
      //   align: 'center'
      // }
    ]

    return (
      <div style={{
        width: '100%',
        // height: '475px',
        height:"100%",
        padding: '0px 2%',
        backgroundColor: '#fafafa',
        position: 'relative'
      }}>
        <div style={{
          width: '100%',
          height: '45px',
          padding: '0px',//rgb(255, 255, 255)
          // backgroundColor: 'red'
          // position: 'absolute'
        }}>
          {/* <Space>
          <Button type="primary" size='middle' icon={
            <Icon component={isSave ? SaveIcon : CircleIcon} />
          } style={{
            // position: 'absolute',
            // top: 10
            backgroundColor: 'rgb(0,68,107)', border: 'rgb(0,68,107)'
          }} onClick={
            () => {
              // this.saveFile(path)
              // updateIsSave(true)
            }
          }>
            保存
          </Button>
          <Button type="primary" size='middle' icon={
            <Icon component={isSave ? SaveIcon : CircleIcon} />
          } style={{
            // position: 'absolute',
            // top: 10,
            // left: 110
            backgroundColor: 'rgb(0,68,107)', border: 'rgb(0,68,107)'
          }} onClick={
            () => {
              const textString:string = data.map(
                (value: { key?: string | undefined; text: string; label: { start: number; end: number; label: string; }[]; }) => value['text']
              ).join('\r\n')
              saveAs(new Blob([textString], {type: 'text/plain;charset=utf-8'}), `data.txt`);
            }
          }>
            导出
          </Button>
          <Button size='middle' type='primary' icon={<Icon component={AddIcon} />} onClick={
            () => {
              data.unshift({
                key: '00',
                text: '',
                label: []
              })
              // console.log('data')
              this.setState({ editKey: '0' })
              updateTextsData([...data])
            }
          } style={{
            // position: 'absolute',
            // top: 10,
            // left: 200 
            backgroundColor: 'rgb(0,68,107)', border: 'rgb(0,68,107)'
          }}>
            增加文本
          </Button>
          
            <Button  type='primary' 
              icon={<Icon component={LabelIcon} />}
              onClick={
                () => {
                  // updateIsSave(false)
                  // updateMarkTextData(data.map((value: { key?: string | undefined; text: string; label: { start: number; end: number; label: string; }[]; textArr?: Array<FontObject>}) => ({
                  //   ...value,
                  //   textArr: value['textArr'] || value['text'].split('').map((value: string, index: number) => ({
                  //     text: value,
                  //     start: index,
                  //     end: index,
                  //     label: 'none',
                  //     color: ''
                  //   }))
                  // })))
                  // history.push('/index/mark')
                  const {data:originalData} = this.props
                  
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
                  
                }
              } style={{
                // float:"right"
                // position: 'absolute',
                // top: 10,
                // left: 320
                backgroundColor: 'rgb(0,68,107)', border: 'rgb(0,68,107)'
            }}>
              初始化
            </Button>

            <Button type="primary" size='middle' 
            // icon={
            //   <Icon component={isSave ? SaveIcon : CircleIcon} />
            // } 
            style={{
              // position: 'absolute',
              // top: 10
              backgroundColor: 'rgb(0,68,107)', border: 'rgb(0,68,107)'
            }} onClick={
              () => {
                // this.saveFile(path)
                // updateIsSave(true)

                console.log("textView",this.props.data,selectedRowKeys)

                let textsData = this.props.data
                
                textsData = textsData.filter((obj:any,index:any) => {
                  return !selectedRowKeys.includes(obj.key)
                })

                
                // console.log("after",textsData)

                const { data, updateTextsData } = this.props
                for(let i=0;i<selectedRows.length;i++){
                  // console.log("object"+i,selectedRows[i]['_id'], selectedRows[i]['key'])
                  this.deleteText(
                    selectedRows[i]['_id'], selectedRows[i]['key']
                    )
                }
                updateTextsData(textsData)
                // Modal.confirm({
                //   title: '警告',
                //   icon: <ExclamationCircleOutlined />,
                //   content: '请确认是否要删除改文本',
                //   okText: '确认',
                //   cancelText: '取消',
                //   onOk: () => {
                //     // console.log("record",record['_id'],record['key'])
                //     this.deleteText(record['_id'], record['key']);
                //     updateTextsData(data.filter((value: any, i: number) => value['key'] !== record['key']))


                this.setState({ selectedRowKeys: [] , selectedRows: [] })
              }
            }>
              删除
            </Button>

          <Button type="primary" size='middle' 
          // icon={
          //   <Icon component={isSave ? SaveIcon : CircleIcon} />
          // } 
          style={{
            // position: 'absolute',
            // top: 10
            backgroundColor: 'rgb(0,68,107)', border: 'rgb(0,68,107)'
          }} 
          onClick={
            () => {
              if(selectedRows.length > 1){
                message.warn('一次只能删除一条数据')
                this.setState({ selectedRowKeys: [] , selectedRows: [] })
                return 
              }
              if(selectedRows.length === 0){
                
                this.setState({
                  editKey:'',
                  buttonStateIsEdit:false
                })
              }else{
                  this.setState({
                  editKey:selectedRows[0]['key'],
                  buttonStateIsEdit: true
                })
              }
              


              this.setState({ selectedRowKeys: [] , selectedRows: [] })
              // this.saveFile(path)
              // updateIsSave(true)
            }
          }>
            {
              !this.state.buttonStateIsEdit ? '编辑' : '保存'
            }
          
          </Button>

          </Space> */}
          
        </div>
        

        <Table 
          columns={columns as TableColumnsType<any>}
          dataSource={data} 
          showHeader={false}
          size='middle'
          // scroll={{ y: 750 }}
          style={{
            // innerHeight
            
          }}
          pagination={{
            pageSize,
            current,
            simple: true,
            position: ['bottomRight'],
            // showSizeChanger: true,
            onChange: (page: number) => {
              this.setState({
                currentPage:page
              })
              // updateTextTablePage(page)
              // this.setState({ pageSize: (pageSize as number) })
            }
          }}
          // rowSelection={{
					// 	selectedRowKeys,
					// 	onChange: (selectedRowKeys, selectedRows) => {
					// 		// console.log("rowChange",selectedRowKeys,selectedRows)
					// 		this.setState({ selectedRowKeys, selectedRows })
					// 		// console.log(selectedRowKeys, selectedRows)
					// 	}
						
					// }}
        />
          
        
      </div>
    )
  }

  public componentDidMount() {
    console.log("inheritedData",this.props.inheritedData)
  }

  // private deleteText(_id: string, key: string) {
  //   axios.delete(`${PATH}/delete_text?_id=${_id}&key=${key}`,{withCredentials:true})
  //     .then((res:AxiosResponse<any>) => {
  //       // console.log(res.data)
  //     })
  // }

}

const mapStateToProps = (state: StoreType, ownProps?: any) => {
  const { TextView } = state
  const {MenuView} = state
  // console.log(Header)
  return {
    ...ownProps,
    // ...TextView,
    // ...MenuView
  }
}

const mapDispatchToProps = {
  // updateTextsData,
  // updateIsSave,
  // updateTextTablePage,
  // updateMarkTextData,
  // changeMenuSelect
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowText);