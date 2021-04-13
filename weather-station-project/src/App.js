import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import LineChart from './LineChart';
import firebase from 'firebase';
import {DB_CONFIG} from './Config';
/* 
Help:
Converting to date object: https://stackoverflow.com/questions/4631928/convert-utc-epoch-to-local-date
Plotly date formatting : https://github.com/d3/d3-time-format/blob/master/README.md
NTP Time Client: https://github.com/arduino-libraries/NTPClient/blob/master/keywords.txt
*/


class App extends Component {

  constructor() {
    super();

    this.state = {
      tempArray: [],
      HumidityArray: [],
      TimeArray: [],
      datesWithReadings: [],
      lastReadTemp: -1,
      lastReadHum: -1,
      lastReadTime: -1
    };
  }

  componentDidMount() {
    firebase.database().ref("data").on("value", snapshot => {
      let newReadingState = [];
      snapshot.forEach(snap => {
        newReadingState.push(snap.val());
      });

     this.setState({
       datesWithReadings: newReadingState,
       tempArray: [],
       HumidityArray: [],
       TimeArray: [],
       lastReadTemp: -1,
       lastReadHum: -1,
       lastReadTime: -5
      });
  });
}


  render(){
    return (
    <div className="App">     
      {this.state.datesWithReadings.map(data => {
                this.state.tempArray.push(data.tem)
                this.state.HumidityArray.push(data.hum)
                var d = new Date(0);
                var epoch = data.time;
                d.setUTCSeconds(epoch);
                this.state.TimeArray.push(d);
                
                this.state.lastReadTemp = data.tem;
                this.state.lastReadHum = data.hum;
                this.state.lastReadTime = d.toDateString() + "@" + d.toTimeString();
          })}
      <div className="grid-container">
        <span>   
          <b>Last Updated:</b> {this.state.lastReadTime}
        </span>
        <span>
          <h1>Current Temp: {this.state.lastReadTemp}</h1>
        </span>
        <span>
          <h1>Current Humidity: {this.state.lastReadHum}</h1>
        </span>
        <span></span>
        </div>
      <div className="readingCharts">
        <LineChart xAxis = {this.state.TimeArray} yAxisTemps = {this.state.tempArray} yAxisHum = {this.state.HumidityArray} gName = "Humidity" />
      </div>      
    </div>
  );
}
}
export default App;
