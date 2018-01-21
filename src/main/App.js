import React, { Component } from 'react';
import CandleStick from '../chartType/candleStick/index';
import SelectablePanel from '../selectPanel/index';
import Area from '../chartType/area/index';
import Spline from '../chartType/spline/index';
import Column from '../chartType/column/index'
import Pmo from '../chartType/pmo/index';
import './App.css';

class App extends Component {

    constructor(props){
        super(props);
        this.state = {
            data: 'CandleStick'
        }
    };

    getData = (data) => {
        this.setState({
            data:data
        })
    };

    render() {

        const configuration = {
            CandleStick: <CandleStick/>,
            Area       : <Area/>,
            Spline     : <Spline/>,
            Column     : <Column/>,
            Pmo        : <Pmo/>
        }

        return (
            <div className="container">
                <div className="select-panel">
                    <SelectablePanel setData={this.getData} />
                </div>
                <div className="charts-wrapper">
                    {
                        configuration[this.state.data]
                    }
                </div>
            </div>
        )
    }

};


export default App;
