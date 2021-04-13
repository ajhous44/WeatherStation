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
    /* Using setState (ends up adding lines from the earliest point
      to every new point, but useful for added functionality if needed)
      
      firebase.database().ref("data").on("value", snapshot => {
      snapshot.forEach(snap => {
        var d = new Date(0);
        var epoch = snap.child('time').val();
        d.setUTCSeconds(epoch);
        this.setState({
          datesWithReadings: [],
          tempArray: [snap.child('tem').val(), ...this.state.tempArray],
          HumidityArray: [snap.child('hum').val(), ...this.state.HumidityArray, ],
          TimeArray: [d, ...this.state.TimeArray],
          lastReadTemp: snap.child('tem').val(),
          lastReadHum: snap.child('hum').val(),
          lastReadTime: d.toDateString() + "@" + d.toTimeString()
         });
        console.log("temp - " + snap.child('tem').val());
        console.log("temp - " + snap.child('hum').val());
        console.log("arr = = = " + this.state.TimeArray.toString());
      }); 
  });  */
 
    firebase.database().ref("data").on("value", snapshot => {
      let newReadingState = [];
      snapshot.forEach(snap => {
        newReadingState.push(snap.val());
      });

     this.setState({
       datesWithReadings: newReadingState,
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
          <h3>Weather Station by: AJ Housholder</h3>
        </span>
        <span>
          <h1>Current Temp: {this.state.lastReadTemp}</h1>
        </span>
        <span>
          <h1>Current Humidity: {this.state.lastReadHum}</h1>
        </span>
        <span>Last Updated: {this.state.lastReadTime}</span>
        </div>
      <div className="readingCharts">
        <LineChart xAxis = {this.state.TimeArray} yAxisTemps = {this.state.tempArray} yAxisHum = {this.state.HumidityArray} gName = "Humidity" />
      </div>      
    </div>
  );
}
}
export default App;
