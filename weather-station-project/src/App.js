import React, { Component } from 'react';
import './App.css';
import LineChart from './LineChart';
import firebase from 'firebase';
import {DB_CONFIG} from './Config';

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
//   Uncomment for use with actual firebase data
//   componentDidMount() { 
//     firebase.database().ref("data").on("value", snapshot => {
//       let newReadingState = [];
//       snapshot.forEach(snap => {
//         newReadingState.push(snap.val());
//       });

//      this.setState({
//        datesWithReadings: newReadingState,
//        tempArray: [],
//        HumidityArray: [],
//        TimeArray: [],
//        lastReadTemp: -1,
//        lastReadHum: -1,
//        lastReadTime: -5
//       });
//   });
// }

  componentDidMount() {
    // This dummy data replaces the data that you were pulling from Firebase.
    // These timestamps correspond to various dates in December 2021.
    const newReadingState = [
      { tem: 70, hum: 56, time: 1638397200 },
      { tem: 73, hum: 52, time: 1638483600 },
      { tem: 79, hum: 55, time: 1638570000 },
      { tem: 75, hum: 58, time: 1638656400 },
      { tem: 72, hum: 59, time: 1638742800 },
      { tem: 71, hum: 60, time: 1638829200 },
      { tem: 76, hum: 54, time: 1638915600 },
      { tem: 77, hum: 53, time: 1639002000 },
      { tem: 74, hum: 57, time: 1639088400 },
      { tem: 78, hum: 50, time: 1639174800 },
    ];

    this.setState({
      datesWithReadings: newReadingState,
      tempArray: [],
      HumidityArray: [],
      TimeArray: [],
      lastReadTemp: -1,
      lastReadHum: -1,
      lastReadTime: -5
    });
  }


  render() {
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
            xAxis={this.state.TimeArray}
            yAxisTemps={this.state.tempArray}
            yAxisHum={this.state.HumidityArray} />
        </div>
      </div>
    );
  }
}
export default App;
