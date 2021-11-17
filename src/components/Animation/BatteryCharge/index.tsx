import React, {Component} from 'react';

import './index.scss'

interface BatteryChargeProps {

}
interface BatteryChargeState {
  data:Array<number>
}
class BatteryCharge extends Component <BatteryChargeProps, BatteryChargeState>{
    public constructor(props : BatteryChargeProps) {
        super(props)
        this.state = {
          data:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
        }
    }

    public render() : JSX.Element {
        return (
              <div className="g-container">
                <div className="g-number" style={{textAlign:"center",top:"90px"}}>10.0%</div>
                <div className="g-contrast">
                    <div className="g-circle"></div>
                    <ul className="g-bubbles">
                        {/* {
                          this.state.data.map((obj,index) => {
                            return<li key={index} className={`g-li`}></li>
                          })
                        } */}
                    </ul>
                </div>
              </div>
        )
    }
}
export default BatteryCharge;