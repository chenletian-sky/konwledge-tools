import React, {Component} from 'react';
import ClusteringPlot from '../../../ClusteringPlot';


interface DataVisualProps {

}
interface DataVisualState {

}
class DataVisual extends Component <DataVisualProps, DataVisualState>{
    public constructor(props : DataVisualProps) {
        super(props)
    }

    public render() : JSX.Element {
        return (
              <div style={{ width: '98%', height: '50%', float: 'left', marginTop: '0%', marginLeft: '1%' }}>
                <div style={{ width: '50%', height: '100%', float: 'left', border: '1px solid gray' }}>
                  <ClusteringPlot history={undefined} />
                </div>
                <div style={{ width: '50%', height: '100%', float: 'left', border: '1px solid gray' }}>
                  {/* <WordsCloud isComplete={true} wordCloudClass={'3'} /> */}
                </div>
              </div>
        )
    }
}
export default DataVisual;