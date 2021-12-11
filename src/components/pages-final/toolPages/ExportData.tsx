import { Space, Table } from 'antd';
import React, {Component} from 'react';
import TrainView from '../../TrainView';


interface ExportDataProps {

}
interface ExportDataState {

}
class ExportData extends Component <ExportDataProps, ExportDataState>{
    public constructor(props : ExportDataProps) {
        super(props)
    }

    public render() : JSX.Element {
        return (
              <div
                style={{
                  height:"100%",
                  width:"100%",
                  border:"1px solid black",
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
                >导出数据</span>

                <div
                  style={{
                    // height:'40%'
                  }}
                >
                  <Table 
                    columns={
                      [
                        {
                          title: '语料名称',
                          dataIndex: 'name',
                          key: 'name',
                          width:"20%",
                          render: text => <a>{text}</a>,
                        },
                        {
                          title: '语料描述',
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
                          title: '语料容量',
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
                              {/* <a>Invite {record.name}</a> */}
                              <a>更新</a>
                              <a>导出</a>
                              <a>查看</a>
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
                        {
                          key: '3',
                          name: 'text_name_3',
                          describe: 'describe_3',
                          size: '6000',
                          capacity: '60k',
                        }
                      ]
                    } 
                  />
                </div>

                  <div
                    style={{
                      // height:"10%"
                    }}
                  >
                    {/* <TrainView></TrainView> */}

                  </div>

                </div>
                
              

              
            
        )
    }
}
export default ExportData;