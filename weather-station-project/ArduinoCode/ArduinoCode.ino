#include "FirebaseESP8266.h"
#include <ESP8266WiFi.h>
#include <DHT.h>
#include <NTPClient.h>
#include <WiFiUdp.h>

#define WIFI_SSID ""
#define WIFI_PASSWORD ""
#define FIREBASE_HOST ""
#define FIREBASE_AUTH ""
#define DHTPIN D2                        // Digital pin connected to DHT11
#define DHTTYPE DHT11                   // Initialize dht type as DHT 11

/* 
 *  Help from:
 *  Firebase integration: https://github.com/mobizt/Firebase-ESP8266
 *  NTP Time Client: https://github.com/arduino-libraries/NTPClient/blob/master/keywords.txt
 *  Sesnsor: https://learn.sunfounder.com/category/starter-kit-v2-0-for-arduino/
*/

FirebaseData fbdo;
int timezone = -5 * 3600;
int dst = 0;
DHT dht(DHTPIN, DHTTYPE);
float t;                             // temperature reading
float h;                            // humidity reading
const int DHT11_PIN = 2;           //Humiture sensor attached to pin 2 of ESP8266 board
FirebaseJson json;
WiFiUDP ntpUDP;

NTPClient timeClient(ntpUDP);

void setup()
{

  Serial.begin(115200);
  dht.begin();
  h = dht.readHumidity();                                 // Reading Humidity
  t = dht.readTemperature();                           // Read temperature as Celsius

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

  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
  Firebase.reconnectWiFi(true);

  timeClient.begin();
}

void loop()
{
  h = dht.readHumidity();                                 // Reading Humidity
  t = dht.readTemperature() * 1.8 + 32;                           // Read temperature as Celsius
 
  timeClient.update();
  
  json.clear();
  json.add("tem", t);
  json.add("hum", h);
  json.add("time",   String(timeClient.getEpochTime()));

  if (Firebase.pushJSON(fbdo, "/data/", json)) {
    Serial.println("SEND SUCCESS");

  } else {
    Serial.println("FAILED");
    Serial.println("REASON: " + fbdo.errorReason());
    Serial.println("------------------------------------");
    Serial.println();
  }

  delay(3000); //delay 3 seconds
}
