import React, {Component} from 'react';
import { Row, Col } from 'antd';

import './index.css'


interface TrainTextProps {

}
interface TrainTextState {

}
class TrainText extends Component <TrainTextProps, TrainTextState>{
    public constructor(props : TrainTextProps) {
        super(props)
    }

    public render() : JSX.Element {
        return (
              <div className='ModelDisposition'>
                <span className='ModelDisposition-title'>数据标注配置</span>
                <div className='ModelDisposition-control'>
                    <span>模型</span>
                    <select className="ModelDisposition-select" defaultValue="BiLSTM" style={{ width: '25%',marginLeft:"7%" }} onChange={function handleChange(value) {console.log(`selected ${value}`);}}>
                        <option value="CNN">BiLSTM</option>
                        <option value="BERT">BERT</option>
                    </select>
                    <button className="ModelDisposition-button"  style={{ marginLeft:'30px',backgroundColor:'rgb(25,121,182)',width:'15%',height:'28px'}}>训练</button>
                </div>
                    <div className="ModelDisposition-fig">
                        <span id="ModelDisposition-little-title2" style={{float: 'left',marginLeft:"4%"}}>模型评价指标</span>
                    </div>
                <div className="ModelDisposition-select-content">
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
                <div className="ModelDisposition-per-bef">
                    <div className="ModelDisposition-per">
                        <span className="ModelDisposition-his-title">识别前</span>
                    </div>
                    <div className="ModelDisposition-bef">
                        <span className="ModelDisposition-his-title">识别后</span>
                    </div>
                </div>
              </div>
        )
    }
}
export default TrainText;