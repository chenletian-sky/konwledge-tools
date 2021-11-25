import React, { Component } from 'react';

import { Button, Select, Input, Slider, InputNumber, Row, Col, Table } from 'antd';
import 'antd/dist/antd.css';

const { Option } = Select;

export default class DataClassfication extends React.Component {
  state = {
    inputValue: 45,
  };

  onChange = value => {
    this.setState({
      inputValue: value,
    });
  };
  render() {
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

    // return <div style={{ width: '100%', height: '100%' }}>
    //   <div style={topStyle}>
    //     <div style={pmethodstyle}>
    //       <div style={{ float: 'left', width: '12%' }}>向量化方法</div>
    //       <Select defaultValue="doc2vec" style={{ width: '12%', marginTop: '0%', float: 'left' }}>
    //         <Option value="doc2vec">doc2vec</Option>
    //         <Option value="2017">2017</Option>
    //       </Select>
    //       <div style={{ float: 'left', width: '10%', marginLeft: '3%' }}>向量化参数</div>
    //       <div style={boxStyle}>
    //         <div style={smalltitleStyle}>min_count</div>
    //         <Input style={InputStyle}></Input>
    //       </div>
    //       <div style={boxStyle}>
    //         <div style={smalltitleStyle}>size</div>
    //         <Input style={InputStyle}></Input>
    //       </div>
    //       <Button type="primary" style={buttonStyle}>向量化</Button>
    //     </div>
    //     <div style={cmethodstyle}>
    //       <div style={titleStyle}>聚类方法</div>
    //       <Select defaultValue="doc2vec" style={{ width: '12%', marginTop: '0%', float: 'left' }}>
    //         <Option value="doc2vec">Kmeans</Option>
    //         <Option value="2017">2017</Option>
    //       </Select>
    //       <div style={{ float: 'left', width: '10%', marginLeft: '3%' }}>聚类参数</div>
    //       <div style={boxStyle}>
    //         <div style={smalltitleStyle}>n_sample</div>
    //         <Input style={InputStyle}></Input>
    //       </div>
    //       <div style={boxStyle}>
    //         <div style={smalltitleStyle}>n_feature</div>
    //         <Input style={InputStyle}></Input>
    //       </div>
    //       <Button type="primary" style={buttonStyle}>聚类</Button>
    //     </div>
    //     <div style={sampleStyle}>
    //       <div style={titleStyle}>采样频率</div>
    //       <div style={{ width: "88%", height: '100%', float: 'left', marginLeft: '12%', marginTop: '-2.5%' }}>
    //         <Slider
    //           min={1}
    //           max={100}
    //           onChange={this.onChange}
    //           value={typeof inputValue === 'number' ? inputValue : 0} style={{ width: '59%', float: 'left' }} />
    //         <InputNumber
    //           min={1}
    //           max={100}
    //           style={{ margin: '0 40px', width: '11%', marginRight: '7.5%' }}
    //           value={inputValue + '%'}
    //           onChange={this.onChange}
    //         />
    //         <Button type="primary" style={buttonStyle}>采样</Button>
    //       </div>

    //     </div>
    //     <div style={{ width: '12%', float: 'left', marginLeft: '5%' }}>已加载字典</div>
    //     <Table dataSource={dataSource} columns={columns} style={{ marginLeft: '5%', marginRight: '5%', marginTop: '2%' }} pagination={false} />
    //     <Button type="primary" style={{ borderRadius: '5px', marginLeft: '5%', marginRight: '1%', marginTop: '1%', width: '100px', backgroundColor: '#066094', border: '1px solid #066094', float: 'right' }}>导出</Button>
    //   </div>
    //   <Button style={{ width: '120px', borderRadius: '5px', marginLeft: '1%' }}>可视化panel</Button>
    //   <Button style={{ width: '120px', borderRadius: '5px' }}>数据结果</Button>
    //   <Button style={{ width: '120px', borderRadius: '5px' }}>字典匹配</Button>
    //   <div style={{ width: '98%', height: '50%', float: 'left', marginTop: '0%', marginLeft: '1%' }}>
    //     <div style={{ width: '50%', height: '100%', float: 'left', border: '1px solid gray' }}></div>
    //     <div style={{ width: '50%', height: '100%', float: 'left', border: '1px solid gray' }}></div>
    //   </div>
    // </div>
    return (
      <div
        style={{
          height: "97.6%",
          width: "100%",
          border: "1px solid black",
          // margin:"10px 10px 10px 10px",
          padding: "10px 10px 10px 10px"
        }}
      >

        <span
          style={{
            position: 'relative',
            top: "-24px",
            zIndex: 99,
            backgroundColor: "white",
            fontSize: "20px"
          }}
        >数据预处理</span>

        <div className="LoadingDict">
          {/* <span className="LoadingDict-title">语料标注配置</span> */}
          <div className="LoadingDict-head">
            <Button className="LoadingDict-head-button" onClick={() => { }} style={{ width: "100px", float: "left" }}>语料</Button>
            <Button className="LoadingDict-head-button" onClick={() => { }} style={{ width: "100px", float: "left" }}>字典</Button>
          </div>
          <div className="LoadingDict-table">
            <div className="LoadingDict-data" style={{ float: 'right', marginTop: "5px", height: "6%" }}>
              <Button className="LoadingDict-data-button" onClick={() => { }} style={{ width: "100px", float: "left" }}>加载数据</Button>
              <Button className="LoadingDict-data-button" onClick={() => { }} style={{ width: "100px", float: "left", marginLeft: "10px" }}>导出数据</Button>
            </div>
            <div className="LoadingDict-show-data" style={{ height: '65%' }}>
              {/* <DictionaryView></DictionaryView> */}
            </div>
          </div>

        </div>
      </div>

    )
  }
}