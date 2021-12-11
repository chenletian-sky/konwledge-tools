import React, { Component, Key } from 'react';
import { Input, Modal, Table, Tag, Popover, Button, message } from 'antd';
import 'antd/dist/antd.css';
import Icon, { PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
// import $ from 'jquery'
import { ColorResult, SketchPicker } from 'react-color';
import { SettingIcon } from '../Icon';
import { connect } from 'react-redux';
import { FontObject, InitMarkText, MarkTextsDataType, MarkViewStoreType, MenuStoreType, StoreType } from '../../types/propsTypes';
import { updateMarkTextData, updateTrainData, updateTrainTextTablePage ,updateTrainDataByDelete, changeMenuSelect} from '../../action';
import { updateTextsData } from '../../action';
import axios, { AxiosResponse } from 'axios';
import { PATH } from '../../types/actionTypes';

interface ShowTrainTextProps {
  history: any,
  data:MarkTextsDataType,
  current:number,
	TrainView:MarkViewStoreType,
  MenuView:MenuStoreType,
  trainTextData:any,
  pageSize?:number,
  // updateTextTablePage: typeof updateTextTablePage,
	updateMarkTextData: typeof updateMarkTextData,
	updateTextsData: typeof updateTextsData,
	updateTrainData: typeof updateTrainData,
  updateTrainTextTablePage: typeof updateTrainTextTablePage,
  updateTrainDataByDelete: typeof updateTrainDataByDelete,
  changeMenuSelect : typeof changeMenuSelect
}
interface ShowTrainTextState {
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
class ShowTrainText extends Component <ShowTrainTextProps, ShowTrainTextState>{
    private startIndex: number | undefined
    private endIndex: number | undefined
    private columns: any
    private input: any
    public constructor(props : ShowTrainTextProps) {
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
        const { history, current, updateTextsData, updateTrainData,updateTrainDataByDelete, updateMarkTextData,updateTrainTextTablePage ,changeMenuSelect} = this.props
        const { trainTextData:data } = this.props
        let pageSize = this.props.pageSize ? this.props.pageSize : 10
        // if ()
        // console.log(data[0]);
        return (
          <div style={{
            width: '100%',
            height: '500px',
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
                  >
                    <Tag  color={value['color']} key={'name' + index}
                      icon={<Icon component={SettingIcon} 
                      />}
                      style={{
                        userSelect: 'none'
                      }}
                      >
                      {/* {value['name'] + ' [' + value['key'] + ']'} */}
                      {value['name']}
                    </Tag>
                    
                  </Popover>
                ))
              }
            </div>
            <Table columns={this.columns} dataSource={data} size='small' 
              // scroll={{ y: 450 }}
              pagination={{
                pageSize,
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
      // ...MenuView
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


export default connect(mapStateToProps, mapDispatchToProps)(ShowTrainText);
// export default ShowTrainText;