import React, { Component } from 'react';

import { Button, Select, Input, Slider, InputNumber, Row, Col, Table } from 'antd';
import 'antd/dist/antd.css';

const { Option } = Select;

export default class Viewer extends React.Component {
  render() {
    const boxStyle = { height: '30%', width: '100%', marginTop: '2%', marginLeft: '2%', float: 'left' }
    const titleStyle = { width: '10%', float: 'left', marginTop: '0.5%' }
    const buttonStyle = { borderRadius: '5px', width: '80px', backgroundColor: '#066094', border: '1px solid #066094', color: 'white', marginLeft: '3%' }
    return <div style={{ width: '100%', height: '100%' }}>
      <div style={{ width: '100%', height: '20%' }}>
        {/* <div style={boxStyle}>
          <div style={titleStyle}>模型名称</div>
          <Input defaultValue="BiLSTM+CRF" style={{ width: '15%' }}></Input>
        </div>
        <div style={boxStyle}>
          <div style={titleStyle}>权重路径</div>
          <Select defaultValue="doc2vec" style={{ width: '50%', marginTop: '0%', float: 'left' }}>
            <Option value="doc2vec">doc2vec</Option>
          </Select>
        </div>
        <div style={boxStyle}>
          <div style={titleStyle}>语料数据</div>
          <div style={{ fontSize: '2em', fontWeight: 'bold', float: 'left' }}>
            <h1>语料名称</h1>
          </div>
          <div style={{ marginLeft: '20%', float: 'left', width: '50%', marginTop: '1%' }}>
            <Button style={buttonStyle}>采样</Button>
            <Button style={buttonStyle}>识别</Button>
            <Button style={buttonStyle}>导出</Button>
          </div>
        </div> */}
      </div>
    </div>
  }
}