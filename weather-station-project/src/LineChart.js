import React, { Component } from 'react'
import Plot from 'react-plotly.js';
import firebase from 'firebase';



class LineChart extends React.Component {

    render() {

        console.log(this.props.xAxis); 
        
        return (
            <div>
            <Plot
             data={[
                 {
                 x: (this.props.xAxis),
                 y: (this.props.yAxisTemps),
                 name: 'Temperature (°F)',
                 type: 'line',
                 mode: 'lines+markers',
                 },
                 {
                    x: (this.props.xAxis),
                    y: (this.props.yAxisHum),
                    name: 'Humidity (%)',
                    type: 'line',
                    mode: 'lines+markers'
   
                    }
             ]}

             layout={ 
                 {
                     /* dragmode: false,
                     scrollZoom: false,
                     displayModeBar: false, */ 
                     width: 1000, 
                     height: 500, 
                     title: (this.props.gName), 
                     xaxis: {                  // all "layout.xaxis" attributes: #layout-xaxis
                        title: 'time',
                        tickformat: '%I %M %S\n %Y',
                        tickmode: 'array',
                        tickangle: '45',

                        
                    },
                    yaxis: {                  // all "layout.xaxis" attributes: #layout-xaxis
                        title: 'Temperature (°F)'
                    }
                    
                        } 
                    }

             />
             
            
            </div>    
           
        )
    }
}

export default LineChart
