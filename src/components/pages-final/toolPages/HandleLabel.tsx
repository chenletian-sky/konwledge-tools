import React, { Component } from 'react';

import { Button, Select, Input, Slider, InputNumber, Row, Col, Table } from 'antd';
import 'antd/dist/antd.css';

const { Option } = Select;


interface HandleLabelProps {

}
interface HandleLabelState {

}
class HandleLabel extends Component <HandleLabelProps, HandleLabelState>{
    public constructor(props : HandleLabelProps) {
        super(props)
    }

    public render() : JSX.Element {
          const dataSource = [
            {
              key: '1',
              name: '日志语料1',
              description: '5',
              words: '',
              dicts: '',
              functions: <div>
                <Button type='text' style={{ color: 'steelblue' }}>查看</Button>
                <Button type='text' style={{ color: 'steelblue' }}>导出</Button>
              </div>,
            },
            {
              key: '2',
              name: '日志语料2',
              description: '6',
              words: '',
              dicts: '',
              functions: <div>
                <Button type='text' style={{ color: 'steelblue' }}>查看</Button>
                <Button type='text' style={{ color: 'steelblue' }}>导出</Button>
              </div>,
            },
            {
              key: '3',
              name: '日志语料3',
              description: '7',
              words: '',
              dicts: '',
              functions: <div>
                <Button type='text' style={{ color: 'steelblue' }}>查看</Button>
                <Button type='text' style={{ color: 'steelblue' }}>导出</Button>
              </div>,
            },
          ];

          const columns = [
            {
              title: '语料',
              dataIndex: 'name',
              key: 'name',
            },
            {
              title: '训练次数',
              dataIndex: 'description',
              key: 'description',
            },
            {
              title: '标签总数',
              dataIndex: 'words',
              key: 'words',
            },
            {
              title: '标签数量/每句',
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
            <div style={{ width: '100%', height: '30%' }}>
              <Table dataSource={dataSource} columns={columns} style={{ marginLeft: '5%', marginRight: '5%', marginTop: '2%' }} pagination={false} />
              
            </div>
          </div>
    }
}
export default HandleLabel;