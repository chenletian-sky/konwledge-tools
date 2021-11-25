import React, {Component} from 'react';
import { Button,Radio,Select,Space,Table } from 'antd'
// import 'antd/dist/antd.css';
// import "./index.css"
import { ColumnsType } from 'antd/lib/table';
import TrainView from '../../../TrainView';
import ProCard from '@ant-design/pro-card';
import MarkView from '../../../MarkView';


interface DataLabelConfigProps {

}
interface DataLabelConfigState {
  columns:any,
  pagination:any
}
class DataLabelConfig extends Component <DataLabelConfigProps, DataLabelConfigState>{
    public constructor(props : DataLabelConfigProps) {
        super(props)
        this.state = {
          columns: [
              {
              title : '选择',
              dataIndex : 'select',
              width: '15%',
              columnWidth: '5px',
              align: 'center',   
              render: (text: number) => {return <input name="checkbox" type="checkbox" value="checkbox" style={{width:"20px",height:'20px'}}></input>}
              },
              {
                  title : '标签',
                  dataIndex : "flag_name",
                  width: '15%',
                  height: '10%',
                  align: 'center',
              }
              ,
              {
                  title: '别名',
                  render: (text:string) => <p style={{textAlign: 'center'}} >{text}</p>,
                  dataIndex: 'alias',
                  height: '10%',
                  align: 'center',
              }
              ,
              {
                  title : '颜色标签',
                  dataIndex : "flag_color",
                  width: '15%',
                  height: '10%',
                  align: 'center',
                  render: (color:string) => {return <div style={{color:color, width:'15px', height:'15px',backgroundColor:color,left:'40%',position:'relative'}}></div>}
              }
              ,{
                  title : '操作',
                  dataIndex : "operate",
                  position: 'center',
                  align: 'center',
                  render: (text:string) => 
                  {
                    return(
                      <Space>
                          <a>编辑</a>
                          <a>删除</a>
                        </Space>
                        
                    ) 
                        
                      
                      }
              }
          ],
          pagination:{
              total: 10,
              // pageSize: 1,
              showSizeChanger: false,
              // defaultPageSize: 1,
              height:'100px',
          }
      }
    }

    public render() : JSX.Element {
        const dataSource = [
            {
                'key':0,
                "select":1,
                "flag_name": '设备',
                'alias': 'EQU',
                "flag_color": "red",
                "operate": "编辑删除",
            },{
                'key':1,
                "select":0,
                "flag_name": '人名',
                'alias': 'PER',
                "flag_color": "blue",
                "operate": "编辑删除",
            }
        ]
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
                >数据标注配置</span>

                <ProCard
                  split='horizontal'
                  // bordered
                  headerBordered
                  style={{
                    height:"100%",
                    width:"100%"
                  }}
                >
                  <ProCard
                    // colSpan="100%"
                  >
                    <div>
                      <div className="YuLiaoPeiZhi-Head"
                        style={{
                          position:"relative",
                          left:"50px"
                        }}
                      >
                          <span className="YuLiaoPeiZhi-text">新增标签名</span>
                          <input className="YuLiaoPeiZhi-input" type="text" style={{ marginLeft:'20px'}} placeholder="新增标签"></input>
                          &nbsp;&nbsp;&nbsp;&nbsp;
                          <span className="YuLiaoPeiZhi-text">新增标签颜色</span>
                          <select className="YuLiaoPeiZhi-input" defaultValue="lucy" style={{ width: '100px',marginLeft:"20px" }} onChange={function handleChange(value) {console.log(`selected ${value}`);}}>
                              <option value="red">red</option>
                              <option value="skyblue">skyblue</option>
                              <option value="yellow">yellow</option>
                          </select>
                          <button className="YuLiaoPeiZhi-button"  style={{ marginLeft:'20px',backgroundColor:'rgb(25,121,182)'}}>新增</button>
                      </div>

                      <Table
                        size='small'
                        id="ant-table"
                        style={{
                          position:"relative",
                          top:"10px"
                          // left:"24px"
                        }}
                        columns={this.state.columns as ColumnsType<any>}
                        rowKey={'key'}
                        dataSource={dataSource}
                        pagination={false}
                        />
                    </div>
                  </ProCard>
                  <ProCard
                    style={{
                      // height:"60%"
                    }}
                  >
                    <MarkView PageSizeNeedChange={6}></MarkView>
                    {/* <TrainView 
                      
                    ></TrainView> */}
                  </ProCard>
                </ProCard>
                
                

                

            </div>
        )
    }
}
export default DataLabelConfig;




