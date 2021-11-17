import React, {Component} from 'react';

import "./index.css"

interface MyProcessProps {

}
interface MyProcessState {

}
class MyProcess extends Component <MyProcessProps, MyProcessState>{
    public constructor(props : MyProcessProps) {
        super(props)
    }

    public render() : JSX.Element {
        return (
              <div className="cup">
                <div className="remained" id="remained">
                  <span id="liters"></span>
                  <small>Remained</small>
                </div>

                <div className="percentage" id="percentage"></div>
              </div>
        )
    }
}
export default MyProcess;