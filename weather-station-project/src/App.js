import React, {Component} from 'react';
import './App.css';
import LineChart from './LineChart';
import firebase from 'firebase';
import {DB_CONFIG} from './Config';
/* 

Outside Help:
Converting to date object: https://stackoverflow.com/questions/4631928/convert-utc-epoch-to-local-date
Plotly date formatting : https://github.com/d3/d3-time-format/blob/master/README.md
NTP Time Client: https://github.com/arduino-libraries/NTPClient/blob/master/keywords.txt
Firebase: https://firebase.google.com/docs
React: https://www.youtube.com/watch?v=hQAHSlTtcmY&ab_channel=WebDevSimplified,
       https://reactjs.org/docs/getting-started.html

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
        <div className="grid-container-inner"><h3>Weather Station by: AJ Housholder</h3></div>
        <div className="grid-container-inner"><h1>Current Temp: <br></br>{this.state.lastReadTemp}</h1></div>
        <div className="grid-container-inner"><h1>Current Humidity: <br></br>{this.state.lastReadHum}</h1></div>
        <div className="grid-container-inner"><h4>Last Updated: {this.state.lastReadTime}</h4></div>
      </div>
      <div className="readingCharts">
        <LineChart 
         xAxis = {this.state.TimeArray}
         yAxisTemps = {this.state.tempArray}
         yAxisHum = {this.state.HumidityArray} />
      </div>      
    </div>
  );
}
}
export default App;
