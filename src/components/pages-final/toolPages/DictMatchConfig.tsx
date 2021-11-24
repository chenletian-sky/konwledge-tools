import DownOutlined from '@ant-design/icons/lib/icons/DownOutlined';
import ProCard from '@ant-design/pro-card';
import { Button, Col, Dropdown, Menu, Row, Select, Space, Table } from 'antd';
import React, {Component} from 'react';
import TextView from '../../TextView';
import './DictMatchConfig.css'

const {Option} = Select

interface DictMatchConfigProps {

}
interface DictMatchConfigState {

}
class DictMatchConfig extends Component <DictMatchConfigProps, DictMatchConfigState>{
    public constructor(props : DictMatchConfigProps) {
        super(props)
    }

    public render() : JSX.Element {
        
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
                    <div>
                      
                      
                    </div>
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
                       <TextView></TextView>
                    </ProCard>
                    <ProCard>
                       <TextView></TextView>
                    </ProCard>
                   
                    
                  </ProCard>

                </ProCard>
                  
                
              </div>
        )
    }
}
export default DictMatchConfig;



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