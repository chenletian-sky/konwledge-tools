import axios, { AxiosResponse } from 'axios';
import React, {Component} from 'react';
import { PATH } from '../../../../types/actionTypes';
import ClusteringPlot from '../../../ClusteringPlot';
import WordsCloud from '../../../WordCloud/yu';


interface DataVisualProps {
  // wordCloudData:object
}
interface DataVisualState {

}
class DataVisual extends Component <DataVisualProps, DataVisualState>{
    public constructor(props : DataVisualProps) {
        super(props)
    }

    componentDidMount(){
      // axios.get(`${PATH}/get_wordCloudData`,{withCredentials:true}).then((res:AxiosResponse<any,any>) => {
      //   if( res.data.status === 200 ){
      //     this.setState({
            
      //     })
      //   }
      // })
    }

    public render() : JSX.Element {
        return (
              <div style={{ width: '98%', height: '50%', float: 'left', marginTop: '0%', marginLeft: '1%' }}>
                <div style={{ width: '50%', height: '100%', float: 'left', border: '1px solid gray' }}>
                  <ClusteringPlot history={undefined} />
                </div>
                <div style={{ width: '50%', height: '100%', float: 'left', border: '1px solid gray' }}>
                  <WordsCloud isComplete={true} wordCloudClass={'3'} 
                    // wordCloudData ={}
                    />
                </div>
              </div>
        )
    }
}
export default DataVisual;