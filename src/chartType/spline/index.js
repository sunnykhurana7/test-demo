import React, { Component } from 'react';
import axios from 'axios';
import './style.css';
import { RingLoader } from 'react-spinners';

var Highcharts = require('highcharts/highstock');

// Load Highmaps as a module
require('highcharts/modules/map')(Highcharts);

class Spline extends Component {

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
            <div className="Spline" id="container">
                <div className="loader">
                    <RingLoader
                        color={'#123abc'}
                        loading={this.state.loading}
                    />
                </div>
            </div>
        )
    }

    componentDidMount() {

        var that = this;

        axios.get("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=MSFT&apikey=demo", function () {

        })
        .then(function (data) {

            that.changeLoadingStatus(false);

            var ohlc = [];
            data = data.data["Time Series (Daily)"];

            for(var key in data) {
                var innerArrayOhlc = [],
                    index = 0,
                    sum = 0,
                    average = 0;

                innerArrayOhlc.push(Date.parse(key));

                for(var innerObject in data[key]) {
                    if(index <= 3) {
                        sum += parseFloat(data[key][innerObject]);
                        index ++;
                    }
                    else
                        index ++;
                }

                average = sum/4;
                innerArrayOhlc.push(average);
                ohlc.unshift(innerArrayOhlc);

            };

            Highcharts.stockChart('container', {

                rangeSelector: {
                    selected: 1
                },

                title: {
                    text: 'MSFT Stock Price'
                },

                series: [{
                    name: 'MSFT Stock Price',
                    data: ohlc,
                    type: 'spline',
                    tooltip: {
                        valueDecimals: 2
                    }
                }]
            });

        })
        .catch(function (err) {
            console.log('error', err);
        })
    }

}

export default Spline;