#include "FirebaseESP8266.h"
#include <ESP8266WiFi.h>
#include <time.h>
#include <DHT.h>


#define WIFI_SSID "Reaban"
#define WIFI_PASSWORD "Welcome1!"
#define FIREBASE_HOST "weatherstation-399dc-default-rtdb.firebaseio.com"
#define FIREBASE_AUTH "53B3kfODbOLymbBTRJWPOZokJvKti4SNAXtcsheJ"
#define DHTPIN D2                        // Digital pin connected to DHT11
#define DHTTYPE DHT11                   // Initialize dht type as DHT 11


FirebaseData fbdo;
int timezone = 5 * 3600;
int dst =0;
DHT dht(DHTPIN, DHTTYPE); 
String path;
float t;
float h;
const int DHT11_PIN= 2;            //Humiture sensor attached to pin 2 of ESP8266
FirebaseJson json;
int readingNum;



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

  //6. Try to get int data from Firebase
  //The get function returns bool for the status of operation
  //fbdo requires for receiving the data
  if(Firebase.getInt(fbdo, "/LED_Status"))
  {
    //Success
    Serial.print("Get int data success, int = ");
    Serial.println(fbdo.intData());

  }else{
    //Failed?, get the error reason from fbdo

    Serial.print("Error in getInt, ");
    Serial.println(fbdo.errorReason());
  }
  readingNum = 0;

  /*

  In case where you want to set other data types i.e. bool, float, double and String, you can use setBool, setFloat, setDouble and setString.
  If you want to get data which you known its type at specific node, use getInt, getBool, getFloat, getDouble, getString.
  If you don't know the data type at specific node, use get and check its type.

  The following shows how to get the variant data

  */

 if(Firebase.get(fbdo, "/LED_Status"))
  {
    //Success
    Serial.print("Get variant data success, type = ");
    Serial.println(fbdo.dataType());

    if(fbdo.dataType() == "int"){
      Serial.print("data = ");
      Serial.println(fbdo.intData());
    }else if(fbdo.dataType() == "bool"){
      if(fbdo.boolData())
        Serial.println("data = true");
      else
        Serial.println("data = false");
    }

  }else{
    //Failed?, get the error reason from fbdo

    Serial.print("Error in get, ");
    Serial.println(fbdo.errorReason());
  }

  /*

  If you want to get the data in realtime instead of using get, see the stream examples.
  If you want to work with JSON, see the FirebaseJson, jsonObject and jsonArray examples.

  If you have questions or found the bugs, feel free to open the issue here https://github.com/mobizt/Firebase-ESP8266

  */



 configTime(timezone, dst, "poo.npt.org","time.nist.gov");
 Serial.println("\nWaiting for Internet time");

 while(!time(nullptr)){
  Serial.print("*");
  delay(10000);
 }
 Serial.println("Time response... ok");
}

void loop()
{
  time_t now = time(nullptr);
  struct tm* p_tm = localtime(&now);
  Serial.print(p_tm->tm_mday);
  Serial.print("/");
  Serial.print(p_tm->tm_mon + 1);
  Serial.print("/");
  Serial.print(p_tm->tm_year + 1900);
  
  Serial.print(" ");
  
  Serial.print(p_tm->tm_hour);
  Serial.print(":");
  Serial.print(p_tm->tm_min);
  Serial.print(":");
  Serial.println(p_tm->tm_sec);

  String timeOfReading = String(p_tm->tm_year + 1900)+ "-" + String(p_tm->tm_mon + 1) + "-" + String(p_tm->tm_mday) + "-" + String(p_tm->tm_hour) + "-" + String(p_tm->tm_min) + "-" + String(p_tm->tm_sec);
  String datePath = String(p_tm->tm_year + 1900)+ "-" + String(p_tm->tm_mon + 1) + "-" + String(p_tm->tm_mday) + "-" + String(p_tm->tm_hour) + "-" + String(p_tm->tm_min) + "-" + String(p_tm->tm_sec);


  h = dht.readHumidity();                                 // Reading Humidity
  t = dht.readTemperature() * 1.8 + 32;                           // Read temperature as Celsius  
  String numAsString = String(readingNum);
  Serial.print("/data/");
  
  path = "/data/";

  json.clear();
  json.add("tem", t);
  json.add("hum", h);
  json.add("time", timeOfReading);
  
  if (Firebase.pushJSON(fbdo, path, json)) {
      Serial.println("SEND SUCCESS");
        
    } else {
        Serial.println("FAILED");
        Serial.println("REASON: " + fbdo.errorReason());
        Serial.println("------------------------------------");
        Serial.println();
    }





//
//    
//  if(Firebase.setInt(fbdo, "/sec", p_tm->tm_sec))
//  {
//    //Success
//     Serial.println("Set sec success");
//
//  }else{
//    //Failed?, get the error reason from fbdo
//
//    Serial.print("Error in setInt, ");
//    Serial.println(fbdo.errorReason());
//  }

  



 
  readingNum = readingNum + 1;
  delay(3000);
}
