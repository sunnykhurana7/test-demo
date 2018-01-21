import React, { Component } from 'react';
import axios from 'axios';
import './style.css';
import { RingLoader } from 'react-spinners';

var Highcharts = require('highcharts/highstock');

// Load Highmaps as a module
require('highcharts/modules/map')(Highcharts);

class CandleStick extends Component {

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
            <div className="CandleStick" id="container">
                <div className="loader">
                    <RingLoader
                        color={'#123abc'}
                        loading={this.state.loading}

                    />
                </div>
            </div>
        );
    }

    componentDidMount() {

        var that = this;

        axios.get("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=MSFT&apikey=demo",function () {

        })
        .then(function (data) {

            that.changeLoadingStatus(false);

            var ohlc = [],
                volume = [],
                data = data.data["Time Series (Daily)"],
                groupingUnits = [[
                    'week',                         // unit name
                    [1]                             // allowed multiples
                ], [
                    'month',
                    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
                ]];

            for(var key in data) {
                var innerArrayOhlc = [],
                    innerArrayVolume = [],
                    index = 0;

                innerArrayOhlc.push(Date.parse(key));
                innerArrayVolume.push(Date.parse(key));

                for(var innerObject in data[key]) {
                    if(index <= 3) {
                        innerArrayOhlc.push(parseFloat(data[key][innerObject]));
                        index ++;
                    }else
                    if(index === 5) {
                        innerArrayVolume.push(parseInt(data[key][innerObject]));
                        index ++;
                    }
                    else
                        index ++;
                }

                ohlc.unshift(innerArrayOhlc);
                volume.unshift(innerArrayVolume);

            };

            Highcharts.stockChart('container', {

                rangeSelector: {
                    selected: 1
                },

                title: {
                    text: 'MSFT Historical'
                },

                yAxis: [{
                    labels: {
                        align: 'right',
                        x: -3
                    },
                    title: {
                        text: 'MSFT'
                    },
                    height: '60%',
                    lineWidth: 2,
                    resize: {
                        enabled: true
                    }
                }, {
                    labels: {
                        align: 'right',
                        x: -3
                    },
                    title: {
                        text: 'Volume'
                    },
                    top: '65%',
                    height: '35%',
                    offset: 0,
                    lineWidth: 2
                }],

                tooltip: {
                    split: true
                },

                series: [{
                    type: 'candlestick',
                    name: 'MSFT',
                    data: ohlc,
                    dataGrouping: {
                        units: groupingUnits
                    }
                }, {
                    type: 'column',
                    name: 'Volume',
                    data: volume,
                    yAxis: 1,
                    dataGrouping: {
                        units: groupingUnits
                    }
                }]
            });

        })
    };

};

export default CandleStick;