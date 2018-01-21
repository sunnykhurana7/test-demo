import React, { Component } from 'react';
import './select.css';

class SelectablePanel extends Component {

    constructor(props){
        super(props);

    }

    selectedData = (e) => {
        const data = e.currentTarget.value;
        this.props.setData(data);
    }

    render() {
        return (
            <div className="container">
                <div className="text-area area-define">
                    <p>
                        Select which type of chart you want to see
                    </p>
                </div>
                <div className="option-area area-define">
                    <select onChange={(e)=>this.selectedData(e)}>
                        <option value="CandleStick">CandleStick</option>
                        <option value="Area">Area</option>
                        <option value="Spline">Spline</option>
                        <option value="Column">Column</option>
                        <option value="Pmo">Point Markers Only</option>
                    </select>
                </div>
            </div>
        )
    }
};

export default SelectablePanel;