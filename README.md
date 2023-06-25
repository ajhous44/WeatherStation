# Weather Station App

The Weather Station App is a web application developed by AJ Housholder as a senior project. It provides temperature and humidity readings from a weather station, offering real-time data visualization and a user-friendly interface.

## Description

The Weather Station App is designed to display accurate and up-to-date weather information. Leveraging React.js for the front-end development, the app retrieves data from a weather station and visualizes it through line charts using the react-plotly.js library. It offers features such as real-time data updates, historical data visualization, and an intuitive user interface.

## Key Features

- **Real-time Data:** The app provides real-time temperature and humidity readings from the weather station.
- **Current Readings:** It displays the current temperature and humidity values in a user-friendly format.
- **Last Update Time:** The app presents the timestamp of the last data update, allowing users to track the recency of the readings.
- **Historical Data Visualization:** Interactive line charts, implemented using the react-plotly.js library, provide a visual representation of temperature and humidity trends over time.
- **Intuitive Interface:** The user interface is designed to be intuitive and easy to navigate, ensuring a seamless user experience.

## Technologies Used

The Weather Station App incorporates the following technologies and libraries:

- **React.js:** A JavaScript library for building user interfaces efficiently. It enables component-based development and state management.
  - **Lifecycle Methods:** React's lifecycle methods, such as `componentDidMount`, are used to manage component initialization and data fetching.
  - **State Management:** React's state management is utilized to store and update temperature, humidity, and time data within the app.
- **Firebase:** A cloud-based platform used for real-time data storage and retrieval (optional, customizable).
- **CSS:** Cascading Style Sheets for styling and layout of the app's user interface.
- **react-plotly.js:** A sublibrary for React.js used to create interactive line charts for data visualization.

## Installation and Usage

To run the Weather Station App locally on your machine, follow the instructions below:

1. Clone the repository:
   ```
   git clone https://github.com/username/weather-station-app.git
   ```

2. Install the necessary dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

4. Open your web browser and visit `http://localhost:3000` to access the app.

## Configuration

To integrate the app with actual data from a Firebase database, follow these steps:

1. Create a Firebase project and obtain the corresponding configuration details.
2. Open the `Config.js` file located within the project.
3. Replace `/*INSERT FIREBASE CONFIG HERE*/` with your Firebase configuration.
4. Save the file.

Please note that the app comes preconfigured with dummy data for demonstration purposes. Uncomment the relevant code in the `App.js` file to connect to your Firebase database and retrieve real-time data.

## Additional Information

The Weather Station App supports flexible deployment options. The underlying Arduino weather station used for data collection can be powered by a solar battery, providing sustainability and independence from traditional power sources. This allows for easy installation in various locations without the need for a constant power supply.

Moreover, the app can utilize a SIM card to connect to the internet. By leveraging a SIM card, the device can transmit data and access online services, enabling placement in remote or challenging environments where Wi-Fi connectivity may be limited.

This project received assistance and outside help from the following resources:

- Con

verting to date object: [Stack Overflow](https://stackoverflow.com/questions/4631928/convert-utc-epoch-to-local-date)
- Plotly date formatting: [D3.js Time Format Documentation](https://github.com/d3/d3-time-format/blob/master/README.md)
- NTP Time Client: [Arduino NTPClient Library](https://github.com/arduino-libraries/NTPClient/blob/master/keywords.txt)
- Firebase: [Firebase Documentation](https://firebase.google.com/docs)
- React: [WebDevSimplified YouTube Channel](https://www.youtube.com/watch?v=hQAHSlTtcmY&ab_channel=WebDevSimplified), [React.js Documentation](https://reactjs.org/docs/getting-started.html)

---
