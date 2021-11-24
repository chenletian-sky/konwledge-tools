import ProCard from '@ant-design/pro-card';
import React, {Component} from 'react';
import MarkView from '../../MarkView';


interface TextRecongnitionConfigProps {

}
interface TextRecongnitionConfigState {

}
class TextRecongnitionConfig extends Component <TextRecongnitionConfigProps, TextRecongnitionConfigState>{
    public constructor(props : TextRecongnitionConfigProps) {
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
                >语料识别配置</span>

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
                      title="已加载数据"
                    >
                      
                      
                    </ProCard>

                    <ProCard
                      title="匹配查看"
                    >
                      <MarkView></MarkView>
                    </ProCard>

                  </ProCard>

            </div>
        )
    }
}
export default TextRecongnitionConfig;