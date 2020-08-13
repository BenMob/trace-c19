  
## Main Use Cases

### Report Trace
* Allows Covid-19 patients to anonymously plot the map with places that they have visited within a certain time frame for others to see.

### Search Trace
* Allows users to search and localize reported places on the map.

## Running Locally

The fastest way to run this project locally is through [Google's CloudShell](https://ssh.cloud.google.com/cloudshell) 
No SDK Installations needed, simply follow these four steps.
 
1. Go to Google [CloudShell](https://ssh.cloud.google.com/cloudshell) 
2. Run `git clone https://github.com/BenMob/trace-c19.git`
3. Run `cd trace-c19/app`
4. Run `mvn package appengine:run` 

Note: A private API key will be needed in order for the map to show. 
[See this](https://developers.google.com/maps/documentation/javascript/get-api-key)

## Technologies

* HTML
* CSS (W3.css, Bootstrap)
* Javascript
* Java
* Google Appengine
* Google Datastore
* Google Maps API

#### Summer 2020 Software Product Sprint (Team 39)



