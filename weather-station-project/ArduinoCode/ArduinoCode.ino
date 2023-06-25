/* 
 *  Help from:
 *  Firebase integration: https://github.com/mobizt/Firebase-ESP8266
 *  NTP Time Client: https://github.com/arduino-libraries/NTPClient/blob/master/keywords.txt
 *  Sesnsor: https://learn.sunfounder.com/category/starter-kit-v2-0-for-arduino/
*/

#include "FirebaseESP8266.h"
#include <ESP8266WiFi.h>
#include <DHT.h>
#include <NTPClient.h>
#include <WiFiUdp.h>

#define WIFI_SSID ""                // Replace with your Wifi SSID
#define WIFI_PASSWORD ""            // Replace with your Wifi Password
#define FIREBASE_HOST ""            // Replace with your Firebase Project host
#define FIREBASE_AUTH ""            // Replace with your Firebase Auth
#define DHTPIN D2                   // Digital pin connected to DHT11
#define DHTTYPE DHT11               // Initialize DHT type as DHT 11
#define SENSING_INTERVAL 3000       // Sensing interval in milliseconds
#define FAHRENHEIT_MULTIPLIER 1.8
#define FAHRENHEIT_OFFSET 32

FirebaseData fbdo;
const int timezone = -5 * 3600;
const int dst = 0;
DHT dht(DHTPIN, DHTTYPE);
float t;                             // temperature reading
float h;                             // humidity reading
FirebaseJson json;
WiFiUDP ntpUDP;
NTPClient timeClient(ntpUDP);

void setup()
{
  Serial.begin(115200);
  dht.begin();

  connectToWifi();
  connectToFirebase();

  timeClient.begin();
}

void loop()
{
  readDHTSensor();
  timeClient.update();

  json.clear();
  json.add("tem", t);
  json.add("hum", h);
  json.add("time", String(timeClient.getEpochTime()));

  sendToFirebase();
  delay(SENSING_INTERVAL);
}

void connectToWifi() {
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to Wi-Fi");
  while (WiFi.status() != WL_CONNECTED)
  {
    Serial.print(".");
    delay(300);
  }
  Serial.println();
  Serial.print("Connected with IP: ");
  Serial.println(WiFi.localIP());
  Serial.println();
}

void connectToFirebase() {
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
  Firebase.reconnectWiFi(true);
}

void readDHTSensor() {
  h = dht.readHumidity();                             // Reading Humidity
  t = dht.readTemperature() * FAHRENHEIT_MULTIPLIER + FAHRENHEIT_OFFSET;  // Read temperature as Fahrenheit
}

void sendToFirebase() {
  if (Firebase.pushJSON(fbdo, "/data/", json)) {
    Serial.println("SEND SUCCESS");
  } else {
    Serial.println("FAILED");
    Serial.println("REASON: " + fbdo.errorReason());
    Serial.println("------------------------------------");
    Serial.println();
  }
}
