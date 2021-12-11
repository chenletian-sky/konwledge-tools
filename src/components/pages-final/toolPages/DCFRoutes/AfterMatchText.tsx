import { Button, Space, Table } from 'antd';
import React, {Component} from 'react';
import { MarkTextsDataType } from '../../../../types/propsTypes';
import ShowMarkText from '../../../OtherView/ShowMarkText';


interface AfterMatchTextProps {
  inheritedData:MarkTextsDataType,
  parentFunction?:any
}
interface AfterMatchTextState {

}
class AfterMatchText extends Component <AfterMatchTextProps, AfterMatchTextState>{
    public constructor(props : AfterMatchTextProps) {
        super(props)
    }

    public render() : JSX.Element {
        const { inheritedData } = this.props
        return (
              <div style={{ width: '98%', height: '50%', float: 'left', marginTop: '0%', marginLeft: '1%' }}>
                <Space 
                  style={{
                    position:"absolute",
                    left:"80%",
                    top:"34%"
                  }}
                >
                  <Button
                    onClick={()=>{
                      // console.log("afterMatchFunction",this.props.parentFunction)
                      this.props.parentFunction(null,'flow-btn-3')
                    }}
                  >手工标注</Button>
                  <Button
                    onClick={()=>{
                      this.props.parentFunction(null,'flow-btn-5')
                    }}
                  >语料识别</Button>
                </Space>
                
                <ShowMarkText inheritedData = {inheritedData}
                  showHeader={false}
                />
                
              </div>
        )
    }
}
export default AfterMatchText;