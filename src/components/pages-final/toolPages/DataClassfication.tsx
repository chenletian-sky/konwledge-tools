import React, {Component} from 'react';
import { Button, Select, Input, Slider, InputNumber, Row, Col, Table } from 'antd';
import ClusteringPlot from '../../ClusteringPlot';
import WordsCloud from '../../WordCloud/yu';
import { Redirect, Route , Switch} from 'react-router-dom';
import DataVisual from './DCFRoutes/DataVisual';
import RawText from './DCFRoutes/RawText';
import AfterMatchText from './DCFRoutes/AfterMatchText';
// import { Properties } from 'xlsx';

const { Option } = Select;
interface DataClassficationProps {
  history:any
}
interface DataClassficationState {
  inputValue:number
}
class DataClassfication extends Component <DataClassficationProps, DataClassficationState>{
    public constructor(props : DataClassficationProps) {
        super(props)
        this.state = {
          inputValue:45
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

          const dataSource = [
            {
              key: '1',
              name: '同义词字典',
              description: '电力领域同义词词典',
              words: '1000',
              dicts: '100Kb',
              functions: <div>
                <Button type='text' style={{ color: 'steelblue' }}>查看</Button>
                <Button type='text' style={{ color: 'steelblue' }}>导出</Button>
              </div>,
            },
            {
              key: '2',
              name: '设备字典',
              description: '发电设备字典',
              words: '800',
              dicts: '80Kb',
              functions: <div>
                <Button type='text' style={{ color: 'steelblue' }}>查看</Button>
                <Button type='text' style={{ color: 'steelblue' }}>导出</Button>
              </div>,
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
              dataIndex: 'functions',
              key: 'functions',
            },
          ];

          return <div style={{ width: '100%', height: '100%' }}>
            <div style={topStyle as React.CSSProperties}>
              <div style={pmethodstyle as React.CSSProperties}>
                <div style={{ float: 'left', width: '12%' }}>向量化方法</div>
                <Select defaultValue="doc2vec" style={{ width: '12%', marginTop: '0%', float: 'left' }}>
                  <Option value="doc2vec">doc2vec</Option>
                  <Option value="2017">2017</Option>
                </Select>
                <div style={{ float: 'left', width: '10%', marginLeft: '3%' }}>向量化参数</div>
                <div style={boxStyle as React.CSSProperties}>
                  <div style={smalltitleStyle as React.CSSProperties}>min_count</div>
                  <Input style={InputStyle as React.CSSProperties}></Input>
                </div>
                <div style={boxStyle as React.CSSProperties}>
                  <div style={smalltitleStyle as React.CSSProperties}>size</div>
                  <Input style={InputStyle}></Input>
                </div>
                <Button type="primary" style={buttonStyle}>向量化</Button>
              </div>
              <div style={cmethodstyle as React.CSSProperties}>
                <div style={titleStyle as React.CSSProperties}>聚类方法</div>
                <Select defaultValue="doc2vec" style={{ width: '12%', marginTop: '0%', float: 'left' }}>
                  <Option value="doc2vec">Kmeans</Option>
                  <Option value="2017">2017</Option>
                </Select>
                <div style={{ float: 'left', width: '10%', marginLeft: '3%' }}>聚类参数</div>
                <div style={boxStyle as React.CSSProperties}>
                  <div style={smalltitleStyle as React.CSSProperties}>n_sample</div>
                  <Input style={InputStyle}></Input>
                </div>
                <div style={boxStyle as React.CSSProperties}>
                  <div style={smalltitleStyle as React.CSSProperties}>n_feature</div>
                  <Input style={InputStyle}></Input>
                </div>
                <Button type="primary" style={buttonStyle}>聚类</Button>
              </div>
              <div style={sampleStyle as React.CSSProperties}>
                <div style={titleStyle as React.CSSProperties}>采样频率</div>
                <div style={{ width: "88%", height: '100%', float: 'left', marginLeft: '12%', marginTop: '-2.5%' }}>
                  <Slider
                    min={1}
                    max={100}
                    onChange={this.onChange}
                    value={typeof inputValue === 'number' ? inputValue : 0} style={{ width: '59%', float: 'left' }} />
                  <InputNumber
                    min={"1"}
                    max={"100"}
                    style={{ margin: '0 40px', width: '11%', marginRight: '7.5%' }}
                    value={inputValue + '%'}
                    onChange={this.onChange}
                  />
                  <Button type="primary" style={buttonStyle}>采样</Button>
                </div>

              </div>
              <div style={{ width: '12%', float: 'left', marginLeft: '5%' }}>已加载字典</div>
              <Table dataSource={dataSource} columns={columns} style={{ marginLeft: '5%', marginRight: '5%', marginTop: '2%' }} pagination={false} />
              <Button type="primary" style={{ borderRadius: '5px', marginLeft: '5%', marginRight: '1%', marginTop: '1%', width: '100px', backgroundColor: '#066094', border: '1px solid #066094', float: 'right' }}>导出</Button>
            </div>

            <Button style={{ width: '120px', borderRadius: '5px', marginLeft: '1%' }}
              onClick={()=>{
                this.props.history.push('/index/tool/dataClassfication/dataVisual')
              }}
            >可视化panel</Button>
            <Button style={{ width: '120px', borderRadius: '5px' }}
              onClick={()=>{
                this.props.history.push('/index/tool/dataClassfication/rawText')
              }}
            >数据结果</Button>
            <Button style={{ width: '120px', borderRadius: '5px' }}
              onClick={()=>{
                this.props.history.push('/index/tool/dataClassfication/afterMatchText')
              }}
            >字典匹配</Button>
            

            <Switch>
              <Route path='/index/tool/dataClassfication/dataVisual' component={DataVisual}></Route>
              <Route path='/index/tool/dataClassfication/rawText' component={RawText}></Route>
              <Route path='/index/tool/dataClassfication/afterMatchText' component={AfterMatchText}></Route>
              <Redirect to='/index/tool/dataClassfication/dataVisual'></Redirect>
            </Switch>
            {/* <div style={{ width: '98%', height: '50%', float: 'left', marginTop: '0%', marginLeft: '1%' }}>
              <div style={{ width: '50%', height: '100%', float: 'left', border: '1px solid gray' }}>
                <ClusteringPlot history={undefined} />
              </div>
              <div style={{ width: '50%', height: '100%', float: 'left', border: '1px solid gray' }}>
              <WordsCloud isComplete={true} wordCloudClass={'3'} />
              </div>
            </div> */}
          
          </div>
    }
}
export default DataClassfication;