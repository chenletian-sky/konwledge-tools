import React, {Component} from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom'

import { Layout, Menu, Button, message, Avatar, Dropdown, Select } from 'antd';



import ClusteringPlot from './ClusteringPlot/test'
import WordCloud from './WordCloud/test'

interface DataVisualViewProps {
  history:any
}
interface DataVisualViewState {

}
class DataVisualView extends Component <DataVisualViewProps, DataVisualViewState>{
    public constructor(props : DataVisualViewProps) {
        super(props)
    }

    public render() : JSX.Element {
        const {Header, Sider, Content} = Layout
        const {history} = this.props
        return (
               <Layout style={{height:"100%"}}>
                <Header style={{ padding: 0, backgroundColor: 'white'
                // ,width:"100%",height:"20%"
                 }}>
                  <Menu theme="light" mode="horizontal" defaultSelectedKeys={['clusteringPlot']}>
                    <Menu.Item key="clusteringPlot" onClick={()=>{
                      history.push('/index/dataVisualization/clusteringPlot')
                    }}>散点图</Menu.Item>
                    <Menu.Item key="wordCloud" onClick={()=>{
                      history.push('/index/dataVisualization/wordCloud')
                    }}>词云图</Menu.Item>
                  </Menu>
                </Header>
                <Content id="clt-content-test"
                style={{width:"100%",height:"100%"}}
                >
                  <Switch>
                    <Route path="/index/dataVisualization/clusteringPlot" component={ClusteringPlot} />
                    <Route path="/index/dataVisualization/wordCloud" component={WordCloud} />
                  </Switch>
                </Content>
              </Layout>
        )
    }
}
export default DataVisualView;