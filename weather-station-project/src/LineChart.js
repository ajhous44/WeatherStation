import React, { Component } from 'react'
import Plot from 'react-plotly.js';
import firebase from 'firebase';



class LineChart extends React.Component {

    render() {
        
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
                     width: 1000, 
                     height: 500, 
                     title: 'Weather Station Data Visualization',
                     xaxis: {                  
                        title: 'Time',
                        tickformat: '%a %b %e %Y \n %I:%M:%S %p',
                        tickmode: 'array',
                        tickangle: '20',    
                    },
                    yaxis: {                 
                       title: 'Data From Reading' 
                    }
                        } 
                    }
             />
            </div>    
        )
    }
}

export default LineChart
