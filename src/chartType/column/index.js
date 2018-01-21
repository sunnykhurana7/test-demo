import React, { Component } from 'react';
import axios from 'axios';
import './style.css';
import { RingLoader } from 'react-spinners';

var Highcharts = require('highcharts/highstock');

// Load Highmaps as a module
require('highcharts/modules/map')(Highcharts);


class Column extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }

    }

    changeLoadingStatus = (value) => {
        this.setState({
            loading:!this.state.loading
        })
    };

    render() {
        return (
            <div className="Column" id="container">
                <div className="loader">
                    <RingLoader
                        color={'#123abc'}
                        loading={this.state.loading}
                    />
                </div>
            </div>
        )
    }

    componentDidMount(){

        var that = this;

        axios.get("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=MSFT&apikey=demo",function () {

        })
            .then(function (data) {

                that.changeLoadingStatus(false);

                var volume = [],
                    data = data.data["Time Series (Daily)"],
                    groupingUnits = [[
                        'week',                         // unit name
                        [1]                             // allowed multiples
                    ], [
                        'month',
                        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
                    ]];

                for(var key in data) {
                    var innerArrayVolume = [],
                        index = 0;

                    innerArrayVolume.push(Date.parse(key));

                    for(var innerObject in data[key]) {
                        if(index === 5) {
                            innerArrayVolume.push(parseInt(data[key][innerObject]));
                            index ++;
                        }
                        else
                            index ++;
                    }

                    volume.unshift(innerArrayVolume);
                };

                // create the chart
                Highcharts.stockChart('container', {
                    chart: {
                        alignTicks: false
                    },

                    rangeSelector: {
                        selected: 1
                    },

                    title: {
                        text: 'MSFT Stock Volume'
                    },

                    series: [{
                        type: 'column',
                        name: 'MSFT Stock Volume',
                        data: volume,
                        dataGrouping: groupingUnits
                    }]
                });

            })
    }

};

export default Column;