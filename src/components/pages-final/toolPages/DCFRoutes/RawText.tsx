import { Space, Table } from 'antd';
import React, {Component} from 'react';
import { TextsDataType } from '../../../../types/propsTypes';
import MarkView from '../../../MarkView';
import ShowText from '../../../OtherView/ShowText';


interface RawTextProps {
  inheritedData:TextsDataType
}
interface RawTextState {

}
class RawText extends Component <RawTextProps, RawTextState>{
    public constructor(props : RawTextProps) {
        super(props)
        this.setState({
              
        })
    }

    public render() : JSX.Element {
        const { inheritedData} = this.props
        return (
             <div style={{ width: '98%', height: '50%', float: 'left', marginTop: '0%', marginLeft: '1%' }}>
                {/* <MarkView></MarkView> */}
                {/* <Table 
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
                /> */}
              {/* <div style={{ width: '50%', height: '100%', float: 'left', border: '1px solid gray' }}>
                <ClusteringPlot history={undefined} />
              </div>
              <div style={{ width: '50%', height: '100%', float: 'left', border: '1px solid gray' }}>
              <WordsCloud isComplete={true} wordCloudClass={'3'} />
              </div> */}
              <ShowText 
                inheritedData={inheritedData}
              ></ShowText>
            </div> 
        )
    }
}
export default RawText;