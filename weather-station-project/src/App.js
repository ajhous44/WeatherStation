import React, {Component} from 'react';
import logo from './logo.svg';
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
      lastReadTime: -1,
      speed: 10,
    };
  }

  componentDidMount() {

    firebase.database().ref("data").on("value", snapshot => {
      let datesWithReading = [];
      snapshot.forEach(snap => {
        datesWithReading.push(snap.val());
      });
     this.setState({
       datesWithReadings: datesWithReading,
       speed: 12,
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
      {/* <h1>Cur Temp = {this.state.speed}</h1> */}
     
      {this.state.datesWithReadings.map(data => {
            
          
               /*  <td><h1>Currently: Humidity = {data.hum} and</h1></td>
                <td></td>
                <td><h1>Time = {data.time}</h1></td> */
                this.state.tempArray.push(data.tem)
                this.state.HumidityArray.push(data.hum)
                var d = new Date(0);
                var epoch = data.time;
                d.setUTCSeconds(data.time);
                this.state.TimeArray.push(d)
                /* this.state.TimeArray.sort(); */
              
                this.state.lastReadTemp = data.tem;
                this.state.lastReadHum = data.hum;
                this.state.lastReadTime = data.time;
                
                /* return(
                  <h1>Time = {data.time} Humidity = {data.hum}</h1>
                ); */
          })}

      <div className="grid-container">
          <span>   <p><b>Last Updated:</b> {this.state.lastReadTime}</p>
        <h6>Year-Month-Date-Hour-Second-Time</h6></span>
        <span>
        <h1>Current Temp: {this.state.lastReadTemp}</h1>
         </span>
         <span>
        <h1>Current Humidity: {this.state.lastReadHum}</h1>
         </span>
      <span></span>
      </div>

     {/*  <div className="readingCharts">
      <LineChart xAxis = {this.state.TimeArray} yAxis = {this.state.tempArray} gName = "Tempeature"/>
      </div>
      <div className="readingCharts">
      <LineChart xAxis = {this.state.TimeArray} yAxis = {this.state.HumidityArray} gName = "Humidity" />
      </div> */}

      <div className="readingCharts">
      <LineChart xAxis = {this.state.TimeArray} yAxisTemps = {this.state.tempArray} yAxisHum = {this.state.HumidityArray} gName = "Humidity" />
      </div>
      
    </div>
  );
}
}

export default App;
