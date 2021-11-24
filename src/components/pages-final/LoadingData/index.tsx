import { Button, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import React, {Component} from 'react';
import DictionaryView from '../../DictionaryView';
// import './index.css'


interface LoadingDataProps {

}
interface LoadingDataState {
  columns:any,
  pagination:any
}
class LoadingData extends Component <LoadingDataProps, LoadingDataState>{
    public constructor(props : LoadingDataProps) {
        super(props)
        this.state = {
          columns: [
              {
              title : '加载',
              dataIndex : 'select',
              width: '15%',
              columnWidth: '5px',
              align: 'center',   
              render: (text: number) => {return <input name="checkbox" type="checkbox" value="checkbox" style={{width:"20px",height:'20px'}}></input>}
              },
              {
                  title : '语料数据',
                  dataIndex : "flag_name",
                  width: '35%',
                  align: 'center',
              }
              ,
              {
                  title: '包含句量',
                  dataIndex: 'sentenceNumber',
                  height: '15%',
                  align: 'center',
              }
              ,
              {
                  title : '包含字数',
                  dataIndex : "wordsNumber",
                  width: '15%',
                  height: '10%',
                  align: 'center',
              }
              ,{
                  title : '操作',
                  dataIndex : "operate",
                  position: 'center',
                  align: 'center',
                  render: (text:string) => {return <span style={{position:'relative',left:"2%"}}><a>查看</a>&nbsp;&nbsp;&nbsp;<a>导出</a></span>}
              }
          ],
          pagination:{
              total: 10,
              showSizeChanger: false,
              height:'100px',
          }
      }
    }

    public render() : JSX.Element {
          const dataSource = [
            {
                'key':0,
                "select":1,
                "flag_name": '台二电厂运行日志',
                'sentenceNumber': '1000',
                "wordsNumber": "100000",
                "operate": "编辑删除",
            },{
                'key':1,
                "select":0,
                "flag_name": '台二电厂运行日志',
                'sentenceNumber': '800',
                "wordsNumber": "80000",
                "operate": "编辑删除",
            },{
                'key':2,
                "select":0,
                "flag_name": '台二电厂运行日志',
                'sentenceNumber': '700',
                "wordsNumber": "70000",
                "operate": "编辑删除",
            }
        ]

        return (
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
                >语料标注配置</span>

                <div className="LoadingDict">
                  {/* <span className="LoadingDict-title">语料标注配置</span> */}
                  <div className="LoadingDict-head">
                      <Button className="LoadingDict-head-button" onClick={()=>{}} style={{width:"100px",float:"left"}}>语料</Button>
                      <Button className="LoadingDict-head-button" onClick={()=>{}} style={{width:"100px",float:"left",marginLeft:"10px"}}>字典</Button>
                  </div>
                  <div className="LoadingDict-table">
                      <Table
                      size='small'
                      id="ant-table"
                      columns={this.state.columns as ColumnsType<any>}
                      rowKey={'key'}
                      dataSource={dataSource}
                      pagination={false}
                      style={{ width: '100%'}}
                      />
                      <div className="LoadingDict-data" style={{ float: 'right',marginTop:"5px",height:"6%"}}>
                          <Button className="LoadingDict-data-button" onClick={()=>{}}  style={{width:"100px",float:"left"}}>加载数据</Button>
                          <Button className="LoadingDict-data-button" onClick={()=>{}} style={{width:"100px",float:"left",marginLeft:"10px"}}>导出数据</Button>
                      </div>
                      <div className="LoadingDict-show-data" style={{height:'65%'}}>
                          <DictionaryView></DictionaryView>
                      </div>
                  </div>
                
            </div>
          </div>
            
        )
    }
}
export default LoadingData;